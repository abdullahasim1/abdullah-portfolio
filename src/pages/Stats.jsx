import React from "react";
import { useCounterAnimation, useStaggerAnimation } from "../hooks";

const stats = [
  {
    number: 3,
    label: "Years Experience",
    icon: "🎯"
  },
  {
    number: 25,
    label: "Projects Done",
    icon: "🚀"
  },
  {
    number: 15,
    label: "Technologies",
    icon: "⚡"
  },
  {
    number: 100,
    label: "Client Satisfaction",
    icon: "💯"
  }
];

function Stats() {
  const staggerRef = useStaggerAnimation(0.2, 0.5);
  
  // Call hooks individually at the top level
  const counter1Ref = useCounterAnimation(3, 2, 0);
  const counter2Ref = useCounterAnimation(25, 2, 0.2);
  const counter3Ref = useCounterAnimation(15, 2, 0.4);
  const counter4Ref = useCounterAnimation(100, 2, 0.6);

  const counterRefs = [counter1Ref, counter2Ref, counter3Ref, counter4Ref];

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Numbers That Speak
          </h2>
        </div>
        
        <div ref={staggerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} data-stagger className="text-center">
              <div className="bg-white/60 dark:bg-black/30 backdrop-blur rounded-2xl p-6 border border-gray-200/60 dark:border-gray-800/60">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div 
                  ref={counterRefs[index].elementRef}
                  className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 mb-2"
                >
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;


