import React, { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { navigateTo } from "../lib/router";
import {
  ASSISTANT_GREETING,
  SUGGESTED_QUESTIONS,
  answerQuestion,
} from "../lib/assistant";

/* Portfolio Assistant — Dua Fatima Khan wali site ke assistant jaisa
 * UX pattern (bottom-right bubble → panel, photo, naam, Ready status,
 * portfolio content par grounded jawab), is site ke Clean Light design
 * mein. Jawab src/lib/assistant.js se aate hain — sirf portfolio ke
 * apne data se, koi external API nahi.
 *
 * ScrollToTop button bhi bottom-right hai — clash se bachne ke liye
 * us ko bottom-24 par shift kar diya gaya hai, taake woh assistant
 * bubble ke upar stack ho aur dono saath reh saken. */

function RobotIcon({ className = "h-7 w-7" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 8V4" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="13" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="0.6" fill="currentColor" stroke="none" />
      <path d="M9.5 16.2c.7.6 1.5.9 2.5.9s1.8-.3 2.5-.9" />
      <path d="M2.5 13v2M21.5 13v2" />
    </svg>
  );
}

function MessageLinks({ links, onNavigate }) {
  if (!links?.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {links.map((link) => {
        const cls =
          "rounded-full border border-violet-300 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-100 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200 dark:hover:bg-violet-400/20";
        if (link.href) {
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={cls}
            >
              {link.label} ↗
            </a>
          );
        }
        return (
          <button
            key={link.label}
            type="button"
            className={cls}
            onClick={() => onNavigate(link)}
          >
            {link.label} →
          </button>
        );
      })}
    </div>
  );
}

export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [avatarOk, setAvatarOk] = useState(true);
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useFocusTrap(panelRef, open);

  // Pehli dafa khulne par greeting
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", text: ASSISTANT_GREETING, links: [] }]);
    }
  }, [open, messages.length]);

  // Khulte hi input par focus — keyboard users seedha likh saken
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  // Naye message par list ko neeche scroll karo (sirf panel ke andar)
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  // Esc se band
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open ]);

  const ask = (raw) => {
    const question = String(raw || "").trim();
    if (!question) return;
    const answer = answerQuestion(question);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question, links: [] },
      { role: "assistant", text: answer.text, links: answer.links || [] },
    ]);
    setInput("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(input);
  };

  const onNavigate = (link) => {
    setOpen(false);
    if (link.path) navigateTo(link.path);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Abdullah's AI assistant"
        aria-haspopup="dialog"
        className="fixed bottom-6 right-6 z-[70] flex h-14 items-center gap-2 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 pr-5 pl-4 text-white shadow-xl shadow-violet-600/30 transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span className="relative flex">
          <RobotIcon className="h-7 w-7" />
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white"
          />
        </span>
        <span className="text-sm font-bold tracking-tight">Ask AI</span>
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label="Abdullah's AI Assistant"
      className="fixed right-4 bottom-4 z-[80] flex h-[min(620px,calc(100dvh-2rem))] w-[min(410px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl ring-1 ring-slate-900/10 sm:right-6 sm:bottom-6 dark:bg-slate-900 dark:text-slate-100 dark:ring-white/15"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3.5 text-white">
        <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white/20 text-sm font-extrabold ring-2 ring-white/50">
          AA
          {avatarOk && (
            <img
              src="/about-photo.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setAvatarOk(false)}
            />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold leading-tight">
            Abdullah&apos;s AI Assistant
          </p>
          <p className="truncate text-xs text-white/80">
            Abdullah Bin Asim · AI Cloud Engineer
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-200">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Ready — answers from his portfolio
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close assistant"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-lg leading-none transition-colors hover:bg-white/25"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div
        ref={messagesRef}
        className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3.5 py-4 dark:bg-white/5"
        aria-live="polite"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-sm ${
              m.role === "user"
                ? "ml-auto rounded-br-md bg-violet-600 text-white"
                : "mr-auto rounded-bl-md bg-white text-slate-800 ring-1 ring-slate-200/80 dark:bg-white/10 dark:text-slate-100 dark:ring-white/10"
            }`}
          >
            {m.text}
            {m.role === "assistant" && (
              <MessageLinks links={m.links} onNavigate={onNavigate} />
            )}
          </div>
        ))}
      </div>

      {/* Suggested questions */}
      <div
        className="flex gap-1.5 overflow-x-auto bg-white px-3.5 pt-2.5 dark:bg-slate-900"
        aria-label="Suggested questions"
      >
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => ask(q)}
            className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-slate-600 transition-colors hover:border-violet-300 hover:text-violet-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-violet-400/40 dark:hover:text-violet-200"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 bg-white px-3.5 py-3 dark:bg-slate-900"
      >
        <label htmlFor="assistant-input" className="sr-only">
          Ask about Abdullah&apos;s work
        </label>
        <input
          id="assistant-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Abdullah's work…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-300/50 dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:focus:border-violet-400/60"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="shrink-0 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
      <p className="bg-white px-3.5 pb-3 text-center text-[11px] text-slate-400 dark:bg-slate-900 dark:text-slate-500">
        Data-grounded assistant — answers only from this portfolio, nothing is made up.
      </p>
    </div>
  );
}
