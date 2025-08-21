import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const skills = {
  "Frontend Development": [
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "HTML/CSS", level: 95 },
    { name: "Tailwind CSS", level: 92 },
  ],
  "Backend Development": [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 88 },
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "RESTful APIs", level: 92 },
  ],
  "Mobile & Tools": [
    { name: "React Native", level: 82 },
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 75 },
    { name: "AWS/Vercel", level: 80 },
    { name: "Figma", level: 85 },
  ],
};

function Skills() {
  useScrollReveal("#skills .reveal");
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto text-left">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Skills & Expertise</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="reveal rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6">
              <h3 className="font-semibold mb-4 text-lg">{category}</h3>
              <div className="space-y-4">
                {skillList.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;


