import React, { useEffect, useRef, Suspense, lazy } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/SectionHeading";
import { IS_LOW_END } from "../lib/device";
import { skillsShapes } from "../data/shapes";

const FloatingShapes = lazy(() => import("../components/three/FloatingShapes"));

gsap.registerPlugin(ScrollTrigger);

const skills = {
  "AI & Automation": {
    icon: "🤖",
    items: [
      { name: "GoHighLevel (GHL)", level: 90 },
      { name: "Make.com", level: 90 },
      { name: "n8n", level: 85 },
      { name: "Claude / LLM APIs", level: 85 },
      { name: "OpenAI APIs", level: 80 },
      { name: "Prompt Engineering", level: 88 }
    ]
  },
  "Frontend": {
    icon: "🎨",
    items: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Next.js", level: 75 }
    ]
  },
  "Backend": {
    icon: "⚙️",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Python", level: 70 },
      { name: "MySQL", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "REST APIs", level: 85 }
    ]
  },
  "Mobile & Tools": {
    icon: "🧰",
    items: [
      { name: "React Native", level: 75 },
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 65 },
      { name: "AWS", level: 60 },
      { name: "Figma", level: 70 },
      { name: "GSAP", level: 80 }
    ]
  }
};

function SkillBar({ name, level }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      }
    );
    return () => tween.kill();
  }, [level]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-300">{name}</span>
        <span className="font-mono text-xs text-cyan-300/80">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, icon, items }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div 
      ref={cardRef}
      className="glass rounded-2xl p-7 card-glow-hover transition-transform duration-200 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-white/[0.06]">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 border border-cyan-400/20 text-lg">
          {icon}
        </span>
        <h3 className="font-display text-lg font-semibold text-slate-100">{category}</h3>
      </div>
      <div className="space-y-5">
        {items.map((skill) => (
          <SkillBar key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* 3D Floating shapes background */}
      {!IS_LOW_END && (
        <Suspense fallback={null}>
          <FloatingShapes shapes={skillsShapes} />
        </Suspense>
      )}
      
      <div className="max-w-6xl mx-auto px-6 md:px-0 relative z-10">
        <SectionHeading
          label="Skills & Expertise"
          title="Technical Arsenal"
          subtitle="The tools and technologies I use to ship production-grade products."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, { icon, items }]) => (
            <SkillCard key={category} category={category} icon={icon} items={items} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
