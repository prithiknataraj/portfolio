# Portfolio Website

A multi-page **Software Developer** portfolio for freshers. Premium dark theme and recruiter-ready structure. Deploy free on [GitHub Pages](https://pages.github.com/).

**Positioning:** You are a **software developer** who uses **AI tools** (Cursor, Copilot, ChatGPT) to build faster — not an ML/AI engineer who builds models.

## Priority Model

| Priority | Page | What goes here |
|----------|------|----------------|
| **High** | `index.html` (Home) | 30-sec scan: hero, short about, CGPA one-liner, **top 3 projects**, **1 top award**, core skills, contact |
| **Secondary** | All other pages | Full lists — everything not on home |

**Rule:** If it's not your best work, it does **not** go on Home — add it to the matching secondary page.

## Site Structure

| Page | URL | What to put here |
|------|-----|------------------|
| **Home** | `index.html` | Top 3 projects, 1 achievement, CGPA summary, skills row, links to dig deeper |
| **Education** | `education.html` | 10th, 12th, college %, CGPA, marksheet PDFs |
| **Projects** | `projects.html` | **All** other projects — academic, personal, internship |
| **Hackathons** | `hackathons.html` | **Full** hackathon history |
| **Achievements** | `achievements.html` | **All** awards, certs, workshops |
| **Gallery** | `gallery.html` | Photos (lowest priority) |
| **Contact** | `contact.html` | Email, GitHub, resume, recruiter quick info |

## Folder Structure

```
portfolio/
├── index.html
├── education.html
├── projects.html
├── hackathons.html
├── achievements.html
├── gallery.html
├── contact.html
├── css/style.css
├── js/
│   ├── layout.js      # Shared nav & footer
│   ├── main.js        # Scroll, reveal, copy email
│   ├── home.js        # Home-only animations
│   ├── filter.js      # Project & gallery filters
│   └── gallery.js     # Image lightbox
├── assets/
│   ├── images/gallery/    # Event photos
│   ├── marksheets/        # 10th, 12th, college PDFs
│   ├── certificates/      # Award & cert PDFs
│   └── resume/            # Resume PDF
└── .github/workflows/pages.yml
```

## What Companies Expect (Fresher Checklist)

- [ ] Resume PDF downloadable from every page (nav button)
- [ ] 10th & 12th marks + college CGPA/percentage
- [ ] Marksheet PDFs (or "available on request")
- [ ] 5–15 projects with GitHub/demo links
- [ ] Hackathon history with your role and outcome
- [ ] Certificates with verify links where possible
- [ ] Professional email + GitHub
- [ ] 1 profile photo (optional gallery for events)

## Customize (priority order)

1. **Resume** → `assets/resume/Prithik_Nataraj_Resume.pdf`
2. **Education** → real marks in `education.html` + PDFs in `assets/marksheets/`
3. **Projects** → duplicate `.project-card` blocks in `projects.html`
4. **Hackathons** → duplicate `.hackathon-card` in `hackathons.html`
5. **Achievements** → awards + certs in `achievements.html` + PDFs in `assets/certificates/`
6. **Gallery** → add images to `assets/images/gallery/` and update `gallery.html`
7. **Contact** → your email and GitHub in `contact.html` and `js/layout.js` is not needed — only HTML

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Multi-page fresher portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

**Settings → Pages → Source: GitHub Actions**

Live at: `https://YOUR_USERNAME.github.io/portfolio/`

## Local Preview

```bash
python3 -m http.server 8000
```

Visit [http://localhost:8000](http://localhost:8000)
