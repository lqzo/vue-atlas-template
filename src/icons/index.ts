const icons = import.meta.glob('./svg/*.svg', {
  eager: true,
  import: 'default',
  query: '?raw'
}) as Record<string, string>

const spriteId = 'vue-atlas-svg-icons'

function getIconName(path: string) {
  return path.match(/\/([^/]+)\.svg$/)?.[1]
}

function createSymbol(name: string, svg: string) {
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] || '0 0 24 24'
  const body = svg
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '')
    .trim()

  return `<symbol id="icon-${name}" viewBox="${viewBox}">${body}</symbol>`
}

export function setupSvgIcons() {
  if (typeof document === 'undefined' || document.getElementById(spriteId)) return

  const sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  sprite.id = spriteId
  sprite.setAttribute('aria-hidden', 'true')
  sprite.style.position = 'absolute'
  sprite.style.width = '0'
  sprite.style.height = '0'
  sprite.style.overflow = 'hidden'
  sprite.innerHTML = Object.entries(icons)
    .map(([path, svg]) => {
      const name = getIconName(path)
      return name ? createSymbol(name, svg) : ''
    })
    .join('')

  document.body.prepend(sprite)
}
