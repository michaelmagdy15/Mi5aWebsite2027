import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useSiteContent } from '../hooks/useContent'
import './About.css'

export default function About() {
  const pageRef = useRef(null)
  const { data: site, loading } = useSiteContent()

  useReveal(pageRef)

  // Use optional chaining — never return null so pageRef stays attached
  const profile    = site?.profile    || {}
  const skills     = site?.skills     || []
  const experience = site?.experience || []
  const education  = site?.education  || []

  return (
    <div className="about-page" ref={pageRef}>
      {/* ── HERO ── */}
      <section className="about-hero section">
        <div className="about-hero-glow" />
        <div className="container">
          <div className="about-hero-inner">
            <div className="about-hero-text">
              <div className="section-label reveal invisible">ABOUT ME</div>
              <h1 className="about-title reveal invisible">
                Visual Artist<br />
                <span className="outline-text">&amp; Designer.</span>
              </h1>
              {profile.bioLong && (
                <p className="about-intro reveal invisible">{profile.bioLong}</p>
              )}
              <div className="about-info-row reveal invisible">
                <div className="info-item">
                  <span className="info-label">LOCATION</span>
                  <span className="info-val">{profile.location || 'Cairo, Egypt'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">AVAILABLE</span>
                  <span className={`info-val ${profile.available ? 'available' : ''}`}>
                    {profile.availabilityText || 'Available for Freelance'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">EXPERIENCE</span>
                  <span className="info-val">3+ Years</span>
                </div>
              </div>
              <div className="about-actions reveal invisible">
                <Link to="/contact" className="btn-primary">HIRE ME ↗</Link>
                <Link to="/works" className="btn-ghost">VIEW WORKS</Link>
              </div>
            </div>
            <div className="about-image reveal invisible">
              <div className="about-img-glow" />
              <div className="about-img-frame">
                <div className="aframe-corner atl" />
                <div className="aframe-corner atr" />
                <div className="aframe-corner abl" />
                <div className="aframe-corner abr" />
                <img src={profile.aboutImage || '/images/pp.png'} alt={profile.shortName || 'Michael Mitry'} />
              </div>
              <div className="about-img-tag glass">
                <span className="about-tag-dot" />
                <span>MITRY VISUALS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      {skills.length > 0 && (
        <section className="skills-section section">
          <div className="container">
            <div className="sec-header-simple reveal invisible">
              <div className="section-label">SKILLS &amp; TOOLS</div>
            </div>
            <div className="skills-grid">
              {skills.map(s => (
                <div key={s.category} className="skill-group glass reveal invisible">
                  <h3 className="skill-cat">{s.category}</h3>
                  <ul className="skill-list">
                    {s.items.map(item => (
                      <li key={item} className="skill-item">
                        <span className="skill-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {experience.length > 0 && (
        <section className="exp-section section">
          <div className="container">
            <div className="sec-header-simple reveal invisible">
              <div className="section-label">EXPERIENCE</div>
            </div>
            <div className="timeline">
              {experience.map((e, i) => (
                <div key={i} className="timeline-item reveal invisible">
                  <div className="timeline-year">{e.year}</div>
                  <div className="timeline-bar" />
                  <div className="timeline-content glass">
                    <h3 className="timeline-role">{e.role}</h3>
                    <span className="timeline-company">{e.company}</span>
                    <p className="timeline-desc">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EDUCATION ── */}
      {education.length > 0 && (
        <section className="edu-section section">
          <div className="container">
            <div className="sec-header-simple reveal invisible">
              <div className="section-label">EDUCATION</div>
            </div>
            <div className="edu-cards">
              {education.map((e, i) => (
                <div key={i} className="edu-card glass reveal invisible">
                  <span className="edu-period">{e.period}</span>
                  <h3 className="edu-degree">{e.degree}</h3>
                  <span className="edu-school">{e.school}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="about-cta section">
        <div className="container">
          <div className="cta-box reveal invisible">
            <div className="cta-glow-1" />
            <div className="cta-glow-2" />
            <div className="cta-noise" />
            <div className="cta-inner">
              <div className="section-label">READY TO WORK?</div>
              <h2 className="cta-title">
                Let's build something<br />
                <span className="outline-text">extraordinary.</span>
              </h2>
              <Link to="/contact" className="btn-primary cta-btn">GET IN TOUCH ↗</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
