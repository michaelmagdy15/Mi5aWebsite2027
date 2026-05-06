/**
 * catalog.js — Mitry Visuals project catalog generator
 *
 * Usage: npm run catalog
 *
 * Scans public/projects/ for folders containing meta.json.
 * Writes public/projects/catalog.json with all project data.
 *
 * Each project folder should contain:
 *   cover.jpg   — project thumbnail (or cover.png / cover.webp)
 *   meta.json   — project metadata (see schema below)
 *
 * meta.json schema:
 * {
 *   "title":       "Project Title",
 *   "category":    "VISUAL EFFECTS",
 *   "description": "Short description of the project.",
 *   "link":        "https://instagram.com/reel/xxx",   // optional
 *   "order":       1,                                  // lower = appears first
 *   "featured":    true                                // show on homepage?
 * }
 */

import { readdirSync, existsSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECTS_DIR = join(__dirname, '..', 'public', 'projects')
const CATALOG_PATH = join(PROJECTS_DIR, 'catalog.json')
const COVER_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

if (!existsSync(PROJECTS_DIR)) {
  console.error('❌  public/projects/ directory not found.')
  process.exit(1)
}

// Load existing catalog to preserve manually-added projects
let existingProjects = []
if (existsSync(CATALOG_PATH)) {
  try {
    const existing = JSON.parse(readFileSync(CATALOG_PATH, 'utf-8'))
    existingProjects = existing.projects || []
  } catch {
    // ignore parse errors
  }
}

const discoveredProjects = []

const entries = readdirSync(PROJECTS_DIR)
for (const entry of entries) {
  const entryPath = join(PROJECTS_DIR, entry)
  if (!statSync(entryPath).isDirectory()) continue
  if (entry === 'images') continue // legacy image folder, skip

  const metaPath = join(entryPath, 'meta.json')
  if (!existsSync(metaPath)) {
    console.warn(`⚠️   Skipping "${entry}" — no meta.json found`)
    continue
  }

  let meta
  try {
    meta = JSON.parse(readFileSync(metaPath, 'utf-8'))
  } catch (e) {
    console.warn(`⚠️   Skipping "${entry}" — invalid meta.json: ${e.message}`)
    continue
  }

  // Find cover image
  let cover = null
  for (const ext of COVER_EXTS) {
    const candidate = join(entryPath, `cover${ext}`)
    if (existsSync(candidate)) {
      cover = `/projects/${entry}/cover${ext}`
      break
    }
  }
  if (!cover) {
    console.warn(`⚠️   Skipping "${entry}" — no cover image found (expected cover.jpg/png/webp)`)
    continue
  }

  discoveredProjects.push({
    id:          entry,
    title:       meta.title       || entry,
    category:    meta.category    || 'UNCATEGORIZED',
    description: meta.description || '',
    link:        meta.link        || '#',
    featured:    meta.featured    ?? false,
    order:       meta.order       ?? 99,
    image:       cover,
  })
}

// Merge: discovered projects override existing ones with same id
// Existing manual projects that aren't in a folder are preserved
const discoveredIds = new Set(discoveredProjects.map(p => p.id))
const manualProjects = existingProjects.filter(p => !discoveredIds.has(p.id))
const allProjects = [...discoveredProjects, ...manualProjects]

// Sort by order field
allProjects.sort((a, b) => a.order - b.order)

const catalog = {
  generated: new Date().toISOString(),
  count:     allProjects.length,
  projects:  allProjects,
}

writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2))
console.log(`\n✅  Catalog generated: ${allProjects.length} project(s) total`)
console.log(`   (${discoveredProjects.length} from folders + ${manualProjects.length} manual entries)`)
console.log(`   → public/projects/catalog.json\n`)
allProjects.forEach(p => console.log(`   [${p.featured ? '★' : ' '}] ${p.title} (${p.category})`))
