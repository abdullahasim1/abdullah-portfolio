import React from "react";
import Counter from "../components/Counter";

function Stats() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6 text-center">
          <div>
            <div className="text-3xl font-extrabold"><Counter to={1} suffix="+" /></div>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Year Experience</p>
          </div>
          <div>
            <div className="text-3xl font-extrabold"><Counter to={20} suffix="+" /></div>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Projects Done</p>
          </div>
          <div>
            <div className="text-3xl font-extrabold"><Counter to={10} suffix="+" /></div>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Technologies</p>
          </div>
          <div>
            <div className="text-3xl font-extrabold"><Counter to={100} suffix="%" /></div>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;


