import { useEffect, useRef } from 'react'
import './ReelModal.css'

/**
 * Extracts the Instagram reel embed URL from a full Instagram link.
 * e.g. "https://www.instagram.com/reel/DBvzw3BI2lF/?igsh=..."
 *   → "https://www.instagram.com/reel/DBvzw3BI2lF/embed/"
 */
export function getInstaEmbedUrl(link) {
  if (!link) return null
  const match = link.match(/instagram\.com\/reel\/([^/?#]+)/)
  if (!match) return null
  return `https://www.instagram.com/reel/${match[1]}/embed/`
}

export function isInstagramLink(link) {
  return Boolean(link && link.includes('instagram.com'))
}

export default function ReelModal({ project, onClose }) {
  const overlayRef = useRef(null)
  const embedUrl = getInstaEmbedUrl(project?.link)

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape key to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Click backdrop to close
  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!project || !embedUrl) return null

  return (
    <div className="rm-overlay" ref={overlayRef} onClick={handleOverlay} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="rm-panel">

        {/* Close button */}
        <button className="rm-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Instagram embed iframe — 9:16 aspect ratio */}
        <div className="rm-video-wrap">
          <iframe
            className="rm-iframe"
            src={embedUrl}
            title={project.title}
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>

        {/* Project info below */}
        <div className="rm-info">
          <span className="rm-cat">{project.category}</span>
          <h2 className="rm-title">{project.title}</h2>
          {project.description && <p className="rm-desc">{project.description}</p>}
          <a
            className="rm-ig-link"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            View on Instagram ↗
          </a>
        </div>

      </div>
    </div>
  )
}
