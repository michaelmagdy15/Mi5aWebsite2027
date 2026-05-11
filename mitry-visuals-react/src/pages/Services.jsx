import { useRef, useState, useEffect } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { useReveal } from '../hooks/useReveal'
import './Services.css'

/* ─────────────────────────────────────────
   SERVICE DATA
───────────────────────────────────────── */
const SERVICES = [
  {
    id: 'website-72h',
    emoji: '⚡',
    badge: 'MOST POPULAR',
    badgeColor: 'gold',
    num: '01',
    title: 'Website in 72 Hours',
    tagline: 'Your dream site, live before the weekend.',
    description:
      'A fully custom, pixel-perfect website designed and developed in under 72 hours. No templates, no drag-and-drop builders — just clean code built to convert.',
    features: [
      'Custom UI/UX design',
      'Fully responsive & mobile-first',
      'SEO-optimized structure',
      'Contact form & analytics',
      'Unlimited revisions until you love it',
      'Delivered in 72 hours or less',
    ],
    price: 'From $300',
    priceNote: 'Landing pages, portfolios, business sites',
    stack: ['React', 'HTML/CSS', 'Formspree', 'Vercel'],
    cta: 'Start My Site',
  },
  {
    id: 'full-app',
    emoji: '📱',
    badge: 'NEW',
    badgeColor: 'blue',
    num: '02',
    title: 'Full App Development',
    tagline: 'From idea to launch in weeks, not months.',
    description:
      'End-to-end web and mobile applications built with modern technology. Authentication, dashboards, real-time features, payments — everything your product needs to succeed.',
    features: [
      'React / React Native frontend',
      'Custom backend & REST API',
      'User authentication & roles',
      'Database design & management',
      'Cloud deployment (GCP / Vercel)',
      'Post-launch support included',
    ],
    price: 'From $1,500',
    priceNote: 'Web apps, mobile apps, admin dashboards',
    stack: ['React', 'Node.js', 'Firebase', 'Docker'],
    cta: 'Build My App',
  },
  {
    id: 'saas',
    emoji: '☁️',
    badge: 'PREMIUM',
    badgeColor: 'purple',
    num: '03',
    title: 'SaaS Development',
    tagline: 'Your software business, engineered end-to-end.',
    description:
      'Full-stack SaaS products built from scratch — complete with subscription billing, multi-tenant architecture, admin panels, and everything you need to launch and scale.',
    features: [
      'Multi-tenant SaaS architecture',
      'Stripe / billing integration',
      'Admin panel & user management',
      'Analytics & usage dashboards',
      'CI/CD pipeline & Docker deployment',
      'Scalable on Google Cloud Run',
    ],
    price: 'From $3,000',
    priceNote: 'B2B/B2C software products',
    stack: ['React', 'TypeScript', 'Firebase', 'GCP', 'Stripe'],
    cta: 'Build My SaaS',
  },
  {
    id: 'brand-motion',
    emoji: '🎬',
    badge: null,
    badgeColor: null,
    num: '04',
    title: 'Brand Motion Package',
    tagline: 'Your brand, in motion.',
    description:
      'Cinematic motion design for brands that want to stand out. Logo animations, social media reels, ad creatives, and product demo videos — all crafted with high-end VFX.',
    features: [
      'Logo reveal animation',
      'Social media ad creatives',
      'Product / service demo video',
      'Reels & short-form content',
      'Color grading & sound design',
      'Delivery in all formats & sizes',
    ],
    price: 'From $200',
    priceNote: 'Logos, reels, ads, product demos',
    stack: ['After Effects', 'Premiere', 'DaVinci Resolve'],
    cta: 'Get My Brand Moving',
  },
  {
    id: 'arch-viz',
    emoji: '🏛️',
    badge: 'UNIQUE',
    badgeColor: 'teal',
    num: '05',
    title: 'Architecture Visualization',
    tagline: 'Sell the vision before you break ground.',
    description:
      'Photorealistic 3D renders, walkthroughs, and architectural visualizations that communicate your design with clarity and impact — for clients, investors, or competitions.',
    features: [
      'Exterior & interior 3D renders',
      'Animated walkthrough videos',
      'Presentation-ready deliverables',
      'Multiple lighting scenarios',
      'Based on your drawings/plans',
      'Fast turnaround',
    ],
    price: 'From $400',
    priceNote: 'Residential, commercial, urban projects',
    stack: ['Blender', 'SketchUp', 'Rhino', 'Photoshop'],
    cta: 'Visualize My Project',
  },
]

/* ─────────────────────────────────────────
   CONTACT MODAL
───────────────────────────────────────── */
function ServiceModal({ service, onClose }) {
  const [state, handleSubmit] = useForm('mjgvewrz')
  const overlayRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleOverlay = e => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div className="svc-overlay" ref={overlayRef} onClick={handleOverlay}>
      <div className="svc-modal glass">
        <button className="svc-modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="svc-modal-head">
          <span className="svc-modal-emoji">{service.emoji}</span>
          <div>
            <div className="svc-modal-badge-sm">{service.num} / {service.title}</div>
            <h2 className="svc-modal-title">
              Let's talk about<br />
              <span className="accent-red">your project.</span>
            </h2>
            <p className="svc-modal-sub">Tell me what you need and I'll get back to you within 24 hours.</p>
          </div>
        </div>

        {state.succeeded ? (
          <div className="svc-success">
            <div className="svc-success-icon">🚀</div>
            <h3>Request received!</h3>
            <p>I'll be in touch within 24 hours to discuss your project.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="svc-form">
            <input type="hidden" name="service" value={service.title} />
            <input type="hidden" name="source" value="Services Page" />

            <div className="svc-form-row">
              <div className="svc-form-group">
                <label htmlFor="svc-name">YOUR NAME</label>
                <input id="svc-name" name="name" type="text" required placeholder="Michael Smith" />
              </div>
              <div className="svc-form-group">
                <label htmlFor="svc-email">EMAIL</label>
                <input id="svc-email" name="email" type="email" required placeholder="you@email.com" />
                <ValidationError field="email" prefix="Email" errors={state.errors} className="svc-form-error" />
              </div>
            </div>

            <div className="svc-form-group">
              <label htmlFor="svc-budget">BUDGET RANGE</label>
              <select id="svc-budget" name="budget">
                <option value="">Select a range…</option>
                <option value="< $500">Under $500</option>
                <option value="$500–$1k">$500 – $1,000</option>
                <option value="$1k–$3k">$1,000 – $3,000</option>
                <option value="$3k–$10k">$3,000 – $10,000</option>
                <option value="$10k+">$10,000+</option>
              </select>
            </div>

            <div className="svc-form-group">
              <label htmlFor="svc-timeline">TIMELINE</label>
              <select id="svc-timeline" name="timeline">
                <option value="">How soon do you need it?</option>
                <option value="ASAP">ASAP (72h)</option>
                <option value="1–2 weeks">1–2 weeks</option>
                <option value="1 month">About 1 month</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div className="svc-form-group">
              <label htmlFor="svc-message">YOUR PROJECT</label>
              <textarea
                id="svc-message"
                name="message"
                required
                rows={4}
                placeholder="Describe your project, goals, and any references you love…"
              />
              <ValidationError field="message" prefix="Message" errors={state.errors} className="svc-form-error" />
            </div>

            {state.errors?.length > 0 && !state.errors.find(e => e.field) && (
              <p className="svc-form-error">Something went wrong. Try emailing me directly.</p>
            )}

            <button type="submit" className="svc-submit-btn" disabled={state.submitting}>
              {state.submitting ? (
                <span className="svc-btn-inner"><span className="svc-spinner" />SENDING…</span>
              ) : (
                <span className="svc-btn-inner">⚡ SEND REQUEST</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
function ServiceCard({ svc, onSelect }) {
  return (
    <div className="svc-card glass reveal invisible">
      <div className="svc-card-top">
        <div className="svc-card-left">
          <span className="svc-num">{svc.num}</span>
          {svc.badge && (
            <span className={`svc-badge svc-badge-${svc.badgeColor}`}>{svc.badge}</span>
          )}
        </div>
        <span className="svc-emoji">{svc.emoji}</span>
      </div>

      <div className="svc-card-body">
        <h3 className="svc-title">{svc.title}</h3>
        <p className="svc-tagline">{svc.tagline}</p>
        <p className="svc-desc">{svc.description}</p>

        <ul className="svc-features">
          {svc.features.map((f, i) => (
            <li key={i}>
              <span className="svc-check">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="svc-card-footer">
        <div className="svc-stack">
          {svc.stack.map((t, i) => <span key={i} className="svc-tag">{t}</span>)}
        </div>
        <div className="svc-price-row">
          <div>
            <div className="svc-price">{svc.price}</div>
            <div className="svc-price-note">{svc.priceNote}</div>
          </div>
          <button className="svc-cta-btn" onClick={() => onSelect(svc)}>
            {svc.cta} <span className="svc-arrow">↗</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Services() {
  const pageRef = useRef(null)
  const [selected, setSelected] = useState(null)
  useReveal(pageRef)

  return (
    <div className="services-page" ref={pageRef}>
      {/* ── HERO ── */}
      <section className="svc-hero section">
        <div className="svc-hero-glow-1" />
        <div className="svc-hero-glow-2" />
        <div className="container">
          <div className="section-label reveal invisible">WHAT I OFFER</div>
          <h1 className="svc-hero-title reveal invisible">
            Services &amp;<br />
            <span className="accent-red">Pricing.</span>
          </h1>
          <p className="svc-hero-sub reveal invisible">
            From a weekend website to a fully engineered SaaS product —<br />
            every service is crafted with the same obsessive attention to detail.
          </p>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section className="svc-grid-section section">
        <div className="container">
          <div className="svc-grid">
            {SERVICES.map(svc => (
              <ServiceCard key={svc.id} svc={svc} onSelect={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="svc-process-section section">
        <div className="container">
          <div className="sec-header">
            <div className="section-label reveal invisible">HOW IT WORKS</div>
            <div className="sec-line reveal invisible" />
          </div>
          <div className="svc-process-grid">
            {[
              { n: '01', title: 'Brief', desc: 'You fill in the request form. I review it within 24h and reply with questions or a proposal.' },
              { n: '02', title: 'Align', desc: 'We agree on scope, timeline, and price. I send a simple contract and we kick off.' },
              { n: '03', title: 'Build', desc: 'I get to work. You get regular updates and can give feedback at any stage.' },
              { n: '04', title: 'Deliver', desc: 'You receive the final files / live URL. Revisions are included until you\'re 100% happy.' },
            ].map((step, i) => (
              <div key={i} className="svc-step reveal invisible">
                <div className="svc-step-num">{step.n}</div>
                <h3 className="svc-step-title">{step.title}</h3>
                <p className="svc-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
