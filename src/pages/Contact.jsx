import React, { useState, useRef, useEffect } from "react";
import { siWhatsapp, siGithub } from "simple-icons";
import { useScrollReveal } from "../hooks";
import { track } from "../lib/analytics";

const EMAIL = "abdullah.gc.18@gmail.com";
/* Web3Forms (free) — https://web3forms.com se email daal kar access key lein.
   Key khaali ho to form mailto: fallback use karta hai. */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

const MIN_FILL_TIME = 2000; // 2 seconds minimum

const contactInfo = [
  { kind: "mail", title: "Email", value: EMAIL, link: `mailto:${EMAIL}`, external: false },
  { kind: "whatsapp", title: "Phone / WhatsApp", value: "+92 307 0796208", link: "tel:+923070796208", external: false },
  { kind: "linkedin", title: "LinkedIn", value: "abdullahasim1", link: "https://www.linkedin.com/in/abdullahasim1/", external: true },
  { kind: "github", title: "GitHub", value: "abdullahasim1", link: "https://github.com/abdullahasim1", external: true },
];

function ContactTile({ kind }) {
  const base = "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl";
  if (kind === "mail") {
    return (
      <span className={`${base} bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300`}>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </span>
    );
  }
  if (kind === "whatsapp") {
    return (
      <span className={`${base} bg-emerald-100 text-[#1ebe5d] dark:bg-emerald-500/15`}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d={siWhatsapp.path} />
        </svg>
      </span>
    );
  }
  if (kind === "linkedin") {
    return (
      <span className={`${base} bg-[#0A66C2] text-white`}>
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  return (
    <span className={`${base} bg-slate-900 text-white dark:bg-white dark:text-slate-900`}>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d={siGithub.path} />
      </svg>
    </span>
  );
}

/* Glass envelope illustration (CSS/SVG version of the board art). */
function EnvelopeArt() {
  return (
    <div aria-hidden className="relative hidden h-[130px] w-[200px] shrink-0 lg:block">
      <div className="absolute right-7 top-1 rotate-6">
        <div className="animate-[floatY_6s_ease-in-out_infinite] flex h-24 w-28 items-center justify-center rounded-[1.3rem] border border-white/70 bg-white/50 shadow-[0_18px_36px_-14px_rgba(124,58,237,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-white/10">
          <svg className="h-12 w-12 text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
      </div>
      <svg className="animate-[spin_44s_linear_infinite] absolute right-0 top-0 h-[110px] w-[170px] text-violet-400/70" style={{ transformOrigin: "center" }} viewBox="0 0 170 110" fill="none">
        <ellipse cx="85" cy="55" rx="82" ry="50" stroke="currentColor" strokeWidth="1.4" transform="rotate(-12 85 55)" />
      </svg>
      <span className="absolute right-[150px] top-[52px] h-2.5 w-2.5 rounded-full bg-violet-600" />
      <span className="absolute right-[8px] top-[16px] h-3 w-3 rounded-full bg-purple-500" />
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-[15px] text-slate-800 placeholder-slate-400 shadow-sm transition-all duration-200 " +
  "focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-100";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";

function FieldIcon({ d }) {
  return (
    <svg className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-violet-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function Contact() {
  useScrollReveal("#contact .reveal");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const statusRef = React.useRef(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  /* Estimator se bheji gayi inquiry prefill (sessionStorage handoff) —
     mount par bhi, aur estimator ke event par bhi (contact section
     home par pehle se mounted hota hai). */
  useEffect(() => {
    const applyPrefill = () => {
      let data = null;
      try {
        data = JSON.parse(sessionStorage.getItem("aa-prefill") || "null");
        if (data) sessionStorage.removeItem("aa-prefill");
      } catch {}
      if (!data) return;
      const subject = document.querySelector('input[name="subject"]');
      if (subject && data.subject) subject.value = data.subject;
      const message = document.querySelector('textarea[name="message"]');
      if (message && data.message) message.value = data.message;
    };
    applyPrefill();
    window.addEventListener("aa:prefill-apply", applyPrefill);
    return () => window.removeEventListener("aa:prefill-apply", applyPrefill);
  }, []);

  function validateField(name, value) {
    const newErrors = { ...errors };
    if (name === "name" && !value.trim()) {
      newErrors.name = "Name is required";
    } else if (name === "name") {
      delete newErrors.name;
    }
    if (name === "email" && !value.trim()) {
      newErrors.email = "Email is required";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      newErrors.email = "Please enter a valid email";
    } else if (name === "email") {
      delete newErrors.email;
    }
    if (name === "message" && !value.trim()) {
      newErrors.message = "Message is required";
    } else if (name === "message") {
      delete newErrors.message;
    }
    setErrors(newErrors);
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (touched[name]) {
      validateField(name, value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.trim() || "";
    const email = data.get("email")?.trim() || "";
    const subject = data.get("subject")?.trim() || "Project Inquiry";
    const message = data.get("message")?.trim() || "";
    const honeypot = data.get("website")?.trim() || "";

    // Min fill time check — bots submit instantly
    const fillTime = Date.now() - mountTimeRef.current;
    if (fillTime < MIN_FILL_TIME) {
      setStatus("error");
      statusRef.current?.focus();
      return;
    }

    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypot) {
      setStatus("sent");
      form.reset();
      mountTimeRef.current = Date.now();
      return;
    }

    // Validate all fields
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
    if (!message) newErrors.message = "Message is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, message: true });
      setStatus("error");
      statusRef.current?.focus();
      return;
    }

    // Web3Forms configured nahi hai → mailto fallback
    if (!WEB3FORMS_ACCESS_KEY) {
      const body = `Hi Abdullah,\n\n${message}\n\n— ${name}\n${email}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.reset();
      mountTimeRef.current = Date.now();
      return;
    }

    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject: `[Portfolio] ${subject}`,
          message: `${message}\n\n— ${name} (${email})`,
          from_name: "Portfolio Contact Form",
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Send failed");
      setStatus("sent");
      track("contact-submit");
      form.reset();
      mountTimeRef.current = Date.now();
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      statusRef.current?.focus();
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-16">
      <div aria-hidden className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Board header */}
        <div className="reveal mb-12 flex items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-300" />
              Contact
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[44px]">
              Have a Project in Mind?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              Let&apos;s build something intelligent, scalable, and meaningful. Tell me about your project or a role — I usually reply within a few hours.
            </p>
            <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
          </div>
          <EnvelopeArt />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.35fr]">
          {/* Contact information card */}
          <div className="flex h-full flex-col rounded-[1.8rem] border border-violet-100 bg-white p-4 shadow-[0_20px_50px_-24px_rgba(124,58,237,0.25)] dark:border-white/10 dark:bg-slate-900/70 sm:p-5">
            <div className="flex flex-1 flex-col justify-between gap-3">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.link}
                  {...(info.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-violet-100/80 p-4 transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md dark:border-white/[0.07] dark:hover:border-violet-400/30"
                >
                  <ContactTile kind={info.kind} />
                  <span className="hidden h-10 w-px bg-violet-100 dark:bg-white/[0.07] sm:block" aria-hidden />
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-bold text-slate-900 dark:text-white">
                      {info.title}
                    </span>
                    <span className="block truncate text-sm text-slate-500 dark:text-slate-400">
                      {info.value}
                    </span>
                  </span>
                  <svg className="ml-auto h-5 w-5 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-violet-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 dark:border-emerald-400/20 dark:bg-emerald-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[15px] font-semibold text-emerald-600 dark:text-emerald-300">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Contact form card */}
          <div className="relative rounded-[1.8rem] border border-violet-100 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(124,58,237,0.25)] dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
            <div className="mb-7 flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                <svg className="h-5.5 h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5M3 17l9 5 9-5" />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                  Let&apos;s talk about your project
                </h3>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  Share a few details and I&apos;ll get back to you.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot field — hidden from humans, bots will fill it */}
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FieldIcon d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className={`${inputClass} ${errors.name && touched.name ? "border-amber-400" : ""}`}
                      autoComplete="name"
                      required
                      aria-invalid={!!(errors.name && touched.name)}
                      aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && touched.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-amber-500" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <FieldIcon d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className={`${inputClass} ${errors.email && touched.email ? "border-amber-400" : ""}`}
                      autoComplete="email"
                      required
                      aria-invalid={!!(errors.email && touched.email)}
                      aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-amber-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className={labelClass}>
                  Subject <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <FieldIcon d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607l-9.58-9.581A2.25 2.25 0 009.568 3zM6 6h.008v.008H6V6z" />
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="Project title, role, or opportunity"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Tell me about your project... <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3.5 top-3.5 h-[18px] w-[18px] text-violet-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Share the goals, requirements, and any key details..."
                    rows={5}
                    maxLength={3000}
                    className={`${inputClass} resize-none ${errors.message && touched.message ? "border-amber-400" : ""}`}
                    required
                    aria-invalid={!!(errors.message && touched.message)}
                    aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                {errors.message && touched.message && (
                  <p id="message-error" className="mt-1.5 text-sm text-amber-500" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.9} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.875L5.999 12zm0 0h7.5" />
                  </svg>
                  {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send Message"}
                </button>
                <a
                  href="https://wa.link/o1bqnp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-emerald-300 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#1ebe5d]" fill="currentColor" aria-hidden>
                    <path d={siWhatsapp.path} />
                  </svg>
                  WhatsApp Me
                </a>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("Free Quote Request")}&body=${encodeURIComponent(
                    "Hi Abdullah,\n\nI'd like a quote for my project. Here are some details:\n- Project type: \n- Timeline: \n- Budget range: \n\nThanks!",
                  )}`}
                  className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-300"
                >
                  Get a Free Quote
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div ref={statusRef} role="status" aria-live="polite" className="min-h-[1.25rem]">
                {status === "sent" && (
                  <p className="text-sm font-medium text-emerald-500">
                    Message sent — I&apos;ll get back to you within a few hours.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm font-medium text-amber-500">
                    Something went wrong. Please email me directly at {EMAIL}.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 border-t border-violet-100 pt-5 text-sm text-slate-500 dark:border-white/[0.07] dark:text-slate-400">
                <svg className="h-[18px] w-[18px] text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Usually responds within a few hours
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
