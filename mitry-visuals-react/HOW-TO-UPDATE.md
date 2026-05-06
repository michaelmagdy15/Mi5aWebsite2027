# 📚 Mitry Visuals — Content Update Guide

> **Keep this file.** It tells you exactly how to update every part of your website without touching code.

---

## 🗂️ The Two Files That Control Everything

Your website reads two JSON files at runtime. You can **FTP them directly to your server** after any change — no rebuild needed.

| File | Controls |
|------|----------|
| `public/site-content.json` | Stats, bio, skills, experience, education, availability |
| `public/projects/catalog.json` | All projects shown on Works page and homepage |

---

## ✏️ How to Update Site Content (stats, bio, experience, etc.)

### Step 1 — Open the file
```
public/site-content.json
```

### Step 2 — Edit whatever you want

**Change your stats (the animated numbers on the homepage):**
```json
"stats": [
  { "number": 4,  "suffix": "+", "label": "YRS EXP"  },
  { "number": 30, "suffix": "+", "label": "PROJECTS"  },
  { "number": 15, "suffix": "+", "label": "CLIENTS"   }
]
```

**Toggle availability (shows green dot on homepage):**
```json
"profile": {
  "available": true,
  "availabilityText": "Available for Freelance"
}
```

**Add a new experience entry:**
```json
"experience": [
  {
    "year": "2025",
    "role": "Senior Motion Designer",
    "company": "New Company Name",
    "description": "What you did there."
  },
  ... existing entries ...
]
```

**Add a new skill category:**
```json
"skills": [
  {
    "category": "3D & Cinema",
    "items": ["Cinema 4D", "Blender", "Octane Render"]
  },
  ... existing categories ...
]
```

### Step 3 — Upload it
FTP the updated `site-content.json` to the same location on your server.
Changes go live immediately — no rebuild required.

---

## 🖼️ How to Add a New Project

### Option A — Quick Edit (Edit catalog.json directly)

**Best for:** when the image is already uploaded somewhere (Instagram, etc.)

1. Open `public/projects/catalog.json`
2. Add a new entry at the top of the `projects` array:

```json
{
  "id": "my-new-project",
  "title": "MY NEW PROJECT",
  "category": "VISUAL EFFECTS",
  "description": "Short description of what this project is.",
  "link": "https://instagram.com/reel/XXXX/",
  "featured": true,
  "order": 1,
  "image": "/projects/my-new-project/cover.jpg"
}
```

3. FTP the image to: `public/projects/my-new-project/cover.jpg`
4. FTP the updated `catalog.json`

**Done.** The project appears instantly.

---

### Option B — Auto-Generated (Folder Drop + npm run catalog)

**Best for:** adding many projects at once, keeping things organised.

**Step 1** — Create a folder inside `public/projects/`:
```
public/projects/my-new-project/
```

**Step 2** — Drop your image inside and name it:
```
public/projects/my-new-project/cover.jpg
```
(Also accepts: `cover.png`, `cover.webp`, `cover.avif`)

**Step 3** — Create a `meta.json` file in the same folder:
```json
{
  "title": "MY NEW PROJECT",
  "category": "VISUAL EFFECTS",
  "description": "What this project is about.",
  "link": "https://instagram.com/reel/XXXX/",
  "featured": true,
  "order": 1
}
```

**Step 4** — Run in your terminal (from the `mitry-visuals-react` folder):
```bash
npm run catalog
```

This scans all folders and rewrites `public/projects/catalog.json` automatically.

**Step 5** — FTP the following to your server:
- `public/projects/my-new-project/cover.jpg`
- `public/projects/catalog.json` (the regenerated one)

---

## 📋 Project Fields Reference

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ | Unique slug (no spaces, use dashes) |
| `title` | ✅ | Project title (shown in all caps) |
| `category` | ✅ | Category for filtering (see list below) |
| `description` | ❌ | Short description shown on hover |
| `link` | ❌ | URL when card is clicked. Use `"#"` if none |
| `featured` | ❌ | `true` = shows on homepage bento grid |
| `order` | ❌ | Lower = appears first. Default: 99 |
| `image` | ✅ (Option A) | Image path from site root |

**Available categories:**
- `VISUAL EFFECTS`
- `VISUAL EFFECTS + AI`
- `WEB DESIGN`
- `PHOTO EDITING`
- `MOTION DESIGN`
- `PHOTOGRAPHY`

---

## 🚀 How to Deploy to Google Cloud Run

### Prerequisites
- Google Cloud SDK installed (`gcloud` command)
- Docker installed
- A GCP project created

### Step 1 — Build the project
```bash
cd mitry-visuals-react
npm run build
```

### Step 2 — Build & push Docker image
```bash
# Replace YOUR_PROJECT_ID with your GCP project ID
# Replace mitry-visuals with your preferred image name

gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/mitry-visuals
```

### Step 3 — Deploy to Cloud Run
```bash
gcloud run deploy mitry-visuals \
  --image gcr.io/YOUR_PROJECT_ID/mitry-visuals \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

### Step 4 — Done!
Cloud Run will give you a URL like:
`https://mitry-visuals-xxxx-uc.a.run.app`

### 🔄 To redeploy after code changes
Just repeat Steps 1–3. Cloud Run keeps the old version live until the new one is ready.

---

## 💡 Pro Tips

**To update content without redeploying:**
1. Edit `public/site-content.json` or `public/projects/catalog.json` locally
2. FTP those files to your server's static folder
3. Changes go live immediately (JSON is not cached)

**To add a profile photo:**
- Replace `/public/images/pp.png` with your new photo (keep the same filename)
- Or update `"heroImage"` in `site-content.json` to point to a new path

**To change your email/contact form:**
- Update `"contact"` section in `site-content.json`

**To mark yourself as unavailable:**
```json
"available": false,
"availabilityText": "Currently Booked"
```

---

## 📁 Project Structure Quick Reference

```
mitry-visuals-react/
├── public/
│   ├── site-content.json     ← Edit this to update ALL site content
│   ├── projects/
│   │   ├── catalog.json      ← Edit this to update projects
│   │   └── my-project/       ← New project folders go here
│   │       ├── cover.jpg
│   │       └── meta.json
│   └── images/               ← Existing images
├── src/                      ← React source code (don't touch unless coding)
├── Dockerfile                ← For Google Cloud Run deployment
├── nginx.conf                ← Web server config
└── HOW-TO-UPDATE.md          ← This file!
```
