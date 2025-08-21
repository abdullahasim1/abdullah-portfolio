# Abdullah Bin Asim — Portfolio

A modern, animated portfolio built with React 19, Vite 7, Tailwind CSS v4, and GSAP. It showcases projects, skills, services, animated stats, and a polished contact section with micro‑interactions.

Live demo: add your URL here

## ✨ Features

- Modern UI/UX with rich micro‑interactions
  - Gradient text with flipping words (WordFlipper)
  - Split and stagger text reveals (GSAP)
  - 3D‑tilt glow cards with spotlight follow (GlowCard)
  - Magnetic call‑to‑action button with sheen effect (MagneticButton)
  - Cursor follower overlay that scales on interactive elements
  - Particle background and floating decorative icons
  - Scroll progress indicator and quick scroll‑to‑top
- Sections you’ll find
  - Home (headline + animated role)
  - About (strengths with reveal effects)
  - Services (grid + CTA: “Let’s Discuss Your Project”)
  - Stats (Achievements — Numbers That Speak with counting animation)
  - Projects (Featured + additional with flip animation)
  - Skills (category bars)
  - Process, Testimonials, Contact (animated list + form)

## 🛠 Tech Stack

- React `^19.1.1`
- Vite `^7.1.2`
- Tailwind CSS `^4.1.12`
- GSAP `^3.13.0`
- ESLint 9

## 📁 Project Structure

```
abdullah-portfolio/
  public/
  src/
    components/
      CursorFollower.jsx      # Cursor overlay (respects prefers-reduced-motion)
      ParticleEffect.jsx      # Canvas particles with parallax + shooting stars
      FloatingIcons.jsx       # Decorative floating background icons
      ScrollProgress.jsx      # Top progress bar on scroll
      ScrollToTop.jsx         # Floating FAB to jump to top
      SplitTextAnimation.jsx  # GSAP split text reveal
      FlipAnimation.jsx       # Container for flip-in animations
      WordFlipper.jsx         # Animated word flipper (gradient-ready)
      GlowCard.jsx            # 3D tilt, spotlight gradient card
      MagneticButton.jsx      # Magnetic hover + sheen CTA
    hooks/
      useCounterAnimation.js  # Count-up on enter using ScrollTrigger
      useScrollReveal.js      # Reveal elements as they enter viewport
      useStaggerAnimation.js  # Stagger children inside a container
      useTextReveal.js        # Headline text reveal helper
    pages/
      Home.jsx About.jsx Services.jsx Stats.jsx Projects.jsx
      Skills.jsx Process.jsx Testimonials.jsx Contact.jsx
    index.css                 # Tailwind + custom keyframes (glowPulse, floatY, sheen)
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

## 🧩 Components & Usage

### WordFlipper
Animated rotating words with gradient support.

Props: `words`, `intervalMs`, `initialDelayMs`, `className`, `textClassName`

```jsx
<WordFlipper
  words={["UI/UX Expert", "Developer", "Hacker"]}
  intervalMs={2500}
  initialDelayMs={1200}
  textClassName="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500"
/>
```

### GlowCard
3D‑tilt card with spotlight following the cursor and subtle glow pulse.

```jsx
<GlowCard>
  <div className="p-6">Your content</div>
</GlowCard>
```

### MagneticButton
Magnet hover effect + sheen, with smooth in‑page anchor scrolling.

```jsx
<MagneticButton href="#contact">Let’s Discuss Your Project</MagneticButton>
```

### CursorFollower
Renders an overlay div that follows the cursor. Elements with `data-cursor="hover"` make it enlarge.

```html
<button data-cursor="hover">Hover me</button>
``;

### ParticleEffect
Fixed canvas background with layered parallax particles and occasional shooting stars. Automatically resizes.

## 🧪 GSAP Hooks

- `useCounterAnimation(target, duration, delay)` — counts up to `target` on enter
- `useScrollReveal(selector, options)` — reveals matching elements on enter
- `useStaggerAnimation(stagger, delay)` — staggers children with `[data-stagger]`
- `useTextReveal(type, delay)` — reveals headline words/lines

## 🎨 Custom Animations

Defined in `src/index.css`:

- `glowPulse` — soft card glow
- `floatY` — gentle vertical float for icons
- `sheen` — sweeping highlight on buttons

## 📣 Highlights (Stats)

- 🎯 3+ Years Experience
- 🚀 25+ Projects Done
- ⚡ 15+ Technologies
- 💯 100% Client Satisfaction

## 📬 Contact

- Email: `abdullah.gc.18@gmail.com`
- LinkedIn: add your profile URL
- GitHub: `https://github.com/abdullahasim1`

## 📝 Notes

- The app uses Tailwind CSS v4 (via `@tailwindcss/vite`) and GSAP 3.
- The cursor follower respects `prefers-reduced-motion`.
- For gradient text with `WordFlipper`, pass classes via `textClassName`.

