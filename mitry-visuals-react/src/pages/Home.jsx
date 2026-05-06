import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useSiteContent, useProjects } from '../hooks/useContent'
import './Home.css'

const MARQUEE_ITEMS = [
  'VISUAL EFFECTS', '✦', 'WEB DESIGN', '✦', 'MOTION GRAPHICS', '✦',
  'PHOTO EDITING', '✦', 'CREATIVE DIRECTION', '✦', 'COLOR GRADING', '✦',
  'VISUAL EFFECTS', '✦', 'WEB DESIGN', '✦', 'MOTION GRAPHICS', '✦',
  'PHOTO EDITING', '✦', 'CREATIVE DIRECTION', '✦', 'COLOR GRADING', '✦',
]

const SERVICE_ICONS = {
  video: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  web: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  ),
  photo: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
}

function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const duration = 1200
      const step = target / (duration / 16)
      const tick = () => {
        start = Math.min(start + step, target)
        setVal(Math.floor(start))
        if (start < target) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}

const spanClasses = ['bento-large', 'bento-tall', 'bento-normal', 'bento-normal']

export default function Home() {
  const pageRef = useRef(null)
  const { data: site, loading: siteLoading } = useSiteContent()
  const { featured, loading: projLoading } = useProjects()

  useReveal(pageRef)

  // Cursor glow
  const cursorRef = useRef(null)
  useEffect(() => {
    const move = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Always render the outer shell so pageRef is always attached to a DOM node
  const profile  = site?.profile   || {}
  const stats    = site?.stats     || []
  const services = site?.services  || []
  const displayFeatured = projLoading ? [] : featured.slice(0, 4)

  return (
    <div className="home-page" ref={pageRef}>
      <div className="cursor-glow" ref={cursorRef} />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-grid-lines" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="hero-inner container">
          <div className="hero-left">
            <div className="hero-tag reveal invisible">
              <span className="tag-dot" />
              {profile.tagline || 'VISUAL ARTIST · CAIRO, EGYPT'}
            </div>
            <h1 className="hero-title reveal invisible">
              <span className="title-line">MICHAEL</span>
              <span className="title-line outline-line" data-text="MITRY">MITRY</span>
            </h1>
            <p className="hero-desc reveal invisible">
              Crafting visual stories through motion,<br />
              design &amp; digital art.
            </p>
            <div className="hero-actions reveal invisible">
              <Link to="/works" className="btn-primary">VIEW WORKS</Link>
              <Link to="/contact" className="btn-ghost">GET IN TOUCH ↗</Link>
            </div>
            {stats.length > 0 && (
              <div className="hero-stats reveal invisible">
                {stats.map((s, i) => (
                  <div key={i} className="hstat-group">
                    {i > 0 && <div className="hstat-div" />}
                    <div className="hstat">
                      <span className="hstat-n">
                        <Counter target={s.number} suffix={s.suffix} />
                      </span>
                      <span className="hstat-l">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hero-right reveal invisible">
            <div className="hero-img-frame">
              <div className="frame-corner tl" />
              <div className="frame-corner tr" />
              <div className="frame-corner bl" />
              <div className="frame-corner br" />
              <img src={profile.heroImage || '/images/pp.png'} alt={profile.shortName || 'Michael Mitry'} className="hero-portrait" />
              <div className="hero-img-glow" />
            </div>
            <div className="hero-badge glass">
              <span className="badge-dot" />
              <span>{profile.available ? profile.availabilityText : 'NOT AVAILABLE'}</span>
            </div>
            <div className="hero-scroll-hint">
              <div className="scroll-line-anim" />
              <span>SCROLL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className={item === '✦' ? 'marquee-star' : 'marquee-word'}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      {services.length > 0 && (
        <section className="services-section section">
          <div className="container">
            <div className="sec-header">
              <div className="section-label reveal invisible">WHAT I DO</div>
              <div className="sec-line reveal invisible" />
            </div>
            <div className="services-bento">
              {services.map(srv => (
                <div key={srv.num} className={`srv-card glass reveal invisible${srv.large ? ' srv-large' : ''}`}>
                  <div className="srv-num">{srv.num}</div>
                  <div className="srv-icon-wrap">
                    <div className="srv-icon-glow" />
                    {SERVICE_ICONS[srv.icon] || SERVICE_ICONS.video}
                  </div>
                  <h3>{srv.title}</h3>
                  <p>{srv.description}</p>
                  <div className="srv-tag">{srv.tools}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED WORKS ── */}
      {displayFeatured.length > 0 && (
        <section className="featured-section section">
          <div className="container">
            <div className="sec-header">
              <div className="section-label reveal invisible">SELECTED WORKS</div>
              <Link to="/works" className="see-all reveal invisible">VIEW ALL WORKS →</Link>
            </div>
            <div className="bento-grid">
              {displayFeatured.map((p, i) => (
                <a
                  key={p.id}
                  href={p.link}
                  target={p.link !== '#' ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`bento-card ${spanClasses[i] || 'bento-normal'} reveal invisible`}
                >
                  <div className="bento-img-wrap">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <div className="bento-overlay" />
                  </div>
                  <div className="bento-info">
                    <div className="bento-text">
                      <span className="bento-cat">{p.category}</span>
                      <h3>{p.title}</h3>
                    </div>
                    <span className="bento-arrow">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT STRIP ── */}
      {profile.bio && (
        <section className="about-strip section">
          <div className="container">
            <div className="about-strip-inner glass reveal invisible">
              <div className="astrip-glow" />
              <div>
                <img src={profile.aboutImage || '/images/pp.png'} alt={profile.shortName} className="astrip-img" />
              </div>
              <div className="astrip-right">
                <div className="section-label">ABOUT ME</div>
                <h2 className="astrip-title">
                  Cairo-based creative<br />
                  <span className="accent-red">visual artist &amp; architect</span>
                </h2>
                <p className="astrip-desc">{profile.bio}</p>
                <Link to="/about" className="btn-ghost">LEARN MORE ↗</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-box reveal invisible">
            <div className="cta-glow-1" />
            <div className="cta-glow-2" />
            <div className="cta-noise" />
            <div className="cta-inner">
              <div className="section-label">LET'S CREATE</div>
              <h2 className="cta-title">
                Have a project in mind?<br />
                <span className="outline-text">Let's make it happen.</span>
              </h2>
              <Link to="/contact" className="btn-primary cta-btn">START A PROJECT ↗</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
