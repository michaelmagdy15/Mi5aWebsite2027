import { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-noise" />
      <div className="header-inner container">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-m">M</span>
          <span className="logo-rest">ITRY</span>
          <span className="logo-dot">.</span>
        </Link>

        <nav className={`nav ${open ? 'nav-open' : ''}`}>
          {[['/', 'HOME'], ['/works', 'WORKS'], ['/about', 'ABOUT'], ['/contact', 'CONTACT']].map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/contact" className="nav-cta" onClick={() => setOpen(false)}>
            LET'S TALK ↗
          </Link>
        </nav>

        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span className={`ham-bar ${open ? 'open' : ''}`} />
          <span className={`ham-bar ${open ? 'open' : ''}`} />
        </button>
      </div>
    </header>
  )
}
