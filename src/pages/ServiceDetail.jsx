import React, { useEffect } from "react";
import { getServiceBySlug } from "../data/services";
import { featuredProjects, projectSlug } from "../data/projects";
import { applyPageMeta } from "../lib/pageMeta";
import { Link } from "../lib/router";
import { useScrollReveal } from "../hooks";

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-violet-600"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M21 12H3" />
    </svg>
  );
}

/* /services/<slug> — SEO landing page. Copy data/services.js se aati
   hai (wahi data home cards aur sitemap use karte hain), is liye drift
   nahi hoti. */
export default function ServiceDetail({ slug }) {
  const service = getServiceBySlug(slug);

  useScrollReveal("#service-detail .reveal");

  useEffect(() => {
    if (!service) return;
    applyPageMeta({
      title: `${service.title} — Abdullah Bin Asim`,
      description: `${service.short} Freelance service by Abdullah Bin Asim, AI Cloud Engineer in Lahore, Pakistan.`,
      path: `/services/${service.slug}`,
      type: "article",
    });
  }, [service]);

  if (!service) return null;

  const related = (service.related || [])
    .map((repoName) => featuredProjects.find((p) => p.repoName === repoName))
    .filter(Boolean);

  return (
    <div id="service-detail">
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-28">
        <div
          aria-hidden
          className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-violet-700">
              Home
            </Link>
            <span aria-hidden className="mx-2 text-slate-300">
              /
            </span>
            <Link href="/#services" className="hover:text-violet-700">
              Services
            </Link>
            <span aria-hidden className="mx-2 text-slate-300">
              /
            </span>
            <span className="text-slate-700">{service.title}</span>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-700">
                Service
              </span>
              <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-slate-700">
                {service.intro}
              </p>
              <p className="mt-4 max-w-2xl rounded-2xl border border-violet-100 bg-white px-5 py-4 text-[15px] leading-relaxed text-slate-600">
                <strong className="font-semibold text-slate-900">Best for: </strong>
                {service.idealFor}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-opacity hover:opacity-90"
                >
                  Start a project
                  <ArrowIcon />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-3.5 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-50"
                >
                  See case studies
                </Link>
              </div>
            </div>

            <aside className="reveal rounded-[1.8rem] border border-violet-100 bg-white p-6 shadow-[0_18px_44px_-24px_rgba(124,58,237,0.28)]">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Tools &amp; stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full bg-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-violet-100 pt-5 text-sm leading-relaxed text-slate-600">
                <p className="font-semibold text-slate-900">Working directly with the engineer</p>
                <p className="mt-1.5">
                  No account managers or handoffs — you talk to the person writing
                  the code. Based in Lahore, Pakistan; working remotely worldwide.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="border-y border-violet-100 bg-white/70 py-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
            What you get
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            Clear scope, working software and a handover you can actually own —
            no black boxes.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="reveal flex items-start gap-3 rounded-2xl border border-violet-100 bg-white px-5 py-4 text-[15px] leading-relaxed text-slate-700"
              >
                <span className="mt-0.5">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="py-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
            How we work
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {service.process.map((step, index) => (
              <li
                key={step.title}
                className="reveal rounded-2xl border border-violet-100 bg-white p-6"
              >
                <span className="font-display text-sm font-extrabold text-violet-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section className="border-y border-violet-100 bg-white/70 py-14">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
              Related work
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((project) => (
                <Link
                  key={project.repoName}
                  href={`/projects/${projectSlug(project)}`}
                  className="reveal group overflow-hidden rounded-2xl border border-violet-100 bg-white"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      width="1200"
                      height="750"
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-violet-700">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-[900px] px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
            Common questions
          </h2>
          <div className="mt-8 space-y-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.q}
                className="reveal group rounded-2xl border border-violet-100 bg-white px-5 py-4"
              >
                <summary className="cursor-pointer list-none font-display text-[16px] font-bold text-slate-900 marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 pt-4">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="rounded-[1.8rem] border border-violet-200 bg-gradient-to-r from-[#F3EFFF] via-[#FAF8FF] to-[#F3EFFF] px-8 py-10 text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
              Have a project like this?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
              Send a short brief — I usually reply within a few hours with a
              fixed quote and a realistic timeline.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white"
              >
                Get a quote
                <ArrowIcon />
              </Link>
              <a
                href="mailto:abdullah.gc.18@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-3.5 text-sm font-semibold text-violet-700"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
