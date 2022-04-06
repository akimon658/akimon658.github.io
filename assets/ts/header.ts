export function header() {
  const header = document.querySelector("header")!,
    headerStyle = window.getComputedStyle(header)
  let currentPosition = 0,
    lastPosition = 0

  document.addEventListener("scroll", () => {
    currentPosition = window.scrollY

    const diff = currentPosition - lastPosition,
      currentTop = parseFloat(headerStyle.top),
      headerHeight = parseFloat(headerStyle.height)

    let newTop = currentTop - diff
    if (diff < 0) {
      newTop = Math.min(newTop, 0)
    } else {
      newTop = Math.max(newTop, 0 - headerHeight)
    }

    header.style.top = `${newTop}px`
    lastPosition = currentPosition
  })
}
