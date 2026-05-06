import { useEffect, useRef, useState } from 'react'
import './Preloader.css'

export default function Preloader({ onDone }) {
  const [phase, setPhase] = useState('intro')   // intro → glitch → reveal → exit
  const [count, setCount] = useState(0)
  const [glitchName, setGlitchName] = useState('MITRY')
  const [showTagline, setShowTagline] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(239,68,68,${p.o})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Glitch name effect
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'
  const glitchText = (final, cb) => {
    let iter = 0
    const iv = setInterval(() => {
      setGlitchName(
        final.split('').map((c, i) =>
          i < iter ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      )
      iter += 0.4
      if (iter >= final.length + 1) { clearInterval(iv); setGlitchName(final); cb?.() }
    }, 40)
  }

  // Sequence
  useEffect(() => {
    // Phase 1: glitch name in
    const t1 = setTimeout(() => {
      glitchText('MITRY', () => {
        setShowTagline(true)
        setShowBar(true)
      })
    }, 400)

    // Phase 2: count up fast
    const t2 = setTimeout(() => {
      let n = 0
      const iv = setInterval(() => {
        n += Math.floor(Math.random() * 5) + 2
        if (n >= 100) { n = 100; clearInterval(iv) }
        setCount(n)
      }, 25)
    }, 600)

    // Phase 3: glitch flash
    const t3 = setTimeout(() => setPhase('glitch'), 2600)

    // Phase 4: split exit
    const t4 = setTimeout(() => setPhase('exit'), 3000)

    // Phase 5: done
    const t5 = setTimeout(() => onDone(), 3700)

    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout)
  }, [onDone])

  return (
    <div className={`pre-root pre-${phase}`}>
      {/* Scan line */}
      <div className="pre-scanline" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="pre-canvas" />

      {/* Grid overlay */}
      <div className="pre-grid" />

      {/* Split panels (for exit) */}
      <div className="pre-panel pre-panel-top" />
      <div className="pre-panel pre-panel-bot" />

      {/* Main content */}
      <div className="pre-content">
        <div className="pre-eye">
          <div className="pre-eye-ring r1" />
          <div className="pre-eye-ring r2" />
          <div className="pre-eye-ring r3" />
          <div className="pre-eye-dot" />
        </div>

        <div className="pre-name-wrap">
          <span className="pre-name">{glitchName}</span>
          <span className="pre-name-shadow">{glitchName}</span>
        </div>

        {showTagline && (
          <div className="pre-tagline">
            <span>VISUAL</span>
            <span className="pre-sep">·</span>
            <span>MOTION</span>
            <span className="pre-sep">·</span>
            <span>DESIGN</span>
          </div>
        )}

        {showBar && (
          <div className="pre-progress-wrap">
            <div className="pre-progress-track">
              <div className="pre-progress-fill" style={{ width: `${count}%` }}>
                <div className="pre-progress-head" />
              </div>
            </div>
            <div className="pre-progress-nums">
              <span className="pre-loading-label">LOADING EXPERIENCE</span>
              <span className="pre-pct-label">{count}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="pre-corner pre-corner-tl">
        <span>00</span>
        <span>CAIRO · EG</span>
      </div>
      <div className="pre-corner pre-corner-tr">
        <span>SYS_INIT</span>
      </div>
      <div className="pre-corner pre-corner-bl">
        <span>MITRY_VISUALS_v2</span>
      </div>
      <div className="pre-corner pre-corner-br">
        <span className="blink-dot">●</span>
        <span>LIVE</span>
      </div>
    </div>
  )
}
