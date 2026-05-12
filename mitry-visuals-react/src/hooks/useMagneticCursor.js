import { useEffect, useRef } from 'react'

const SELECTORS = '.btn-primary, .btn-ghost, .work-card, .bento-card, .filter-btn, .h-strip-card, .magnetic'

export function useMagneticCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let curX = mouseX
    let curY = mouseY
    let rafId = null

    const lerp = (a, b, t) => a + (b - a) * t

    const getMagnetic = (x, y) => {
      const els = document.querySelectorAll(SELECTORS)
      let best = null
      let bestDist = 90
      els.forEach(el => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
        if (d < bestDist) { bestDist = d; best = { cx, cy, d } }
      })
      return best
    }

    const tick = () => {
      const mag = getMagnetic(mouseX, mouseY)
      let tx = mouseX, ty = mouseY
      if (mag) {
        const pull = 1 - mag.d / 90
        tx = mouseX + (mag.cx - mouseX) * pull * 0.45
        ty = mouseY + (mag.cy - mouseY) * pull * 0.45
      }
      curX = lerp(curX, tx, 0.1)
      curY = lerp(curY, ty, 0.1)
      cursor.style.left = curX + 'px'
      cursor.style.top  = curY + 'px'
      rafId = requestAnimationFrame(tick)
    }

    const onMove = e => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  return cursorRef
}
