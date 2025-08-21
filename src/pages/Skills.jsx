import React from "react";
import { useStaggerAnimation, useTextReveal } from "../hooks";

const skills = {
  "Frontend Development": [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Next.js", level: 75 }
  ],
  "Backend Development": [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 80 },
    { name: "Python", level: 70 },
    { name: "MySQL", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "REST APIs", level: 85 }
  ],
  "Mobile & Tools": [
    { name: "React Native", level: 75 },
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 65 },
    { name: "AWS", level: 60 },
    { name: "Figma", level: 70 },
    { name: "GSAP", level: 80 }
  ]
};

function Skills() {
  const staggerRef = useStaggerAnimation(0.1, 0.3);
  const headingRef = useTextReveal("words", 0.2);

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Skills & Expertise
          </span>
          <div ref={headingRef} className="text-3xl md:text-4xl font-extrabold mt-2">
            Technical Skills
          </div>
        </div>
        
        <div ref={staggerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} data-stagger className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                {category}
              </h3>
              <div className="space-y-4">
                {skillList.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
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


