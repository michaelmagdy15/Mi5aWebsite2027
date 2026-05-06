import { useEffect } from 'react'

/**
 * useReveal — observes .reveal.invisible elements inside `ref`.
 * Uses IntersectionObserver to animate them in when they enter the viewport.
 * Uses MutationObserver to catch elements added AFTER async data loads.
 */
export function useReveal(ref, animClass = 'anim-zoom') {
  useEffect(() => {
    const container = ref.current
    if (!container) return

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.remove('invisible')
            e.target.classList.add(animClass)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    )

    const scanAndObserve = () => {
      const els = container.querySelectorAll('.reveal.invisible')
      els.forEach((el, i) => {
        el.style.animationDelay = `${i * 55}ms`
        io.observe(el)
      })
    }

    // Initial scan
    scanAndObserve()

    // Re-scan whenever new DOM nodes appear (from async data)
    const mo = new MutationObserver(scanAndObserve)
    mo.observe(container, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [ref, animClass]) // stable deps only — MO handles the rest
}
