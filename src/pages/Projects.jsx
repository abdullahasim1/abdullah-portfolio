import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import SplitTextAnimation from "../components/SplitTextAnimation";
import FlipAnimation from "../components/FlipAnimation";

const projects = [
  {
    title: "Food Ordering System",
    description: "Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard. Built with React, Node.js, and Tailwind CSS.",
    tags: ["React", "Node.js",  "MYSQL", "Express"],
    githubLink: "https://github.com/abdullahasim1/food-order-project",
    liveLink: "https://food-order-demo.vercel.app",
    featured: true,
  },
  {
    title: "Four-Ai",
    description: "Four AI is a web application that make Text to Speech , Text to Image , Voice Changer Effects etc. It is built with React, Gasp, Node.js, Express, MYSQL, and Tailwind CSS.",
    tags: ["React", "Gasp", "Node.js", "Express" , "MYSQL", "Tailwind CSS", ],
    githubLink: "https://github.com/abdullahasim1/four-ai",
    liveLink: "https://four-ai-demo.vercel.app",
    featured: true,
  },
  {
    title: "Home Service",
    description: "Home Service is a web application that provide services to the user. It is built with HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", ],
    githubLink: "https://github.com/abdullahasim1/HomeServices",
    liveLink: "https://home-services-demo.vercel.app",
    featured: true,
  },
  {
    title: "Abdullah Portfolio",
    description: "Abdullah Portfolio is a web application that showcase my projects and skills. It is built with React, Tailwind CSS, and Gasp.",
    tags: ["React", "Tailwind CSS", "Gasp"],
    githubLink: "https://github.com/abdullahasim1/abdullah-portfolio",
    liveLink: "https://abdullah-portfolio.vercel.app",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with location-based forecasts, interactive maps, and historical data visualization.",
    tags: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
    githubLink: "#",
    liveLink: "#",
    featured: false,
  },
  {
    title: "Blog Platform",
    description: "Content management system with markdown support, SEO optimization, and analytics dashboard.",
    tags: ["Next.js", "MDX", "Vercel", "Analytics"],
    githubLink: "#",
    liveLink: "#",
    featured: false,
  },
  {
    title: "Chat Application",
    description: "Real-time messaging app with file sharing, user presence, and message encryption.",
    tags: ["React Native", "Socket.io", "Firebase", "Encryption"],
    githubLink: "#",
    liveLink: "#",
    featured: false,
  },
];

function Projects() {
  useScrollReveal("#projects .reveal");

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Portfolio
          </span>
          <SplitTextAnimation animationType="words" className="text-3xl md:text-4xl font-extrabold mt-2">
            Featured Projects
          </SplitTextAnimation>
        </div>
        
        {/* Featured Projects */}
        <FlipAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              data-flip
              className="reveal group relative overflow-hidden rounded-3xl border border-gray-200/20 dark:border-gray-800/40 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-800/40 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Featured badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  Featured
                </span>
              </div>

              <div className="relative p-8">
                {/* Project title */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                {/* Project description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900/40 dark:hover:text-indigo-300 transition-colors duration-200">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </FlipAnimation>

        {/* Other Projects */}
        <div className="mb-8">
          <SplitTextAnimation animationType="words" className="text-2xl font-bold mb-6">
            Additional Projects
          </SplitTextAnimation>
        </div>
        <FlipAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <a
              href={project.githubLink}
              key={index}
              data-flip
              className="reveal group relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-fuchsia-500/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </FlipAnimation>

        <div className="text-center mt-16">
          <a
            href="https://github.com/abdullahasim1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-gray-300/70 dark:border-gray-700/70 hover:bg-white/40 dark:hover:bg-white/5 backdrop-blur transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View More Projects on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;


