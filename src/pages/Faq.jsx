import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";

/* Ye FAQ index.html ke FAQPage JSON-LD se match karta hai —
   Google ko visible content chahiye hota hai rich results ke liye */
const faqs = [
  {
    q: "Who is Abdullah Bin Asim?",
    a: "A Full Stack Developer and AI Builder with 3+ years of experience. He builds fast, scalable web apps with React, Next.js, Node.js and AWS Generative AI, and holds AWS Certified Generative AI Developer – Professional credentials.",
  },
  {
    q: "What services does Abdullah offer?",
    a: "Full-stack web development (React/Next.js/Node.js), AI agents & workflow automation (Claude agents, Make.com, n8n, GoHighLevel), UI/UX design, and AWS cloud & generative AI integrations.",
  },
  {
    q: "Which technologies does he work with?",
    a: "React, Next.js, Node.js, TypeScript, Tailwind CSS, GSAP, Three.js, MySQL, AWS, Claude & AI Agents, GoHighLevel, Make.com and n8n.",
  },
  {
    q: "Is Abdullah available for freelance projects?",
    a: "Yes — currently available for new projects and usually replies within a few hours via email at abdullah.gc.18@gmail.com.",
  },
  {
    q: "How many projects has he shipped?",
    a: "25+ projects including AI platforms (Four-AI, HireGen AI), job portals, food ordering systems and service booking apps — live demos in the Projects section above.",
  },
  {
    q: "How can I contact him?",
    a: "Email abdullah.gc.18@gmail.com, GitHub github.com/abdullahasim1, or the contact form below.",
  },
];

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
                  className="w-4 h-4 shrink-0 text-slate-500 group-open:rotate-45 group-open:text-cyan-300 transition-transform"
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
