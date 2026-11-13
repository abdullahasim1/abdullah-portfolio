import React, { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import TechTicker from "./components/TechTicker";
import CtaBand from "./components/CtaBand";
import ScrollToTop from "./components/ScrollToTop";
import BusinessHelpWidget from "./components/BusinessHelpWidget";
import CommandPalette from "./components/CommandPalette";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import SplashScreen from "./components/SplashScreen";
import { IS_LOW_END } from "./lib/device";
import { RouterProvider, useRoute, scrollTopNow, consumePendingSection, redirectHashToPage, Link } from "./lib/router";
import { applyPageMeta, metaForPath } from "./lib/pageMeta";
import { getFeaturedBySlug } from "./data/projects";
import { getService } from "./data/services";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Splash EAGER import hai (lazy nahi): ye sirf CSS/SVG hai, three is
   mein nahi. Lazy hone par pehle portfolio flash hota tha, phir splash
   aata tha — ab pehli paint se hi splash nazar aata hai. */

/* Pages lazy load — har route apna chunk */
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Stats = lazy(() => import("./pages/Stats"));
const ProjectsPage = lazy(() =>
  import("./pages/Projects").then((m) => ({ default: m.ProjectsPage })),
);
const FeaturedWork = lazy(() =>
  import("./pages/Projects").then((m) => ({ default: m.FeaturedWork })),
);
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Process = lazy(() => import("./pages/Process"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Faq = lazy(() => import("./pages/Faq"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
function NotFound() {
  useEffect(() => {
    applyPageMeta({
      title: "Page Not Found — Abdullah Bin Asim",
      description: "The page you are looking for does not exist.",
      path: "/404",
    });
  }, []);
  return (
    <section className="relative overflow-hidden py-36">
      <div
        aria-hidden
        className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10"
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <p className="font-display text-[92px] font-extrabold leading-none text-transparent sm:text-[120px]"
          style={{ WebkitTextStroke: "2px rgba(124,58,237,0.45)" }}>
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-slate-900 dark:text-white">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          The link may be broken or the page moved. Let&apos;s get you back
          to the good stuff.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-violet-300 bg-white px-6 py-3 text-sm font-semibold text-violet-600 transition-colors hover:bg-violet-50 dark:border-white/15 dark:bg-white/5 dark:text-violet-300 dark:hover:bg-white/10"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Multi-page structure (Abdullah ka faisla, 2026-11-12): har section
   ka apna asal page hai — /, /about, /skills, /services, /projects,
   /experience, /certifications, /blog, /contact — aur DETAIL pages
   pehle ki tarah: /projects/<slug> case studies, /services/<slug>,
   /blog/<slug> static posts. Purani hash links (/#services waghera)
   home par land hon to router ka redirectHashToPage unhein asal page
   par bhej deta hai. */

function Section({ children }) {
  return (
    <Suspense fallback={<div className="py-20" />}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
}

/* Home = preview hub (Abdullah ka design, 2026-11-12): har section
   home par THORA sa nazar aata hai aur us ka "View All" button asal
   page par le jata hai. Order purani one-pager wala hi hai: Hero,
   About, Skills, Services, Stats, Projects, Experience,
   Certifications, Blog, Testimonials, FAQ, CTA. Stats/Testimonials/
   FAQ ke apne pages nahi — ye poore home par hi rehte hain. */
function HomePage({ introDone }) {
  return (
    <>
      <Home introDone={introDone} />
      <TechTicker />
      <Section>
        <About preview />
      </Section>
      <Section>
        <Skills preview />
      </Section>
      <Section>
        <Services preview />
      </Section>
      <Section>
        <Stats />
      </Section>
      <Section>
        <FeaturedWork preview />
      </Section>
      <Section>
        <Experience preview />
      </Section>
      <Section>
        <Certifications preview />
      </Section>
      <Section>
        <Blog preview />
      </Section>
      <Section>
        <Testimonials />
      </Section>
      <Section>
        <Faq />
      </Section>
      <CtaBand />
    </>
  );
}

/* Standalone section pages: fixed navbar ke neeche jagah ke liye
   upar padding — sections apni py-16 waisi ki waisi rakhti hain. */
function SectionPage({ children }) {
  return <div className="pt-20 sm:pt-24">{children}</div>;
}

function RouteView({ introDone }) {
  const { path } = useRoute();
  const seg = path.split("/").filter(Boolean);

  /* Route change: meta apply + (pending section scroll ya top) +
     ScrollTrigger refresh taake naye page ke reveals sahi chalen.
     Splash chal raha ho to scroll defer hota hai — introDone true
     hote hi yehi effect dobara chal kar consume kar leta hai. */
  useEffect(() => {
    if (path === "/" && redirectHashToPage()) return;
    const meta = metaForPath(path);
    if (meta) applyPageMeta({ ...meta, path });
    if (introDone) {
      if (!consumePendingSection()) scrollTopNow();
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, [path, introDone]);

  const page = (node) => (
    <Suspense fallback={<div className="py-40" />}>
      <ErrorBoundary>{node}</ErrorBoundary>
    </Suspense>
  );

  if (seg.length === 0) return <HomePage introDone={introDone} />;

  const [head, tail] = seg;
  if (seg.length === 1) {
    switch (head) {
      case "about":
        return page(
          <SectionPage>
            <About />
          </SectionPage>,
        );
      case "skills":
        return page(
          <SectionPage>
            <Skills />
          </SectionPage>,
        );
      case "services":
        return page(
          <SectionPage>
            <Services />
            <Process />
          </SectionPage>,
        );
      case "projects":
        return page(<ProjectsPage />);
      case "experience":
        return page(
          <SectionPage>
            <Experience />
          </SectionPage>,
        );
      case "certifications":
        return page(
          <SectionPage>
            <Certifications showAll />
          </SectionPage>,
        );
      case "blog":
        return page(
          <SectionPage>
            <Blog />
          </SectionPage>,
        );
      case "contact":
        return page(
          <SectionPage>
            <Contact />
          </SectionPage>,
        );
      default:
        break;
    }
  }

  if (head === "projects" && seg.length === 2 && getFeaturedBySlug(tail))
    return page(<ProjectCaseStudy slug={tail} />);
  if (head === "services" && seg.length === 2 && getService(tail))
    return page(<ServiceDetail slug={tail} />);
  return <NotFound />;
}

function Site() {
  // Splash har session mein sirf ek dafa (refresh pe skip hota hai).
  // Low-end/touch devices par splash bilkul mount nahi hota — warna
  // three/r3f chunks mobile par load ho jaate hain (perf hit).
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return true;
    if (IS_LOW_END) return true;
    return sessionStorage.getItem("aa-splash-seen") === "1";
  });

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  /* Purani hash wali blog links (#blog/<slug>) asal page par bhejo */
  useEffect(() => {
    const match = window.location.hash.match(/^#\/?blog\/(.+)$/);
    if (match) window.location.replace(`/blog/${match[1]}`);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    const onOpenPalette = () => setIsPaletteOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("aa-open-palette", onOpenPalette);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("aa-open-palette", onOpenPalette);
    };
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem("aa-splash-seen", "1");
    setIntroDone(true);
  };

  /* Splash ke doran page scroll lock — peeche ki site hilti nahi,
     reveals apne sahi waqt par hi chalte hain. */
  useEffect(() => {
    if (introDone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introDone]);

  /* Splash khatam hone par pending section / scroll ka kaam
     RouteView ka effect (introDone dependency ke sath) khud kar
     leta hai — yahan alag se kuch nahi karna. */

  return (
    <div className="relative min-h-screen bg-void text-slate-200 overflow-x-clip light:bg-[#F8FAFF] light:text-slate-900">
      {/* Skip to content (keyboard users) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-xl focus:bg-cyan-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Top progress bar */}
      <ScrollProgress />

      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 light:opacity-60">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-cyan-500/[0.07] blur-[120px] light:bg-cyan-500/[0.05]" />
        <div className="absolute top-1/3 -right-48 h-[520px] w-[520px] rounded-full bg-violet-600/[0.08] blur-[130px] light:bg-violet-600/[0.05]" />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-indigo-500/[0.06] blur-[120px] light:bg-indigo-500/[0.04]" />
        {/* Subtle dot matrix texture */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(148,163,184,0.055) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 focus:outline-none"
      >
        <RouteView introDone={introDone} />
      </main>

      <Footer />
      <ScrollToTop />
      <BusinessHelpWidget />
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />

      {/* Intro splash — site ke upar render hota hai, pehli paint se */}
      {!introDone && <SplashScreen onFinish={handleSplashFinish} />}
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <Site />
    </RouterProvider>
  );
}

export default App;
