import { useState, useEffect, useRef } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import './DreamWebsite.css'

// ─────────────────────────────────────────────────────────────
// 👇 PASTE YOUR YOUTUBE VIDEO ID HERE once you've uploaded it
//    e.g. for https://youtu.be/dQw4w9WgXcQ  →  'dQw4w9WgXcQ'
// ─────────────────────────────────────────────────────────────
const YOUTUBE_VIDEO_ID = '' // ← add your ID here

/* ── Floating particle ── */
function Particle({ style }) {
  return <span className="dw-particle" style={style} />
}

/* ── The modal form ── */
function DreamModal({ onClose }) {
  const [state, handleSubmit] = useForm('mjgvewrz')
  const overlayRef = useRef(null)

  // Close on backdrop click
  const handleOverlay = e => {
    if (e.target === overlayRef.current) onClose()
  }

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="dw-modal-overlay" ref={overlayRef} onClick={handleOverlay}>
      <div className="dw-modal glass">
        <button className="dw-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="dw-modal-header">
          <div className="dw-modal-badge">⚡ 72 HOURS</div>
          <h2 className="dw-modal-title">
            Tell me about your<br /><span className="accent-red">dream website.</span>
          </h2>
          <p className="dw-modal-sub">Fill in the details below and I'll reach out within 24 hours to kick things off.</p>
        </div>

        {state.succeeded ? (
          <div className="dw-modal-success">
            <div className="dw-success-icon">🚀</div>
            <h3>Request received!</h3>
            <p>Sit tight — I'll be in touch within 24 hours to start building your dream.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="dw-form">
            <div className="dw-form-row">
              <div className="dw-form-group">
                <label htmlFor="dw-name">YOUR NAME</label>
                <input id="dw-name" name="name" type="text" required placeholder="Michael Smith" />
              </div>
              <div className="dw-form-group">
                <label htmlFor="dw-email">EMAIL</label>
                <input id="dw-email" name="email" type="email" required placeholder="you@email.com" />
                <ValidationError field="email" prefix="Email" errors={state.errors} className="dw-form-error" />
              </div>
            </div>

            <div className="dw-form-group">
              <label htmlFor="dw-website-type">TYPE OF WEBSITE</label>
              <select id="dw-website-type" name="website_type" required>
                <option value="">Choose your dream…</option>
                <option value="Portfolio">Portfolio / Personal Brand</option>
                <option value="Business">Business / Corporate</option>
                <option value="E-Commerce">E-Commerce / Online Store</option>
                <option value="Landing Page">Landing Page / Campaign</option>
                <option value="Other">Other (describe below)</option>
              </select>
            </div>

            <div className="dw-form-group">
              <label htmlFor="dw-budget">BUDGET RANGE</label>
              <select id="dw-budget" name="budget">
                <option value="">Select a range…</option>
                <option value="< $500">Under $500</option>
                <option value="$500–$1k">$500 – $1,000</option>
                <option value="$1k–$2k">$1,000 – $2,000</option>
                <option value="$2k+">$2,000+</option>
              </select>
            </div>

            <div className="dw-form-group">
              <label htmlFor="dw-vision">YOUR VISION</label>
              <textarea
                id="dw-vision"
                name="message"
                required
                rows={4}
                placeholder="Describe your dream website — style, colors, references, must-have features…"
              />
              <ValidationError field="message" prefix="Message" errors={state.errors} className="dw-form-error" />
            </div>

            {/* Hidden field so you know it came from this section */}
            <input type="hidden" name="source" value="Dream Website 72h Form" />

            {state.errors?.length > 0 && !state.errors.find(e => e.field) && (
              <p className="dw-form-error">Something went wrong. Try emailing me directly.</p>
            )}

            <button type="submit" className="dw-submit-btn" disabled={state.submitting}>
              {state.submitting ? (
                <span className="dw-btn-inner"><span className="dw-spinner" />SENDING…</span>
              ) : (
                <span className="dw-btn-inner">⚡ START BUILDING MY DREAM SITE</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

/* ── Main section ── */
export default function DreamWebsite() {
  const [modalOpen, setModalOpen] = useState(false)

  // Generate random particles once
  const particles = Array.from({ length: 18 }, (_, i) => ({
    key: i,
    style: {
      '--x': `${Math.random() * 100}%`,
      '--y': `${Math.random() * 100}%`,
      '--dur': `${4 + Math.random() * 6}s`,
      '--delay': `${Math.random() * 5}s`,
      '--size': `${3 + Math.random() * 5}px`,
    },
  }))

  return (
    <>
      <section className="dw-section section" id="dream-website">
        <div className="container">
          <div className="dw-wrap">

            {/* ── Left: Video placeholder (9:16) ── */}
            <div className="dw-video-col">
              <div className="dw-phone-frame">
                <div className="dw-phone-notch" />
                <div className="dw-video-slot">
                  {YOUTUBE_VIDEO_ID ? (
                    // ── YouTube embed (no controls, no branding, autoplay loop) ──
                    <iframe
                      className="dw-hype-video"
                      src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0&playlist=${YOUTUBE_VIDEO_ID}`}
                      title="Dream Website Hype"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen={false}
                    />
                  ) : (
                    // ── Placeholder shown until YOUTUBE_VIDEO_ID is set ──
                    <div className="dw-video-placeholder">
                      <div className="dw-play-ring">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="dw-video-label">Video coming soon</span>
                    </div>
                  )}
                </div>
                <div className="dw-phone-bar" />
              </div>

              {/* Floating social-proof pill */}
              <div className="dw-social-proof">
                <span className="dw-avatars">
                  <span className="dw-av" style={{ background: 'linear-gradient(135deg,#f472b6,#7c3aed)' }}>M</span>
                  <span className="dw-av" style={{ background: 'linear-gradient(135deg,#34d399,#0ea5e9)' }}>J</span>
                  <span className="dw-av" style={{ background: 'linear-gradient(135deg,#fbbf24,#ef4444)' }}>A</span>
                </span>
                <span className="dw-proof-text">+63 clients trust Michael</span>
              </div>
            </div>

            {/* ── Right: Copy + CTA ── */}
            <div className="dw-copy-col">
              {/* Animated particles */}
              {particles.map(p => <Particle key={p.key} style={p.style} />)}

              <div className="dw-badge-row">
                <span className="dw-badge">🌐 WEB DESIGN</span>
                <span className="dw-badge dw-badge-gold">⚡ 72-HOUR DELIVERY</span>
              </div>

              <h2 className="dw-heading">
                Your dream<br />
                website —<br />
                <span className="dw-heading-outline">live in 72h.</span>
              </h2>

              <p className="dw-desc">
                Stop dreaming about the perfect site. I'll design <em>and</em> develop
                it for you in under 72 hours — pixel-perfect, fast, and built to convert.
              </p>

              <ul className="dw-checklist">
                <li><span className="dw-check">✓</span> Custom design, no templates</li>
                <li><span className="dw-check">✓</span> Mobile-first & blazing fast</li>
                <li><span className="dw-check">✓</span> Delivered in 72 hours or less</li>
                <li><span className="dw-check">✓</span> Unlimited revisions until you love it</li>
              </ul>

              <button
                id="dream-website-cta-btn"
                className="dw-cta-btn"
                onClick={() => setModalOpen(true)}
              >
                <span className="dw-cta-inner">
                  <span className="dw-cta-text">Build My Dream Site</span>
                  <span className="dw-cta-arrow">↗</span>
                </span>
                <span className="dw-cta-glow" />
              </button>

              <p className="dw-disclaimer">No commitment · Free consultation · Reply within 24h</p>
            </div>

          </div>
        </div>
      </section>

      {modalOpen && <DreamModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
