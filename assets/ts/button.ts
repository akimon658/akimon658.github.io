declare function loadComment(): void
declare namespace DISQUS {
  function reset(disqusReload: {
    reload: boolean
  }): void
}

export function button() {
  const buttons = document.querySelector<HTMLElement>('.btn')!
  let timeoutId: number
  window.addEventListener('scroll', () => {
    buttons.style.visibility = 'hidden'

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      buttons.style.visibility = 'visible'
    }, 500)
  })

  const menuButton = document.getElementById('btn-menu')
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      menuOpener()
    })
  }

  document.querySelector('.btn-scroll-top')!.addEventListener('click', () => {
    document.documentElement.scrollTop = 0
  })

  // load comment button only when comment area exist
  if (document.querySelector('span.post-comment-notloaded')) {
    document.querySelector('span.post-comment-notloaded')!.addEventListener('click', loadComment)
  }
}

function menuOpener() {
  const menu = document.querySelector<HTMLElement>('.sidebar-mobile')
  if (menu) {
    if (menu.style.display === 'none') {
      menu.setAttribute('style', 'display: flex;')
    } else {
      menu.setAttribute('style', 'display: none;')
    }
  }
}
