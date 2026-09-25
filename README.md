# Abdullah Bin Asim — Portfolio

A modern, animated portfolio built with React 19, Vite 7, Tailwind CSS v4, GSAP, and Three.js (R3F). It showcases projects, skills, services, certifications, animated stats, and a polished contact section with micro-interactions.

Live demo: https://abdullah-asim-dev.vercel.app

## ✨ Features

- Modern UI/UX with rich micro-interactions
  - Gradient text with flipping words (WordFlipper)
  - Split and stagger text reveals (GSAP)
  - 3D-tilt glow cards with spotlight follow (GlowCard, TiltCard, TiltIcon)
  - Magnetic call-to-action button with sheen effect (MagneticButton)
  - Cursor follower overlay that scales on interactive elements
  - 3D hero scene with procedural laptop, glass orbs, and stars (Three.js/R3F)
  - Scroll progress indicator and quick scroll-to-top
  - Command palette (Ctrl/Cmd+K) with keyboard navigation
  - Interactive project scope & timeline estimator
  - Light/dark theme toggle with sound effects
- Sections
  - Home (headline + animated role + 3D laptop scene)
  - About (strengths with reveal effects)
  - Services (grid + scope estimator + CTA)
  - Stats (Achievements — Numbers That Speak with counting animation)
  - Projects (Featured + live GitHub repos with language filters)
  - Skills (category bars), Process, Testimonials
  - Blog (markdown posts → cards + reader overlay, `/blog/<slug>` deep links)
  - Certifications (3D flip cards + featured AWS Professional)
  - FAQ, Contact (animated form + 3D paper plane)
- Performance & accessibility
  - Low-end device detection skips all 3D (device.js `IS_LOW_END`)
  - Viewport-gated frameloops + DPR clamping on every canvas
  - rAF-throttled mouse handlers
  - `prefers-reduced-motion` respected across animations
  - Skip-to-content link, ARIA labels, focus-visible rings
  - Focus trap in dialogs (ProjectModal, CommandPalette) + focus restore
  - Per-section ErrorBoundary (failed lazy chunk → retry, not blank page)
  - Images served as WebP (projects, certifications), compressed OG/JPEG
- Quality
  - Vitest + Testing Library (`npm test`) — data integrity, theme, focus trap, error boundary
  - TypeScript check on JS via `// @ts-check` JSDoc (`npm run typecheck`)
  - ESLint + Husky pre-commit (lint-staged + typecheck) + Dependabot
  - CI: lint → typecheck → test → build; Lighthouse CI budget
- Blog pipeline
  - `content/posts/*.md` → `src/data/posts.gen.js` + `public/rss.xml` + auto-`sitemap.xml`
  - Per-post SEO meta injected for `/blog/<slug>` (canonical, OG, BlogPosting JSON-LD)
- SEO / GEO
  - JSON-LD: Person (sameAs), WebSite, FAQPage, SoftwareSourceCode, BlogPosting
  - Open Graph + Twitter cards, canonical, sitemap (auto lastmod), RSS
  - Agent layer: `llms.txt`, `index.md` (markdown middleware), `.well-known/` catalogs
  - PWA: service worker (stale-while-revalidate) + web manifest
  - Optional privacy-friendly analytics (Plausible via `VITE_ANALYTICS_DOMAIN`)

## 🛠 Tech Stack

- React `^19.1.1`, Vite `^7.1.2`
- Tailwind CSS `^4.1.12` (via `@tailwindcss/vite`)
- GSAP `^3.13.0`, Lenis (smooth scroll)
- Three.js `^0.185.1`, `@react-three/fiber`, `@react-three/drei`
- simple-icons, ESLint 9

## 📁 Project Structure

```
abdullah-portfolio/
  content/posts/           # Blog posts (markdown + frontmatter)
  scripts/
    build-content.mjs      # prebuild: posts → data module, RSS, sitemap, head meta
  public/
    sw.js                    # Service worker (SWR for hashed assets, network-first HTML)
    manifest.webmanifest     # PWA manifest
    llms.txt, llms-full.txt  # AI agent docs
    rss.xml, sitemap.xml     # generated at build
    .well-known/             # Agent catalogs (api-catalog, ai-catalog, skills)
  middleware.js               # Vercel edge — serves markdown to AI agents
  src/
    components/
      CommandPalette.jsx     # Ctrl+K palette with fuzzy filter + focus trap
      CursorFollower.jsx     # Cursor overlay (respects prefers-reduced-motion)
      ErrorBoundary.jsx      # Per-section retry UI for failed lazy chunks
      GlowCard.jsx           # 3D tilt, spotlight gradient card
      MagneticButton.jsx     # Magnetic hover + sheen CTA
      TiltCard/TiltIcon.jsx  # 3D tilt wrappers (rAF-throttled)
      WordFlipper.jsx         # Animated word flipper (gradient-ready)
      ProjectEstimator.jsx   # Interactive scope/timeline calculator
      ProjectModal.jsx       # Case-study modal (GSAP)
      Navbar.jsx, Footer.jsx, SplashScreen.jsx, TechTicker.jsx …
      three/                 # R3F components (HeroScene, Laptop, SiteBackground,
                             #   PaperPlane, HoloOrb, FooterPlanet, FooterMiniCore)
    hooks/
      useFocusTrap.js        # Tab-trapping + focus restore for dialogs
      useCounterAnimation.js # Count-up on enter using ScrollTrigger
      useScrollReveal.js     # Reveal elements as they enter viewport
      useStaggerAnimation.js # Stagger children with [data-stagger]
      useInViewport.js       # Viewport observer (gates 3D frameloops)
      useGithubRepos.js      # GitHub API with session cache + abort
      useRafThrottle.js       # Shared rAF throttle for mouse handlers
    lib/
      device.js               # IS_LOW_END detection (cores/memory/pointer/width)
      smoothScroll.js        # Lenis singleton + scrollToSection
      analytics.js           # Optional Plausible (env-gated)
      theme.js, sound.js, scrollState.js
    data/
      projects.js, certifications.js, experience.js,
      testimonials.js, techLogos.js, posts.gen.js (generated)
    pages/
      Home.jsx About.jsx Services.jsx Stats.jsx Projects.jsx Skills.jsx
      Blog.jsx Process.jsx Testimonials.jsx Certifications.jsx Faq.jsx Contact.jsx
    webmcp.js                # WebMCP tools for AI agents (navigator.modelContext)
    index.css                # Tailwind v4 + theme tokens + custom keyframes
    App.jsx main.jsx
```

## 🚀 Getting Started

Prerequisites: Node.js 18+

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

Available scripts:

- `npm run dev` — start Vite dev server (pehle content pipeline chalti hai)
- `npm run build` — content generation + production build
- `npm test` / `npm run test:watch` — Vitest suite
- `npm run lint` — ESLint
- `npm run typecheck` — tsc (`// @ts-check` JSDoc files)
- `npm run analyze` — bundle report (`stats.html`)

## 🔐 Environment

Create a `.env` with:

```
VITE_WEB3FORMS_ACCESS_KEY=your-key-from-web3forms
VITE_ANALYTICS_DOMAIN=optional-plausible-domain
```

Key absent ho to contact form `mailto:` fallback use karta hai; analytics domain
khaali ho to koi tracking script load nahi hota.

## ✍️ Adding a blog post

1. `content/posts/my-post.md` banao with frontmatter:

```md
---
title: My post title
description: One-line summary (used in cards, OG, RSS).
date: 2026-09-25
tags: React, Performance
---

Markdown body…
```

2. `npm run dev` (ya build) — `posts.gen.js`, `rss.xml`, `sitemap.xml` aur
   index.html ka meta block auto-update ho jate hain.

## 📣 Highlights (Stats)

- 🎯 3+ Years Experience
- 🚀 25+ Projects Shipped
- 🏆 8+ Certifications
- ⚡ 15+ Technologies

## 📬 Contact

- Email: `abdullah.gc.18@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/abdullahasim1/`
- GitHub: `https://github.com/abdullahasim1`

## 📝 Notes

- Tailwind CSS v4 (via `@tailwindcss/vite`) and GSAP 3 are used together; Lenis handles smooth scroll and is disabled for `prefers-reduced-motion` users.
- The service worker only registers in production builds.
- For gradient text with `WordFlipper`, pass classes via `textClassName`.
