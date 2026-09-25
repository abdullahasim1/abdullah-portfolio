import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
/* Single source of truth — isi se index.html ka FAQPage JSON-LD bhi banta hai */
import { faqs } from "../data/faqs";

function Faq() {
  useScrollReveal("#faq .reveal");

  return (
    <section id="faq" className="py-28 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers about who I am, what I build, and how we can work together."
        />

        <div className="space-y-3 reveal">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl glass overflow-hidden open:border-cyan-400/30 transition-colors"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display font-semibold text-slate-100 hover:text-cyan-300 transition-colors [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  className="w-4 h-4 shrink-0 text-slate-400 group-open:rotate-45 group-open:text-cyan-300 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0-14v14m14-7H5m14 0H5" />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
