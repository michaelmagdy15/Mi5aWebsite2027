import { useState, useEffect } from 'react'

/**
 * Fetches /site-content.json at runtime.
 * Returns { data, loading, error }
 */
export function useSiteContent() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetch('/site-content.json')
      .then(r => { if (!r.ok) throw new Error('Failed to load site-content.json'); return r.json() })
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  return { data, loading, error }
}

/**
 * Fetches /projects/catalog.json at runtime.
 * Returns { projects, featured, loading, error }
 */
export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    fetch('/projects/catalog.json')
      .then(r => { if (!r.ok) throw new Error('Failed to load catalog.json'); return r.json() })
      .then(d => {
        setProjects(d.projects || [])
        setLoading(false)
      })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  const featured = projects.filter(p => p.featured)

  return { projects, featured, loading, error }
}
