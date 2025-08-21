import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="mt-24 border-t border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop"
                alt="Abdullah Asim"
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <h3 className="text-xl font-bold">Abdullah Asim</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Backend Developer | Frontend Engineer | Graphic Designer
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Helping you launch faster, look better, and scale smarter with cutting-edge technology solutions.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">📧</span>
                <a href="mailto:abdullah.gc.18@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  abdullah.gc.18@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">📱</span>
                <a href="https://wa.me/923070796208" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  +92 3070796208
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Backend Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Frontend Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Payment Integration
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-gray-200/60 dark:border-gray-800/60 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🚀</div>
            <div className="text-lg font-semibold mt-1">1</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Year Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">⚡</div>
            <div className="text-lg font-semibold mt-1">20+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Projects Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">🛠️</div>
            <div className="text-lg font-semibold mt-1">10+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">❤️</div>
            <div className="text-lg font-semibold mt-1">100%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Client Satisfaction</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-6 border-t border-gray-200/60 dark:border-gray-800/60">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {year} Abdullah Asim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


