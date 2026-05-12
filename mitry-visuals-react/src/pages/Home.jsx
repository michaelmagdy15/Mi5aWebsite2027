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

const PROOF_ITEMS = [
  'DAR AL KHALIJ', '✦', 'STRIKE BOXING', '✦', 'ALPHA CALISTHENICS', '✦',
  'EHE DESIGN STUDIO', '✦', 'REFUEL.EG', '✦', 'ATPL VECTOR', '✦',
  'DAR AL KHALIJ', '✦', 'STRIKE BOXING', '✦', 'ALPHA CALISTHENICS', '✦',
  'EHE DESIGN STUDIO', '✦', 'REFUEL.EG', '✦', 'ATPL VECTOR', '✦',
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

/* Animated counting number */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = target / (1200 / 16)
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

/* Animated bar under each stat */
function SparkBar() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.width = '100%'; obs.disconnect() }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div className="hstat-bar-track">
      <div className="hstat-bar" ref={ref} />
    </div>
  )
}

/* Drag-scrollable horizontal project strip */
function HorizontalStrip({ projects }) {
  const stripRef = useRef(null)
  const drag = useRef({ on: false, startX: 0, scroll: 0 })

  const onDown = e => {
    drag.current = { on: true, startX: e.pageX - stripRef.current.offsetLeft, scroll: stripRef.current.scrollLeft }
    stripRef.current.style.cursor = 'grabbing'
  }
  const onUp = () => { drag.current.on = false; stripRef.current.style.cursor = 'grab' }
  const onLeave = () => { drag.current.on = false; if (stripRef.current) stripRef.current.style.cursor = 'grab' }
  const onMove = e => {
    if (!drag.current.on) return
    e.preventDefault()
    const x = e.pageX - stripRef.current.offsetLeft
    stripRef.current.scrollLeft = drag.current.scroll - (x - drag.current.startX) * 1.5
  }

  if (!projects.length) return null
  return (
    <section className="hstrip-section">
      <div className="container">
        <div className="sec-header">
          <div className="section-label reveal invisible">ALL PROJECTS</div>
          <span className="hstrip-drag-hint">← DRAG TO EXPLORE →</span>
        </div>
      </div>
      <div
        className="hstrip"
        ref={stripRef}
        onMouseDown={onDown}
        onMouseUp={onUp}
        onMouseLeave={onLeave}
        onMouseMove={onMove}
      >
        {projects.map((p, i) => (
          <Link
            key={p.id}
            to={`/works/${p.id}`}
            className="hstrip-card"
            style={{ '--i': i }}
            draggable={false}
          >
            <div className="hstrip-img">
              <img src={p.image} alt={p.title} draggable={false} />
              <div className="hstrip-shim" />
            </div>
            <div className="hstrip-info">
              <span className="hstrip-cat">{p.category}</span>
              <h3 className="hstrip-title">{p.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* Click-to-play showreel */
function ShowreelPlayer() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    if (!playing) { videoRef.current?.play(); setPlaying(true) }
    else          { videoRef.current?.pause(); setPlaying(false) }
  }

  return (
    <div className={`showreel-wrap reveal invisible${playing ? ' showreel-active' : ''}`} onClick={handlePlay}>
      <div className="showreel-frame">
        <div className="showreel-corner tl" /><div className="showreel-corner tr" />
        <div className="showreel-corner bl" /><div className="showreel-corner br" />
        <video
          ref={videoRef}
          src="/website promo.mp4"
          className="showreel-video"
          loop playsInline preload="metadata"
        />
        <div className={`showreel-overlay${playing ? ' showreel-overlay-hidden' : ''}`}>
          <div className="showreel-glow" />
          <div className="showreel-play-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <div className="showreel-label">PLAY SHOWREEL</div>
        </div>
        {playing && (
          <div className="showreel-pause-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

const spanClasses = ['bento-large', 'bento-tall', 'bento-normal', 'bento-normal']

export default function Home() {
  const pageRef = useRef(null)
  const { data: site, loading: siteLoading } = useSiteContent()
  const { projects, featured, loading: projLoading } = useProjects()

  useReveal(pageRef)

  const profile  = site?.profile   || {}
  const stats    = site?.stats     || []
  const services = site?.services  || []
  const displayFeatured = projLoading ? [] : featured.slice(0, 4)
  const allProjects     = projLoading ? [] : (projects || [])

  return (
    <div className="home-page" ref={pageRef}>

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
                      <SparkBar />
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

      {/* ── HORIZONTAL DRAG STRIP ── */}
      <HorizontalStrip projects={allProjects} />

      {/* ── SHOWREEL ── */}
      <section className="showreel-section section">
        <div className="container">
          <div className="sec-header">
            <div className="section-label reveal invisible">SHOWREEL</div>
            <div className="sec-line reveal invisible" />
          </div>
          <ShowreelPlayer />
        </div>
      </section>

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

      {/* ── SOCIAL PROOF TICKER ── */}
      <div className="proof-strip">
        <div className="proof-label">TRUSTED BY</div>
        <div className="proof-track-wrap">
          <div className="proof-track">
            {PROOF_ITEMS.map((item, i) => (
              <span key={i} className={item === '✦' ? 'proof-star' : 'proof-word'}>{item}</span>
            ))}
          </div>
        </div>
      </div>

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
