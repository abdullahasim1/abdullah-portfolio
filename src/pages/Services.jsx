import React from "react";
import {  useScrollReveal } from "../hooks";
import MagneticButton from "../components/MagneticButton";

const services = [
  {
    category: "Web App Development",
    items: [
      "Custom Web Applications",
      "E-commerce Platforms",
      "Progressive Web Apps",
      "Admin Dashboards"
    ]
  },
  {
    category: "Mobile App Development",
    items: [
      "React Native Apps",
      "Cross-platform Solutions",
      "Native iOS/Android",
      "App Maintenance"
    ]
  },
  {
    category: "Backend Development",
    items: [
      "API Development",
      "Database Design",
      "Server Architecture",
      "Cloud Integration"
    ]
  },
  {
    category: "Frontend Development",
    items: [
      "React Applications",
      "Responsive Design",
      "Performance Optimization",
      "UI/UX Implementation"
    ]
  },
  {
    category: "UI/UX Design",
    items: [
      "User Interface Design",
      "User Experience Design",
      "Prototyping",
      "Design Systems"
    ]
  },
  {
    category: "Payment Gateway",
    items: [
      "Stripe Integration",
      "PayPal Setup",
      "Payment Security",
      "Transaction Management"
    ]
  }
];

function Services() {
  
  useScrollReveal("#services .reveal");

  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Services
          </span>
          
        </div>
        
        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} data-stagger className="reveal group">
              <div className="bg-white/60 dark:bg-black/30 backdrop-blur rounded-2xl p-6 border border-gray-200/60 dark:border-gray-800/60 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {service.category}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="reveal text-center mt-16">
          <div className="bg-white/60 dark:bg-black/30 backdrop-blur rounded-2xl p-8 border border-gray-200/60 dark:border-gray-800/60">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Need Something Custom?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Don't see exactly what you need? I'm always open to discussing custom solutions 
              that fit your specific requirements and goals.
            </p>
            <MagneticButton href="#contact">
              Let's Discuss Your Project
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;


