import React from "react";
import { useScrollReveal } from "../hooks";

const contactInfo = [
  {
    icon: "📧",
    title: "Email",
    value: "abdullah.gc.18@gmail.com",
    link: "mailto:abdullah.gc.18@gmail.com"
  },
  {
    icon: "📱",
    title: "Phone",
    value: "+92 307 0796208",
    link: "tel:+923070796208"
  },
  {
    icon: "💼",
    title: "LinkedIn",
    value: "abdullah-bin-asim",
    link: "https://www.linkedin.com/in/abdullah-bin-asim-654287267/"
  },
  {
    icon: "🐙",
    title: "GitHub",
    value: "abdullahasim1",
    link: "https://github.com/abdullahasim1"
  }
];

function Contact() {
  useScrollReveal("#contact .reveal");

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Let's Build Something Amazing Together
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Contact Information
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal group flex items-center p-4 rounded-lg border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur hover:border-indigo-500/50 transition-all duration-300"
                >
                  <div className="text-2xl mr-4 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      {info.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="reveal p-4 rounded-lg border border-green-200/60 dark:border-green-800/60 bg-green-50/60 dark:bg-green-900/20 backdrop-blur">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-700 dark:text-green-300 font-medium">
                  Available for new projects
                </span>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Send me a message
            </h3>
            <form className="space-y-4">
              <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="reveal">
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="reveal">
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <div className="reveal flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Let's Build Your Project
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300/70 dark:border-gray-700/70 hover:bg-white/40 dark:hover:bg-white/5 backdrop-blur transition-colors"
                >
                  WhatsApp Me
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300/70 dark:border-gray-700/70 hover:bg-white/40 dark:hover:bg-white/5 backdrop-blur transition-colors"
                >
                  Get a Free Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;


