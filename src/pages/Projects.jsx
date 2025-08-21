import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    title: "Food Ordering System",
    description: "Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard. Built with React, Node.js, and Stripe.",
    tags: ["React", "Node.js",  "MYSQL", "Express"],
    link: "https://github.com/abdullahasim1/food-order-project",
    featured: true,
  },
  {
    title: "Four-Ai",
    description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    tags: ["React", "Gasp", "Node.js", "Express" , "MYSQL", "Tailwind CSS", ],
    link: "https://github.com/abdullahasim1/four-ai",
    featured: true,
  },
  {
    title: "Home Service",
    description: "Modern, responsive portfolio website with dark mode, animations, and contact form integration.",
    tags: ["HTML", "CSS", "JavaScript", ],
    link: "https://github.com/abdullahasim1/HomeServices",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with location-based forecasts, interactive maps, and historical data visualization.",
    tags: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
    link: "#",
    featured: false,
  },
  {
    title: "Blog Platform",
    description: "Content management system with markdown support, SEO optimization, and analytics dashboard.",
    tags: ["Next.js", "MDX", "Vercel", "Analytics"],
    link: "#",
    featured: false,
  },
  {
    title: "Chat Application",
    description: "Real-time messaging app with file sharing, user presence, and message encryption.",
    tags: ["React Native", "Socket.io", "Firebase", "Encryption"],
    link: "#",
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
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Featured Projects</h2>
        </div>
        
        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <a
              href={project.link}
              key={index}
              className="reveal group relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6 transition-transform hover:-translate-y-1"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-fuchsia-500/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">Featured</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
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
        </div>

        {/* Other Projects */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Additional Projects</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <a
              href={project.link}
              key={index}
              className="reveal group relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6 transition-transform hover:-translate-y-1"
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
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gray-300/70 dark:border-gray-700/70 hover:bg-white/40 dark:hover:bg-white/5 backdrop-blur transition-colors"
          >
            View More Projects on GitHub
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;


