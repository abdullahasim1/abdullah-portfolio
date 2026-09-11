import {
  siReact,
  siNextdotjs,
  siNodedotjs,
  siTypescript,
  siTailwindcss,
  siGsap,
  siN8n,
  siClaude,
  siMake,
  siAnthropic,
  siFigma,
  siStripe,
  siPaypal,
  siMongodb,
  siPostgresql,
  siDocker,
  siFlutter,
  siAndroid,
  siApple,
  siWordpress,
  siShopify,
  siZapier,
} from "simple-icons";

const pick = (si) => ({
  // Dark backgrounds pe black logos dikhte hi nahi — white fallback
  hex: si.hex === "000000" ? "FFFFFF" : si.hex,
  path: si.path,
});

/**
 * Brand logos (simple-icons) + monogram tiles jinki official icon
 * simple-icons se remove ho chuki hai (AWS/OpenAI/GHL trademark).
 */
export const techLogos = [
  { name: "React", icon: pick(siReact) },
  { name: "Next.js", icon: pick(siNextdotjs) },
  { name: "Node.js", icon: pick(siNodedotjs) },
  { name: "TypeScript", icon: pick(siTypescript) },
  { name: "GoHighLevel", mono: { label: "GHL", from: "#2dd4bf", to: "#22c55e" } },
  { name: "Make.com", icon: pick(siMake) },
  { name: "n8n", icon: pick(siN8n) },
  { name: "Claude", icon: pick(siClaude) },
  { name: "OpenAI", mono: { label: "AI", from: "#14b8a6", to: "#0ea5e9" } },
  { name: "AWS", mono: { label: "AWS", from: "#ff9900", to: "#f97316" } },
  { name: "Tailwind CSS", icon: pick(siTailwindcss) },
  { name: "GSAP", icon: pick(siGsap) },
];

/* Services section ke liye brand logos — emoji replace karne ke liye */
export const serviceLogos = {
  ai: pick(siAnthropic),
  automation: pick(siZapier),
  ghl: null, // mono tile use hoti hai
  web: pick(siReact),
  mobile: pick(siFlutter),
  backend: pick(siNodedotjs),
  frontend: pick(siTypescript),
  design: pick(siFigma),
  payment: pick(siStripe),
};

/* Additional service-item level logos (list items ke liye) */
export const itemLogos = {
  stripe: pick(siStripe),
  paypal: pick(siPaypal),
  mongodb: pick(siMongodb),
  postgresql: pick(siPostgresql),
  docker: pick(siDocker),
  android: pick(siAndroid),
  apple: pick(siApple),
  wordpress: pick(siWordpress),
  shopify: pick(siShopify),
  flutter: pick(siFlutter),
};
