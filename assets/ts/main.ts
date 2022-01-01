import { button } from './button.ts'
import { header } from './header.ts'

import mediumZoom from 'https://esm.sh/medium-zoom@1.0.6/dist/medium-zoom.js'

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
