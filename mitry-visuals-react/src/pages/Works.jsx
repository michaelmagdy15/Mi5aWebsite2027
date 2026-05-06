import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useProjects } from '../hooks/useContent'
import './Works.css'

const CATEGORIES = ['ALL', 'VISUAL EFFECTS', 'WEB DESIGN', 'PHOTO EDITING', 'MOTION DESIGN', 'PHOTOGRAPHY', 'VISUAL EFFECTS + AI']

export default function Works() {
  const pageRef = useRef(null)
  useReveal(pageRef)

  const { projects, loading, error } = useProjects()
  const [active, setActive] = useState('ALL')

  const filtered = active === 'ALL'
    ? projects
    : projects.filter(p => p.category.toUpperCase() === active)

  return (
    <div className="works-page" ref={pageRef}>
      {/* ── HERO ── */}
      <section className="works-hero section">
        <div className="works-hero-glow" />
        <div className="works-hero-grid" />
        <div className="container">
          <div className="works-hero-inner">
            <div>
              <div className="section-label reveal invisible">PORTFOLIO</div>
              <h1 className="works-title reveal invisible">
                All <span className="outline-text">Projects</span>
              </h1>
            </div>
            <p className="works-sub reveal invisible">
              A collection of web design, visual effects, and motion projects spanning brands, social media, and digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER ── */}
      <div className="works-filter-wrap">
        <div className="container">
          <div className="works-filter">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? 'filter-active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <section className="works-grid-section">
        <div className="container">
          {loading && (
            <div className="works-loading">
              <div className="loading-spinner" />
              <span>Loading projects...</span>
            </div>
          )}
          {error && (
            <div className="works-error">Failed to load projects. Check catalog.json.</div>
          )}
          {!loading && !error && (
            <div className="works-grid">
              {filtered.map((p, i) => (
                <a
                  key={p.id}
                  href={p.link}
                  target={p.link !== '#' ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`work-card reveal invisible${p.featured ? ' work-featured' : ''}`}
                  style={{ '--i': i }}
                >
                  <div className="work-img-wrap">
                    <img src={p.image} alt={p.title} loading="lazy" />
                    <div className="work-img-overlay" />
                  </div>
                  <div className="work-info">
                    <div className="work-meta">
                      <span className="work-cat">{p.category}</span>
                      {p.featured && <span className="work-featured-badge">FEATURED</span>}
                    </div>
                    <div className="work-bottom">
                      <h3 className="work-title">{p.title}</h3>
                      <div className="work-arrow">↗</div>
                    </div>
                    {p.description && <p className="work-desc">{p.description}</p>}
                  </div>
                </a>
              ))}
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="works-empty">No projects in this category yet.</div>
          )}
        </div>
      </section>
    </div>
  )
}
