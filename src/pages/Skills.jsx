import React, { useState } from "react";
import SectionHeading from "../components/SectionHeading";
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
  { name: "AWS Bedrock", cat: "AI / GenAI", ...mono("AWS", "#ff9900", "#f97316") },
  { name: "n8n", cat: "AI / GenAI", icon: pick(siN8n) },
  { name: "Make.com", cat: "AI / GenAI", icon: pick(siMake) },
  { name: "GoHighLevel", cat: "AI / GenAI", ...mono("GHL", "#2dd4bf", "#22c55e") },
  { name: "Prompt Engineering", cat: "AI / GenAI", ...mono("✦", "#a855f7", "#6366f1") },
  // Cloud (AWS)
  { name: "AWS", cat: "Cloud (AWS)", ...mono("AWS", "#ff9900", "#f97316") },
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

const CATEGORIES = ["All", "Frontend", "Backend", "AI / GenAI", "Cloud (AWS)", "Tools"];

function SkillTile({ skill, index }) {
  return (
    <div
      className="skill-tile group flex flex-col items-center justify-center gap-2.5 rounded-2xl glass px-2 py-5 text-center transition-all duration-300 hover:scale-[1.03] hover:border-violet-400/40"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-400/20">
        {skill.mono ? (
          <span
            className="inline-flex h-[24px] items-center justify-center rounded-md px-1.5 text-[10px] font-bold"
            style={{
              background: `linear-gradient(135deg, ${skill.mono.from}22, ${skill.mono.to}22)`,
              border: `1px solid ${skill.mono.from}55`,
              color: skill.mono.from,
            }}
          >
            {skill.mono.label}
          </span>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d={skill.icon.path} fill={`#${skill.icon.hex}`} />
          </svg>
        )}
      </span>
      <span className="text-[13px] font-medium text-slate-200 leading-tight">
        {skill.name}
      </span>
    </div>
  );
}

function Skills() {
  const [active, setActive] = useState("All");
  const visible =
    active === "All" ? SKILLS : SKILLS.filter((s) => s.cat === active);

  return (
    <section id="skills" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Skills & Technologies"
          title="My Tech Stack"
          subtitle="The tools I actually design, build and ship production AI and web products with — grouped by what they do, no buzzword padding."
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Skill categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                active === cat
                  ? "text-white bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_10px_24px_-10px_rgba(124,58,237,0.6)]"
                  : "glass text-slate-300 hover:border-violet-400/40 hover:text-violet-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          key={active}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {visible.map((skill, i) => (
            <SkillTile key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
