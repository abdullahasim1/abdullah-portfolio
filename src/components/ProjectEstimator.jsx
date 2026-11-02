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

/* Emoji ki jagah board-style SVG icons */
function TypeIcon({ id }) {
  const cls = "h-6 w-6";
  const common = { className: cls, fill: "none", stroke: "currentColor", strokeWidth: 1.6, viewBox: "0 0 24 24" };
  if (id === "ai-automation")
    return (
      <svg {...common}>
        <rect x="7.5" y="7.5" width="9" height="9" rx="2" />
        <path strokeLinecap="round" d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M19 5l-2 2M5 19l2-2M19 19l-2-2" />
      </svg>
    );
  if (id === "fullstack")
    return (
      <svg {...common}>
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
        <path strokeLinecap="round" d="M3 9h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5L7 15l2.5 2.5m5-5L17 15l-2.5 2.5" />
      </svg>
    );
  if (id === "saas-mvp")
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9.5l9 5 9-5M3 17.5l9 5 9-5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  );
}

function PaceIcon({ id }) {
  const cls = "h-5 w-5";
  const common = { className: cls, fill: "none", stroke: "currentColor", strokeWidth: 1.6, viewBox: "0 0 24 24" };
  if (id === "fast")
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    );
  if (id === "standard")
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9.5l9 5 9-5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 12a8.5 8.5 0 11-2.48-6.02M18.6 2.8v4h-4" />
    </svg>
  );
}

function RadioDot({ selected }) {
  return (
    <span
      aria-hidden
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
        selected ? "border-violet-600 bg-violet-600" : "border-slate-300 dark:border-white/20"
      }`}
    >
      {selected && (
        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={3.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>
  );
}

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

  const paceLabel =
    timelines.find((t) => t.id === selectedTimeline)?.label || "Standard Pace";

  /* Animated progress: type hamesha set, features >= 1, pace hamesha set */
  const stepDone = [true, selectedFeatures.length > 0, true];
  const doneCount = stepDone.filter(Boolean).length;
  const stepLabels = ["Project Type", "Key Features", "Delivery Pace"];

  return (
    <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
      {/* Left: configurator */}
      <div className="rounded-[1.8rem] border border-violet-100 bg-white p-6 shadow-[0_16px_44px_-20px_rgba(124,58,237,0.22)] dark:border-white/10 dark:bg-slate-900/70 sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.5 2.355 1.272m-6.71 0H7.497c-.902 0-1.652.586-1.93 1.415M5.25 6.75A2.25 2.25 0 003 9v9.75A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V9a2.25 2.25 0 00-2.25-2.25h-3.4" />
              </svg>
            </span>
            <div>
              <h3 className="font-display text-[22px] font-extrabold leading-tight text-slate-900 dark:text-white sm:text-2xl">
                Project Scope &amp; Timeline Estimator
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Select your project type, key features, and delivery pace to get an estimated timeline.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-semibold text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            {doneCount} of 3 steps set
          </span>
        </div>

        {/* Animated steps progress */}
        <div className="mt-8">
          <div className="flex items-center">
            {stepLabels.map((label, i) => (
              <React.Fragment key={label}>
                <span className="flex items-center gap-2.5">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-bold transition-all duration-500 ${
                      stepDone[i]
                        ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30"
                        : "border-2 border-violet-200 text-violet-400 dark:border-white/15"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`hidden text-[13px] font-semibold transition-colors duration-500 min-[480px]:block ${
                      stepDone[i] ? "text-violet-700 dark:text-violet-300" : "text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                </span>
                {i < stepLabels.length - 1 && (
                  <span className="relative mx-3 h-[3px] flex-1 overflow-hidden rounded-full bg-violet-100 dark:bg-white/10 sm:mx-4">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-700 ease-out"
                      style={{ width: stepDone[i + 1] ? "100%" : "0%" }}
                    />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Project Type */}
        <div className="mt-9">
          <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-300">
            1. Choose Project Type
          </h4>
          <div className="mt-3.5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
            {projectTypes.map((t) => {
              const isSelected = t.id === selectedType;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTypeSelect(t.id)}
                  aria-pressed={isSelected}
                  className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-violet-500 bg-violet-50 shadow-[0_12px_32px_-10px_rgba(124,58,237,0.5)] dark:border-violet-400/60 dark:bg-violet-500/10"
                      : "border-violet-100 bg-white hover:border-violet-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-400/40"
                  }`}
                >
                  <span className="absolute right-3.5 top-3.5">
                    <RadioDot selected={isSelected} />
                  </span>
                  <span className={isSelected ? "text-violet-600 dark:text-violet-300" : "text-slate-400 dark:text-slate-500"}>
                    <TypeIcon id={t.id} />
                  </span>
                  <span className="mt-3 block font-display text-sm font-bold leading-snug text-slate-900 dark:text-white">
                    {t.title}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-slate-500 dark:text-slate-400">
                    {t.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Features */}
        <div className="mt-9">
          <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-300">
            2. Select Key Features &amp; Modules
          </h4>
          <div className="mt-3.5 grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {featureList.map((f) => {
              const isChecked = selectedFeatures.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  role="checkbox"
                  aria-checked={isChecked}
                  onClick={() => toggleFeature(f.id)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                    isChecked
                      ? "border-violet-400 bg-violet-50 text-violet-700 shadow-[0_8px_22px_-10px_rgba(124,58,237,0.45)] dark:border-violet-400/50 dark:bg-violet-500/10 dark:text-violet-200"
                      : "border-violet-100 text-slate-500 hover:border-violet-300 hover:text-slate-700 dark:border-white/10 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors duration-200 ${
                      isChecked ? "border-violet-600 bg-violet-600" : "border-slate-300 dark:border-white/20"
                    }`}
                  >
                    {isChecked && (
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={3.4} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="leading-snug">{f.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Timeline */}
        <div className="mt-9">
          <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600 dark:text-violet-300">
            3. Preferred Delivery Pace
          </h4>
          <div className="mt-3.5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-3">
            {timelines.map((tm) => {
              const isSelected = tm.id === selectedTimeline;
              return (
                <button
                  key={tm.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleTimelineSelect(tm.id)}
                  className={`relative rounded-2xl border-2 p-4 text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-violet-500 bg-violet-50 shadow-[0_12px_32px_-10px_rgba(124,58,237,0.5)] dark:border-violet-400/60 dark:bg-violet-500/10"
                      : "border-violet-100 bg-white hover:border-violet-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-400/40"
                  }`}
                >
                  <span className="absolute right-3.5 top-3.5">
                    <RadioDot selected={isSelected} />
                  </span>
                  <span className={`flex items-center gap-2 ${isSelected ? "text-violet-600 dark:text-violet-300" : "text-slate-400 dark:text-slate-500"}`}>
                    <PaceIcon id={tm.id} />
                    <span className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      {tm.label}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-xs leading-snug text-slate-500 dark:text-slate-400">
                    {tm.note}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: summary panel */}
      <aside className="overflow-hidden rounded-[1.8rem] border border-violet-100 bg-white shadow-[0_16px_44px_-20px_rgba(124,58,237,0.3)] dark:border-white/10 dark:bg-slate-900/70 lg:sticky lg:top-28">
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 sm:p-7">
          <div aria-hidden className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10 blur-md" />
          <div className="relative flex items-center gap-2 text-sm font-medium text-violet-100">
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Estimated Timeline
          </div>
          {/* Animated number transition */}
          <div
            key={calculation.estimatedWeeks}
            className="animate-[fadeUpSm_.45s_ease] relative mt-3 font-display text-4xl font-extrabold text-white"
          >
            {calculation.estimatedWeeks}
          </div>
          <p key={calculation.estimatedDays + paceLabel} className="animate-[fadeUpSm_.45s_ease] relative mt-1.5 text-sm text-violet-100">
            {calculation.estimatedDays} ({paceLabel})
          </p>
        </div>

        <div className="p-6 sm:p-7">
          <h4 className="flex items-center gap-2.5 font-display text-base font-extrabold text-slate-900 dark:text-white">
            <svg className="h-5 w-5 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Project Summary
          </h4>
          <dl className="mt-4">
            <div className="flex items-center justify-between gap-4 border-b border-dashed border-violet-100 py-3 dark:border-white/10">
              <dt className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <svg className="h-[18px] w-[18px] text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9.5l9 5 9-5" />
                </svg>
                Selected Modules
              </dt>
              <dd key={calculation.featureCount} className="animate-[fadeUpSm_.45s_ease] text-sm font-bold text-slate-900 dark:text-white">
                {calculation.featureCount} modules
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-dashed border-violet-100 py-3 dark:border-white/10">
              <dt className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <svg className="h-[18px] w-[18px] text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9.5l9 5 9-5" />
                </svg>
                Project Type
              </dt>
              <dd key={calculation.typeTitle} className="animate-[fadeUpSm_.45s_ease] text-right text-sm font-bold text-slate-900 dark:text-white">
                {calculation.typeTitle}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                <svg className="h-[18px] w-[18px] text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.5a9 9 0 1115 0M12 15l4.2-4.2M3.5 19.5h17" />
                </svg>
                Delivery Pace
              </dt>
              <dd key={paceLabel} className="animate-[fadeUpSm_.45s_ease] text-sm font-bold text-slate-900 dark:text-white">
                {paceLabel}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={handleSendInquiry}
            className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90"
          >
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            Send Scope as Inquiry
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <p className="mt-5 flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Get a detailed proposal, timeline and cost estimate for your project.
          </p>
        </div>
      </aside>
    </div>
  );
}
