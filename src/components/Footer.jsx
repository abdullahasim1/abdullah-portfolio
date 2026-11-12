import React from "react";
import { playClickSound } from "../lib/sound";
import { Link } from "../lib/router";

/* Dua Fatima Khan style footer (Abdullah ka order, 2026-11-12):
   solid black band, 3 columns — brand/CTA, "/ Quick Links" white
   pills, "/ Contact" + "/ Connect" — aur neeche footer ke edge se
   kata hua devasa dark-grey "ABDULLAH ASIM" wordmark. Saari copy,
   links aur email Abdullah ke apne hain (purane footer se hi liye
   gaye hain); her text bilkul copy nahi hui.
   Rang EXPLICIT hex hain — dark-variant istemal nahi hua, theme
   light-only hi hai (PR #23 machinery untouched). index.css ki
   unlayered light safety-net slate/violet text classes ko remap karti
   hai, is liye band ke andar sirf arbitrary hex colors hain. */

const exploreLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Certifications", href: "/certifications" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const connectLinks = [
  { name: "GitHub", href: "https://github.com/abdullahasim1" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/abdullahasim1/" },
];

const colHeading =
  "font-mono text-xs font-medium uppercase tracking-[0.3em] text-[#8F887B]";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#050505] text-[#EDE7D9]">
      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 sm:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-3">
          {/* Brand / CTA — purane footer ki apni wording */}
          <div>
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/25">
                <svg viewBox="0 0 48 48" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M10 36 L24 10 L38 36 M16.5 26.5 H31.5" />
                  <path d="M35 6l.9 2.3L38.2 9.2 35.9 10.1 35 12.4 34.1 10.1 31.8 9.2 34.1 8.3z" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <div>
                <p className="font-display text-[22px] font-extrabold leading-tight text-[#F4EFE3]">
                  Abdullah Asim
                </p>
                <p className="text-[13px] text-[#A79E8E]">
                  AI Cloud Engineer &amp; Full-Stack Developer
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#C9C2B2]">
              Building scalable web experiences, AI-powered products and cloud solutions.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-[#C9C2B2]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </p>
          </div>

          {/* Quick Links — white pills (her layout language) */}
          <nav aria-label="Footer quick links">
            <h3 className={colHeading}>/ Quick Links</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => playClickSound()}
                    className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0A0A0A] transition-colors hover:bg-[#E7DFCE]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Connect */}
          <div>
            <h3 className={colHeading}>/ Contact</h3>
            <a
              href="mailto:abdullah.gc.18@gmail.com"
              className="mt-5 inline-block text-[15px] font-medium text-[#F4EFE3] underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-[#F4EFE3]"
            >
              abdullah.gc.18@gmail.com
            </a>
            <h3 className={`${colHeading} mt-9`}>/ Connect</h3>
            <ul className="mt-4 space-y-2.5">
              {connectLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[15px] text-[#C9C2B2] transition-colors hover:text-white"
                  >
                    {link.name}
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H8m9 0v9" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal line — her footer mein nahi, Abdullah ki rehti hai */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-[#8F887B] md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} Abdullah Asim. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <a href="/privacy.html" className="transition-colors hover:text-[#F4EFE3]">
              Privacy
            </a>
            <span aria-hidden className="h-4 w-px bg-white/15" />
            <span>Terms</span>
          </p>
        </div>
      </div>

      {/* Devasa wordmark — footer ke neeche wale edge se kata hua
          (negative margin + overflow hidden), her style ki tarah */}
      <div aria-hidden="true" className="relative select-none overflow-hidden">
        <p
          className="whitespace-nowrap text-center font-display font-extrabold uppercase leading-[0.8] tracking-tight text-[#1D1D1F]"
          style={{ fontSize: "clamp(3.25rem, 12.4vw, 12.5rem)", marginBottom: "-0.23em" }}
        >
          Abdullah Asim
        </p>
      </div>
    </footer>
  );
}

export default Footer;
