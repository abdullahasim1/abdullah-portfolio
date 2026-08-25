import React from "react";
import { techLogos } from "../data/techLogos";
import TiltIcon from "./TiltIcon";
import { scrollToSection, scrollToTop } from "../lib/smoothScroll";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" }
];

const services = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Backend Development",
  "API Integration",
  "Consulting"
];

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace(/^#/, "");
    if (id === "home") {
      scrollToTop();
    } else {
      scrollToSection(id);
    }
  };

  return (
    <footer className="relative mt-10 border-t border-white/[0.06] bg-black/40">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-0 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/IMG-20240224-WA0006.jpg"
                alt="Abdullah Asim"
                className="w-11 h-11 rounded-xl object-cover border border-cyan-400/30"
              />
              <span className="font-display text-lg font-bold">
                <span className="text-white">abdullah</span>
                <span className="text-gradient">.dev</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Full Stack Developer crafting fast, scalable digital experiences with clean code and stunning design.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/abdullahasim1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-bin-asim-654287267/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 mb-5">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, "#services")}
                    className="text-sm text-slate-500 hover:text-cyan-300 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 mb-5">
              By the Numbers
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["3+", "Years Experience"],
                ["25+", "Projects Done"],
                ["8+", "Certifications"],
                ["15+", "Technologies"]
              ].map(([number, label]) => (
                <div key={label} className="glass rounded-xl p-3 text-center card-glow-hover">
                  <div className="font-display text-xl font-bold text-gradient">{number}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech stack — 3D logo tiles */}
        <div className="mt-16 pt-12 border-t border-white/[0.06]">
          <p className="text-center font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 mb-9">
            Powered by modern tech
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-7">
            {techLogos.map((logo) => (
              <TiltIcon key={logo.name} logo={logo} size={62} iconSize={30} showLabel />
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-14 pt-8 text-center text-xs text-slate-600">
          <p>© {currentYear} Abdullah Asim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
