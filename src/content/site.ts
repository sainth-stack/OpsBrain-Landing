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
      "OpsBrain AI (OpsBrain) is an AI employees platform by Sainath Reddy Guraka — autonomous agents that find leads, make outbound calls in Telugu, Hindi, and English, qualify opportunities, book meetings, and sync to your CRM 24/7.",
    ogImage: brandLogos.ogImage,
  },
} as const;

/** Founder entity — used in JSON-LD, /about, and llms.txt. */
export const founder = {
  name: "Sainath Reddy Guraka",
  jobTitle: "Founder & CEO",
  description:
    "Sainath Reddy Guraka is the founder of OpsBrain AI, an AI employees and leads-finder platform that deploys autonomous voice agents for prospecting, outbound calling, qualification, and CRM-synced revenue operations.",
} as const;

export const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "AI Employees", href: "/ai-employees" },
  { label: "Solutions", href: "/solutions" },
  { label: "Listen Voice", href: "/#voice-demos" },
  { label: "FAQ", href: "/#faq" },
] as const;

/** Homepage-only anchors (sections exist only on `/`). */
export const homepageAnchors = {
  contact: "#contact",
  voiceDemos: "#voice-demos",
  faq: "#faq",
} as const;

/** Global CTAs — use `/#contact` so navbar and sticky bar work from every page. */
export const ctaLinks = {
  contact: { label: "Contact", href: "/#contact" },
  getStarted: { label: "Get Started", href: "/#contact" },
} as const;

export const hero = {
  eyebrow: "Autonomous Revenue Operations",
  headline: "AI Employees That Find, Call, Qualify & Sell 24/7",
  subheadline:
    "AI agents that prospect, call in Telugu, Hindi, and English, qualify leads, book meetings, and sync to your CRM.",
  primaryCta: { label: "Get Started", href: homepageAnchors.contact },
  secondaryCta: { label: "Watch Voice Demo", href: homepageAnchors.voiceDemos },
  stats: [
    { value: "10×", label: "More outreach capacity" },
    { value: "24/7", label: "Always-on coverage" },
    { value: "60%", label: "Lower cost per meeting" },
  ],
  visual: {
    ariaLabel:
      "OpsBrain AI employees prospect leads, call in regional languages, qualify opportunities, book meetings, sync to CRM, and grow pipeline automatically.",
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
        message: "AI call started – Telugu",
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

export const trustBarSection = {
  eyebrow: "Built for revenue teams",
  headline: "Trusted across real estate, healthcare, sales, and more.",
  integrationsLabel: "Integrates with",
  integrationsHref: "/integrations",
} as const;

export const trustBarIndustries = [
  { label: "Real Estate", icon: "Building2" },
  { label: "Healthcare", icon: "HeartPulse" },
  { label: "EdTech", icon: "GraduationCap" },
  { label: "Insurance", icon: "ShieldCheck" },
  { label: "Restaurants", icon: "UtensilsCrossed" },
  { label: "Sales", icon: "TrendingUp" },
] as const;

export const trustBarIntegrations = [
  { label: "Salesforce", icon: "Cloud", logo: "salesforce" },
  { label: "HubSpot", icon: "Megaphone", logo: "hubspot" },
  { label: "Pipedrive", icon: "Kanban", logo: "pipedrive" },
  { label: "Twilio", icon: "Phone", logo: "twilio" },
  { label: "Google Calendar", icon: "Calendar", logo: "google-calendar" },
] as const;

export const problemSection = {
  eyebrow: "The Problem",
  title: "The Human Bottleneck",
  subtitle:
    "Revenue teams lose pipeline every day to capacity limits - not lack of effort.",
  statHighlight:
    "78% of leads go to the vendor that responds first - average B2B response time: 42 hours",
  closingLine:
    "Humans are bottlenecked by capacity. AI Employees are not.",
  painPoints: [
    {
      title: "Delayed Follow-ups",
      description:
        "Leads go cold while reps juggle dozens of accounts and miss the critical first-hour window.",
      icon: "Clock",
    },
    {
      title: "Missed Calls",
      description:
        "Inbound and outbound calls slip through after hours, on weekends, and during peak volume.",
      icon: "PhoneMissed",
    },
    {
      title: "Overloaded Teams",
      description:
        "SDRs burn out on repetitive tasks while high-value deals sit untouched in the pipeline.",
      icon: "Users",
    },
    {
      title: "Manual CRM Work",
      description:
        "Reps spend hours logging calls, updating fields, and syncing data instead of selling.",
      icon: "Database",
    },
  ],
} as const;

export const aboutBlurb = {
  title: "About OpsBrain AI",
  description:
    "OpsBrain AI (also known as OpsBrain) is an AI employees and leads-finder platform founded by Sainath Reddy Guraka. Our mission is to build the most capable AI employee platform for revenue teams — replacing repetitive SDR and support workflows with intelligent agents that find leads, call in Telugu, Hindi, and English, qualify opportunities, and sync to your CRM. We envision a world where every business has a fully autonomous revenue team working around the clock, so humans can focus on relationships, strategy, and closing.",
} as const;

export const aboutPage = {
  path: "/about",
  title: "About OpsBrain AI — Founded by Sainath Reddy Guraka",
  description:
    "OpsBrain AI is an AI employees and leads-finder platform founded by Sainath Reddy Guraka. Learn how OpsBrain deploys autonomous voice agents that prospect, call, qualify, and sell 24/7.",
  h1: "About OpsBrain AI",
  intro:
    "OpsBrain AI (OpsBrain) builds autonomous AI employees for revenue teams — agents that find leads, make outbound and inbound calls, qualify opportunities, book meetings, and keep your CRM up to date without manual SDR work.",
  mission:
    "Our mission is to give every business an always-on revenue team. Humans focus on relationships, strategy, and closing; AI employees handle prospecting, calling, qualification, and follow-up at scale.",
  productFacts: [
    "AI employees for sales, support, healthcare, real estate, HR, insurance, education, and hospitality",
    "Multilingual voice in Telugu, Hindi, English, and 50+ languages",
    "Lead finder and speed-to-lead calling in under 60 seconds",
    "Bi-directional CRM sync (Salesforce, HubSpot, Pipedrive, and more)",
    "Plans from $299/mo with onboarding support",
  ],
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
    "Ten core capabilities that power autonomous AI employees across your entire funnel.",
} as const;

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
    "Pre-built personas go live in under 10 minutes — voice, scripts, and CRM sync included. Pick an agent, connect your stack, start calling.",
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
    gradient: "from-indigo-500 to-violet-600",
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
    gradient: "from-violet-500 to-purple-600",
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
    gradient: "from-teal-500 to-emerald-600",
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
    gradient: "from-amber-500 to-orange-600",
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
    gradient: "from-cyan-500 to-blue-600",
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
    gradient: "from-blue-500 to-indigo-600",
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
    gradient: "from-rose-500 to-pink-600",
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
    gradient: "from-emerald-500 to-teal-600",
    avatar: "realestate",
  },
  {
    id: "insurance",
    name: "AI Insurance Renewal Agent",
    role: "Insurance Ops",
    industry: "Insurance",
    outcomeMetric: "Processes renewals 3× faster",
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
    gradient: "from-sky-500 to-cyan-600",
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
  eyebrow: "Use Cases",
  title: "How OpsBrain AI Works",
  subtitle:
    "Three powerful workflows - from instant lead response to bulk outbound campaigns.",
} as const;

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
    "Natural AI voice samples in English, Hindi, and Telugu — the same languages your team sells and supports in every day.",
  nativeEngineBadge: "Sample Voices",
} as const;

export const voiceDemos = [
  {
    id: "sales-en",
    voiceId: "oO7sLA3dWfQXsKeSAjpA",
    language: "English",
    languageNative: "English",
    scriptBadge: "EN",
    persona: "Sarah",
    trait: "Confident & Clear",
    audioSrc: "/audio/sales-en.mp3?v=elevenlabs5",
    fallbackLang: "en-US",
    fallbackDuration: 26,
  },
  {
    id: "sales-hi",
    voiceId: "RABOvaPec1ymXz02oDQi",
    language: "Hindi",
    languageNative: "हिंदी",
    scriptBadge: "HI",
    persona: "Priya",
    trait: "Warm & Professional",
    audioSrc: "/audio/sales-hi.mp3?v=elevenlabs7",
    fallbackLang: "hi-IN",
    fallbackDuration: 40,
  },
  {
    id: "sales-en-alex",
    voiceId: "oO7sLA3dWfQXsKeSAjpA",
    language: "English",
    languageNative: "English",
    scriptBadge: "EN",
    persona: "Emma",
    trait: "Sharp & Persuasive",
    audioSrc: "/audio/hero-demo.mp3",
    fallbackLang: "en-US",
    fallbackDuration: 38,
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
  { value: 10, suffix: "×", prefix: "", label: "Outreach Capacity", decimals: 0 },
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
  title: "Frequently Asked Questions",
  subtitle:
    "Everything you need to know about deploying AI employees for your business.",
} as const;

export const faqCategories = [
  {
    id: "capabilities",
    label: "Capabilities",
    title: "Capabilities",
    items: [
      {
        question: "Can AI speak Telugu and Hindi naturally?",
        answer:
          "Yes. OpsBrain AI employees use native multilingual voice engines trained for natural conversation in Telugu, Hindi, English, and 50+ languages. They handle code-switching, regional accents, and industry-specific vocabulary - not robotic translations.",
      },
      {
        question: "Can it transfer to a human agent?",
        answer:
          "Absolutely. AI employees detect complex issues, frustrated callers, or high-value opportunities and instantly escalate to a human with full conversation context, transcript, and CRM record attached - so your team never starts from zero.",
      },
      {
        question: "Can it book appointments and update CRM automatically?",
        answer:
          "Yes. AI employees book meetings directly on your team's calendars, send confirmations, and bi-directionally sync every call note, qualification score, and status update to Salesforce, HubSpot, Pipedrive, or your CRM via API.",
      },
      {
        question: "What industries is OpsBrain AI built for?",
        answer:
          "OpsBrain is built for Real Estate, Healthcare, EdTech, E-Commerce, Insurance, Restaurants, SaaS, and professional services. Pre-built AI employee personas cover sales, support, admissions, collections, and front-desk workflows out of the box.",
      },
    ],
  },
  {
    id: "setup",
    label: "Setup & Integration",
    title: "Setup & Integration",
    items: [
      {
        question: "How long does it take to deploy an AI employee?",
        answer:
          "Most teams deploy their first AI employee in under 30 minutes. Choose a persona, upload your scripts and ICP criteria, connect your CRM and calendar, and go live - no engineering required.",
      },
      {
        question: "What tools does OpsBrain integrate with?",
        answer:
          "OpsBrain connects to Salesforce, HubSpot, Pipedrive, Google Calendar, Outlook, Twilio, WhatsApp, Facebook Lead Ads, and custom systems via REST API. Every interaction is logged and synced in real time.",
      },
      {
        question: "Do I need technical resources to set it up?",
        answer:
          "No. OpsBrain is designed for revenue and operations teams. Our onboarding team helps configure scripts, voice settings, escalation rules, and CRM field mapping during onboarding.",
      },
      {
        question: "Is OpsBrain AI SOC 2 compliant?",
        answer:
          "Yes. OpsBrain AI is SOC 2 Type II certified with AES-256 encryption at rest, TLS 1.3 in transit, role-based access controls, and immutable audit logs for every AI action.",
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
    { label: "Platform", href: "/platform" },
    { label: "AI Employees", href: "/ai-employees" },
    { label: "Solutions", href: "/solutions" },
    { label: "Integrations", href: "/integrations" },
    { label: "Pricing", href: "/pricing" },
    { label: "Compare", href: "/compare" },
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
    { label: "About", href: "/about" },
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
  copyright: `© ${new Date().getFullYear()} OpsBrain AI. All rights reserved.`,
} as const;
