// @ts-check
/* FAQ ka single source of truth — Faq.jsx section AUR index.html ka
   FAQPage JSON-LD dono isi se bante hain (build-content.mjs schema
   inject karta hai). Content badalne par drift kabhi nahi hoga. */

/**
 * @typedef {{ q: string, a: string }} FaqItem
 */

/** @type {FaqItem[]} */
export const faqs = [
  {
    q: "Who is Abdullah Bin Asim?",
    a: "A Full Stack Developer and AI Builder with 3+ years of experience. He builds fast, scalable web apps with React, Next.js, Node.js and AWS Generative AI, and holds AWS Certified Generative AI Developer – Professional credentials.",
  },
  {
    q: "What services does Abdullah offer?",
    a: "Full-stack web development (React/Next.js/Node.js), AI agents & workflow automation (Claude agents, Make.com, n8n, GoHighLevel), UI/UX design, and AWS cloud & generative AI integrations.",
  },
  {
    q: "Which technologies does he work with?",
    a: "React, Next.js, Node.js, TypeScript, Tailwind CSS, GSAP, Three.js, MySQL, AWS, Claude & AI Agents, GoHighLevel, Make.com and n8n.",
  },
  {
    q: "Is Abdullah available for freelance projects?",
    a: "Yes — currently available for new projects and usually replies within a few hours via email at abdullah.gc.18@gmail.com.",
  },
  {
    q: "How many projects has he shipped?",
    a: "25+ projects including AI platforms (Four-AI, HireGen AI), job portals, food ordering systems and service booking apps — live demos in the Projects section above.",
  },
  {
    q: "How can I contact him?",
    a: "Email abdullah.gc.18@gmail.com, GitHub github.com/abdullahasim1, or the contact form below.",
  },
];
