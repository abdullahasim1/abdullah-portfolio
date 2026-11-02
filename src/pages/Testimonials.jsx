import React from "react";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import { testimonials } from "../data/testimonials";

function Testimonials() {
  return (
    <section id="testimonials" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Testimonials"
          title="What People Say"
          subtitle="Real feedback from clients and collaborators who trusted me with their projects."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-3xl glass p-7 card-glow-hover flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, star) => (
                  <svg key={star} className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-slate-300 light:text-slate-600 mb-6 leading-relaxed text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.author}
                    loading="lazy"
                    width="40"
                    height="40"
                    className="w-10 h-10 rounded-xl object-cover border border-white/10"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-violet-400/25 flex items-center justify-center text-sm font-bold text-violet-200 font-display"
                  >
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-medium text-slate-100 light:text-slate-900 text-sm truncate">
                    {t.author}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-slate-400 mb-5">Your success story could be next</p>
          <MagneticButton href="#contact">Start a Project</MagneticButton>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
