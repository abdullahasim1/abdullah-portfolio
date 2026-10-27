import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import { timeline } from "../data/experience";

const strengths = [
  {
    icon: "🧩",
    title: "Problem Solver",
    desc: "I break complex challenges into manageable solutions, keeping your project on track and results-driven.",
  },
  {
    icon: "⌨️",
    title: "Clean Code Advocate",
    desc: "Maintainable, scalable code that grows with your business and makes future updates effortless.",
  },
  {
    icon: "🎯",
    title: "User-Focused Designer",
    desc: "Every pixel and interaction is crafted for your users — experiences that convert and delight.",
  },
  {
    icon: "⚡",
    title: "Fast & Reliable",
    desc: "Quick turnaround without compromising quality. Your deadlines are my deadlines.",
  },
  {
    icon: "💬",
    title: "Communication Pro",
    desc: "Regular updates, clear explanations, and always available to discuss progress.",
  },
  {
    icon: "🚀",
    title: "Future-Proof Tech",
    desc: "Cutting-edge technologies that keep your product competitive and scalable for years.",
  },
];

function About() {
  useScrollReveal("#about .reveal");

  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          scene="01"
          label="About Me"
          title="Turning Ideas Into Digital Reality"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 reveal">
            <div className="space-y-5 text-slate-400 leading-relaxed light:text-slate-600">
              <p>
                I'm an{" "}
                <span className="text-cyan-300 font-medium">
                  AI Cloud Engineer &amp; Full-Stack Developer at Experts Cloud
                </span>
                , specializing in Generative AI, AWS cloud and business
                automation. As an{" "}
                <span className="text-violet-300 font-medium">
                  AWS Certified Generative AI Developer (Professional, Early
                  Adopter)
                </span>{" "}
                and Claude Certified Architect, I build production AI systems
                end to end — Bedrock-powered apps, RAG architectures and
                serverless backends on Lambda, S3, DynamoDB and API Gateway.
              </p>
              <p>
                Alongside that, I build intelligent automations with n8n,
                Make.com and GoHighLevel that cut manual work and operating
                cost, and I run DevRox — my AI &amp; automation agency for
                client projects. With 25+ projects shipped, from
                secret-management platforms to AI hiring automation, I turn
                complex requirements into scalable, secure, production-ready
                products.
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-5 border-t border-white/[0.06] light:border-[#e8e4da]">
                {[
                  ["3+", "Years Experience"],
                  ["25+", "Projects Shipped"],
                  ["11+", "Certifications"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-2xl font-bold text-gradient">
                      {num}
                    </div>
                    <div className="text-xs text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-xl font-medium text-white reveal light:text-slate-900">
              My Strengths &amp; What They Mean for You
            </h3>
            <div className="divide-y divide-white/[0.06] light:divide-[#e8e4da]">
              {strengths.map((strength) => (
                <div key={strength.title} className="reveal flex gap-4 py-5">
                  <div className="text-2xl shrink-0">{strength.icon}</div>
                  <div>
                    <h4 className="font-display font-medium text-slate-100 mb-1">
                      {strength.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed light:text-slate-600">
                      {strength.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience & milestones timeline */}
        <div className="mt-24">
          <h3 className="reveal font-display text-2xl md:text-3xl font-bold text-white mb-10 light:text-slate-900">
            Experience &amp; Milestones
          </h3>
          <div className="border-t border-white/[0.07] light:border-[#e8e4da]">
            {timeline.map((item) => (
              <div
                key={item.title + item.period}
                className="reveal grid md:grid-cols-[190px_1fr] gap-2 md:gap-8 py-8 border-b border-white/[0.07] light:border-[#e8e4da]"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:pt-1.5">
                  {item.period}
                </div>
                <div>
                <h4 className="font-display text-xl font-medium text-slate-100 light:text-slate-900">
                  {item.title}
                </h4>
                <div className="text-sm font-medium text-violet-300/90 mt-0.5 light:text-violet-700">
                  {item.org}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-2 max-w-2xl light:text-slate-600">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs bg-white/[0.05] border border-white/[0.07] text-slate-300 light:bg-slate-900/5 light:border-slate-300 light:text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
