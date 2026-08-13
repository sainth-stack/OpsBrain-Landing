import { brandAssets } from "@/assets/brand";

/** Brand assets - `src/assets/brand/` + favicons + OG image */
export const brandLogos = {
  ogImage: brandAssets.ogImage,
  favicon: brandAssets.favicon,
} as const;

export const siteConfig = {
  name: "OpsBrain AI",
  /** Brand aliases for entity disambiguation (schema + GEO). */
  alternateNames: ["OpsBrain", "Ops Brain AI", "OpsBrainAI"] as const,
  tagline:
    "AI Employees That Find Leads, Call, Qualify, Schedule, Support, and Sell - 24/7",
  url: "https://opsbrainai.com",
  appUrl: "https://app.opsbrainai.com",
  seo: {
    title:
      "OpsBrain AI | AI Employees That Find, Call, Qualify & Sell 24/7",
    description:
      "OpsBrain AI (OpsBrain) is an AI employees platform by Sainath Reddy Guraka - autonomous agents that find leads, make outbound calls in Telugu, Hindi, and English, qualify opportunities, book meetings, and sync to your CRM 24/7.",
    ogImage: brandLogos.ogImage,
  },
} as const;

/** Primary founder entity - used in JSON-LD, layout authorship, and llms.txt. */
export const founder = {
  name: "Sainath Reddy Guraka",
  shortName: "Sai",
  jobTitle: "Founder",
  description:
    "Sainath Reddy Guraka is the founder of OpsBrain AI, an AI employees and leads-finder platform that deploys autonomous voice agents for prospecting, outbound calling, qualification, and CRM-synced revenue operations.",
  image: "/founders/sai.png",
  linkedin: "https://www.linkedin.com/in/sainathreddyguraka/",
} as const;

/** Leadership team for /about - Sai (Founder) and Eswar (Co-founder). */
export const founders = [
  {
    id: "sai",
    name: "Sainath Reddy Guraka",
    shortName: "Sai",
    jobTitle: "Founder",
    bio: "Driving product vision, revenue outcomes, and the future of autonomous AI employees for sales and support teams.",
    image: "/founders/sai.png",
    linkedin: "https://www.linkedin.com/in/sainathreddyguraka/",
  },
  {
    id: "eswar",
    name: "Eswar Silaveri",
    shortName: "Eswar",
    jobTitle: "Co-founder",
    bio: "Building secure, scalable AI systems that turn voice, messaging, and CRM workflows into measurable pipeline.",
    image: "/founders/eswar.png",
    linkedin: "https://www.linkedin.com/in/silaveri-eswar-829876208/",
  },
] as const;

export const navLinks = [
  { label: "Products", kind: "products" as const },
  { label: "Use cases", kind: "use-cases" as const },
  { label: "Conversations", href: "/#industries" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
] as const;

/** Homepage-only anchors (sections exist only on `/`). */
export const homepageAnchors = {
  contact: "#contact",
  faq: "#faq",
  talkToAgent: "#talk-to-an-agent",
  conversations: "#industries",
} as const;

/** Global CTAs - use `/#contact` so navbar and sticky bar work from every page. */
export const ctaLinks = {
  contact: { label: "Contact", href: "/#contact" },
  getStarted: { label: "Get Started", href: "/#contact" },
  talkToAgent: { label: "Talk to an agent", href: "/#talk-to-an-agent" },
  tryLiveCall: { label: "Try a live call", href: "/try-a-live-call" },
} as const;

export const hero = {
  eyebrow: "AI employees · Voice · Workflows",
  headline: "AI Employees That Find, Call, Qualify & Sell 24/7",
  subheadline:
    "Prospect, call in Telugu, Hindi, and English, qualify, book meetings, and sync to your CRM.",
  primaryCta: { label: "Get Started", href: homepageAnchors.contact },
  secondaryCta: { label: "Talk to an agent", href: homepageAnchors.talkToAgent },
  salesCta: {
    prompt: "Planning a larger deployment?",
    label: "Contact Sales",
    href: "/#contact",
  },
  /** Kept for SEO / legacy references; hero UI uses featureCards. */
  stats: [
    { value: "10x", label: "More outreach capacity" },
    { value: "24/7", label: "Always-on coverage" },
    { value: "60%", label: "Lower cost per meeting" },
  ],
  featureCards: [
    {
      eyebrow: "Always on",
      title: "Answers 24/7",
      description: "No missed calls, ever",
    },
    {
      eyebrow: "Global-ready",
      title: "50+ languages",
      description: "Telugu · Hindi · English",
    },
    {
      eyebrow: "Workflow-ready",
      title: "Acts after the call",
      description: "Qualify · Book · CRM sync",
    },
    {
      eyebrow: "Production",
      title: "Real AI employees",
      description: "Not IVR, not recordings",
    },
  ],
  visual: {
    ariaLabel:
      "OpsBrain AI employee orb surrounded by multilingual greetings and product tools — voice calls, WhatsApp, email, calendar, CRM, SMS, and payments.",
    centerLabel: "AI Employee",
    commandCenterTitle: "OpsBrain Command Center",
    commandCenterSubtitle: "Live revenue operations",
    metricLabels: {
      liveCalls: "Live Calls",
      qualifiedLeads: "Qualified Leads",
      meetingsBooked: "Meetings Booked",
      pipeline: "Revenue Pipeline",
    },
    nodes: [
      { label: "Leads", icon: "Megaphone" },
      { label: "AI Calls", icon: "Phone" },
      { label: "Bookings", icon: "CalendarCheck" },
      { label: "CRM Sync", icon: "Database" },
      { label: "Sales", icon: "TrendingUp" },
    ],
    sparklineBase: [22, 28, 25, 31, 29, 35, 33, 38, 36, 41, 44],
    orbitTools: [
      { label: "Payments", icon: "CreditCard" },
      { label: "WhatsApp", icon: "MessageCircle" },
      { label: "Email", icon: "Mail" },
      { label: "Calendar", icon: "Calendar" },
      { label: "CRM", icon: "Database" },
      { label: "SMS", icon: "Smartphone" },
    ],
    orbitLanguages: [
      { label: "నమస్కారం", locale: "te" },
      { label: "नमस्ते", locale: "hi" },
      { label: "Hello", locale: "en" },
      { label: "வணக்கம்", locale: "ta" },
      { label: "নমস্কার", locale: "bn" },
      { label: "Hola", locale: "es" },
      { label: "こんにちは", locale: "ja" },
    ],
    liveTranscript: "Can you share your clinic location?",
    storySteps: [
      {
        message: "New lead found",
        nodeIndex: 0,
        languageChip: "TE · Telugu",
        durationMs: 2600,
        feedLabel: "Lead captured · Real Estate",
        activeCallsNote: "+11 active now",
        metrics: {
          liveCalls: 46,
          qualifiedLeads: 127,
          meetingsBooked: 22,
          pipeline: "$220K",
        },
      },
      {
        message: "AI call started - Telugu",
        nodeIndex: 1,
        languageChip: "TE · Telugu",
        durationMs: 3600,
        feedLabel: "Outbound call · Telugu",
        activeCallsNote: "+12 active now",
        metrics: {
          liveCalls: 47,
          qualifiedLeads: 127,
          meetingsBooked: 22,
          pipeline: "$220K",
        },
        voice: {
          transcript:
            "Hello, shall we talk about your property inquiry?",
        },
      },
      {
        message: "Lead qualified hot",
        nodeIndex: 1,
        languageChip: "TE · Telugu",
        durationMs: 2600,
        feedLabel: "Lead scored hot",
        activeCallsNote: "+12 active now",
        metrics: {
          liveCalls: 47,
          qualifiedLeads: 128,
          meetingsBooked: 22,
          pipeline: "$220K",
        },
      },
      {
        message: "Meeting booked",
        nodeIndex: 2,
        languageChip: "HI · Hindi",
        durationMs: 2600,
        feedLabel: "Meeting scheduled",
        activeCallsNote: "+12 active now",
        metrics: {
          liveCalls: 47,
          qualifiedLeads: 128,
          meetingsBooked: 23,
          pipeline: "$221K",
        },
      },
      {
        message: "CRM updated",
        nodeIndex: 3,
        languageChip: "EN · English",
        durationMs: 2600,
        feedLabel: "CRM synced · HubSpot",
        activeCallsNote: "+11 active now",
        metrics: {
          liveCalls: 46,
          qualifiedLeads: 128,
          meetingsBooked: 23,
          pipeline: "$221K",
        },
      },
      {
        message: "Pipeline growing",
        nodeIndex: 4,
        languageChip: "TE · Telugu",
        durationMs: 2800,
        feedLabel: "Deal moved to pipeline",
        activeCallsNote: "+11 active now",
        metrics: {
          liveCalls: 46,
          qualifiedLeads: 128,
          meetingsBooked: 23,
          pipeline: "$222K",
        },
        highlightPipeline: true,
      },
    ],
  },
} as const;

export const talkToAgentSection = {
  id: "talk-to-an-agent",
  eyebrow: "Live voice demo",
  title: "Talk to an Agent",
  subtitle: "Pick a language and a role. Then speak - this is a real conversation.",
  startConversation: "Start conversation",
  connectingLabel: "Connecting…",
  listeningLabel: "Listening",
  speakingLabel: "Speaking",
  muteLabel: "Mute",
  unmuteLabel: "Unmute",
  endCallLabel: "End call",
} as const;

export const talkToAgentLangs = [
  { id: "en", label: "English" },
  { id: "hi", label: "Hindi" },
  { id: "te", label: "Telugu" },
] as const;

export const talkToAgentUseCaseIds = [
  "realestate",
  "school",
  "hospital",
  "restaurant",
  "sales",
] as const;

export const trustBarSection = {
  eyebrow: "Built for revenue teams",
  headline: "Trusted across real estate, healthcare, sales, and more.",
  industriesTitle: "Used in production across industries",
  integrationsLabel: "Integrates with",
  integrationsTitle: "Works with the stack you already run",
  integrationsHref: "/integrations",
  integrationsCta: "See all integrations",
} as const;

export const trustBarIndustries = [
  { label: "Real Estate", icon: "Building2", href: "/ai-employees/realestate" },
  { label: "Healthcare", icon: "HeartPulse", href: "/ai-employees/hospital" },
  { label: "EdTech", icon: "GraduationCap", href: "/ai-employees/school" },
  { label: "Insurance", icon: "ShieldCheck", href: "/ai-employees/insurance" },
  { label: "Restaurants", icon: "UtensilsCrossed", href: "/ai-employees/restaurant" },
  { label: "Sales", icon: "TrendingUp", href: "/ai-employees/sales" },
] as const;

export const trustBarIntegrations = [
  { label: "Salesforce", icon: "Cloud", logo: "salesforce" },
  { label: "HubSpot", icon: "Megaphone", logo: "hubspot" },
  { label: "Pipedrive", icon: "Kanban", logo: "pipedrive" },
  { label: "Twilio", icon: "Phone", logo: "twilio" },
  { label: "Google Calendar", icon: "Calendar", logo: "google-calendar" },
] as const;

export const poweredBySection = {
  eyebrow: "Powered by",
  title: "Built on world-class voice and cloud infrastructure",
  stripLine: "Voice and cloud infrastructure from leading platforms",
} as const;

export const poweredByPartners = [
  {
    id: "sarvam",
    name: "Sarvam AI",
    role: "Indian language speech and LLM APIs",
    logo: "sarvam",
    href: "https://www.sarvam.ai",
  },
  {
    id: "cartesia",
    name: "Cartesia",
    role: "Real-time voice AI for natural calls",
    logo: "cartesia",
    href: "https://cartesia.ai",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    role: "Cloud infrastructure and scale",
    logo: "aws",
    href: "https://aws.amazon.com",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    role: "Enterprise cloud and AI services",
    logo: "azure",
    href: "https://azure.microsoft.com",
  },
] as const;

export const problemSection = {
  eyebrow: "The Problem",
  title: "The Human Bottleneck",
  subtitle:
    "Revenue teams lose pipeline every day to capacity limits - not lack of effort.",
  statHighlight:
    "78% of leads go to the vendor that responds first - average B2B response time: 42 hours",
  stats: [
    { value: "78%", label: "of leads go to the vendor that responds first" },
    { value: "42 hrs", label: "average B2B first-response time" },
  ],
  closingLine:
    "Humans are bottlenecked by capacity. AI Employees are not.",
  closingCta: "Talk to an agent",
  closingHref: "#talk-to-an-agent",
  painPoints: [
    {
      title: "Delayed Follow-ups",
      tag: "First hour",
      description:
        "Leads go cold while reps juggle dozens of accounts and miss the critical first-hour window.",
      icon: "Clock",
    },
    {
      title: "Missed Calls",
      tag: "After hours",
      description:
        "Inbound and outbound calls slip through after hours, on weekends, and during peak volume.",
      icon: "PhoneMissed",
    },
    {
      title: "Manual CRM Work",
      tag: "Unsold time",
      description:
        "Reps spend hours logging calls, updating fields, and syncing data instead of selling.",
      icon: "Database",
    },
  ],
} as const;

export const aboutBlurb = {
  title: "About OpsBrain AI",
  description:
    "OpsBrain AI (also known as OpsBrain) is an AI employees and leads-finder platform founded by Sainath Reddy Guraka. Our mission is to build the most capable AI employee platform for revenue teams - replacing repetitive SDR and support workflows with intelligent agents that find leads, call in Telugu, Hindi, and English, qualify opportunities, and sync to your CRM. We envision a world where every business has a fully autonomous revenue team working around the clock, so humans can focus on relationships, strategy, and closing.",
} as const;

export const aboutPage = {
  path: "/about",
  title: "About OpsBrain AI - Founder-led AI employees for revenue teams",
  description:
    "OpsBrain AI is an AI employees platform founded by Sainath Reddy Guraka and co-founded by Eswar Silaveri. Learn our story, leadership, and how OpsBrain deploys autonomous voice agents that prospect, call, qualify, and sell 24/7.",
  eyebrow: "About Us",
  h1: "Building AI employees for revenue teams that never sleep",
  intro:
    "OpsBrain AI helps growing companies run outbound calling, inbound support, and multi-channel follow-up with autonomous AI employees - so every lead gets a fast, natural conversation and every outcome lands in your CRM.",
  storyEyebrow: "Our story",
  storyTitle: "Why OpsBrain AI exists",
  story: [
    "Revenue teams lose deals every day to capacity limits, not lack of effort. Leads fill a form and wait hours. Inbound calls ring out after hours. SDRs burn energy on cold lists while warm prospects get a tired follow-up.",
    "We built OpsBrain AI to close that gap. By combining multilingual voice agents, WhatsApp and email sequences, and CRM sync, we help companies move from manual SDR grind to always-on revenue operations - built for India-first teams, ready to scale globally.",
  ],
  storyHighlight:
    "We are not building another dialer. We are building AI employees that find, call, qualify, and hand off ready conversations to humans.",
  leadershipEyebrow: "Leadership",
  leadershipTitle:
    "Founder-led, with deep product and AI systems expertise",
  leadershipSubtitle:
    "Built by founders who understand revenue operations, voice AI, and scalable customer infrastructure.",
  mission:
    "Our mission is to give every business an always-on revenue team. Humans focus on relationships, strategy, and closing; AI employees handle prospecting, calling, qualification, and follow-up at scale.",
  valuesEyebrow: "What we believe",
  valuesTitle: "The values behind every product decision",
  values: [
    {
      title: "Speed over delay",
      description:
        "First response in under 60 seconds. The team that answers first usually wins the deal.",
    },
    {
      title: "Humans close, AI qualifies",
      description:
        "AI handles the grind of cold and inbound volume. Your team talks when prospects are ready.",
    },
    {
      title: "Language that feels local",
      description:
        "Natural conversations in Telugu, Hindi, English, and 50+ languages - not robotic translations.",
    },
    {
      title: "CRM as the source of truth",
      description:
        "Every call, note, and status syncs automatically so pipeline stays accurate without busywork.",
    },
  ],
  visionEyebrow: "Our vision",
  visionTitle: "The future of revenue teams, built on autonomous AI employees",
  vision:
    "In the next decade, every growing company will run an AI-native revenue stack - agents that answer every call, follow up every lead, and keep humans focused on closing. OpsBrain exists to make that future practical, affordable, and live in minutes.",
  visionPoints: [
    {
      title: "Always-on coverage",
      description:
        "Inbound and outbound voice that works nights, weekends, and peak hours without missed calls.",
    },
    {
      title: "Qualified pipeline",
      description:
        "AI filters uninterested prospects so SDRs spend energy only on conversations that matter.",
    },
    {
      title: "Measurable outcomes",
      description:
        "Meetings booked, CRM updates, and campaign results you can see - not vanity dial counts.",
    },
  ],
  productFacts: [
    "AI employees for sales, support, healthcare, real estate, HR, insurance, education, and hospitality",
    "Multilingual voice in Telugu, Hindi, English, and 50+ languages",
    "Lead finder and speed-to-lead calling in under 60 seconds",
    "Bi-directional CRM sync (Salesforce, HubSpot, Pipedrive, and more)",
    "Plans from ₹2,999/mo with included voice minutes and onboarding support",
  ],
  cta: {
    title: "Ready to deploy your first AI employee?",
    description:
      "Tell us about your pipeline - we will configure OpsBrain for lead calling, inbound support, or bulk campaigns.",
    primaryLabel: "Get started",
    primaryHref: "/#contact",
    secondaryLabel: "See pricing",
    secondaryHref: "/pricing",
  },
} as const;

export const workflowSection = {
  eyebrow: "Revenue Pipeline",
  title: "End-to-End AI Workflow",
  subtitle:
    "From first touch to closed deal - every step runs autonomously, 24 hours a day.",
} as const;

export const workflowSteps = [
  {
    step: 1,
    title: "Find Leads",
    description:
      "AI scouts your ICP across databases, web signals, and intent data to build targeted lists.",
    icon: "Search",
  },
  {
    step: 2,
    title: "Enrich",
    description:
      "Every lead is enriched with firmographics, contact data, and AI-driven fit scores.",
    icon: "Sparkles",
  },
  {
    step: 3,
    title: "Qualify",
    description:
      "Real-time scoring identifies buying signals, budget, timeline, and decision-makers.",
    icon: "Target",
  },
  {
    step: 4,
    title: "Initiate Outreach",
    description:
      "Multi-channel sequences activate across email, LinkedIn, SMS, and voice at scale.",
    icon: "Send",
  },
  {
    step: 5,
    title: "Natural Conversations",
    description:
      "AI voice agents place calls, handle objections, and capture conversation intelligence.",
    icon: "MessageCircle",
  },
  {
    step: 6,
    title: "Book Meetings",
    description:
      "Qualified prospects are routed to the right rep's calendar with context-rich briefings.",
    icon: "CalendarCheck",
  },
  {
    step: 7,
    title: "Update CRM",
    description:
      "Every interaction, note, and status update syncs to Salesforce, HubSpot, or your CRM.",
    icon: "RefreshCw",
  },
  {
    step: 8,
    title: "Follow Up & Handoff",
    description:
      "AI nurtures stalled deals, re-engages lost opportunities, and hands off hot leads to reps.",
    icon: "ArrowRightLeft",
  },
] as const;

export const capabilitiesSection = {
  eyebrow: "Platform",
  title: "Everything Your Revenue Team Needs",
  subtitle:
    "Ten core capabilities that power AI employees across your entire funnel.",
} as const;

export const homeCapabilitiesSection = {
  eyebrow: "Product",
  title: "What OpsBrain AI does",
  subtitle: "Four jobs. That’s the product.",
} as const;

export const homeProductCapabilities = [
  {
    title: "Call",
    description:
      "Inbound and outbound voice in Telugu, Hindi, and English - 24/7.",
    icon: "Phone",
  },
  {
    title: "Qualify",
    description:
      "Asks the right questions, scores intent, and knows when to hand off.",
    icon: "Target",
  },
  {
    title: "Book",
    description:
      "Puts meetings on your calendar and sends the confirmation.",
    icon: "Calendar",
  },
  {
    title: "Sync",
    description:
      "Every note and status lands in Salesforce, HubSpot, or Pipedrive.",
    icon: "Database",
  },
] as const;

export const capabilities = [
  {
    title: "Autonomous Lead Prospecting",
    description:
      "Continuously discover and refresh prospect lists matched to your ideal customer profile.",
    icon: "Search",
  },
  {
    title: "Multi-Channel Outreach",
    description:
      "Orchestrate email, LinkedIn, SMS, and voice sequences from a single intelligent platform.",
    icon: "Layers",
  },
  {
    title: "AI Voice Calling",
    description:
      "Deploy natural-sounding voice agents that call, converse, and qualify prospects at scale.",
    icon: "Phone",
    featured: true,
  },
  {
    title: "Intelligent Qualification",
    description:
      "Real-time conversation analysis identifies buying intent, budget, and decision authority.",
    icon: "Target",
  },
  {
    title: "Smart Scheduling",
    description:
      "Book meetings directly on rep calendars with timezone-aware availability and reminders.",
    icon: "Calendar",
  },
  {
    title: "CRM Integration",
    description:
      "Bi-directional sync with Salesforce, HubSpot, Pipedrive, and custom CRMs via API.",
    icon: "Database",
    featured: true,
  },
  {
    title: "24/7 Customer Support",
    description:
      "AI support agents resolve tickets, answer FAQs, and escalate complex issues to humans.",
    icon: "Headphones",
  },
  {
    title: "Pipeline Analytics",
    description:
      "Real-time dashboards track conversion rates, agent performance, and revenue attribution.",
    icon: "BarChart3",
  },
  {
    title: "Custom AI Employees",
    description:
      "Configure specialized agents with your brand voice, playbooks, and compliance rules.",
    icon: "Bot",
  },
  {
    title: "Enterprise Security",
    description:
      "SOC 2 Type II, GDPR compliance, role-based access, and audit logs for every action.",
    icon: "Shield",
  },
] as const;

export const aiEmployeesSection = {
  eyebrow: "AI Workforce",
  title: "Deploy AI Employees for Your Industry",
  subtitle:
    "Pre-built personas go live in under 10 minutes - voice, scripts, and CRM sync included. Pick an agent, connect your stack, start calling.",
  trustLine: "Trusted by teams in Real Estate, Healthcare, and EdTech",
} as const;

export const aiEmployees = [
  {
    id: "sales",
    name: "AI Sales Employee",
    role: "Outbound Sales",
    industry: "Sales",
    outcomeMetric: "Books demos in <60 seconds",
    description:
      "Calls leads within seconds of form submission, qualifies interest, and books demos on your calendar.",
    fullDescription:
      "Your always-on SDR that responds to inbound and outbound leads in under 60 seconds. Handles objection handling, qualification questions, and calendar booking - then syncs every call note and score to your CRM.",
    capabilities: [
      "Calls new leads within 60 seconds of form submission",
      "Qualifies interest and handles common objections",
      "Books demos and syncs notes to your CRM automatically",
    ],
    integrations: ["Salesforce", "HubSpot", "Calendly"],
    avatar: "sales",
  },
  {
    id: "hr",
    name: "AI HR Recruiter",
    role: "Talent Acquisition",
    industry: "HR",
    outcomeMetric: "Screens 50+ candidates per day",
    description:
      "Screens candidates, schedules interviews, and sends personalized follow-ups across multiple languages.",
    fullDescription:
      "Automates first-round screening calls, availability checks, and interview scheduling. Supports multilingual candidate outreach and keeps your ATS updated with structured notes after every conversation.",
    capabilities: [
      "Runs first-round screening calls automatically",
      "Checks availability and schedules interviews",
      "Updates your ATS with structured conversation notes",
    ],
    integrations: ["Greenhouse", "Lever", "Google Calendar"],
    avatar: "hr",
  },
  {
    id: "hospital",
    name: "AI Hospital Assistant",
    role: "Healthcare Front Desk",
    industry: "Healthcare",
    outcomeMetric: "24/7 appointment booking",
    description:
      "Handles appointment booking, insurance verification, and patient inquiries around the clock.",
    fullDescription:
      "Manages appointment scheduling, insurance pre-verification, and patient FAQs 24/7. Escalates urgent cases to staff with full context and maintains HIPAA-aware conversation logs.",
    capabilities: [
      "Books and reschedules appointments around the clock",
      "Pre-verifies insurance before the visit",
      "Escalates urgent cases with full patient context",
    ],
    integrations: ["Epic", "Cerner", "Insurance API"],
    avatar: "hospital",
  },
  {
    id: "payment",
    name: "AI Payment Reminder Agent",
    role: "Collections & Billing",
    industry: "Finance",
    outcomeMetric: "Reduces delinquency by 18%",
    description:
      "Sends polite payment reminders, negotiates plans, and updates billing systems automatically.",
    fullDescription:
      "Runs courteous outbound payment reminder campaigns, offers structured payment plans, and logs outcomes to your billing system - reducing delinquency without adding headcount.",
    capabilities: [
      "Runs courteous outbound payment reminder campaigns",
      "Offers structured payment plans on the call",
      "Logs outcomes directly to your billing system",
    ],
    integrations: ["Stripe", "QuickBooks", "Salesforce"],
    avatar: "payment",
  },
  {
    id: "support",
    name: "AI Customer Support Agent",
    role: "24/7 Support",
    industry: "Support",
    outcomeMetric: "Resolves 70% of calls without escalation",
    description:
      "Answers FAQs, resolves common issues, and escalates complex tickets to human agents instantly.",
    fullDescription:
      "Handles tier-1 support calls around the clock, resolves common issues from your knowledge base, and escalates to humans with full transcript and CRM context when needed.",
    capabilities: [
      "Answers tier-1 support calls 24/7 from your knowledge base",
      "Resolves common issues without human intervention",
      "Escalates with full transcript and CRM context attached",
    ],
    integrations: ["Zendesk", "Intercom", "Salesforce"],
    avatar: "support",
  },
  {
    id: "school",
    name: "AI School Admission Counselor",
    role: "EdTech Admissions",
    industry: "EdTech",
    outcomeMetric: "Schedules campus visits in minutes",
    description:
      "Guides prospective students, answers program questions, and schedules campus visits or interviews.",
    fullDescription:
      "Engages prospective students and parents, answers program and fee questions in their preferred language, and books campus visits or counselor interviews automatically.",
    capabilities: [
      "Engages students and parents in their preferred language",
      "Answers program, fee, and eligibility questions",
      "Books campus visits and counselor interviews automatically",
    ],
    integrations: ["HubSpot", "Google Calendar", "Canvas LMS"],
    avatar: "school",
  },
  {
    id: "restaurant",
    name: "AI Restaurant Receptionist",
    role: "Hospitality",
    industry: "Hospitality",
    outcomeMetric: "Zero missed calls during peak hours",
    description:
      "Takes reservations, manages waitlists, and handles takeout orders with natural conversation.",
    fullDescription:
      "Answers every call during peak hours, manages reservations and waitlists, processes takeout orders, and sends confirmation texts - in English, Hindi, or Telugu.",
    capabilities: [
      "Answers every call during peak dining hours",
      "Manages reservations, waitlists, and takeout orders",
      "Sends confirmation texts in English, Hindi, or Telugu",
    ],
    integrations: ["Toast POS", "OpenTable", "SMS"],
    avatar: "restaurant",
  },
  {
    id: "realestate",
    name: "AI Real Estate Assistant",
    role: "Property Sales",
    industry: "Real Estate",
    outcomeMetric: "Follows up on leads in <60 seconds",
    description:
      "Qualifies buyers, schedules property viewings, and follows up on listing inquiries automatically.",
    fullDescription:
      "Qualifies buyer intent and budget, schedules property viewings on agent calendars, and follows up on portal inquiries within seconds - keeping hot leads from going cold.",
    capabilities: [
      "Qualifies buyer intent and budget on the first call",
      "Schedules property viewings on agent calendars",
      "Follows up on portal inquiries within seconds",
    ],
    integrations: ["Salesforce", "Follow Up Boss", "Google Calendar"],
    avatar: "realestate",
  },
  {
    id: "insurance",
    name: "AI Insurance Renewal Agent",
    role: "Insurance Ops",
    industry: "Insurance",
    outcomeMetric: "Processes renewals 3x faster",
    description:
      "Proactively calls policyholders for renewals, explains coverage changes, and processes updates.",
    fullDescription:
      "Runs proactive renewal outreach campaigns, explains policy changes in plain language, and processes updates or routes complex cases to licensed agents.",
    capabilities: [
      "Runs proactive renewal outreach campaigns",
      "Explains policy changes in plain language",
      "Routes complex cases to licensed agents with context",
    ],
    integrations: ["Guidewire", "Salesforce", "Policy Admin"],
    avatar: "insurance",
  },
] as const;

export const aiEmployeeFilters = [
  "All",
  "Sales",
  "Healthcare",
  "Hospitality",
  "HR",
  "EdTech",
  "Real Estate",
  "Insurance",
  "Support",
  "Finance",
] as const;

export const howItWorksSection = {
  eyebrow: "How it works",
  title: "From ringing phone to booked.",
  subtitle: "Four steps. That’s the product.",
} as const;

export const howItWorksSteps = [
  {
    step: 1,
    title: "A lead comes in",
    description: "Form, ad, or inbound call - the moment intent shows up.",
  },
  {
    step: 2,
    title: "AI calls in seconds",
    description: "Natural voice in Telugu, Hindi, or English. No hold music.",
  },
  {
    step: 3,
    title: "It qualifies and books",
    description: "Questions, objections, then a meeting on your calendar.",
  },
  {
    step: 4,
    title: "Your CRM updates",
    description: "Notes, status, and next steps sync. Your team just closes.",
  },
] as const;

export const howItWorksTabs = [
  {
    id: "lead-calling",
    label: "Instant Lead Calling",
    title: "Respond to every lead in under 60 seconds",
    description:
      "When a lead fills out a Facebook ad or web form, your AI employee calls them instantly - in Telugu, Hindi, or English.",
    visual: "LeadCallingFlow",
    steps: [
      "Lead submits form via Facebook ad or landing page",
      "OpsBrain triggers an instant outbound AI voice call",
      "AI qualifies interest in natural Telugu or English conversation",
      "Meeting is booked directly on your sales calendar",
    ],
  },
  {
    id: "inbound-support",
    label: "24/7 Inbound Support",
    title: "Never miss another inbound call",
    description:
      "Your AI employee answers every call, resolves FAQs, and seamlessly escalates to humans when needed.",
    visual: "InboundSupportFlow",
    steps: [
      "Customer calls your business line any time of day",
      "AI answers instantly and resolves common questions",
      "Complex issues are escalated to a human with full context",
      "Every interaction is logged and synced to your CRM",
    ],
  },
  {
    id: "bulk-campaigns",
    label: "Bulk Campaigns",
    title: "Launch thousands of calls in minutes",
    description:
      "Upload a CSV, configure your script, and let AI employees run parallel outbound campaigns at scale.",
    visual: "BulkCampaignFlow",
    steps: [
      "Upload your contact list as CSV or connect your CRM",
      "Configure script, language, and calling schedule",
      "AI runs parallel call waves across your entire list",
      "Review results dashboard with conversions and recordings",
    ],
  },
] as const;

export const comparisonSection = {
  eyebrow: "Head-to-Head",
  title: "AI Employee vs Traditional Team",
  subtitle:
    "See how autonomous AI employees outperform manual processes across every dimension.",
} as const;

export const comparisonRows = [
  {
    feature: "Response Speed",
    opsbrain: "Under 60 seconds",
    traditional: "Hours to days",
    opsbrainWins: true,
  },
  {
    feature: "Availability",
    opsbrain: "24/7/365",
    traditional: "Business hours only",
    opsbrainWins: true,
  },
  {
    feature: "Scalability",
    opsbrain: "Unlimited parallel calls",
    traditional: "Limited by headcount",
    opsbrainWins: true,
  },
  {
    feature: "CRM Updates",
    opsbrain: "Automatic, real-time",
    traditional: "Manual entry",
    opsbrainWins: true,
  },
  {
    feature: "Cost",
    opsbrain: "Fraction of SDR cost",
    traditional: "High salary + overhead",
    opsbrainWins: true,
  },
  {
    feature: "Languages",
    opsbrain: "50+ including Telugu, Hindi",
    traditional: "Limited by team skills",
    opsbrainWins: true,
  },
  {
    feature: "Consistency",
    opsbrain: "100% script adherence",
    traditional: "Varies by rep",
    opsbrainWins: true,
  },
] as const;

export const comparisonColumns = {
  opsbrain: "OpsBrain AI Employee",
  traditional: "Traditional Team",
} as const;

export const platformOverview = {
  title: "The AI Workforce Operating System",
  subtitle:
    "One platform to discover, engage, automate, and hand off - across every customer touchpoint.",
  pillars: [
    {
      label: "Discover",
      description: "Find and enrich leads automatically",
      icon: "Search",
    },
    {
      label: "Engage",
      description: "Call, chat, and connect in any language",
      icon: "Phone",
    },
    {
      label: "Automate",
      description: "Run workflows without manual work",
      icon: "Zap",
    },
    {
      label: "Handoff",
      description: "Route hot leads to humans with context",
      icon: "ArrowRightLeft",
    },
  ],
} as const;

export const multilingualSection = {
  eyebrow: "Voice Demos",
  title: "Hear Your AI Employees in Action",
  subtitle:
    "The same Cartesia voices your AI employees use on live calls - English, Hindi, and Telugu, with natural office ambience.",
  nativeEngineBadge: "Cartesia Sonic",
} as const;

export const voiceDemos = [
  {
    id: "sales-en",
    voiceId: "cartesia:07bc462a-c644-49f1-baf7-82d5599131be:en",
    language: "English",
    languageNative: "English",
    scriptBadge: "EN",
    persona: "Sindhu",
    trait: "Clear & Professional",
    audioSrc: "/audio/sales-en.mp3?v=cartesia-sindhu115",
    fallbackLang: "en-IN",
    fallbackDuration: 17,
  },
  {
    id: "sales-hi",
    voiceId: "cartesia:95d51f79-c397-46f9-b49a-23763d3eaa2d:hi",
    language: "Hindi",
    languageNative: "हिंदी",
    scriptBadge: "HI",
    persona: "Arushi",
    trait: "Hinglish & Natural",
    audioSrc: "/audio/sales-hi.mp3?v=cartesia-sindhu115",
    fallbackLang: "hi-IN",
    fallbackDuration: 22,
  },
  {
    id: "sales-te",
    voiceId: "cartesia:07bc462a-c644-49f1-baf7-82d5599131be:te",
    language: "Telugu",
    languageNative: "తెలుగు",
    scriptBadge: "TE",
    persona: "Sindhu",
    trait: "Conversational Partner",
    audioSrc: "/audio/sales-te.mp3?v=cartesia-sindhu115",
    fallbackLang: "te-IN",
    fallbackDuration: 24,
  },
] as const;

export const industryVoiceSection = {
  eyebrow: "Hear them work",
  titleBefore: "Who is your AI Employee ",
  titleHighlight: "best",
  titleAfter: " for?",
  subtitle:
    "From local businesses in Andhra & Telangana to teams across India, your AI employee pays for itself whenever your business runs on phone calls.",
  funFact:
    "Fun fact: in these recordings, both the prospect and the agent are AI - the same voices your employees use on live calls.",
} as const;

export const industryVoiceLangs = [
  { id: "te", label: "Telugu", native: "తెలుగు" },
  { id: "en", label: "English", native: "English" },
  { id: "hi", label: "Hindi", native: "हिंदी" },
] as const;

export type IndustryVoiceLangId = (typeof industryVoiceLangs)[number]["id"];

const V = "cartesia-skyline1";

export const industryVoiceCards = [
  {
    id: "realestate",
    title: "Real Estate & Builders",
    href: "/ai-employees/realestate",
    deployLabel: "Deploy for Real Estate",
    icon: "Building2",
    iconClass: "bg-sky-100 text-sky-700",
    variants: {
      te: {
        voiceCode: "Sindhu",
        description:
          "99acres enquiry వస్తే వెంటనే call - budget, location qualify చేసి weekend site visit book చేస్తుంది.",
        audioSrc: `/audio/industry-realestate-te.mp3?v=${V}`,
        fallbackLang: "te-IN",
        fallbackDuration: 48,
      },
      en: {
        voiceCode: "Sindhu",
        description:
          "Calls Facebook, 99acres and MagicBricks leads within seconds, qualifies budget and location, and books the weekend site visit.",
        audioSrc: `/audio/industry-realestate-en-sindhu.mp3?v=${V}`,
        fallbackLang: "en-IN",
        fallbackDuration: 23,
      },
      hi: {
        voiceCode: "Arushi",
        description:
          "99acres enquiry आते ही call - budget और location qualify करके weekend site visit book करती है।",
        audioSrc: `/audio/industry-realestate-hi.mp3?v=${V}`,
        fallbackLang: "hi-IN",
        fallbackDuration: 41,
      },
    },
  },
  {
    id: "school",
    title: "Coaching & Admissions",
    href: "/ai-employees/school",
    deployLabel: "Deploy for Coaching",
    icon: "GraduationCap",
    iconClass: "bg-orange-100 text-orange-700",
    variants: {
      te: {
        voiceCode: "Ramya",
        description:
          "Student enquiryకి instant Telugu call - class, batch timings, fees explain చేసి counseling slot book చేస్తుంది.",
        audioSrc: `/audio/industry-school-te.mp3?v=${V}`,
        fallbackLang: "te-IN",
        fallbackDuration: 42,
      },
      en: {
        voiceCode: "Ramya",
        description:
          "Screens student inquiries instantly, explains fees and batch timings, and books the counseling session.",
        audioSrc: `/audio/industry-school-en-ramya.mp3?v=${V}`,
        fallbackLang: "en-IN",
        fallbackDuration: 20,
      },
      hi: {
        voiceCode: "Aadhya",
        description:
          "Student enquiry पर तुरंत call - class, batch, fees बताकर counseling slot book करती है।",
        audioSrc: `/audio/industry-school-hi.mp3?v=${V}`,
        fallbackLang: "hi-IN",
        fallbackDuration: 41,
      },
    },
  },
  {
    id: "hospital",
    title: "Hospitals & Diagnostics",
    href: "/ai-employees/hospital",
    deployLabel: "Deploy for Hospitals",
    icon: "HeartPulse",
    iconClass: "bg-emerald-100 text-emerald-700",
    variants: {
      te: {
        voiceCode: "Bhavani",
        description:
          "OPD calls 24/7 - doctor availability చెప్పి appointment book చేసి, report reminders పంపుతుంది.",
        audioSrc: `/audio/industry-hospital-te.mp3?v=${V}`,
        fallbackLang: "te-IN",
        fallbackDuration: 46,
      },
      en: {
        voiceCode: "Bhavani",
        description:
          "Handles OPD inquiries 24/7, books doctor appointments, and sends report-ready reminders.",
        audioSrc: `/audio/industry-hospital-en-bhavani.mp3?v=${V}`,
        fallbackLang: "en-IN",
        fallbackDuration: 19,
      },
      hi: {
        voiceCode: "Riya",
        description:
          "OPD calls 24/7 - डॉक्टर की उपलब्धता बताकर appointment book करती है और report reminders भेजती है।",
        audioSrc: `/audio/industry-hospital-hi.mp3?v=${V}`,
        fallbackLang: "hi-IN",
        fallbackDuration: 39,
      },
    },
  },
  {
    id: "restaurant",
    title: "Restaurants & Banquets",
    href: "/ai-employees/restaurant",
    deployLabel: "Deploy for Restaurants",
    icon: "UtensilsCrossed",
    iconClass: "bg-rose-100 text-rose-700",
    variants: {
      te: {
        voiceCode: "Sindhu",
        description:
          "Rush hourలో ప్రతి call - table reservation, waitlist, buffet packages - Teluguలో confirm చేస్తుంది.",
        audioSrc: `/audio/industry-restaurant-te.mp3?v=${V}`,
        fallbackLang: "te-IN",
        fallbackDuration: 34,
      },
      en: {
        voiceCode: "Sindhu",
        description:
          "Answers every call during rush hours, takes reservations, manages waitlists, and confirms party packages.",
        audioSrc: `/audio/industry-restaurant-en-sindhu.mp3?v=${V}`,
        fallbackLang: "en-IN",
        fallbackDuration: 17,
      },
      hi: {
        voiceCode: "Aadhya",
        description:
          "Rush hour में हर call - table, waitlist, buffet - हिंदी में confirm करती है।",
        audioSrc: `/audio/industry-restaurant-hi.mp3?v=${V}`,
        fallbackLang: "hi-IN",
        fallbackDuration: 32,
      },
    },
  },
  {
    id: "sales",
    title: "Sales & Lead Calling",
    href: "/ai-employees/sales",
    deployLabel: "Deploy for Sales",
    icon: "Phone",
    iconClass: "bg-violet-100 text-violet-700",
    variants: {
      te: {
        voiceCode: "Bhavani",
        description:
          "Form fill అయిన ఒక నిమిషంలో call - interest qualify చేసి మీ calendarలో demo book చేస్తుంది.",
        audioSrc: `/audio/industry-sales-te.mp3?v=${V}`,
        fallbackLang: "te-IN",
        fallbackDuration: 47,
      },
      en: {
        voiceCode: "Bhavani",
        description:
          "Calls every new form fill in under a minute, qualifies interest, and books the demo on your calendar.",
        audioSrc: `/audio/industry-sales-en-bhavani.mp3?v=${V}`,
        fallbackLang: "en-IN",
        fallbackDuration: 18,
      },
      hi: {
        voiceCode: "Arushi",
        description:
          "Form fill होते ही एक minute में call - qualify करके आपके calendar पर demo book करती है।",
        audioSrc: `/audio/industry-sales-hi.mp3?v=${V}`,
        fallbackLang: "hi-IN",
        fallbackDuration: 42,
      },
    },
  },
  {
    id: "insurance",
    title: "Insurance Renewals",
    href: "/ai-employees/insurance",
    deployLabel: "Deploy for Insurance",
    icon: "ShieldCheck",
    iconClass: "bg-cyan-100 text-cyan-700",
    variants: {
      te: {
        voiceCode: "Ramya",
        description:
          "Policy expire అయ్యే ముందు call - cover plain Teluguలో explain చేసి renewal complete చేస్తుంది.",
        audioSrc: `/audio/industry-insurance-te.mp3?v=${V}`,
        fallbackLang: "te-IN",
        fallbackDuration: 41,
      },
      en: {
        voiceCode: "Ramya",
        description:
          "Proactively calls policyholders, explains coverage in plain language, and completes the renewal on the call.",
        audioSrc: `/audio/industry-insurance-en-ramya.mp3?v=${V}`,
        fallbackLang: "en-IN",
        fallbackDuration: 17,
      },
      hi: {
        voiceCode: "Sameer",
        description:
          "Policy expire से पहले call - cover सादी भाषा में समझाकर renewal complete करता है।",
        audioSrc: `/audio/industry-insurance-hi.mp3?v=${V}`,
        fallbackLang: "hi-IN",
        fallbackDuration: 35,
      },
    },
  },
  {
    id: "hr",
    title: "HR & Recruiting",
    href: "/ai-employees/hr",
    deployLabel: "Deploy for HR",
    icon: "Users",
    iconClass: "bg-indigo-100 text-indigo-700",
    variants: {
      te: {
        voiceCode: "Ramya",
        description:
          "Candidateని screen చేసి notice period, availability confirm చేసి interview slot book చేస్తుంది.",
        audioSrc: `/audio/industry-hr-te.mp3?v=${V}`,
        fallbackLang: "te-IN",
        fallbackDuration: 39,
      },
      en: {
        voiceCode: "Ramya",
        description:
          "Screens candidates, checks notice period and availability, and schedules interviews on your calendar.",
        audioSrc: `/audio/industry-hr-en-ramya.mp3?v=${V}`,
        fallbackLang: "en-IN",
        fallbackDuration: 15,
      },
      hi: {
        voiceCode: "Aadhya",
        description:
          "Candidate को screen करके notice period confirm करती है और interview slot book करती है।",
        audioSrc: `/audio/industry-hr-hi.mp3?v=${V}`,
        fallbackLang: "hi-IN",
        fallbackDuration: 37,
      },
    },
  },
  {
    id: "support",
    title: "Customer Support",
    href: "/ai-employees/support",
    deployLabel: "Deploy for Support",
    icon: "Headphones",
    iconClass: "bg-teal-100 text-teal-700",
    variants: {
      te: {
        voiceCode: "Bhavani",
        description:
          "Order, billing, ticket FAQsని Teluguలో resolve చేసి, complex issuesని humanకి contextతో escalate చేస్తుంది.",
        audioSrc: `/audio/industry-support-te.mp3?v=${V}`,
        fallbackLang: "te-IN",
        fallbackDuration: 37,
      },
      en: {
        voiceCode: "Bhavani",
        description:
          "Resolves FAQs from your knowledge base 24/7 and escalates complex tickets to humans with full context.",
        audioSrc: `/audio/industry-support-en-bhavani.mp3?v=${V}`,
        fallbackLang: "en-IN",
        fallbackDuration: 14,
      },
      hi: {
        voiceCode: "Arushi",
        description:
          "Order और ticket FAQs हिंदी में resolve करती है, जटिल issues human को context के साथ escalate करती है।",
        audioSrc: `/audio/industry-support-hi.mp3?v=${V}`,
        fallbackLang: "hi-IN",
        fallbackDuration: 33,
      },
    },
  },
] as const;

export const outcomesMetricsSection = {
  eyebrow: "Outcomes",
  title: "Results That Compound",
  subtitle: "Autonomous AI employees deliver measurable impact from day one.",
} as const;

export const outcomesMetrics = [
  { value: 60, suffix: "s", prefix: "<", label: "Response Time", decimals: 0 },
  { value: 50, suffix: "+", prefix: "", label: "Languages", decimals: 0 },
  { value: 10, suffix: "x", prefix: "", label: "Outreach Capacity", decimals: 0 },
  { value: 99.2, suffix: "%", prefix: "", label: "Uptime", decimals: 1 },
] as const;

export const roiCalculatorSection = {
  eyebrow: "Revenue Impact",
  title: "Slow Follow-Up Is Costing You Deals",
  subtitle:
    "Model your pipeline leak from response delay - and what instant AI follow-up can recover.",
  inputsPanelTitle: "Your sales pipeline",
  dashboardTitle: "Revenue impact dashboard",
  heroMetricLabel: "Monthly revenue recoverable with OpsBrain",
  secondaryMetrics: {
    missedFollowUps: "Missed follow-ups / month",
    revenueAtRisk: "Monthly revenue at risk today",
    dealsRecovered: "Additional deals / month with OpsBrain",
  },
  comparison: {
    title: "Response time impact",
    today: "Your team today",
    withOpsBrain: "With OpsBrain AI",
    opsBrainResponse: "Under 60 sec",
  },
  funnel: {
    title: "Pipeline flow",
    leads: "Leads in",
    followUps: "Follow-ups completed",
    revenue: "Revenue at risk",
  },
  methodology: {
    summary:
      "Estimates use a speed-to-lead decay model: longer first-response delay increases pre-contact drop-off and lowers effective conversion. OpsBrain assumes sub-60-second AI response. Recovery applies a conservative 72% factor.",
    sources: "Benchmarks informed by B2B speed-to-lead and inside-sales response studies.",
  },
  cta: { label: "Get Started", href: homepageAnchors.contact },
  secondaryCta: { label: "Contact", href: homepageAnchors.contact },
  disclaimer:
    "Illustrative estimates only - not financial advice. Actual results vary by industry, sales cycle, and team size.",
} as const;

export type RoiIndustryPreset = {
  id: string;
  label: string;
  leads: number;
  dealValueUsd: number;
  conversionRate: number;
  responseDelay: number;
};

export const roiIndustryPresets: RoiIndustryPreset[] = [
  {
    id: "real-estate",
    label: "Real Estate",
    leads: 400,
    dealValueUsd: 1500,
    conversionRate: 4,
    responseDelay: 3,
  },
  {
    id: "healthcare",
    label: "Healthcare",
    leads: 250,
    dealValueUsd: 800,
    conversionRate: 6,
    responseDelay: 2,
  },
  {
    id: "b2b-saas",
    label: "B2B SaaS",
    leads: 300,
    dealValueUsd: 500,
    conversionRate: 5,
    responseDelay: 2,
  },
  {
    id: "insurance",
    label: "Insurance",
    leads: 500,
    dealValueUsd: 350,
    conversionRate: 7,
    responseDelay: 4,
  },
];

export const whyOpsBrainSection = {
  eyebrow: "Trust & Security",
  title: "Enterprise-Grade Infrastructure You Can Rely On",
  subtitle:
    "Built for regulated industries and high-volume revenue teams that can't afford downtime or data risk.",
  trustBadges: [
    { label: "SOC 2 Type II", description: "Certified infrastructure" },
    { label: "GDPR Compliant", description: "EU data protection ready" },
    { label: "AES-256 Encryption", description: "At rest and in transit" },
    { label: "99.9% Uptime", description: "Enterprise SLA available" },
  ],
  checklist: [
    "SOC 2 Type II certified infrastructure",
    "GDPR compliant with EU data residency options",
    "AES-256 encryption at rest, TLS 1.3 in transit",
    "Role-based access controls and immutable audit logs",
    "99.9% uptime SLA on Enterprise plans",
    "Human handoff with full conversation context",
  ],
} as const;

export const faqSection = {
  eyebrow: "FAQ",
  title: "Questions, answered",
  subtitle: "Short answers. No jargon.",
} as const;

export const faqCategories = [
  {
    id: "product",
    label: "Product",
    title: "Product",
    items: [
      {
        question: "Can it speak Telugu and Hindi?",
        answer:
          "Yes. Native voice in Telugu, Hindi, English, and 50+ languages - including code-switching, not robotic translation.",
      },
      {
        question: "Can it transfer to a human?",
        answer:
          "Yes. It escalates with the transcript, CRM record, and full context so your team never starts from zero.",
      },
      {
        question: "Does it book meetings and update CRM?",
        answer:
          "Yes. It books on your calendar and syncs notes and status to Salesforce, HubSpot, Pipedrive, or your CRM.",
      },
      {
        question: "How long to go live?",
        answer:
          "Most teams launch the first AI employee in under 30 minutes. No engineering required.",
      },
      {
        question: "What are OpsSpark and OpsMeet?",
        answer:
          "Separate products. OpsSpark is AI social for founders. OpsMeet turns calls into notes and an action plan. OpsBrain is the flagship - voice employees that call and qualify.",
      },
    ],
  },
] as const;

export const finalCTASection = {
  eyebrow: "Contact Us",
  title: "Deploy Your AI Employee Today",
  subtitle:
    "Tell us about your business and we'll configure your first AI employee within 24 hours.",
  successMessage: "We'll contact you within 24 hours.",
} as const;

export const leadFormOptions = {
  industries: [
    "Real Estate",
    "Healthcare",
    "EdTech",
    "E-Commerce",
    "Insurance",
    "Restaurant",
    "Other",
  ],
  callVolumes: ["<1K", "1K-5K", "5K-10K", "10K+"],
  useCases: [
    "Lead Calling",
    "Inbound Support",
    "Bulk Campaigns",
    "Custom",
  ],
} as const;

export const footerLinks = {
  product: [
    { label: "OpsBrain AI", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Conversations", href: "/#industries" },
    { label: "Try a live call", href: "/try-a-live-call" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Platform", href: "/platform" },
    { label: "AI Employees", href: "/ai-employees" },
    { label: "Solutions", href: "/solutions" },
    { label: "Integrations", href: "/integrations" },
    { label: "Pricing", href: "/pricing" },
    { label: "Compare", href: "/compare" },
  ],
  alsoFromOpsBrain: [
    { label: "OpsSpark", href: "/products/spark" },
    { label: "OpsMeet", href: "/products/meet" },
  ],
  aiEmployees: [
    { label: "AI Sales Employee", href: "/ai-employees/sales" },
    { label: "AI Customer Support", href: "/ai-employees/support" },
    { label: "AI Hospital Assistant", href: "/ai-employees/hospital" },
    { label: "AI Real Estate Assistant", href: "/ai-employees/realestate" },
    { label: "AI HR Recruiter", href: "/ai-employees/hr" },
    { label: "View all personas", href: "/ai-employees" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
    { label: "Get Started", href: "/#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Compliance Guide", href: "/guides/tcpa-gdpr-ai-calling" },
  ],
} as const;

export const footer = {
  tagline: siteConfig.tagline,
  strip: "Built for revenue teams that never sleep. India-first. Globally ready.",
  copyright: `© ${new Date().getFullYear()} OpsBrain AI. All rights reserved.`,
  location: "India",
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/99239755/",
      icon: "linkedin",
    },
  ],
} as const;
