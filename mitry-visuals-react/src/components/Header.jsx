import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const NAV_LINKS = [['/', 'HOME'], ['/works', 'WORKS'], ['/services', 'SERVICES'], ['/about', 'ABOUT'], ['/contact', 'CONTACT']]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="header-noise" />
        <div className="header-inner container">
          <Link to="/" className="logo" onClick={close}>
            <span className="logo-m">M</span>
            <span className="logo-rest">ITRY</span>
            <span className="logo-dot">.</span>
          </Link>

          {/* Desktop nav — inside header, hidden on mobile via CSS */}
          <nav className="nav-desktop">
            {NAV_LINKS.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
            <Link to="/contact" className="nav-cta">LET'S TALK ↗</Link>
          </nav>

          <button
            className="hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`ham-bar ${open ? 'open' : ''}`} />
            <span className={`ham-bar ${open ? 'open' : ''}`} />
          </button>
        </div>
      </header>

      {/*
        Mobile nav overlay is rendered OUTSIDE <header> so it is NOT
        trapped by the header's backdrop-filter stacking/containing block.
        position:fixed inside a backdrop-filter parent is clipped to that
        parent's box — moving it here lets it cover the full viewport.
      */}
      <nav
        className={`nav-mobile${open ? ' nav-mobile-open' : ''}`}
        aria-hidden={!open}
      >
        {NAV_LINKS.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => `nav-mobile-link ${isActive ? 'nav-active' : ''}`}
            onClick={close}
          >
            {label}
          </NavLink>
        ))}
        <Link to="/contact" className="nav-mobile-cta" onClick={close}>
          LET'S TALK ↗
        </Link>
      </nav>
    </>
  )
}
