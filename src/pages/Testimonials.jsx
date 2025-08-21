import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const items = [
  {
    quote: "We needed a scalable backend with secure payments. Abdullah built our e-commerce platform flawlessly. His attention to detail and performance optimization is outstanding.",
    author: "Sarah Johnson",
    role: "E-commerce Founder",
    company: "TechStart Inc.",
  },
  {
    quote: "Abdullah transformed our concept into a polished platform with insightful guidance. His technical expertise and design sense made all the difference in user adoption.",
    author: "Michael Chen",
    role: "EdTech Co-Founder",
    company: "LearnFlow",
  },
  {
    quote: "The app's real-time features and seamless UX exceeded our expectations. Abdullah is a true full-stack problem solver who delivers quality work on time.",
    author: "Emily Rodriguez",
    role: "NGO Coordinator",
    company: "HealthConnect",
  },
  {
    quote: "Abdullah built us a dynamic admin panel with user management and analytics. His ability to balance backend efficiency with frontend usability is rare.",
    author: "David Kim",
    role: "SaaS Product Manager",
    company: "DataFlow",
  },
  {
    quote: "We needed a branded, responsive tool for our website. Abdullah delivered a clean solution that boosted our engagement and reduced support queries significantly.",
    author: "Lisa Thompson",
    role: "Financial Consultant",
    company: "FinancePro",
  },
  {
    quote: "Abdullah delivered a functional, fast application with advanced features. His proactive approach and technical skills set him apart from other developers.",
    author: "Alex Morgan",
    role: "Tech Recruiter",
    company: "TalentHub",
  },
];

function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
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
    <section className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-left">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">What Clients Say</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl">
            Real feedback from clients who trusted me with their projects and achieved exceptional results.
          </p>
        </div>
        <div ref={containerRef} className="overflow-hidden">
          <div className="flex gap-6" data-marquee>
            {items.concat(items).map((t, i) => (
              <figure key={i} className="min-w-[350px] max-w-sm rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold">
                    {t.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{t.author}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t.role} • {t.company}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Your success story could be next</p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity"
          >
            Start Your Project Today
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;


