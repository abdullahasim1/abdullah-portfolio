import React from "react";
import { Link } from "../lib/router";

/* Home previews ka shared "View All" pattern (Abdullah ka multi-page
   preview-hub design, 2026-11-12): style PR #21 ke "View All
   Certifications" gradient button jaisa hi hai, lekin ye jagah par
   expand NAHI karta — section ke asal page par le jata hai (router
   Link = SPA navigation, full reload nahi). Har preview section ke
   neeche centre mein lagta hai taake poore home par ek hi pattern ho. */
function ViewAllButton({ href, children }) {
  return (
    <div className="mt-10 flex justify-center">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-opacity hover:opacity-90"
      >
        {children}
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

export default ViewAllButton;
