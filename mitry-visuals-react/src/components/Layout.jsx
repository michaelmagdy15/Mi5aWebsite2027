import Header from './Header'
import Footer from './Footer'
import NowPlaying from './NowPlaying'
import { useMagneticCursor } from '../hooks/useMagneticCursor'

export default function Layout({ children }) {
  const cursorRef = useMagneticCursor()

  return (
    <>
      {/* Global magnetic cursor glow */}
      <div className="cursor-glow" ref={cursorRef} />
      {/* Animated film grain */}
      <div className="grain-overlay" aria-hidden="true" />

      <Header />
      <main style={{ paddingTop: '80px' }}>
        {children}
      </main>
      <Footer />

      {/* Floating now-playing widget */}
      <NowPlaying />
    </>
  )
}
