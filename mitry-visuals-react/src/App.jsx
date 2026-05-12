import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import './index.css'

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  return (
    <BrowserRouter>
      {!loaded && <Preloader onDone={handleDone} />}
      {loaded && <AppRoutes />}
    </BrowserRouter>
  )
}
