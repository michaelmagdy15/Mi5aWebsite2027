import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [active, setActive] = useState(false)
  const prev = useRef(location.pathname)

  useEffect(() => {
    if (location.pathname !== prev.current) {
      prev.current = location.pathname
      setActive(true)
      const t = setTimeout(() => setActive(false), 700)
      return () => clearTimeout(t)
    }
  }, [location.pathname])

  return (
    <>
      <div className={`page-wipe${active ? ' page-wipe-on' : ''}`} />
      {children}
    </>
  )
}
