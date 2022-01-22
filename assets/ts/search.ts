import Fuse from 'https://esm.sh/fuse.js@6.5.3'
import template from 'https://esm.sh/art-template@4.13.2/lib/template-web.js'

// search by fuse.js
function searchAll(key: string, index: JSON[], counter: number) {
	const fuse = new Fuse(index, {
		shouldSort: true,
		distance: 10000,
		keys: [
			{
				name: 'title',
				weight: 2.0,
			},
			{
				name: 'tags',
				weight: 1.5,
			},
			{
				name: 'content',
				weight: 1.0,
			},
		],
	})
	const result = fuse.search(key)
	// console.log(result)
	if (result.length > 0) {
		document.getElementById('search-result')!.innerHTML = template('search-result-template', result)
		return [new Date().getTime() - counter, result.length]
	} else {
		return 'notFound'
	}
}

const urlParams = new URLSearchParams(window.location.search) // get params from URL
if (urlParams.has('s')) {
	const counter = new Date().getTime()
	const infoElements = document.querySelectorAll('.search-result-info')
	const key = urlParams.get('s')! // get search keyword, divided by space
	document.querySelector('.search-input input')!.setAttribute('value', key)
	// get search index from json
	const xhr = new XMLHttpRequest()
	xhr.open('GET', 'index.json', true)
	xhr.responseType = 'json'
	xhr.onerror = function () {
		infoElements[2].removeAttribute('style')
	}
	xhr.ontimeout = function () {
		infoElements[2].removeAttribute('style')
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// use index json to search
				// console.log(xhr.response)
				const result: number[] | 'notFound' = searchAll(key, xhr.response, counter)
				// console.log(counter)
				if (result === 'notFound') {
					infoElements[1].removeAttribute('style')
				} else {
					const resultString: string[] = result.map(String)

					infoElements[0].innerHTML = infoElements[0].innerHTML.replace('[TIME]', resultString[0])
					infoElements[0].innerHTML = infoElements[0].innerHTML.replace('[NUM]', resultString[1])
					infoElements[0].removeAttribute('style')
				}
			} else {
				infoElements[2].removeAttribute('style')
			}
		}
	}
	xhr.send(null)
}
