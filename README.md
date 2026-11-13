# Abdullah Bin Asim — Portfolio

**AI Cloud Engineer & Full-Stack Developer**

The personal portfolio of Abdullah Bin Asim, built to present his services, projects, experience, certifications, and writing to freelance clients and employers.

**Live site:** [abdullah-asim-dev.vercel.app](https://abdullah-asim-dev.vercel.app)

[GitHub](https://github.com/abdullahasim1) · [LinkedIn](https://www.linkedin.com/in/abdullahasim1/) · [DevRox](https://thedevrox.com/) · [Email](mailto:abdullah.gc.18@gmail.com)

## Overview

This repository contains a production React and Vite portfolio with real multi-page routes, structured content, a build-time content pipeline, and Vercel deployment configuration.

The site is intentionally content-driven. Projects, services, certifications, experience, FAQs, testimonials, and related information live in structured data files instead of being hard-coded throughout the interface. Blog posts are maintained as Markdown and converted by the build pipeline into application data, static article pages, RSS, Open Graph images, and sitemap entries.

## Features

### Multi-page portfolio

The application has dedicated pages for the main sections and detail routes for projects, services, and blog articles:

| Route | Purpose |
| --- | --- |
| `/` | Home and preview hub |
| `/about` | About Abdullah |
| `/skills` | Skills and technologies |
| `/services` | Services, process, and project estimator |
| `/services/<slug>` | Individual service detail pages |
| `/projects` | Featured work and curated GitHub repositories |
| `/projects/<slug>` | Project case studies |
| `/experience` | Professional experience |
| `/certifications` | Complete certifications list |
| `/blog` | Blog index |
| `/blog/<slug>` | Static, prerendered blog articles |
| `/contact` | Contact page |

The router is a lightweight History API implementation in `src/lib/router.jsx`; it renders real links, supports browser navigation, and redirects older home-section hash links such as `/#services` to the corresponding page.

### Home preview hub

The home page introduces every major area without becoming a full one-page copy of the site. It includes:

- Hero and technology ticker
- Limited previews of About, Skills, Services, Featured Projects, Experience, Certifications, and Blog
- Full Stats, Testimonials, and FAQ sections
- A contact call-to-action band
- A shared **View All** action that navigates from each preview to its dedicated page

### AI chat widget

The site embeds Abdullah's own Business Help chat widget (`src/components/BusinessHelpWidget.jsx`), a live AI assistant configured in the Business Help dashboard:

- Loaded site-wide from `https://clone-bussiness-help.vercel.app/widget.js` with the business's public embed key
- The portfolio origin is allowlisted for the widget in the Business Help dashboard
- `vercel.json` CSP allows that origin in `script-src` and `connect-src` only

### Services and estimator

There are five service detail pages covering full-stack web development, generative AI integration, AWS cloud and serverless, AI product development, and AI and workflow automation.

The Services page also includes an interactive scope and timeline estimator. A visitor can carry the estimator result into the contact form through a `sessionStorage` handoff, which prefills the inquiry subject and message on the Contact page.

### Projects and certifications

- The Projects page presents five featured case studies and a curated set of GitHub repositories. Repository information is fetched from the public GitHub API and cached in the browser session.
- The Certifications page contains **27 certifications and training credentials**. Credential data is maintained in `src/data/certifications.js`.
- The content pipeline generates the WebP assets used for official Credly and Accredible badge artwork and for the AWS Training certificate thumbnails. Verification URLs are stored in the credential data where available.

### Blog and content generation

Blog source files live in `content/posts/` as Markdown with frontmatter. During development, testing, and production builds, `scripts/build-content.mjs` generates:

- `src/data/posts.gen.js`
- Fully static HTML pages for each article
- Per-article Open Graph images
- `public/rss.xml`
- `public/sitemap.xml`
- FAQ and Blog structured-data blocks in `index.html`
- The blog section in `public/llms-full.txt`

Do not edit `src/data/posts.gen.js` directly; it is generated from the Markdown sources.

### Interface and motion

- Light-only visual theme; the former dark-theme mechanism is intentionally disabled in the theme code
- GSAP animations for hero, reveal, stagger, and counter effects
- Lenis smooth scrolling synchronized with GSAP ScrollTrigger
- Lenis is not initialized when the visitor prefers reduced motion
- Lazy loading for page routes and an asynchronously loaded chat widget
- A keyboard-accessible **Cmd/Ctrl + K** command palette for navigation, quick actions, and featured projects
- Focus trapping in dialogs, a skip-to-content link, ARIA labels, and error boundaries around lazily loaded sections

### SEO, AEO, and GEO

The repository includes both runtime and build-time discovery support:

- Route-specific titles, descriptions, canonical URLs, Open Graph data, and Twitter card data
- Prerendered HTML shells for the main, project-detail, and service-detail routes via `scripts/prerender-shells.mjs`
- Fully static blog article pages with article metadata and `BlogPosting` structured data
- JSON-LD for `Person`, `WebSite`, `FAQPage`, `Blog`, `BlogPosting`, and featured-project `SoftwareSourceCode`
- Generated `sitemap.xml` and `rss.xml`
- Agent-readable resources including `llms.txt`, `llms-full.txt`, `index.md`, and catalogs under `public/.well-known/`

## Tech Stack

The versions below are the dependency ranges declared in `package.json`.

| Area | Technology |
| --- | --- |
| UI | React `^19.3.1`, React DOM `^19.3.1` |
| Build tool | Vite `^8.3.6`, `@vitejs/plugin-react` `^6.2.1` |
| Styling | Tailwind CSS `^4.3.4`, `@tailwindcss/vite` `^4.3.4` |
| Animation | GSAP `^3.15.1`, Lenis `^1.3.27` |
| 3D packages/components | Three.js `^0.187.0`, React Three Fiber `^9.8.2`, Drei `^10.7.9` |
| Icons | simple-icons `^16.36.0` |
| Unit testing | Vitest `^5.1.0`, Testing Library, jsdom `^31.0.0` |
| End-to-end testing | Playwright `^1.65.0` |
| Linting and types | ESLint `^10.14.0`, TypeScript `^7.0.2` |
| Content processing | Marked `^18.1.3`, Sharp `^0.35.5` |

## Project Structure

```text
abdullah-portfolio/
├── .github/workflows/       # GitHub Actions CI and Lighthouse CI
├── content/posts/           # Blog posts in Markdown
├── public/                  # Static assets, feeds, sitemap, and agent resources
├── scripts/                 # Content generation and prerendering
├── src/
│   ├── components/          # Shared UI, chat widget, palette, estimator, and 3D components
│   ├── data/                # Structured portfolio content and generated post data
│   ├── hooks/               # Scroll, viewport, focus, GitHub, and animation hooks
│   ├── lib/                 # Router, metadata, theme, and utilities
│   ├── pages/               # Route pages and detail pages
│   ├── test/                # Vitest setup
│   ├── App.jsx              # Route composition and site shell
│   ├── main.jsx             # Application entry point
│   └── index.css            # Tailwind and global styles
├── tests/e2e/               # Playwright end-to-end tests
├── package.json
├── playwright.config.ts
├── vercel.json
└── vite.config.js
```

## Getting Started

### Prerequisites

Use a Node.js version matching the `engines` field in `package.json`:

```text
^22.22.2 || ^24.15.0 || >=26.0.0
```

GitHub Actions uses Node.js 24.

### Install and run

```bash
git clone https://github.com/abdullahasim1/abdullah-portfolio.git
cd abdullah-portfolio
npm ci
npm run dev
```

`npm run dev` starts Vite. Its `predev` hook first runs the content pipeline.

For a production build and local preview:

```bash
npm run build
npm run preview
```

The `prebuild` hook runs the content pipeline, Vite creates the production bundle, and `scripts/prerender-shells.mjs` writes the route-specific HTML shells.

### Optional environment variables

Create a local `.env` file when the related integrations are needed:

```bash
VITE_WEB3FORMS_ACCESS_KEY=
VITE_ANALYTICS_DOMAIN=
```

- `VITE_WEB3FORMS_ACCESS_KEY` enables submission through Web3Forms. Without it, the contact form uses a `mailto:` fallback.
- `VITE_ANALYTICS_DOMAIN` enables the optional, environment-gated Plausible analytics integration. Without it, the analytics script is not loaded.

Never commit real access keys.

## Available Scripts

| Command | Actual script | Purpose |
| --- | --- | --- |
| `npm run dev` | `vite` | Start the Vite development server; `predev` generates content first |
| `npm run build` | `vite build && node scripts/prerender-shells.mjs` | Build the site and prerender route shells; `prebuild` generates content first |
| `npm run preview` | `vite preview` | Preview the production build |
| `npm run lint` | `eslint .` | Run ESLint across the repository |
| `npm run typecheck` | `tsc -p tsconfig.json --noEmit` | Type-check the JavaScript/JSDoc project configuration |
| `npm test` | `vitest run` | Run the Vitest suite; `pretest` generates content first |
| `npm run test:watch` | `vitest` | Run Vitest in watch mode |
| `npm run analyze` | `ANALYZE=1 vite build` | Build with bundle analysis enabled |
| `npm run prepare` | `husky` | Install Husky hooks |

There is no `e2e` npm script; Playwright is run directly as shown below.

## Testing

### Unit and integrity tests

Vitest tests are colocated under `src/` and include component tests, chat-widget embed tests, focus-trap and error-boundary tests, theme tests, home-preview tests, and data integrity tests. The integrity suite checks structured content, generated artifacts, and agreement between the router, page metadata, App route table, and sitemap sources.

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

### Playwright end-to-end tests

The Playwright suites in `tests/e2e/` cover the home page, contact page, detail routes, multi-page navigation, static blog delivery, and removed-route behavior. The configuration runs Desktop Chrome and Pixel 5 projects against the Vite preview server on port 4173.

Build first, then run:

```bash
npm run build
npx playwright test
```

## CI/CD

### GitHub Actions

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests. Using Node.js 24, each run performs:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm test`
5. `npm run build`

`.github/workflows/lighthouse.yml` runs on pushes to `main` and pull requests targeting `main`. It builds the site and runs Lighthouse CI for both the desktop and mobile configurations.

### Deployment

The site is deployed through Vercel. Pushes to `main` deploy the production site, while `vercel.json` supplies the route rewrites, redirects, security headers, caching rules, and content-type configuration used by the deployment.

## Content Maintenance

Most portfolio content can be updated without changing page components:

| Content | Source |
| --- | --- |
| Projects | `src/data/projects.js` |
| Services | `src/data/services.js` |
| Certifications | `src/data/certifications.js` |
| Experience | `src/data/experience.js` |
| FAQs | `src/data/faqs.js` |
| Testimonials | `src/data/testimonials.js` |
| Technology logos and stacks | `src/data/techLogos.js` |
| Blog articles | `content/posts/*.md` |
| Page titles and descriptions | `src/lib/pageMeta.js` |

To add a blog post, create a Markdown file in `content/posts/` with the required `title`, `description`, and `date` frontmatter fields. `tags` is supported as a comma-separated value. The next development, test, or production build regenerates the application data and all derived blog artifacts.

Changes to routes must stay consistent across `src/lib/router.jsx`, `src/lib/pageMeta.js`, `src/App.jsx`, and the sitemap generation in `scripts/build-content.mjs`; the data integrity tests are designed to catch disagreements.

## Author

**Abdullah Bin Asim**<br>
AI Cloud Engineer & Full-Stack Developer<br>
Founder, DevRox

- Website: [abdullah-asim-dev.vercel.app](https://abdullah-asim-dev.vercel.app)
- GitHub: [@abdullahasim1](https://github.com/abdullahasim1)
- LinkedIn: [linkedin.com/in/abdullahasim1](https://www.linkedin.com/in/abdullahasim1/)
- Email: [abdullah.gc.18@gmail.com](mailto:abdullah.gc.18@gmail.com)
- DevRox: [thedevrox.com](https://thedevrox.com/)
