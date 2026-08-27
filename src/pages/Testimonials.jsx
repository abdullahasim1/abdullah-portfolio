import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SectionHeading from "../components/SectionHeading";
import { testimonials } from "../data/testimonials";

function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-marquee]", {
        xPercent: -100,
        repeat: -1,
        ease: "none",
        duration: 30,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Testimonials"
          title="What Clients Say"
          subtitle="Real feedback from clients who trusted me with their projects."
        />
      </div>

      <div ref={containerRef} className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex gap-6 px-6" data-marquee>
          {testimonials.concat(testimonials).map((t, i) => (
            <figure
              key={i}
              className="min-w-[340px] max-w-sm rounded-2xl glass p-6 card-glow-hover"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, star) => (
                  <svg key={star} className="w-4 h-4 text-cyan-300/80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-slate-300 mb-5 leading-relaxed text-[15px]">
                "{t.quote}"
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/25 to-violet-500/25 border border-white/10 flex items-center justify-center text-sm font-bold text-gradient font-display">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-slate-100 text-sm">{t.author}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.company}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="text-center mt-14">
        <p className="text-slate-400 mb-5">Your success story could be next</p>
        <a
          href="#contact"
          className="sheen-btn relative inline-flex items-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_28px_rgba(34,211,238,0.22)] hover:opacity-90 transition-opacity"
        >
          Start Your Project Today
          <span className="sheen-layer" aria-hidden />
        </a>
      </div>
    </section>
  );
}

export default Testimonials;
