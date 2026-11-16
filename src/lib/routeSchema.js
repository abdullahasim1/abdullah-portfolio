// @ts-check
/* Route-specific JSON-LD builders (SEO fix, 2026-11-13).
   scripts/prerender-shells.mjs har route ki shell mein sirf usi
   route ke schema nodes rakhta hai — pehle index.html ka poora
   bundle (Person + WebSite + FAQ + Blog + saare SoftwareSourceCode)
   har page par dump hota tha. Builders hamesha asal data files se
   derive hote hain taaki counts aur links kabhi stale na hon. */

import { featuredProjects, projectSlug } from "../data/projects.js";
import { certifications } from "../data/certifications.js";
import { SITE_URL } from "./pageMeta.js";

export const PERSON_ID = `${SITE_URL}/#person`;

/** @param {string} path */
function abs(path) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * @param {{ name: string, path: string }[]} trail
 */
export function breadcrumbList(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function projectsItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects — Abdullah Bin Asim",
    itemListElement: featuredProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}/projects/${projectSlug(p)}`,
    })),
  };
}

export function certificationsItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Certifications — Abdullah Bin Asim",
    itemListElement: certifications.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        credentialCategory: "certification",
        ...(c.credentialUrl ? { url: c.credentialUrl } : {}),
        recognizedBy: { "@type": "Organization", name: c.issuer },
      },
    })),
  };
}

/**
 * @param {{ slug: string, title: string }[]} posts
 */
export function blogItemList(posts) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Blog — Abdullah Bin Asim",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  };
}

/* Jin featured projects ka index.html mein SoftwareSourceCode node
   nahi hai (Business Help, Portfolio Website), un ke case-study
   shell ke liye CreativeWork node — baaki projects apna asal
   SoftwareSourceCode node hi rakhte hain. */
/**
 * @param {{ repoName: string, title: string, description: string, overview?: string, liveLink?: string, image?: string }} project
 */
export function projectWorkNode(project) {
  const caseUrl = `${SITE_URL}/projects/${projectSlug(project)}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview || project.description,
    url: project.liveLink || caseUrl,
    mainEntityOfPage: caseUrl,
    ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
    author: { "@id": PERSON_ID },
  };
}

export const PUBLISHER_ID = `${SITE_URL}/#organization`;
export const SITE_EMAIL = "abdullah.gc.18@gmail.com";

/**
 * Compact Person node — har route shell mein emit hota hai taake
 * `author: { "@id": PERSON_ID }` references resolve hon (audit: /blog par
 * 14 dangling refs, har case study/post par 2). Home ka full Person node
 * index.html mein pehle se hai; yeh usi @id ko reuse karta hai.
 */
export function personNode() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Abdullah Bin Asim",
    url: `${SITE_URL}/`,
    jobTitle: "AI Cloud Engineer & Full Stack Developer",
    email: `mailto:${SITE_EMAIL}`,
    sameAs: [
      "https://github.com/abdullahasim1",
      "https://www.linkedin.com/in/abdullahasim1/",
      "https://www.credly.com/users/abdullah-bin-asim.ed30d504",
      "https://www.credential.net/profile/abdullahbinsim860299/wallet",
      "https://www.instagram.com/abdullah_asim2",
      "https://daily.dev/abdullahasim1",
    ],
  };
}

/** Organization publisher — Google Article/BlogPosting rich results ke liye
    publisher Person nahi, logo wali Organization honi chahiye. */
export function publisherNode() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": PUBLISHER_ID,
    name: "Abdullah Asim — Portfolio",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
  };
}

/**
 * Service landing page schema — Service + deliverables catalog.
 * @param {{ slug: string, title: string, short: string, deliverables: string[], tools: string[] }} service
 */
export function serviceNode(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short,
    url: `${SITE_URL}/services/${service.slug}`,
    serviceType: service.title,
    provider: { "@id": PERSON_ID },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

/**
 * @param {{ slug: string, title: string, faqs: { q: string, a: string }[] }} service
 */
export function serviceFaqNode(service) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `${service.title} — FAQs`,
    url: `${SITE_URL}/services/${service.slug}`,
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** @param {{ slug: string, title: string, short: string }[]} list */
export function servicesItemList(list) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services — Abdullah Bin Asim",
    itemListElement: list.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };
}
