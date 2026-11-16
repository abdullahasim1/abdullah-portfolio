import React, { useEffect, useMemo, useRef, useState } from "react";
import { featuredProjects, projectSlug } from "../data/projects";
import { navigateTo, goSection } from "../lib/router";
import { playClickSound, playOpenSound } from "../lib/sound";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { showToast } from "../lib/toast";

const actions = [
  {
    id: "nav-home",
    label: "Home",
    group: "Navigation",
    icon: "🏠",
    action: () => goSection("home"),
  },
  {
    id: "nav-about",
    label: "About Me",
    group: "Navigation",
    icon: "👤",
    action: () => goSection("about"),
  },
  {
    id: "nav-services",
    label: "Services & Solutions",
    group: "Navigation",
    icon: "⚡",
    action: () => goSection("services"),
  },
  {
    id: "nav-projects",
    label: "Projects & GitHub",
    group: "Navigation",
    icon: "💻",
    action: () => goSection("projects"),
  },
  {
    id: "nav-certs",
    label: "Certifications & Credentials",
    group: "Navigation",
    icon: "🎓",
    action: () => goSection("certifications"),
  },
  {
    id: "nav-skills",
    label: "Skills & Arsenal",
    group: "Navigation",
    icon: "🛠️",
    action: () => goSection("skills"),
  },
  {
    id: "nav-blog",
    label: "Blog & Articles",
    group: "Navigation",
    icon: "📝",
    action: () => goSection("blog"),
  },
  {
    id: "nav-process",
    label: "Work Process",
    group: "Navigation",
    icon: "📋",
    action: () => goSection("process"),
  },
  {
    id: "nav-testimonials",
    label: "Client Testimonials",
    group: "Navigation",
    icon: "💬",
action: () => goSection("testimonials"),
  },
  {
    id: "nav-faq",
    label: "FAQ",
    group: "Navigation",
    icon: "❓",
    action: () => goSection("faq"),
  },
  {
    id: "nav-contact",
    label: "Contact & Hire Me",
    group: "Navigation",
    icon: "✉️",
    action: () => goSection("contact"),
  },
  {
    id: "act-resume",
    label: "Download Resume (PDF)",
    group: "Quick Actions",
    icon: "📄",
    action: () => window.open("/resume.pdf", "_blank", "noopener,noreferrer"),
  },
  {
    id: "act-github",
    label: "Open GitHub Profile",
    group: "Quick Actions",
    icon: "🐙",
    action: () => window.open("https://github.com/abdullahasim1", "_blank", "noopener,noreferrer"),
  },
  {
    id: "act-linkedin",
    label: "Open LinkedIn Profile",
    group: "Quick Actions",
    icon: "💼",
    action: () =>
      window.open("https://www.linkedin.com/in/abdullahasim1/", "_blank", "noopener,noreferrer"),
  },
  {
    id: "act-whatsapp",
    label: "Chat on WhatsApp",
    group: "Quick Actions",
    icon: "📱",
    action: () => window.open("https://wa.link/o1bqnp", "_blank", "noopener,noreferrer"),
  },
  {
    id: "act-copy-email",
    label: "Copy Email Address",
    group: "Quick Actions",
    icon: "📋",
    action: async () => {
      try {
        await navigator.clipboard.writeText("abdullah.gc.18@gmail.com");
        showToast("Email copied: abdullah.gc.18@gmail.com");
      } catch {
        showToast("Failed to copy email");
      }
    },
  },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  // Tab focus dialog ke andar hi rakho (open hone par hi active)
  useFocusTrap(dialogRef, isOpen);

  // Generate dynamic items combining static actions + featured projects
  const items = useMemo(() => {
    const projectItems = featuredProjects.map((p) => ({
      id: `project-${p.repoName}`,
      label: `${p.title} — ${p.tags.slice(0, 3).join(", ")}`,
      group: "Projects",
      icon: p.emoji || "🚀",
      action: () => {
        navigateTo(`/projects/${projectSlug(p)}`);
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
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 sm:pt-28 px-4"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

      {/* Palette Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl bg-white shadow-[0_24px_80px_-16px_rgba(15,23,42,0.45)] overflow-hidden border border-violet-200 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-violet-100 bg-violet-50/70">
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
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={
              items[selectedIndex] ? `palette-item-${selectedIndex}` : undefined
            }
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            ✕
          </button>
          <kbd className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white border border-violet-200 text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          id="palette-results"
          role="listbox"
          aria-label="Command results"
          className="max-h-[360px] overflow-y-auto p-2 space-y-1"
        >
          {items.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No results found for "
              <span className="text-slate-700">{query}</span>"
            </div>
          ) : (
            items.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  id={`palette-item-${index}`}
                  aria-selected={isSelected}
                  onClick={() => {
                    playClickSound();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-violet-100 border border-violet-300 text-slate-900"
                      : "text-slate-700 hover:bg-violet-50 border border-transparent"
                  }`}
                >
                  <span className="text-base shrink-0" aria-hidden="true">{item.icon}</span>
                  <span className="flex-1 font-medium truncate">
                    {item.label}
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 px-2 py-0.5 rounded bg-violet-50">
                    {item.group}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-violet-50/70 border-t border-violet-100 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white border border-violet-200 px-1.5 py-0.5 rounded text-[10px] text-slate-500">
                ↑↓
              </kbd>{" "}
              to navigate
            </span>
            <span>
              <kbd className="font-mono bg-white border border-violet-200 px-1.5 py-0.5 rounded text-[10px] text-slate-500">
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
