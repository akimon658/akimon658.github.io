import mediumZoom from 'medium-zoom'

export function Images() {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof mediumZoom === 'function') {
      mediumZoom('.img-zoomable', {
        margin: 32,
        background: '#00000054',
        scrollOffset: 128,
      })
    }
  })
}
