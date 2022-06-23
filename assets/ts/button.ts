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
}

function menuOpener() {
  const menu = document.querySelector<HTMLElement>('.sidebar-mobile')

  if (menu) {
    const style = menu.style.display === 'none' ? 'flex' : 'none'
    menu.setAttribute('style', `display: ${style};`)
  }
}
