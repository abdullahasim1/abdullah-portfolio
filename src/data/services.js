// @ts-check
/* Services — /services list + /services/<slug> detail pages dono ka data.
   Copy site par pehle se mojood descriptions se li gayi hai; deliverables,
   process aur FAQs har service ke asal scope ko bayan karte hain
   (koi fake stats/prices nahi — pricing FAQ site ke main FAQ se aligned). */

export const services = [
  {
    slug: "full-stack-web-development",
    title: "Full-Stack Web Development",
    short:
      "Modern, responsive and high-performance web apps — React, Next.js and Node.js.",
    icon: "laptop",
    intro:
      "I design and build complete web applications — from the first wireframe to a deployed, production-ready product. Frontend, backend, database and deployment are handled end to end, so you get one person who owns the whole build.",
    idealFor:
      "Founders and businesses that need a complete web app — not just a landing page — designed, built and owned by one developer end to end.",
    deliverables: [
      "Responsive React / Next.js frontends with modern UI",
      "Node.js APIs and server-side logic",
      "Database design — MySQL, PostgreSQL, Neon",
      "Authentication, dashboards and admin panels",
      "Deployment on Vercel / AWS with CI-friendly setup",
      "Performance and SEO foundations built in",
    ],
    process: [
      {
        title: "Scope & Plan",
        desc: "We define features, pages and data together — with a fixed quote before any code is written.",
      },
      {
        title: "Design & Build",
        desc: "UI, frontend, backend and database built in weekly, reviewable increments you can actually click through.",
      },
      {
        title: "Test & Polish",
        desc: "Responsive checks, performance passes and real-device QA before anything goes live.",
      },
      {
        title: "Launch & Support",
        desc: "Deployed to Vercel or AWS with handover documentation and post-launch support.",
      },
    ],
    faqs: [
      {
        q: "How long does a typical web app take?",
        a: "A focused MVP usually takes 2–4 weeks depending on features. You get a fixed timeline in the quote before we start — the estimator on this site gives a first ballpark.",
      },
      {
        q: "Do you also design the UI?",
        a: "Yes — design and development are one flow, so what gets designed is exactly what ships. Already have Figma designs? I can build directly from them instead.",
      },
      {
        q: "What do I receive at handover?",
        a: "The deployed app, the full source code in your own repository, and a walkthrough of how everything works. No lock-in, no hostage code.",
      },
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
    idealFor:
      "Products that need real AI features — chat, voice, documents or images — running reliably in production, not demo notebooks.",
    deliverables: [
      "AI chatbots and support agents (chat & voice)",
      "RAG pipelines over your own documents and data",
      "Text-to-speech, image generation and voice features",
      "Prompt design, evaluation and guardrails",
      "Streaming responses with sensible fallbacks",
      "Usage, token and cost monitoring",
    ],
    process: [
      {
        title: "Use-Case Fit",
        desc: "We pick the AI feature that actually moves your metric — and the right model for it, at the right price.",
      },
      {
        title: "Working Prototype",
        desc: "A thin end-to-end slice — prompt, model call, UI — validated on your real data before scaling up.",
      },
      {
        title: "Production Hardening",
        desc: "Guardrails, fallbacks, streaming and cost controls wrapped around the model so it survives real users.",
      },
      {
        title: "Monitor & Tune",
        desc: "Usage and quality tracked after launch, with prompts tuned against real traffic.",
      },
    ],
    faqs: [
      {
        q: "Which AI models do you work with?",
        a: "Claude (Anthropic), OpenAI and AWS Bedrock models. I recommend based on your use case, budget and latency needs — not hype.",
      },
      {
        q: "Can the AI answer from our own documents?",
        a: "Yes — that's RAG. Your documents are indexed and the AI answers from them, so responses stay grounded in your content instead of guessing.",
      },
      {
        q: "How do you keep AI costs under control?",
        a: "Token budgets, caching, the right model size for each task, and usage monitoring from day one — no surprise bills at month end.",
      },
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
    idealFor:
      "Teams that want infrastructure which scales on demand and costs close to zero when idle.",
    deliverables: [
      "Serverless APIs — Lambda + API Gateway",
      "Generative AI workloads on AWS Bedrock",
      "S3 storage, presigned uploads and CDN delivery",
      "IAM roles and least-privilege security setup",
      "Event-driven workflows and scheduled jobs",
      "Cost-aware architecture and monitoring",
    ],
    process: [
      {
        title: "Architecture Review",
        desc: "Your current setup and goals mapped to a serverless design, with honest cost estimates up front.",
      },
      {
        title: "Build & Secure",
        desc: "Lambda, API Gateway, S3 and IAM built with least-privilege access from the very start.",
      },
      {
        title: "Deploy & Observe",
        desc: "CI-friendly deployment with CloudWatch logging, metrics and alerts wired in.",
      },
      {
        title: "Optimize",
        desc: "A cost and performance review once real traffic patterns are visible after launch.",
      },
    ],
    faqs: [
      {
        q: "Why serverless instead of a regular server?",
        a: "You pay per request instead of per month, scaling is automatic, and there is no server to patch or babysit — ideal for APIs and AI workloads with spiky traffic.",
      },
      {
        q: "Can you migrate my existing app to AWS?",
        a: "Yes — an existing API or workload can be re-platformed to Lambda + API Gateway in stages, without a risky big-bang rewrite.",
      },
      {
        q: "Will my AWS account be secure afterwards?",
        a: "IAM follows least-privilege, secrets stay out of code, and logging is on — the same practices I use in my role at Experts Cloud.",
      },
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
    idealFor:
      "Founders with an AI product idea who need an MVP that real users can try — and pay for — without hiring a whole team.",
    deliverables: [
      "MVP scoping — what to build first, what to skip",
      "Full product build — frontend, backend, AI features",
      "Auth, billing-ready structure and user dashboards",
      "Landing page + product UI in one coherent design",
      "Launch deployment and post-launch iteration",
      "Handover with documentation of how it all works",
    ],
    process: [
      {
        title: "Idea → Scope",
        desc: "We cut the idea down to the smallest version worth launching — and price it fixed.",
      },
      {
        title: "Build the MVP",
        desc: "Product, AI features and landing page built as one coherent system, not disconnected pieces.",
      },
      {
        title: "Launch",
        desc: "Deployed and ready for real users, with the basics of analytics and feedback in place.",
      },
      {
        title: "Iterate",
        desc: "Post-launch rounds driven by what users actually do — not guesses.",
      },
    ],
    faqs: [
      {
        q: "How fast can an MVP launch?",
        a: "Most MVPs ship in 3–6 weeks depending on scope. The scoping step exists precisely to protect that timeline.",
      },
      {
        q: "I only have an idea — no designs or documents. Is that OK?",
        a: "Completely. Scoping turns the idea into a concrete feature list and a fixed quote before anything is built.",
      },
      {
        q: "Can you keep building after launch?",
        a: "Yes — most clients continue in iteration rounds. You keep full ownership of the code and the product throughout.",
      },
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
    idealFor:
      "Agencies and service businesses losing hours every week to manual lead handling, follow-ups and CRM busywork.",
    deliverables: [
      "n8n and Make.com workflow design & build",
      "GoHighLevel CRM, pipelines and funnel automation",
      "AI lead intake, qualification and appointment booking",
      "AI voice & chat agents connected to your CRM",
      "Cross-tool integrations via APIs and webhooks",
      "Monitoring, error handling and handover training",
    ],
    process: [
      {
        title: "Process Audit",
        desc: "We map your current manual steps and find the hours worth automating first.",
      },
      {
        title: "Workflow Build",
        desc: "n8n, Make.com or GoHighLevel workflows built and connected to the tools you already use.",
      },
      {
        title: "AI Layer",
        desc: "Claude-powered qualification, replies or booking added where it genuinely earns its keep.",
      },
      {
        title: "Handover & Training",
        desc: "Monitoring, error alerts and a personal walkthrough — automations you can actually trust.",
      },
    ],
    faqs: [
      {
        q: "What does an automation project cost?",
        a: "A single n8n or Make.com workflow typically runs a few hundred dollars, while multi-system AI agent builds with CRM integration run into the low thousands. You get a fixed quote after a short scoping call — no hourly billing surprises.",
      },
      {
        q: "Which tools do you automate with?",
        a: "n8n, Make.com, GoHighLevel and Zapier — plus custom API and webhook integrations when a tool has no native connector.",
      },
      {
        q: "What happens if a workflow breaks?",
        a: "Every build ships with error handling and alerts, so failures surface immediately instead of silently eating your leads.",
      },
    ],
    tools: ["n8n", "Make.com", "GoHighLevel", "Zapier", "Claude", "OpenAI"],
    related: ["GENAI", "Business-Help"],
  },
];

/** @param {string} slug */
export function getService(slug) {
  return services.find((s) => s.slug === slug) ?? null;
}
