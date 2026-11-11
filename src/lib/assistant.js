/* Portfolio Assistant — data-grounded question answering.
 *
 * Ye koi LLM nahi hai aur koi external API call nahi hoti: sawalon ke
 * jawab SIRF is repo ke apne structured data se bante hain
 * (src/data/projects.js, services.js, certifications.js, faqs.js,
 * experience.js). Jo cheez data mein nahi, us ka jawab ye nahi deta —
 * fallback mein visitor ko Contact section ki taraf bhej deta hai.
 *
 * Upgrade path: jab Business Help (Clone-Bussiness-Help) ke dashboard
 * mein portfolio ke liye business/agent configure ho jaye (admin login
 * Abdullah ke paas hai), to isi component ki jagah us ka /widget.js
 * embed lag sakta hai aur asal LLM jawab de sakta hai. Tab tak ye
 * matcher har jawab ko verifiable portfolio facts tak mehdood rakhta
 * hai — kuch invent nahi hota. */

import { featuredProjects, projectSlug } from "../data/projects";
import { services } from "../data/services";
import { certifications } from "../data/certifications";
import { faqs } from "../data/faqs";
import { timeline } from "../data/experience";

export const ASSISTANT_GREETING =
  "Assalam-o-Alaikum! I'm Abdullah's AI assistant. I answer from his portfolio — ask me about his services, projects, certifications, experience, or how to hire him.";

export const SUGGESTED_QUESTIONS = [
  "What services does Abdullah offer?",
  "Show me his best projects",
  "What certifications does he hold?",
  "How can I hire Abdullah?",
  "What is his tech stack?",
  "Is he open to full-time roles?",
];

const CONTACT_EMAIL = "abdullah.gc.18@gmail.com";

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "does", "do", "did",
  "what", "which", "who", "whom", "how", "can", "could", "would",
  "i", "me", "my", "you", "your", "he", "his", "him", "she", "her",
  "it", "its", "of", "for", "to", "in", "on", "at", "and", "or",
  "with", "about", "tell", "show", "give", "please", "any", "all",
  "has", "have", "had", "be", "been", "there", "this", "that",
]);

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9+#. ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

/* ---------- Jawab banane wale helpers (sab data se) ---------- */

function servicesAnswer() {
  const lines = services.map((s) => `• ${s.title} — ${s.short}`);
  return {
    text:
      `Abdullah offers ${services.length} services:\n` +
      lines.join("\n") +
      "\n\nFull details — deliverables, process and FAQs — are on each service page.",
    links: services.map((s) => ({
      label: s.title,
      path: `/services/${s.slug}`,
    })),
  };
}

function projectsAnswer() {
  const lines = featuredProjects.map(
    (p) => `• ${p.title} (${p.type}, ${p.year}) — ${p.description}`,
  );
  return {
    text:
      `These are Abdullah's featured projects (${featuredProjects.length}):\n` +
      lines.join("\n") +
      "\n\nAsk about any project by name and I'll pull up its case study.",
    links: [{ label: "View Projects section", section: "projects" }],
  };
}

function certificationsAnswer() {
  const featured = certifications.filter((c) => c.featured);
  const highlighted = (featured.length ? featured : certifications.slice(0, 3))
    .map((c) => `• ${c.title} — ${c.issuer} (${c.date})`)
    .join("\n");
  const issuers = [...new Set(certifications.map((c) => c.issuer))];
  return {
    text:
      `Abdullah holds ${certifications.length} certifications and training credentials, from ${issuers.join(", ")}. Highlights:\n` +
      highlighted +
      `\n\nThe full list is in the Certifications section — every badge there carries its verification link.`,
    links: [{ label: "View all certifications", section: "certifications" }],
  };
}

function hireAnswer() {
  const freelance = faqs.find((f) => /freelance/i.test(f.q));
  return {
    text:
      `${freelance ? freelance.a : "Yes — Abdullah is available for new projects."}\n\n` +
      `The easiest way to hire him: email ${CONTACT_EMAIL} with a short brief of your project, or use the Contact form below — he usually replies within a few hours.`,
    links: [
      { label: "Go to Contact section", section: "contact" },
      { label: `Email ${CONTACT_EMAIL}`, href: `mailto:${CONTACT_EMAIL}` },
    ],
  };
}

function techStackAnswer() {
  const techFaq = faqs.find((f) => /technologies/i.test(f.q));
  const tags = new Set();
  for (const p of featuredProjects) for (const t of p.tags) tags.add(t);
  for (const s of services) for (const t of s.tools || []) tags.add(t);
  return {
    text:
      `${techFaq ? techFaq.a : "React, Next.js, Node.js, TypeScript, Tailwind CSS, AWS and AI tooling."}\n\n` +
      `Across his projects and services you'll also see: ${[...tags].join(", ")}.`,
    links: [{ label: "View Skills section", section: "skills" }],
  };
}

function experienceAnswer() {
  const lines = timeline
    .slice(0, 3)
    .map((t) => `• ${t.title} — ${t.org} (${t.period})`)
    .join("\n");
  return {
    text: `Abdullah's background:\n${lines}\n\nHe has 3+ years of experience and 25+ shipped projects.`,
    links: [{ label: "View Experience section", section: "experience" }],
  };
}

function fallbackAnswer() {
  return {
    text:
      "I don't have that in Abdullah's portfolio data, so I won't guess. " +
      "You can ask me about his services, projects, certifications, tech stack, experience, or hiring — " +
      `or reach Abdullah directly at ${CONTACT_EMAIL} / the Contact section.`,
    links: [{ label: "Go to Contact section", section: "contact" }],
  };
}

/* ---------- Searchable entries (data se auto-build) ---------- */

function buildEntries() {
  const entries = [];

  for (const s of services) {
    entries.push({
      kind: "service",
      title: s.title,
      haystack: `${s.title} ${s.short} ${s.intro} ${(s.tools || []).join(" ")} ${(s.deliverables || []).join(" ")}`,
      answer: () => ({
        text: `${s.title}: ${s.intro}`,
        links: [{ label: `View ${s.title}`, path: `/services/${s.slug}` }],
      }),
    });
  }

  for (const p of featuredProjects) {
    const links = [{ label: `View ${p.title} case study`, path: `/projects/${projectSlug(p)}` }];
    if (p.liveLink) links.push({ label: "Live demo", href: p.liveLink });
    entries.push({
      kind: "project",
      title: p.title,
      haystack: `${p.title} ${p.repoName} ${p.description} ${p.type} ${(p.tags || []).join(" ")} ${(p.features || []).join(" ")}`,
      answer: () => ({
        text:
          `${p.title} — ${p.description}\n` +
          `Role: ${p.role} · ${p.year} · ${p.type}.` +
          (p.results?.length
            ? `\nKey facts: ${p.results.map((r) => `${r.value} — ${r.label}`).join("; ")}.`
            : ""),
        links,
      }),
    });
  }

  for (const c of certifications) {
    const links = [{ label: "View Certifications section", section: "certifications" }];
    if (c.credentialUrl) links.unshift({ label: "Verify credential", href: c.credentialUrl });
    entries.push({
      kind: "certification",
      title: c.title,
      haystack: `${c.title} ${c.issuer} ${(c.skills || []).join(" ")} ${c.description || ""}`,
      answer: () => ({
        text:
          `${c.title} — issued by ${c.issuer} (${c.date}).` +
          (c.description ? ` ${c.description}` : "") +
          (c.skills?.length ? `\nSkills: ${c.skills.join(", ")}.` : ""),
        links,
      }),
    });
  }

  for (const t of timeline) {
    entries.push({
      kind: "experience",
      title: `${t.title} ${t.org}`,
      haystack: `${t.title} ${t.org} ${t.desc} ${(t.tags || []).join(" ")}`,
      answer: () => ({
        text: `${t.title} at ${t.org} (${t.period}): ${t.desc}`,
        links: [{ label: "View Experience section", section: "experience" }],
      }),
    });
  }

  for (const f of faqs) {
    entries.push({
      kind: "faq",
      title: f.q,
      haystack: `${f.q} ${f.a}`,
      answer: () => ({ text: f.a, links: [] }),
      faq: true,
    });
  }

  return entries;
}

const ENTRIES = buildEntries();

function scoreEntry(queryTokens, queryNorm, entry) {
  const titleNorm = normalize(entry.title);
  const hayNorm = normalize(entry.haystack);
  let score = 0;
  if (queryNorm.length > 3 && (titleNorm.includes(queryNorm) || queryNorm.includes(titleNorm))) {
    score += 6;
  }
  for (const token of queryTokens) {
    if (titleNorm.split(" ").includes(token)) score += 3;
    else if (titleNorm.includes(token)) score += 2;
    if (hayNorm.includes(token)) score += 1;
  }
  // FAQ sawal se zyada milta sawal — us ko halka sa extra wazan
  if (entry.faq && score > 0) score += 1;
  return score;
}

/* ---------- Public API ---------- */

/**
 * Visitor ke sawal ka jawab — hamesha { text, links }.
 * links: { label, section } | { label, path } | { label, href }
 */
export function answerQuestion(rawQuestion) {
  const question = String(rawQuestion || "").trim();
  if (!question) return fallbackAnswer();
  const q = normalize(question);
  const tokens = tokenize(question);

  // Pehchan / salaam
  if (/^(hi|hello|hey|salam|assalam|aoa)\b/.test(q) && tokens.length <= 3) {
    return {
      text: `${ASSISTANT_GREETING} Try one of the suggested questions below, or type your own.`,
      links: [],
    };
  }

  // Wazeh intents — pehle ye, phir generic scoring. Certifications ka
  // aggregate jawab sirf aam sawal par; kisi khaas badge ka naam aaye
  // to neeche scoring usi entry ko chunti hai.
  if (
    /\b(certification|certifications|certified|credential|credentials|badge|badges)\b/.test(q) &&
    /\b(how many|count|total|list|hold|holds|have|has|all|does he|what)\b/.test(q)
  ) {
    return certificationsAnswer();
  }
  if (/\b(cost|price|pricing|charges|rate|rates|quote)\b/.test(q)) {
    const pricing = faqs.find((f) => /cost/i.test(f.q));
    if (pricing) {
      return {
        text: pricing.a,
        links: [{ label: "Try the project estimator / Contact", section: "contact" }],
      };
    }
  }
  if (/\b(full[- ]?time|job|role|roles|employment)\b/.test(q)) {
    const role = faqs.find((f) => /full-time/i.test(f.q));
    if (role) return { text: role.a, links: hireAnswer().links };
  }
  if (/\b(hire|hiring|contact|email|book|booking|freelance|availability|available|reach him|get in touch)\b/.test(q)) {
    return hireAnswer();
  }
  if (/\b(services|service|offer|offers|what can (he|abdullah) do|what does (he|abdullah) do)\b/.test(q)) {
    return servicesAnswer();
  }
  if (/\b(tech stack|technologies|technology|skills|tools|stack)\b/.test(q)) {
    return techStackAnswer();
  }
  if (/\b(projects|project|portfolio|built|build|work samples|case stud)/.test(q) && !tokens.some((t) => ENTRIES.some((e) => e.kind === "project" && normalize(e.title).includes(t) && t.length > 3))) {
    return projectsAnswer();
  }
  if (/\b(experience|background|career|who is abdullah|about abdullah|about him)\b/.test(q)) {
    return experienceAnswer();
  }

  // Generic scoring — sab se zyada match wala entry
  let best = null;
  let bestScore = 0;
  for (const entry of ENTRIES) {
    const s = scoreEntry(tokens, q, entry);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }
  if (best && bestScore >= 4) return best.answer();
  return fallbackAnswer();
}
