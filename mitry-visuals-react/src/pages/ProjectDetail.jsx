import { useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useProjects } from '../hooks/useContent'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { id } = useParams()
  const pageRef = useRef(null)
  useReveal(pageRef)
  const navigate = useNavigate()

  const { projects, loading, error } = useProjects()
  const project = projects.find(p => p.id === id)

  // Derive prev/next for navigation
  const sorted = [...projects].sort((a, b) => a.order - b.order)
  const currentIndex = sorted.findIndex(p => p.id === id)
  const prevProject = currentIndex > 0 ? sorted[currentIndex - 1] : null
  const nextProject = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null

  if (loading) {
    return (
      <div className="pd-loading">
        <div className="loading-spinner" />
        <span>Loading project...</span>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="pd-not-found">
        <div className="pd-nf-inner">
          <span className="pd-nf-code">404</span>
          <h2>Project not found</h2>
          <Link to="/works" className="btn btn-primary">← Back to Works</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pd-page" ref={pageRef}>

      {/* ── HERO ── */}
      <section className="pd-hero section">
        <div className="pd-hero-glow" />
        <div className="container">
          <div className="pd-breadcrumb reveal invisible">
            <Link to="/works">Works</Link>
            <span className="pd-bc-sep">↗</span>
            <span>{project.title}</span>
          </div>

          <div className="pd-hero-inner">
            <div className="pd-hero-left">
              <div className="section-label reveal invisible">{project.category}</div>
              <h1 className="pd-title reveal invisible">{project.title}</h1>
              <p className="pd-tagline reveal invisible">{project.description}</p>

              <div className="pd-meta-row reveal invisible">
                {project.year && (
                  <div className="pd-meta-item">
                    <span className="pd-meta-label">YEAR</span>
                    <span className="pd-meta-val">{project.year}</span>
                  </div>
                )}
                {project.role && (
                  <div className="pd-meta-item">
                    <span className="pd-meta-label">ROLE</span>
                    <span className="pd-meta-val">{project.role}</span>
                  </div>
                )}
                {project.link && project.link !== '#' && (
                  <div className="pd-meta-item">
                    <span className="pd-meta-label">LIVE</span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="pd-meta-val pd-meta-link"
                    >
                      Visit Site ↗
                    </a>
                  </div>
                )}
              </div>

              {project.tech && project.tech.length > 0 && (
                <div className="pd-tech-wrap reveal invisible">
                  {project.tech.map(t => (
                    <span key={t} className="pd-tech-tag">{t}</span>
                  ))}
                </div>
              )}
            </div>

            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary pd-cta reveal invisible"
              >
                Visit Live Site ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOT ── */}
      {project.image && (
        <section className="pd-screenshot-section">
          <div className="container">
            <div className="pd-img-frame reveal invisible">
              <div className="pd-img-corner pd-tl" />
              <div className="pd-img-corner pd-tr" />
              <div className="pd-img-corner pd-bl" />
              <div className="pd-img-corner pd-br" />
              <img
                src={project.image}
                alt={project.title}
                className="pd-screenshot"
              />
              <div className="pd-img-overlay" />
            </div>
          </div>
        </section>
      )}

      {/* ── DESCRIPTION ── */}
      {project.longDescription && (
        <section className="pd-desc-section section">
          <div className="container">
            <div className="pd-desc-grid">
              <div className="pd-desc-label reveal invisible">
                <div className="section-label">ABOUT THE PROJECT</div>
              </div>
              <div className="pd-desc-body reveal invisible">
                <p className="pd-long-desc">{project.longDescription}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK DETAIL ── */}
      {project.tech && project.tech.length > 0 && (
        <section className="pd-stack-section">
          <div className="container">
            <div className="pd-stack-header reveal invisible">
              <div className="section-label">TECH STACK</div>
            </div>
            <div className="pd-stack-grid">
              {project.tech.map((t, i) => (
                <div
                  key={t}
                  className="pd-stack-item reveal invisible"
                  style={{ '--i': i }}
                >
                  <span className="pd-stack-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pd-stack-name">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PREV / NEXT ── */}
      <section className="pd-nav-section section">
        <div className="container">
          <div className="pd-proj-nav">
            {prevProject ? (
              <Link to={`/works/${prevProject.id}`} className="pd-nav-card pd-nav-prev">
                <span className="pd-nav-dir">← PREVIOUS</span>
                <span className="pd-nav-title">{prevProject.title}</span>
                <span className="pd-nav-cat">{prevProject.category}</span>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link to={`/works/${nextProject.id}`} className="pd-nav-card pd-nav-next">
                <span className="pd-nav-dir">NEXT →</span>
                <span className="pd-nav-title">{nextProject.title}</span>
                <span className="pd-nav-cat">{nextProject.category}</span>
              </Link>
            ) : <div />}
          </div>

          <div className="pd-back-wrap">
            <Link to="/works" className="pd-back-link">← Back to all works</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
