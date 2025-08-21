import React from "react";
import { useScrollReveal } from "../hooks";

const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We start by understanding your vision, goals, and requirements to create a solid foundation for your project.",
    features: [
      "Project requirements analysis",
      "User research and personas",
      "Technical architecture planning",
      "Timeline and milestone setting"
    ]
  },
  {
    step: "02",
    title: "Development & Design",
    description: "Bringing your ideas to life with clean code, beautiful design, and seamless user experiences.",
    features: [
      "UI/UX design and prototyping",
      "Frontend and backend development",
      "Database design and setup",
      "API integration and testing"
    ]
  },
  {
    step: "03",
    title: "Launch & Support",
    description: "Deploying your project to production and providing ongoing support to ensure long-term success.",
    features: [
      "Deployment and optimization",
      "Performance monitoring",
      "Bug fixes and updates",
      "Ongoing maintenance support"
    ]
  }
];

function Process() {
  useScrollReveal("#process .reveal");

  return (
    <section id="process" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            How I Work
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            A proven process that ensures your project is delivered on time, within budget, and exceeds expectations.
          </p>
        </div>
        
        <div className="space-y-12">
          {processSteps.map((step, index) => (
            <div key={index} className="reveal">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white text-2xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="bg-white/60 dark:bg-black/30 backdrop-blur rounded-2xl p-6 border border-gray-200/60 dark:border-gray-800/60">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      What's included:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block mt-8">
                  <div className="w-px h-16 bg-gradient-to-b from-indigo-500 to-fuchsia-500 mx-auto"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="reveal text-center mt-16">
          <div className="bg-white/60 dark:bg-black/30 backdrop-blur rounded-2xl p-8 border border-gray-200/60 dark:border-gray-800/60">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Let's discuss your project requirements and create something amazing together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity font-medium"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;


