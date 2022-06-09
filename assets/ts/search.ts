import Fuse from 'fuse.js'
import template from 'art-template/lib/template-web'

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

  if (result.length > 0) {
    document.getElementById('search-result')!.innerHTML = template('search-result-template', result)
  }

  return [new Date().getTime() - counter, result.length]
}

const urlParams = new URLSearchParams(window.location.search) // get params from URL
if (urlParams.has('q')) {
  const counter = new Date().getTime()
  const infoElements = document.querySelectorAll('.search-result-info')
  const key = urlParams.get('q')! // get search keyword, divided by space
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
        const [time, num] = searchAll(key, xhr.response, counter)
        // console.log(counter)
        if (num <= 0) {
          infoElements[1].removeAttribute('style')
        } else {
          infoElements[0].innerHTML = infoElements[0].innerHTML.replace('[TIME]', String(time))
          infoElements[0].innerHTML = infoElements[0].innerHTML.replace('[NUM]', String(num))
          infoElements[0].removeAttribute('style')
        }
      } else {
        infoElements[2].removeAttribute('style')
      }
    }
  }
  xhr.send(null)
}
