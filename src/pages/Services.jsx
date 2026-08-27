import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";

const services = [
  {
    icon: "🤖",
    category: "AI Integration",
    items: ["Claude & LLM APIs", "Custom AI Chatbots", "AI Agents & Assistants", "RAG Applications"]
  },
  {
    icon: "⚡",
    category: "Workflow Automation",
    items: ["Make.com Scenarios", "n8n Workflows", "Webhooks & API Glue", "Business Process Automation"]
  },
  {
    icon: "📈",
    category: "GoHighLevel (GHL)",
    items: ["Funnel Building", "CRM Setup & Migration", "Automated Follow-ups", "White-label SaaS (SaaS Mode)"]
  },
  {
    icon: "🌐",
    category: "Web App Development",
    items: ["Custom Web Applications", "E-commerce Platforms", "Progressive Web Apps", "Admin Dashboards"]
  },
  {
    icon: "📱",
    category: "Mobile App Development",
    items: ["React Native Apps", "Cross-platform Solutions", "Native iOS/Android", "App Maintenance"]
  },
  {
    icon: "⚙️",
    category: "Backend Development",
    items: ["API Development", "Database Design", "Server Architecture", "Cloud Integration"]
  },
  {
    icon: "🎨",
    category: "Frontend Development",
    items: ["React Applications", "Responsive Design", "Performance Optimization", "UI/UX Implementation"]
  },
  {
    icon: "✨",
    category: "UI/UX Design",
    items: ["User Interface Design", "User Experience Design", "Prototyping", "Design Systems"]
  },
  {
    icon: "💳",
    category: "Payment Gateway",
    items: ["Stripe Integration", "PayPal Setup", "Payment Security", "Transaction Management"]
  }
];

const automationTools = ["GoHighLevel", "Make.com", "n8n", "Claude", "OpenAI", "Zapier"];

function Services() {
  useScrollReveal("#services .reveal");

  return (
    <section id="services" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Services"
          title="What I Can Build For You"
          subtitle="End-to-end product development — from first wireframe to production deployment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.category} data-stagger className="reveal group">
              <div className="glass rounded-2xl p-6 card-glow-hover hover:-translate-y-1.5 h-full transition-transform duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 border border-cyan-400/20 text-xl">
                    {service.icon}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {service.category}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center text-sm text-slate-400">
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full mr-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* AI & Automation spotlight */}
        <div className="reveal mt-14 relative overflow-hidden rounded-3xl glass-strong neon-ring p-8 md:p-10">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="text-center lg:text-left flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/15 border border-violet-400/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 blink-dot" />
                AI &amp; Automation
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                I don't just build apps — I automate entire businesses.
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                From GoHighLevel funnels &amp; CRM automations to Make.com scenarios, n8n workflows,
                and Claude-powered AI agents — I connect your tools so work happens on autopilot.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 shrink-0">
              {automationTools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center justify-center rounded-xl glass px-4 py-3 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-default whitespace-nowrap"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-14">
          <div className="relative overflow-hidden rounded-3xl glass-strong neon-ring p-10 text-center">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              Need Something Custom?
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Don't see exactly what you need? I'm always open to discussing custom
              solutions that fit your specific requirements and goals.
            </p>
            <MagneticButton href="#contact">Let's Discuss Your Project</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
