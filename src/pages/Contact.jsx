import React, { Suspense, lazy, useState } from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import { IS_LOW_END } from "../lib/device";

const PaperPlane = lazy(() => import("../components/three/PaperPlane"));

const EMAIL = "abdullah.gc.18@gmail.com";
/* Web3Forms (free) — https://web3forms.com se email daal kar access key lein.
   Key khaali ho to form mailto: fallback use karta hai. */
const WEB3FORMS_ACCESS_KEY = "";

const contactInfo = [
  {
    icon: "📧",
    title: "Email",
    value: EMAIL,
    link: `mailto:${EMAIL}`
  },
  {
    icon: "📱",
    title: "Phone/WhatsApp",
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

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-200 placeholder-slate-500 " +
  "focus:border-cyan-400/60 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(34,211,238,0.12)] focus:outline-none transition-all duration-200";

function Contact() {
  useScrollReveal("#contact .reveal");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.trim() || "";
    const email = data.get("email")?.trim() || "";
    const subject = data.get("subject")?.trim() || "Project Inquiry";
    const message = data.get("message")?.trim() || "";

    if (!name || !email || !message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    // Web3Forms configured nahi hai → mailto fallback
    if (!WEB3FORMS_ACCESS_KEY) {
      const body = `Hi Abdullah,\n\n${message}\n\n— ${name}\n${email}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Contact"
          title="Let's Build Something Amazing Together"
          subtitle="Have a project in mind? Tell me about it — I usually reply within a few hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact information */}
          <div className="space-y-4 reveal">
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl glass card-glow-hover hover:-translate-y-0.5 transition-transform duration-300"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 border border-cyan-400/20 text-xl group-hover:scale-110 transition-transform">
                  {info.icon}
                </span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-100 text-sm">{info.title}</h4>
                  <p className="text-sm text-slate-400 truncate">{info.value}</p>
                </div>
                <svg
                  className="w-4 h-4 ml-auto text-slate-600 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all shrink-0"
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ))}

            <div className="flex items-center gap-3 p-4 rounded-2xl glass border-emerald-400/25">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-300 font-medium text-sm">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Contact form */}
          <div className="space-y-4 reveal">
            {/* Paper plane 3D visual */}
            <div className="relative h-40 sm:h-48 rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02]">
              <Suspense fallback={null}>
                <PaperPlane className="absolute inset-0" />
              </Suspense>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 glass rounded-3xl p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Your Name" className={inputClass} />
                <input type="email" name="email" placeholder="Your Email" className={inputClass} />
              </div>
              <input type="text" name="subject" placeholder="Subject" className={inputClass} />
              <textarea name="message" placeholder="Tell me about your project…" rows={5} className={`${inputClass} resize-none`} />

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                className="sheen-btn relative flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_28px_rgba(34,211,238,0.22)] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 disabled:cursor-wait"
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send Message"}
                <span className="sheen-layer" aria-hidden />
              </button>
              <a
                href="https://wa.link/o1bqnp."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl glass text-center text-slate-300 hover:text-emerald-300 hover:border-emerald-400/40 transition-colors text-sm font-medium"
              >
                WhatsApp Me
              </a>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Free Quote Request")}&body=${encodeURIComponent(
                  "Hi Abdullah,\n\nI'd like a quote for my project. Here are some details:\n- Project type: \n- Timeline: \n- Budget range: \n\nThanks!"
                )}`}
                className="px-6 py-3.5 rounded-xl glass text-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors text-sm font-medium"
              >
                Get a Free Quote
              </a>
            </div>
            {status === "sent" && (
              <p className="text-emerald-300 text-sm font-medium">
                Message sent — I'll get back to you within a few hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-amber-300 text-sm font-medium">
                Something went wrong. Email me directly at {EMAIL}.
              </p>
            )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
