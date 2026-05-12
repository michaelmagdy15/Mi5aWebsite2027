import './NowPlaying.css'

const BARS = [3, 5, 4, 7, 3, 6, 4, 5, 7, 3, 5, 4]

export default function NowPlaying() {
  return (
    <div className="now-playing">
      <div className="np-bars">
        {BARS.map((h, i) => (
          <div key={i} className="np-bar" style={{ '--mh': `${h * 3}px`, '--i': i }} />
        ))}
      </div>
      <div className="np-text">
        <span className="np-label">NOW PLAYING</span>
        <span className="np-name">MITRY VISUALS</span>
      </div>
    </div>
  )
}
