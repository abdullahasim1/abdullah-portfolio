import React, { useLayoutEffect, useRef, useState } from "react";
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siTailwindcss,
  siHtml5,
  siCss,
  siNodedotjs,
  siExpress,
  siPython,
  siPostgresql,
  siMongodb,
  siMysql,
  siClaude,
  siN8n,
  siMake,
  siGit,
  siGithub,
  siDocker,
  siFigma,
  siGsap,
  siServerless,
} from "simple-icons";
import { useScrollReveal } from "../hooks";

/* Dark backgrounds pe black logos dikhte nahi — white fallback
   (light mode mein CSS net inhe slate-900 kar deta hai). */
const pick = (si) => ({
  hex: si.hex === "000000" ? "FFFFFF" : si.hex,
  path: si.path,
});

const mono = (label, from, to) => ({ mono: { label, from, to } });

/* Sirf wohi technologies jo Abdullah ke real projects/CV mein hain.
   Koi proficiency bars/percentages nahi — prompt + honesty rule. */
const SKILLS = [
  // Frontend
  { name: "React", cat: "Frontend", icon: pick(siReact) },
  { name: "Next.js", cat: "Frontend", icon: pick(siNextdotjs) },
  { name: "TypeScript", cat: "Frontend", icon: pick(siTypescript) },
  { name: "JavaScript", cat: "Frontend", icon: pick(siJavascript) },
  { name: "Tailwind CSS", cat: "Frontend", icon: pick(siTailwindcss) },
  { name: "HTML5", cat: "Frontend", icon: pick(siHtml5) },
  { name: "CSS3", cat: "Frontend", icon: pick(siCss) },
  // Backend
  { name: "Node.js", cat: "Backend", icon: pick(siNodedotjs) },
  { name: "Express.js", cat: "Backend", icon: pick(siExpress) },
  { name: "Python", cat: "Backend", icon: pick(siPython) },
  { name: "PostgreSQL", cat: "Backend", icon: pick(siPostgresql) },
  { name: "MongoDB", cat: "Backend", icon: pick(siMongodb) },
  { name: "MySQL", cat: "Backend", icon: pick(siMysql) },
  { name: "REST APIs", cat: "Backend", ...mono("API", "#8b5cf6", "#6366f1") },
  // AI / GenAI
  { name: "Claude (Anthropic)", cat: "AI / GenAI", icon: pick(siClaude) },
  { name: "OpenAI APIs", cat: "AI / GenAI", ...mono("AI", "#14b8a6", "#0ea5e9") },
  { name: "AWS Bedrock", cat: "AI / GenAI", img: "/logos/aws.svg", imgDark: "/logos/aws-white.svg" },
  { name: "n8n", cat: "AI / GenAI", icon: pick(siN8n) },
  { name: "Make.com", cat: "AI / GenAI", icon: pick(siMake) },
  { name: "GoHighLevel", cat: "AI / GenAI", ...mono("GHL", "#2dd4bf", "#22c55e") },
  { name: "Prompt Engineering", cat: "AI / GenAI", ...mono("✦", "#a855f7", "#6366f1") },
  // Cloud (AWS)
  { name: "AWS", cat: "Cloud (AWS)", img: "/logos/aws.svg", imgDark: "/logos/aws-white.svg" },
  { name: "Lambda", cat: "Cloud (AWS)", ...mono("λ", "#ff9900", "#f97316") },
  { name: "S3", cat: "Cloud (AWS)", ...mono("S3", "#84cc16", "#22c55e") },
  { name: "DynamoDB", cat: "Cloud (AWS)", ...mono("DB", "#38bdf8", "#6366f1") },
  { name: "API Gateway", cat: "Cloud (AWS)", ...mono("API", "#f472b6", "#a855f7") },
  { name: "Serverless", cat: "Cloud (AWS)", icon: pick(siServerless) },
  // Tools
  { name: "Git", cat: "Tools", icon: pick(siGit) },
  { name: "GitHub", cat: "Tools", icon: pick(siGithub) },
  { name: "Docker", cat: "Tools", icon: pick(siDocker) },
  { name: "Figma", cat: "Tools", icon: pick(siFigma) },
  { name: "GSAP", cat: "Tools", icon: pick(siGsap) },
  { name: "VS Code", cat: "Tools", ...mono("VS", "#38bdf8", "#6366f1") },
];

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "AI / GenAI", value: "AI / GenAI" },
  { label: "Cloud & AWS", value: "Cloud (AWS)" },
  { label: "Tools", value: "Tools" },
];

/* Group icons — board style stroke SVGs */
const GroupIcon = ({ d, ellipse }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ellipse && <ellipse cx="12" cy="5" rx="8" ry="3" />}
    {d.map((path, i) => (
      <path key={i} d={path} />
    ))}
  </svg>
);

const GROUPS = [
  {
    id: "frontend",
    title: "Frontend & UI",
    sub: "Building modern, responsive and delightful UIs.",
    cats: ["Frontend"],
    projects: "Four-AI Platform · Upmatch · Portfolio Website",
    icon: <GroupIcon d={["M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z", "M12 16v3", "M8.5 21h7"]} />,
  },
  {
    id: "backend",
    title: "Backend & Data",
    sub: "APIs, server logic and scalable data solutions.",
    cats: ["Backend"],
    projects: "Four-AI Platform · HireGen AI · Business Help",
    icon: <GroupIcon ellipse d={["M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5", "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"]} />,
  },
  {
    id: "aicloud",
    title: "AI, Cloud & Automation",
    sub: "Generative AI, cloud services and workflow automation.",
    cats: ["AI / GenAI", "Cloud (AWS)"],
    projects: "Events Agent · Business Help · HireGen AI",
    icon: <GroupIcon d={["M17.5 19a4.5 4.5 0 0 0 .9-8.9A7 7 0 0 0 4.6 8.6 5.5 5.5 0 0 0 6 19h11.5Z"]} />,
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    sub: "Developer tools for productivity, collaboration and faster development.",
    cats: ["Tools"],
    projects: "Daily workflow across all 25+ shipped projects",
    bar: true,
    icon: <GroupIcon d={["m12 3 9.5 5L12 13 2.5 8 12 3Z", "m2.5 13 9.5 5 9.5-5"]} />,
  },
];

function SkillTile({ skill, index }) {
  return (
    <div
      className="skill-tile group flex items-center gap-3 rounded-2xl border border-white/10 light:border-slate-200/90 bg-white/[0.04] light:bg-white px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/50 light:hover:border-violet-300 hover:shadow-[0_14px_28px_-14px_rgba(124,58,237,0.45)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span
        className="animate-[floatY_5s_ease-in-out_infinite] inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-violet-500/10 light:bg-violet-50 border border-violet-400/15 light:border-violet-100"
        style={{ animationDelay: `${(index % 6) * 0.4}s` }}
      >
        {skill.img ? (
          <span className="flex w-[38px] items-center justify-center">
            <img src={skill.img} alt="" aria-hidden="true" className="max-h-[17px] w-auto max-w-[38px] object-contain dark:hidden" />
            <img src={skill.imgDark} alt="" aria-hidden="true" className="hidden max-h-[17px] w-auto max-w-[38px] object-contain dark:block" />
          </span>
        ) : skill.mono ? (
          <span
            className="inline-flex h-[22px] items-center justify-center rounded-md px-1 text-[9.5px] font-bold"
            style={{
              background: `linear-gradient(135deg, ${skill.mono.from}22, ${skill.mono.to}22)`,
              border: `1px solid ${skill.mono.from}55`,
              color: skill.mono.from,
            }}
          >
            {skill.mono.label}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
            <path d={skill.icon.path} fill={`#${skill.icon.hex}`} />
          </svg>
        )}
      </span>
      <span className="min-w-0 text-[13px] font-semibold text-slate-100 light:text-slate-800 leading-tight">
        {skill.name}
      </span>
    </div>
  );
}

function GroupHeader({ group, count }) {
  return (
    <div className="flex items-start gap-3.5 mb-5">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/12 light:bg-violet-100/80 text-violet-300 light:text-violet-600 border border-violet-400/20 light:border-violet-200/70">
        {group.icon}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[19px] font-bold text-white light:text-slate-900 leading-snug">
          {group.title}
        </h3>
        <p className="text-[12.5px] text-slate-400 light:text-slate-500 leading-snug mt-0.5">
          {group.sub}
        </p>
      </div>
      {count != null && (
        <span className="shrink-0 rounded-full bg-violet-500/12 light:bg-violet-100 px-2.5 py-1 text-[11px] font-bold text-violet-300 light:text-violet-600">
          {count} Tools
        </span>
      )}
    </div>
  );
}

function Skills() {
  /* Section-level scroll reveal (header + filter row) — baqi sections
     wala shared hook. Group cards is hook se bahar hain: woh filter
     switch par re-mount hote hain aur un ki apni fadeUpSm entrance
     animation hi un ka interaction feedback hai (double animation
     se bachne ke liye cards par .reveal nahi lagaya). */
  useScrollReveal("#skills .reveal");

  const [active, setActive] = useState("All");

  /* Sliding active indicator — active pill ke peeche gradient bar slide
     hota hai (motion spec §8). */
  const btnRefs = useRef({});
  const [ind, setInd] = useState({ x: 0, y: 0, w: 0, ready: false });
  useLayoutEffect(() => {
    const measure = () => {
      const btn = btnRefs.current[active];
      if (btn) setInd({ x: btn.offsetLeft, y: btn.offsetTop, w: btn.offsetWidth, ready: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const tilesFor = (group) => {
    if (active === "All") {
      return SKILLS.filter((s) => group.cats.includes(s.cat));
    }
    if (group.cats.includes(active)) {
      return SKILLS.filter((s) => s.cat === active);
    }
    return null;
  };

  const visibleGroups = GROUPS.map((group) => ({ group, tiles: tilesFor(group) })).filter(
    (entry) => entry.tiles && entry.tiles.length > 0
  );
  const cardGroups = visibleGroups.filter((e) => !e.group.bar);
  const barGroups = visibleGroups.filter((e) => e.group.bar);
  const single = active !== "All";

  const tileCols = (group) => {
    if (single) return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    return group.id === "aicloud" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2";
  };

  return (
    <section id="skills" className="py-16 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header — board layout: left title block, right cube + availability */}
        <div className="reveal flex flex-wrap items-start justify-between gap-8 mb-10">
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-400/25 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 light:text-violet-600">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Skills & Technologies
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 leading-tight">
              My Tech Stack
            </h2>
            <p className="text-slate-400 light:text-slate-500 max-w-xl leading-relaxed">
              The tools I use to design, build and ship production AI and web products.
            </p>
          </div>

          <div className="flex items-center gap-7">
            <div className="relative hidden xl:block w-[230px] h-[150px]" aria-hidden="true">
              <div
                className="absolute left-1/2 top-1/2 h-[128px] w-[228px] rounded-[50%] border border-violet-400/40 light:border-violet-300/70"
                style={{ transform: "translate(-50%, -46%) rotateX(64deg) rotate(-10deg)" }}
              />
              <span className="absolute left-[16px] top-[86px] h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.7)]" />
              <span className="absolute right-[12px] top-[38px] h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_2px_rgba(129,140,248,0.7)]" />
              <div className="float-y absolute left-[67px] top-[27px] grid h-24 w-24 place-items-center rounded-[26px] border border-white/50 bg-gradient-to-br from-violet-400/85 via-indigo-400/75 to-fuchsia-300/75 shadow-[0_24px_45px_-15px_rgba(124,58,237,0.55)] backdrop-blur">
                <span className="font-mono text-[25px] font-bold text-white">&lt;/&gt;</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2.5">
              <span className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-[13px] font-semibold text-slate-100 light:text-slate-800">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Available for Projects
              </span>
              <span className="text-[12px] text-slate-400 light:text-slate-500">
                Full-Stack • AI • Cloud • Automation
              </span>
            </div>
          </div>
        </div>

        {/* Filter pills — sliding gradient indicator */}
        <div className="reveal relative flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Skill categories">
          <span
            aria-hidden
            className="absolute left-0 top-0 h-9 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_10px_24px_-10px_rgba(124,58,237,0.6)] transition-all duration-300 ease-out"
            style={{
              width: ind.w,
              transform: `translate(${ind.x}px, ${ind.y}px)`,
              opacity: ind.ready ? 1 : 0,
            }}
          />
          {FILTERS.map((f) => (
            <button
              key={f.value}
              ref={(el) => {
                btnRefs.current[f.value] = el;
              }}
              role="tab"
              aria-selected={active === f.value}
              onClick={() => setActive(f.value)}
              className={`relative z-10 h-9 px-5 rounded-full text-[13px] font-semibold transition-colors duration-300 cursor-pointer ${
                active === f.value
                  ? "text-white"
                  : "glass text-slate-300 light:text-slate-600 hover:border-violet-400/40 hover:text-violet-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Group cards */}
        {cardGroups.length > 0 && (
          <div
            key={active}
            className={`grid gap-6 ${single ? "" : "lg:grid-cols-[1fr_1fr_1.45fr]"}`}
          >
            {cardGroups.map(({ group, tiles }) => (
              <article
                key={group.id}
                className="animate-[fadeUpSm_.5s_cubic-bezier(0.22,1,0.36,1)_both] rounded-[26px] border border-white/10 light:border-violet-100 bg-white/[0.03] light:bg-white/80 p-6 shadow-[0_20px_45px_-25px_rgba(76,29,149,0.35)]"
              >
                <GroupHeader group={group} count={tiles.length} />
                <div className={`grid gap-3 ${tileCols(group)}`}>
                  {tiles.map((skill, i) => (
                    <SkillTile key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
                {group.projects && (
                  <p className="mt-5 border-t border-white/[0.07] light:border-slate-200/80 pt-4 text-[12px] leading-relaxed text-slate-400 light:text-slate-500">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-violet-400 light:text-violet-500">
                      In production —{" "}
                    </span>
                    {group.projects}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Tools & Workflow bar */}
        {barGroups.map(({ group, tiles }) => (
          <article
            key={`${group.id}-${active}`}
            className="mt-6 rounded-[26px] border border-white/10 light:border-violet-100 bg-white/[0.03] light:bg-white/80 p-6 shadow-[0_20px_45px_-25px_rgba(76,29,149,0.35)]"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="lg:w-72 shrink-0">
                <GroupHeader group={group} count={null} />
              </div>
              <div className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {tiles.map((skill, i) => (
                  <SkillTile key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
            {group.projects && (
              <p className="mt-5 border-t border-white/[0.07] light:border-slate-200/80 pt-4 text-[12px] leading-relaxed text-slate-400 light:text-slate-500">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-violet-400 light:text-violet-500">
                  In production —{" "}
                </span>
                {group.projects}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
