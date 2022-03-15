import mediumZoom from 'https://esm.sh/medium-zoom@1.0.6/dist/medium-zoom.js'

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
