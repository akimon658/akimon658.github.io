import { button } from './button.ts'
import { header } from './header.ts'

declare var mediumZoom: any

document.addEventListener('DOMContentLoaded', function () {
	if (typeof mediumZoom === 'function') {
		mediumZoom('.img-zoomable', {
			margin: 32,
			background: '#00000054',
			scrollOffset: 128,
		})
	}
})

button()
header()
