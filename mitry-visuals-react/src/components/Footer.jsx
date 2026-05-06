import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="footer-inner">
        <div className="container">

          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="logo-m">M</span>
                <span className="logo-rest">ITRY</span>
                <span className="logo-dot">.</span>
              </Link>
              <p className="footer-bio">
                Visual effects artist &amp; web designer<br />based in Cairo, Egypt.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-col">
                <span className="footer-col-title">PAGES</span>
                <Link to="/">Home</Link>
                <Link to="/works">Works</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
              </div>
              <div className="footer-col">
                <span className="footer-col-title">SOCIAL</span>
                <a href="https://instagram.com/mitry.visuals" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://behance.net" target="_blank" rel="noreferrer">Behance</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">© {year} Michael Mitry. All rights reserved.</span>
            <span className="footer-made">Crafted with care in Cairo ✦</span>
          </div>

        </div>
      </div>
    </footer>
  )
}
