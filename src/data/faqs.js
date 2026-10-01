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
  {
    q: "How do I hire Abdullah for an n8n or workflow automation project?",
    a: "Email abdullah.gc.18@gmail.com with a short brief of what you want automated — he usually replies within a few hours. Typical engagements: n8n and Make.com workflow builds, AI agent integrations, and GoHighLevel CRM automation for agencies and small businesses.",
  },
  {
    q: "What does a freelance AI automation project cost?",
    a: "It depends on scope: a single n8n or Make.com workflow typically runs a few hundred dollars, while multi-system AI agent builds with CRM integration run into the low thousands. Share your requirements for a fixed quote — no hourly billing surprises.",
  },
  {
    q: "Is Abdullah open to full-time roles?",
    a: "Yes — open to full-time remote roles in AI engineering, automation, and full-stack development. With 3+ years of experience, 25+ shipped projects, and AWS Generative AI Developer Professional certification, he ramps up fast on production codebases.",
  },
  {
    q: "Why hire Abdullah instead of an agency for AI automation?",
    a: "You work directly with the engineer — no account managers, no handoffs. That means faster delivery, lower cost, and automation built on n8n, Make.com, and GoHighLevel by someone who has shipped 25+ real projects.",
  },
  {
    q: "Does Abdullah work with clients outside Pakistan?",
    a: "Yes — based in Lahore, Pakistan, working remotely with clients in the US, Europe, and worldwide. Async-friendly communication across time zones, with overlap hours for calls when needed.",
  },
];
