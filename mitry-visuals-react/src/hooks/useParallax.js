import { useEffect } from 'react'

export function useParallax(ref, speed = 50) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const parent = el.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2)
      el.style.transform = `translateY(${(offset * speed) / window.innerHeight}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref, speed])
}
