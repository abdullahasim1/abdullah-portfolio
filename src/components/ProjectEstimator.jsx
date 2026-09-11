import React, { useMemo, useState } from "react";
import { scrollToSection } from "../lib/smoothScroll";
import { playClickSound, playSuccessSound } from "../lib/sound";

const projectTypes = [
  {
    id: "ai-automation",
    title: "AI Agents & Automation",
    desc: "Claude / LLM pipelines, Make.com, n8n, GHL",
    baseDays: 10,
    icon: "🤖",
  },
  {
    id: "fullstack",
    title: "Full Stack Web App",
    desc: "React/Next.js frontend + Node.js/MySQL backend",
    baseDays: 14,
    icon: "⚡",
  },
  {
    id: "saas-mvp",
    title: "SaaS / MVP Build",
    desc: "Fast-to-market production ready product",
    baseDays: 18,
    icon: "🚀",
  },
  {
    id: "frontend-ui",
    title: "UI/UX & Frontend",
    desc: "Modern animated web experience with GSAP & 3D",
    baseDays: 7,
    icon: "🎨",
  },
];

const featureList = [
  { id: "auth", title: "User Auth & Roles", days: 3 },
  { id: "ai-pipeline", title: "AI API / LLM Integration", days: 5 },
  { id: "payments", title: "Stripe / PayPal Gateway", days: 4 },
  { id: "admin", title: "Admin Analytics Dashboard", days: 4 },
  { id: "automation", title: "Make.com / n8n Workflows", days: 4 },
  { id: "database", title: "Custom Database & REST API", days: 4 },
  { id: "ghl", title: "GoHighLevel CRM Funnel Sync", days: 3 },
  { id: "seo-speed", title: "Advanced SEO & 60fps Optimization", days: 2 },
];

const timelines = [
  {
    id: "fast",
    label: "Fast-Track",
    multiplier: 0.85,
    note: "Priority sprint delivery",
  },
  {
    id: "standard",
    label: "Standard Pace",
    multiplier: 1.0,
    note: "Balanced milestone reviews",
  },
  {
    id: "flexible",
    label: "Iterative & Flexible",
    multiplier: 1.25,
    note: "Phased continuous deployment",
  },
];

export default function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState(projectTypes[0].id);
  const [selectedFeatures, setSelectedFeatures] = useState([
    "ai-pipeline",
    "auth",
    "admin",
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState("standard");

  const toggleFeature = (id) => {
    playClickSound();
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleTypeSelect = (id) => {
    playClickSound();
    setSelectedType(id);
  };

  const handleTimelineSelect = (id) => {
    playClickSound();
    setSelectedTimeline(id);
  };

  const calculation = useMemo(() => {
    const pType =
      projectTypes.find((t) => t.id === selectedType) || projectTypes[0];
    const feats = featureList.filter((f) => selectedFeatures.includes(f.id));
    const featureDays = feats.reduce((sum, f) => sum + f.days, 0);
    const timeline =
      timelines.find((t) => t.id === selectedTimeline) || timelines[1];

    const totalDays = Math.round(
      (pType.baseDays + featureDays) * timeline.multiplier,
    );
    const weeks = Math.max(1, Math.round(totalDays / 5));

    return {
      typeTitle: pType.title,
      featureCount: feats.length,
      featureNames: feats.map((f) => f.title),
      estimatedWeeks: `${weeks}–${weeks + 1} Weeks`,
      estimatedDays: `~${totalDays} business days`,
    };
  }, [selectedType, selectedFeatures, selectedTimeline]);

  const handleSendInquiry = () => {
    playSuccessSound();
    const message = `Hi Abdullah,\n\nI used your interactive Project Estimator:\n- Project Type: ${calculation.typeTitle}\n- Selected Features: ${calculation.featureNames.join(", ")}\n- Estimated Timeline: ${calculation.estimatedWeeks} (${calculation.estimatedDays})\n\nLet's discuss details and next steps!`;

    // Fill contact textarea if present
    const textarea = document.querySelector('textarea[name="message"]');
    if (textarea) {
      textarea.value = message;
    }
    const subject = document.querySelector('input[name="subject"]');
    if (subject) {
      subject.value = `[Estimator] ${calculation.typeTitle} Project Inquiry`;
    }

    scrollToSection("contact");
  };

  return (
    <div className="reveal mt-16 rounded-3xl bento-card p-6 sm:p-10">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
          Interactive Tool
        </span>
      </div>
      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
        Project Scope &amp; Timeline Estimator
      </h3>
      <p className="text-slate-400 text-sm max-w-2xl mb-8 leading-relaxed">
        Select your project specs below to get an instant scope estimate, and
        send it directly to my inbox with one click.
      </p>

      {/* Step 1: Project Type */}
      <div className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3">
          1. Choose Project Type
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {projectTypes.map((t) => {
            const isSelected = t.id === selectedType;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTypeSelect(t.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    : "glass hover:bg-white/[0.06] border border-white/[0.08]"
                }`}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <div className="font-display font-semibold text-white text-sm">
                  {t.title}
                </div>
                <div className="text-xs text-slate-400 mt-1 leading-snug">
                  {t.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Features */}
      <div className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3">
          2. Select Key Features &amp; Modules
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {featureList.map((f) => {
            const isChecked = selectedFeatures.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggleFeature(f.id)}
                className={`px-3.5 py-3 rounded-xl text-left text-xs font-medium transition-all duration-150 flex items-center gap-2.5 cursor-pointer ${
                  isChecked
                    ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-200"
                    : "bg-white/[0.03] border border-white/[0.07] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] shrink-0 border ${
                    isChecked
                      ? "bg-cyan-400 border-cyan-300 text-black font-bold"
                      : "border-slate-600"
                  }`}
                >
                  {isChecked ? "✓" : ""}
                </span>
                <span className="truncate">{f.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Timeline & Result Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] items-center">
        {/* Timeline selection */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            3. Preferred Delivery Pace
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {timelines.map((tm) => {
              const isSelected = tm.id === selectedTimeline;
              return (
                <button
                  key={tm.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleTimelineSelect(tm.id)}
                  className={`p-3.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-violet-500/20 border border-violet-400/50 text-white shadow-[0_0_16px_rgba(139,92,246,0.25)]"
                      : "glass hover:bg-white/[0.05] border border-white/[0.08] text-slate-400"
                  }`}
                >
                  <div className="font-semibold text-slate-200">{tm.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {tm.note}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Estimate Summary Box */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-cyan-500/10 via-black/40 to-violet-500/15 border border-cyan-400/30 flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
              Estimated Timeline
            </span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-gradient mt-1">
              {calculation.estimatedWeeks}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {calculation.estimatedDays} ({calculation.featureCount} modules
              selected)
            </div>
          </div>

          <button
            type="button"
            onClick={handleSendInquiry}
            className="sheen-btn mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(34,211,238,0.25)]"
          >
            Send Scope as Inquiry →
            <span className="sheen-layer" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
