export function header() {
	const header = document.querySelector('header')!,
		headerHeight = header.clientHeight
	let currentPosition = 0,
		lastPosition = 0

	document.addEventListener('scroll', function () {
		currentPosition = window.scrollY

		if (currentPosition > headerHeight && currentPosition > lastPosition) {
			header.style.visibility = 'hidden'
		} else {
			header.style.visibility = 'visible'
		}

		lastPosition = currentPosition
	})
}
