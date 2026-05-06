import { useRef, useEffect } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import './Contact.css'

function useReveal(ref) {
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('anim-zoom')
          e.target.classList.remove('invisible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [ref])
}

export default function Contact() {
  const pageRef = useRef(null)
  useReveal(pageRef)

  const [state, handleSubmit] = useForm('mjgvewrz')

  return (
    <div className="contact-page" ref={pageRef}>
      <section className="contact-hero section">
        <div className="container">
          <div className="section-label reveal invisible">CONTACT</div>
          <h1 className="contact-title reveal invisible">
            Let's work<br /><span className="accent-red">together.</span>
          </h1>
        </div>
      </section>

      <section className="contact-body section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info reveal invisible">
              <h2 className="info-heading">CONTACT INFO</h2>
              <div className="info-blocks">
                <div className="info-block">
                  <div className="info-icon">
                    <svg viewBox="0 0 512 512" fill="currentColor" width="18" height="18"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"/></svg>
                  </div>
                  <div><span className="info-blk-label">MAIL ME</span><a href="mailto:michaelmitry13@gmail.com" className="info-blk-val">michaelmitry13@gmail.com</a></div>
                </div>
                <div className="info-block">
                  <div className="info-icon">
                    <svg viewBox="0 0 512 512" fill="currentColor" width="18" height="18"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/></svg>
                  </div>
                  <div><span className="info-blk-label">CONTACT ME</span><span className="info-blk-val">+20 01000680580</span></div>
                </div>
                <div className="info-block">
                  <div className="info-icon">
                    <svg viewBox="0 0 384 512" fill="currentColor" width="18" height="18"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>
                  </div>
                  <div><span className="info-blk-label">LOCATION</span><span className="info-blk-val">Egypt, Cairo</span></div>
                </div>
              </div>
              <div className="social-section">
                <h3 className="social-heading">SOCIAL INFO</h3>
                <div className="social-links">
                  <a href="https://linkedin.com/in/michaelmitryvisuals" target="_blank" rel="noreferrer" className="social-btn">
                    <svg viewBox="0 0 448 512" fill="currentColor" width="16" height="16"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
                    LinkedIn
                  </a>
                  <a href="https://instagram.com/michaelmagdymitry/" target="_blank" rel="noreferrer" className="social-btn">
                    <svg viewBox="0 0 448 512" fill="currentColor" width="16" height="16"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrap glass reveal invisible">
              <div className="form-glow" />
              <img src="/images/icon3.png" alt="" className="form-icon" />
              <h2 className="form-heading">Send a message</h2>

              {state.succeeded ? (
                <div className="form-success">
                  <span className="success-icon">✓</span>
                  <p>Message sent! I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">NAME</label>
                      <input id="name" name="name" type="text" required placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">EMAIL</label>
                      <input id="email" name="email" type="email" required placeholder="your@email.com" />
                      <ValidationError field="email" prefix="Email" errors={state.errors} className="form-error" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">SUBJECT</label>
                    <input id="subject" name="subject" type="text" required placeholder="Project inquiry" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">MESSAGE</label>
                    <textarea id="message" name="message" required rows={6} placeholder="Tell me about your project..." />
                    <ValidationError field="message" prefix="Message" errors={state.errors} className="form-error" />
                  </div>
                  {state.errors?.length > 0 && !state.errors.find(e => e.field) && (
                    <p className="form-error">Something went wrong. Try emailing me directly.</p>
                  )}
                  <button type="submit" className="btn-primary form-submit" disabled={state.submitting}>
                    {state.submitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
