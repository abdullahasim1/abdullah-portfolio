import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 py-10 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-black/30 backdrop-blur p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {year} Abdullah. Crafted with React & GSAP.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


