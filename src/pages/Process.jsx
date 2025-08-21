import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    title: "Discovery & Planning",
    desc: "We start by understanding your goals, target audience, and project requirements. This phase includes consultation, technology stack planning, and timeline definition.",
    features: [
      "Project consultation & goal setting",
      "Target audience analysis",
      "Technology stack planning",
      "Timeline & milestone definition",
    ],
  },
  {
    num: "02",
    title: "Design & Development",
    desc: "I create the UI/UX design and develop your product using modern tools and best practices. You'll receive regular updates throughout the process.",
    features: [
      "UI/UX design & prototyping",
      "Frontend development",
      "Backend API development",
      "Regular progress updates",
    ],
  },
  {
    num: "03",
    title: "Launch & Support",
    desc: "After thorough testing and deployment, I provide post-launch support to ensure your app performs smoothly and continues to meet your needs.",
    features: [
      "Quality assurance testing",
      "Deployment & launch",
      "Performance monitoring",
      "Ongoing support & maintenance",
    ],
  },
];

function Process() {
  useScrollReveal("#process .reveal");

  return (
    <section id="process" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">How I Work</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl">
            A proven process that ensures your project is delivered on time, on budget, and exceeds your expectations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.num} className="reveal relative">
              <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{step.desc}</p>
                <ul className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to get started? Let's discuss your project and kick off this proven process.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity"
          >
            Book Your Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

export default Process;


