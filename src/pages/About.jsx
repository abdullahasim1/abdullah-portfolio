import React from "react";
import { useScrollReveal } from "../hooks";

const strengths = [
  {
    title: "Problem Solver",
    desc: "I break down complex challenges into manageable solutions, ensuring your project stays on track and delivers results."
  },
  {
    title: "Clean Code Advocate",
    desc: "Writing maintainable, scalable code that grows with your business and makes future updates effortless."
  },
  {
    title: "User-Focused Designer",
    desc: "Every pixel and interaction is crafted with your users in mind, creating experiences that convert and delight."
  },
  {
    title: "Fast & Reliable",
    desc: "Quick turnaround times without compromising quality. Your deadlines are my deadlines."
  },
  {
    title: "Communication Pro",
    desc: "Regular updates, clear explanations, and always available to discuss your project's progress."
  },
  {
    title: "Future-Proof Tech",
    desc: "Using cutting-edge technologies that ensure your project remains competitive and scalable for years to come."
  }
];

function About() {
  useScrollReveal("#about .reveal");

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            About Me
          </span>
          <div  className="text-3xl md:text-4xl font-extrabold mt-2">
            Turning Ideas Into Digital Reality
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div  className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
              <p>
                I'm a passionate Full Stack Developer with a love for creating seamless digital experiences. 
                With expertise in both frontend and backend development, I bring ideas to life with clean code 
                and intuitive design.
              </p>
              <p>
                My journey in web development started with curiosity and has evolved into a commitment to 
                delivering high-quality solutions that not only meet but exceed expectations. I believe in 
                the power of technology to solve real-world problems and create meaningful impact.
              </p>
              
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              My Strengths & What They Mean for You
            </h3>
            <div className=" reveal grid gap-4">
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className=" reveal p-4 rounded-lg border-l-4 border-indigo-500 bg-white/60 dark:bg-black/30 backdrop-blur hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                >
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {strength.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {strength.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;


