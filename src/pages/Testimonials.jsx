import React from "react";
import { useScrollReveal } from "../hooks";
import { testimonials } from "../data/testimonials";

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, star) => (
        <svg
          key={star}
          className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:scale-125"
          style={{ transitionDelay: `${star * 60}ms` }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function initialsOf(author) {
  // Space-separated words ke initials (hyphenated word = ek hi word):
  // "E-commerce Founder" → EF, "SaaS Product Manager" → SPM
  return author
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

const STATS = [
  {
    value: "15+",
    label: "Happy Clients",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    ),
  },
  {
    value: "25+",
    label: "Projects Delivered",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9.5l9 5 9-5M3 17.5l9 5 9-5" />
    ),
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    ),
  },
];

function Testimonials() {
  useScrollReveal("#testimonials .reveal");

  return (
    <section id="testimonials" className="relative scroll-mt-24 overflow-hidden py-20">
      <div aria-hidden className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-600/10" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Board header */}
        <div className="relative mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Testimonials
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[44px]">
            What People Say
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            Real feedback from clients and collaborators who trusted me with their projects.
          </p>
          <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />

          {/* Quote-bubble art */}
          <div aria-hidden className="absolute right-2 top-0 hidden select-none md:block">
            <div className="relative">
              <div className="absolute -left-10 top-4 flex h-12 w-14 items-center justify-center rounded-2xl rounded-bl-md bg-violet-200/80 dark:bg-violet-500/20">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>
              <div className="relative flex h-[74px] w-[92px] rotate-[-4deg] items-center justify-center rounded-[1.4rem] rounded-bl-md bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_20px_40px_-14px_rgba(124,58,237,0.55)]">
                <span className="font-display text-[44px] font-extrabold leading-none text-white">&rdquo;</span>
              </div>
              <span className="absolute -right-4 -top-3 flex gap-1">
                <span className="h-[3px] w-3 rotate-[-30deg] rounded bg-violet-400" />
                <span className="h-[3px] w-3 rotate-[15deg] rounded bg-violet-400" />
              </span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.author}
              className={`group relative flex flex-col rounded-[1.6rem] bg-white p-7 shadow-[0_14px_40px_-18px_rgba(124,58,237,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_-18px_rgba(124,58,237,0.3)] dark:bg-slate-900/70 ${
                i === 0
                  ? "border-2 border-violet-300 dark:border-violet-400/40"
                  : "border border-violet-100 dark:border-white/10"
              }`}
            >
              {i === 0 ? (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-md">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
                  </svg>
                  Featured
                </span>
              ) : (
                <span aria-hidden className="absolute right-6 top-5 font-display text-[44px] font-extrabold leading-none text-violet-200 dark:text-violet-500/25">
                  &rdquo;
                </span>
              )}
              <Stars />
              <blockquote className="mb-6 mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3.5">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.author}
                    loading="lazy"
                    width="44"
                    height="44"
                    className="h-11 w-11 rounded-xl object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 font-display text-[13px] font-bold text-violet-600 transition-transform duration-300 group-hover:scale-110 dark:bg-violet-500/15 dark:text-violet-300"
                  >
                    {initialsOf(t.author)}
                  </span>
                )}
                <span aria-hidden className="h-9 w-px bg-violet-100 dark:bg-white/10" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-slate-900 dark:text-white">
                    {t.author}
                  </span>
                  <span className="block truncate text-[13px] text-slate-400">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <span aria-hidden className="hidden h-12 w-px bg-violet-200/80 dark:bg-white/10 sm:block" />}
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    {stat.icon}
                  </svg>
                </span>
                <span>
                  <span className="block font-display text-[28px] font-extrabold leading-none text-violet-700 dark:text-violet-300">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
