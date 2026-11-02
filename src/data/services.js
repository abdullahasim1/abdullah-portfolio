/* Services — /services list + /services/<slug> detail pages dono ka data.
   Copy site par pehle se mojood descriptions se li gayi hai; deliverables
   har service ke asal scope ko bayan karte hain (koi fake stats nahi). */

export const services = [
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    short:
      "Modern, responsive and high-performance web apps — React, Next.js and Node.js.",
    icon: "laptop",
    intro:
      "I design and build complete web applications — from the first wireframe to a deployed, production-ready product. Frontend, backend, database and deployment are handled end to end, so you get one person who owns the whole build.",
    deliverables: [
      "Responsive React / Next.js frontends with modern UI",
      "Node.js APIs and server-side logic",
      "Database design — MySQL, PostgreSQL, Neon",
      "Authentication, dashboards and admin panels",
      "Deployment on Vercel / AWS with CI-friendly setup",
      "Performance and SEO foundations built in",
    ],
    tools: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "MySQL"],
    related: ["abdullah-portfolio", "Job-Recuitment"],
  },
  {
    slug: "generative-ai-integration",
    title: "Generative AI Integration",
    short:
      "Integrate powerful AI capabilities (Claude, OpenAI, Bedrock, etc.).",
    icon: "ai",
    intro:
      "I integrate large language models into real products — chat, voice, image and document workflows powered by Claude, OpenAI and AWS Bedrock, with the guardrails, cost controls and fallbacks that production systems need.",
    deliverables: [
      "AI chatbots and support agents (chat & voice)",
      "RAG pipelines over your own documents and data",
      "Text-to-speech, image generation and voice features",
      "Prompt design, evaluation and guardrails",
      "Streaming responses with sensible fallbacks",
      "Usage, token and cost monitoring",
    ],
    tools: ["Claude", "OpenAI", "AWS Bedrock", "RAG", "Retell AI", "Hugging Face"],
    related: ["four-ai-ai-powered-voice-image-generation-platform", "Business-Help"],
  },
  {
    slug: "aws-cloud-serverless",
    title: "AWS Cloud & Serverless",
    short: "Deploy, scale and automate apps on AWS — Lambda, S3 and API Gateway.",
    icon: "aws",
    intro:
      "I architect and deploy serverless systems on AWS that scale without babysitting — Lambda, API Gateway, S3 and Bedrock, wired together with clean IAM and observable, cost-aware infrastructure.",
    deliverables: [
      "Serverless APIs — Lambda + API Gateway",
      "Generative AI workloads on AWS Bedrock",
      "S3 storage, presigned uploads and CDN delivery",
      "IAM roles and least-privilege security setup",
      "Event-driven workflows and scheduled jobs",
      "Cost-aware architecture and monitoring",
    ],
    tools: ["AWS Lambda", "AWS Bedrock", "API Gateway", "S3", "CloudWatch", "Vercel"],
    related: ["events-agent-frontend"],
  },
  {
    slug: "ai-product-development",
    title: "AI-Powered Product Development",
    short: "End-to-end SaaS development from idea to launch.",
    icon: "rocket",
    intro:
      "Have an idea for an AI product? I take it from concept to a launched SaaS — scoping the MVP, building the product, wiring the AI features and shipping something real users can pay for.",
    deliverables: [
      "MVP scoping — what to build first, what to skip",
      "Full product build — frontend, backend, AI features",
      "Auth, billing-ready structure and user dashboards",
      "Landing page + product UI in one coherent design",
      "Launch deployment and post-launch iteration",
      "Handover with documentation of how it all works",
    ],
    tools: ["Next.js", "React", "Node.js", "Claude", "Neon", "Vercel"],
    related: ["four-ai-ai-powered-voice-image-generation-platform", "GENAI"],
  },
  {
    slug: "ai-automation-workflows",
    title: "AI & Workflow Automation",
    short:
      "n8n, Make.com, GoHighLevel and Zapier automations — funnels, CRM and AI agents that run your business on autopilot.",
    icon: "automation",
    intro:
      "I don't just build apps — I automate entire businesses. From GoHighLevel funnels & CRM automations to Make.com scenarios, n8n workflows and Claude-powered AI agents, I connect your tools so the repetitive work happens on autopilot.",
    deliverables: [
      "n8n and Make.com workflow design & build",
      "GoHighLevel CRM, pipelines and funnel automation",
      "AI lead intake, qualification and appointment booking",
      "AI voice & chat agents connected to your CRM",
      "Cross-tool integrations via APIs and webhooks",
      "Monitoring, error handling and handover training",
    ],
    tools: ["n8n", "Make.com", "GoHighLevel", "Zapier", "Claude", "OpenAI"],
    related: ["GENAI", "Business-Help"],
  },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug) ?? null;
}
