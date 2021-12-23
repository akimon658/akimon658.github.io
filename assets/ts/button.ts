declare var DISQUS: any
declare var loadComment: any

export function button() {
	const button = document.querySelector<HTMLElement>('.btn')!
	var timeoutId: number
	window.addEventListener('scroll', () => {
		button.style.visibility = 'hidden'

		clearTimeout(timeoutId)
		timeoutId = setTimeout(function () {
			button.style.visibility = 'visible'
		}, 500)
	})

	// theme switch button
	document.querySelector('.btn .btn-toggle-mode')!.addEventListener('click', () => {
		let nowTheme = getCurrentTheme()
		let domTheme = document.body.getAttribute('data-theme')
		const needAuto = document.body.getAttribute('data-theme-auto') === 'true'
		let systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

		if (domTheme === 'auto') {
			// if now in auto mode, switch to user mode
			document.body.setAttribute('data-theme', nowTheme === 'light' ? 'dark' : 'light')
			localStorage.setItem('fuji_data-theme', nowTheme === 'light' ? 'dark' : 'light')
		} else if (domTheme === 'light') {
			const tar = systemTheme === 'dark' ? (needAuto ? 'auto' : 'dark') : 'dark'
			document.body.setAttribute('data-theme', tar)
			localStorage.setItem('fuji_data-theme', tar)
		} else {
			const tar = systemTheme === 'light' ? (needAuto ? 'auto' : 'light') : 'light'
			document.body.setAttribute('data-theme', tar)
			localStorage.setItem('fuji_data-theme', tar)
		}

		// switch comment area theme
		// if this page has comment area
		let commentArea = document.querySelector('.post-comment')
		if (commentArea) {
			// if comment area loaded
			if (document.querySelector('span.post-comment-notloaded')!.getAttribute('style')) {
				if (commentArea.getAttribute('data-comment') === 'utterances') {
					updateUtterancesTheme(document.querySelector<HTMLIFrameElement>('.post-comment iframe')!)
				}
				if (commentArea.getAttribute('data-comment') === 'disqus') {
					DISQUS.reset({
						reload: true,
					})
				}
			}
		}
	})

	/* mobile menu  */
	const openMenu = document.getElementById('btn-menu')
	if (openMenu) {
		openMenu.addEventListener('click', () => {
			const menu = document.querySelector<HTMLElement>('.sidebar-mobile')
			if (menu) {
				if (menu.style.display === 'none') {
					menu.setAttribute('style', 'display: flex;')
				} else {
					menu.setAttribute('style', 'display: none;')
				}
			}
		})
	}

	// to-top button
	document.querySelector('.btn .btn-scroll-top')!.addEventListener('click', () => {
		document.documentElement.scrollTop = 0
	})

	// load comment button only when comment area exist
	if (document.querySelector('span.post-comment-notloaded')) {
		document.querySelector('span.post-comment-notloaded')!.addEventListener('click', loadComment)
	}
}

// get current theme
function getCurrentTheme() {
	let nowTheme = document.body.getAttribute('data-theme')
	if (nowTheme === 'auto') {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	} else {
		return nowTheme === 'dark' ? 'dark' : 'light'
	}
}

// update utterances theme
function updateUtterancesTheme(utterancesFrame: HTMLIFrameElement) {
	let targetTheme = getCurrentTheme()
	if (utterancesFrame) {
		if (targetTheme === 'dark') {
			utterancesFrame.contentWindow!.postMessage(
				{
					type: 'set-theme',
					theme: 'photon-dark',
				},
				'https://utteranc.es'
			)
		} else {
			utterancesFrame.contentWindow!.postMessage(
				{
					type: 'set-theme',
					theme: 'github-light',
				},
				'https://utteranc.es'
			)
		}
	}
}
