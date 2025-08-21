import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "abdullah.gc.18@gmail.com",
    link: "mailto:abdullah.gc.18@gmail.com",
  },
  {
    icon: "📱",
    label: "Phone/WhatsApp",
    value: "+92 3070796208",
    link: "https://wa.me/923070796208",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "abdullah-bin-asim",
    link: "https://www.linkedin.com/in/abdullah-bin-asim-654287267/",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "abdullahasim1",
    link: "https://github.com/abdullahasim1",
  }
  
];

function Contact() {
  useScrollReveal("#contact .reveal");

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Get in touch
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Let's Work Together</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl">
            I help startups, agencies, and entrepreneurs launch faster, scale smarter, and design better. 
            Whether it's a brand new idea or an existing project that needs an upgrade, I'm here to help you win.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="reveal rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-8">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/20 dark:hover:bg-white/5 transition-colors group"
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{info.label}</div>
                      <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="reveal rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-8">
              <h3 className="text-xl font-semibold mb-4">Available for new projects</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Currently accepting new clients
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Quick response guaranteed
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Free consultation available
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to transform your ideas into reality? Let's bring your vision to life.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity font-medium text-lg"
          >
            Let's Build Your Project
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;


