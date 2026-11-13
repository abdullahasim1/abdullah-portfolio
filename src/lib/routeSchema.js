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
