import React, { useEffect, useMemo, useRef, useState } from "react";
import { featuredProjects } from "../data/projects";
import { scrollToSection, scrollToTop } from "../lib/smoothScroll";
import { playClickSound, playOpenSound } from "../lib/sound";

const actions = [
  {
    id: "nav-home",
    label: "Home",
    group: "Navigation",
    icon: "🏠",
    action: () => scrollToTop(),
  },
  {
    id: "nav-about",
    label: "About Me",
    group: "Navigation",
    icon: "👤",
    action: () => scrollToSection("about"),
  },
  {
    id: "nav-services",
    label: "Services & Solutions",
    group: "Navigation",
    icon: "⚡",
    action: () => scrollToSection("services"),
  },
  {
    id: "nav-projects",
    label: "Projects & GitHub",
    group: "Navigation",
    icon: "💻",
    action: () => scrollToSection("projects"),
  },
  {
    id: "nav-certs",
    label: "Certifications & Credentials",
    group: "Navigation",
    icon: "🎓",
    action: () => scrollToSection("certifications"),
  },
  {
    id: "nav-skills",
    label: "Skills & Arsenal",
    group: "Navigation",
    icon: "🛠️",
    action: () => scrollToSection("skills"),
  },
  {
    id: "nav-process",
    label: "Work Process",
    group: "Navigation",
    icon: "📋",
    action: () => scrollToSection("process"),
  },
  {
    id: "nav-testimonials",
    label: "Client Testimonials",
    group: "Navigation",
    icon: "💬",
    action: () => scrollToSection("testimonials"),
  },
  {
    id: "nav-faq",
    label: "FAQ",
    group: "Navigation",
    icon: "❓",
    action: () => scrollToSection("faq"),
  },
  {
    id: "nav-contact",
    label: "Contact & Hire Me",
    group: "Navigation",
    icon: "✉️",
    action: () => scrollToSection("contact"),
  },
  {
    id: "act-resume",
    label: "Download Resume (PDF)",
    group: "Quick Actions",
    icon: "📄",
    action: () => window.open("/resume.pdf", "_blank"),
  },
  {
    id: "act-github",
    label: "Open GitHub Profile",
    group: "Quick Actions",
    icon: "🐙",
    action: () => window.open("https://github.com/abdullahasim1", "_blank"),
  },
  {
    id: "act-linkedin",
    label: "Open LinkedIn Profile",
    group: "Quick Actions",
    icon: "💼",
    action: () =>
      window.open("https://www.linkedin.com/in/abdullahasim1/", "_blank"),
  },
  {
    id: "act-whatsapp",
    label: "Chat on WhatsApp",
    group: "Quick Actions",
    icon: "📱",
    action: () => window.open("https://wa.link/o1bqnp", "_blank"),
  },
  {
    id: "act-copy-email",
    label: "Copy Email Address",
    group: "Quick Actions",
    icon: "📋",
    action: () => {
      navigator.clipboard.writeText("abdullah.gc.18@gmail.com");
      alert("Email copied to clipboard: abdullah.gc.18@gmail.com");
    },
  },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Generate dynamic items combining static actions + featured projects
  const items = useMemo(() => {
    const projectItems = featuredProjects.map((p) => ({
      id: `project-${p.repoName}`,
      label: `${p.title} — ${p.tags.slice(0, 3).join(", ")}`,
      group: "Projects",
      icon: p.emoji || "🚀",
      action: () => {
        scrollToSection("projects");
      },
    }));

    const all = [...actions, ...projectItems];
    if (!query.trim()) return all;

    const q = query.toLowerCase();
    return all.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [query]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  // Focus input on open & play sound
  useEffect(() => {
    if (isOpen) {
      playOpenSound();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (items.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + items.length) % (items.length || 1),
      );
    } else if (e.key === "Enter" && items[selectedIndex]) {
      e.preventDefault();
      playClickSound();
      items[selectedIndex].action();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 sm:pt-28 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" />

      {/* Palette Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl glass-strong neon-ring shadow-[0_24px_80px_-16px_rgba(0,0,0,0.9)] overflow-hidden border border-cyan-400/30 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08] bg-black/30">
          <svg
            className="w-5 h-5 text-cyan-400 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search sections, projects…"
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.07] border border-white/[0.12] text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {items.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              No results found for "
              <span className="text-slate-300">{query}</span>"
            </div>
          ) : (
            items.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border border-cyan-400/30 text-white"
                      : "text-slate-300 hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span className="flex-1 font-medium truncate">
                    {item.label}
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 px-2 py-0.5 rounded bg-white/[0.04]">
                    {item.group}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-black/40 border-t border-white/[0.06] text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white/[0.08] px-1.5 py-0.5 rounded text-[10px] text-slate-400">
                ↑↓
              </kbd>{" "}
              to navigate
            </span>
            <span>
              <kbd className="font-mono bg-white/[0.08] px-1.5 py-0.5 rounded text-[10px] text-slate-400">
                ↵
              </kbd>{" "}
              to select
            </span>
          </div>
          <span>Abdullah.dev Command Center</span>
        </div>
      </div>
    </div>
  );
}
