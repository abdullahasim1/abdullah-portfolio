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
  - Certifications (3D flip cards + featured AWS Professional)
  - FAQ, Contact (animated form + 3D paper plane)
- Performance & accessibility
  - Low-end device detection skips all 3D (device.js `IS_LOW_END`)
  - Viewport-gated frameloops + DPR clamping on every canvas
  - rAF-throttled mouse handlers
  - `prefers-reduced-motion` respected across animations
  - Skip-to-content link, ARIA labels, focus-visible rings
- SEO / GEO
  - JSON-LD: Person, WebSite, FAQPage, SoftwareSourceCode
  - Open Graph + Twitter cards, canonical, sitemap
  - Agent layer: `llms.txt`, `index.md` (markdown middleware), `.well-known/` catalogs
  - PWA: service worker (stale-while-revalidate) + web manifest

## 🛠 Tech Stack

- React `^19.1.1`, Vite `^7.1.2`
- Tailwind CSS `^4.1.12` (via `@tailwindcss/vite`)
- GSAP `^3.13.0`, Lenis (smooth scroll)
- Three.js `^0.185.1`, `@react-three/fiber`, `@react-three/drei`
- simple-icons, ESLint 9

## 📁 Project Structure

```
abdullah-portfolio/
  public/
    sw.js                    # Service worker (SWR for hashed assets, network-first HTML)
    manifest.webmanifest     # PWA manifest
    llms.txt, llms-full.txt  # AI agent docs
    .well-known/             # Agent catalogs (api-catalog, ai-catalog, skills)
  middleware.js               # Vercel edge — serves markdown to AI agents
  src/
    components/
      CommandPalette.jsx     # Ctrl+K palette with fuzzy filter
      CursorFollower.jsx     # Cursor overlay (respects prefers-reduced-motion)
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
      useCounterAnimation.js # Count-up on enter using ScrollTrigger
      useScrollReveal.js     # Reveal elements as they enter viewport
      useStaggerAnimation.js # Stagger children with [data-stagger]
      useInViewport.js       # Viewport observer (gates 3D frameloops)
      useGithubRepos.js      # GitHub API with session cache + abort
      useRafThrottle.js       # Shared rAF throttle for mouse handlers
    lib/
      device.js               # IS_LOW_END detection (cores/memory/pointer/width)
      smoothScroll.js        # Lenis singleton + scrollToSection
      theme.js, sound.js, scrollState.js
    data/
      projects.js, certifications.js, experience.js,
      testimonials.js, techLogos.js
    pages/
      Home.jsx About.jsx Services.jsx Stats.jsx Projects.jsx Skills.jsx
      Process.jsx Testimonials.jsx Certifications.jsx Faq.jsx Contact.jsx
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

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the build locally
- `npm run lint` — run ESLint

## 🔐 Environment

Create a `.env` with:

```
VITE_WEB3FORMS_ACCESS_KEY=your-key-from-web3forms
```

Key absent ho to contact form `mailto:` fallback use karta hai.

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
