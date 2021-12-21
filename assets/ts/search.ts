import Fuse from 'fuse.js'

declare var template: any

// search by fuse.js
function searchAll(key, index, counter) {
	let fuse = new Fuse(index, {
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
	let result = fuse.search(key)
	// console.log(result)
	if (result.length > 0) {
		document.getElementById('search-result').innerHTML = template('search-result-template', result)
		return [new Date().getTime() - counter, result.length]
	} else {
		return 'notFound'
	}
}

let urlParams = new URLSearchParams(window.location.search) // get params from URL
if (urlParams.has('s')) {
	let counter = new Date().getTime()
	let infoElements = document.querySelectorAll('.search-result-info')
	let key = urlParams.get('s') // get search keyword, divided by space
	document.querySelector('.search-input input').setAttribute('value', key)
	// get search index from json
	let xhr = new XMLHttpRequest()
	xhr.open('GET', 'index.json', true)
	xhr.responseType = 'json'
	xhr.onerror = () => {
		infoElements[2].removeAttribute('style')
	}
	xhr.ontimeout = () => {
		infoElements[2].removeAttribute('style')
	}
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// use index json to search
				// console.log(xhr.response)
				const result: any[] | 'notFound' = searchAll(key, xhr.response, counter)
				// console.log(counter)
				if (result === 'notFound') {
					infoElements[1].removeAttribute('style')
				} else {
					infoElements[0].innerHTML = infoElements[0].innerHTML.replace('[TIME]', result[0])
					infoElements[0].innerHTML = infoElements[0].innerHTML.replace('[NUM]', result[1])
					infoElements[0].removeAttribute('style')
				}
			} else {
				infoElements[2].removeAttribute('style')
			}
		}
	}
	xhr.send(null)
}
