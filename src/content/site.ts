import { brandAssets } from "@/assets/brand";

/** Brand assets - `src/assets/brand/` + favicons + OG image */
export const brandLogos = {
  ogImage: brandAssets.ogImage,
  favicon: brandAssets.favicon,
} as const;

export const siteConfig = {
  name: "OpsBrain AI",
  tagline:
    "AI Employees That Find Leads, Call, Qualify, Schedule, Support, and Sell - 24/7",
  url: "https://opsbrain.ai",
  seo: {
    title:
      "OpsBrain AI | AI Employees That Find, Call, Qualify & Sell 24/7",
    description:
      "Deploy autonomous AI employees that prospect leads, make outbound calls, qualify opportunities, book meetings, and deliver 24/7 support - all synced to your CRM. Replace manual SDR work with an always-on revenue engine.",
    ogImage: brandLogos.ogImage,
  },
} as const;

export const navLinks = [
  { label: "Platform", href: "#capabilities" },
  { label: "AI Employees", href: "#ai-employees" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
] as const;

export const appUrl = "https://app.opsbrainai.com" as const;

export const ctaLinks = {
  bookDemo: { label: "Book Demo", href: "#contact" },
  login: { label: "Log in", href: appUrl },
} as const;

export const hero = {
  eyebrow: "Autonomous Revenue Operations",
  headline: "AI Employees That Find, Call, Qualify & Sell 24/7",
  subheadline:
    "AI agents that prospect, call in Telugu, Hindi, and English, qualify leads, book meetings, and sync to your CRM.",
  primaryCta: { label: "Book a Demo", href: "#contact" },
  secondaryCta: { label: "Watch Voice Demo", href: "#voice-demos" },
  socialProof: "Trusted across real estate, healthcare, sales, and more.",
  stats: [
    { value: "10×", label: "More outreach capacity" },
    { value: "24/7", label: "Always-on coverage" },
    { value: "60%", label: "Lower cost per meeting" },
  ],
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
  { label: "Salesforce", icon: "Cloud" },
  { label: "HubSpot", icon: "Megaphone" },
  { label: "Pipedrive", icon: "Kanban" },
  { label: "Twilio", icon: "Phone" },
  { label: "Google Calendar", icon: "Calendar" },
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
    "Our mission is to build the most capable AI employee platform for revenue teams - replacing repetitive SDR and support workflows with intelligent agents that integrate seamlessly into existing sales stacks. We envision a world where every business has a fully autonomous revenue team working around the clock, so humans can focus on relationships, strategy, and closing.",
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
  title: "Meet Your AI Employees",
  subtitle:
    "Pre-built personas for every industry - deploy in minutes, customize for your workflows.",
} as const;

export const aiEmployees = [
  {
    id: "sales",
    name: "AI Sales Employee",
    role: "Outbound Sales",
    industry: "Sales",
    description:
      "Calls leads within seconds of form submission, qualifies interest, and books demos on your calendar.",
    fullDescription:
      "Your always-on SDR that responds to inbound and outbound leads in under 60 seconds. Handles objection handling, qualification questions, and calendar booking - then syncs every call note and score to your CRM.",
    gradient: "from-indigo-500 to-violet-600",
    avatar: "sales",
  },
  {
    id: "hr",
    name: "AI HR Recruiter",
    role: "Talent Acquisition",
    industry: "HR",
    description:
      "Screens candidates, schedules interviews, and sends personalized follow-ups across multiple languages.",
    fullDescription:
      "Automates first-round screening calls, availability checks, and interview scheduling. Supports multilingual candidate outreach and keeps your ATS updated with structured notes after every conversation.",
    gradient: "from-violet-500 to-purple-600",
    avatar: "hr",
  },
  {
    id: "hospital",
    name: "AI Hospital Assistant",
    role: "Healthcare Front Desk",
    industry: "Healthcare",
    description:
      "Handles appointment booking, insurance verification, and patient inquiries around the clock.",
    fullDescription:
      "Manages appointment scheduling, insurance pre-verification, and patient FAQs 24/7. Escalates urgent cases to staff with full context and maintains HIPAA-aware conversation logs.",
    gradient: "from-teal-500 to-emerald-600",
    avatar: "hospital",
  },
  {
    id: "payment",
    name: "AI Payment Reminder Agent",
    role: "Collections & Billing",
    industry: "Finance",
    description:
      "Sends polite payment reminders, negotiates plans, and updates billing systems automatically.",
    fullDescription:
      "Runs courteous outbound payment reminder campaigns, offers structured payment plans, and logs outcomes to your billing system - reducing delinquency without adding headcount.",
    gradient: "from-amber-500 to-orange-600",
    avatar: "payment",
  },
  {
    id: "support",
    name: "AI Customer Support Agent",
    role: "24/7 Support",
    industry: "Support",
    description:
      "Answers FAQs, resolves common issues, and escalates complex tickets to human agents instantly.",
    fullDescription:
      "Handles tier-1 support calls around the clock, resolves common issues from your knowledge base, and escalates to humans with full transcript and CRM context when needed.",
    gradient: "from-cyan-500 to-blue-600",
    avatar: "support",
  },
  {
    id: "school",
    name: "AI School Admission Counselor",
    role: "EdTech Admissions",
    industry: "EdTech",
    description:
      "Guides prospective students, answers program questions, and schedules campus visits or interviews.",
    fullDescription:
      "Engages prospective students and parents, answers program and fee questions in their preferred language, and books campus visits or counselor interviews automatically.",
    gradient: "from-blue-500 to-indigo-600",
    avatar: "school",
  },
  {
    id: "restaurant",
    name: "AI Restaurant Receptionist",
    role: "Hospitality",
    industry: "Hospitality",
    description:
      "Takes reservations, manages waitlists, and handles takeout orders with natural conversation.",
    fullDescription:
      "Answers every call during peak hours, manages reservations and waitlists, processes takeout orders, and sends confirmation texts - in English, Hindi, or Telugu.",
    gradient: "from-rose-500 to-pink-600",
    avatar: "restaurant",
  },
  {
    id: "realestate",
    name: "AI Real Estate Assistant",
    role: "Property Sales",
    industry: "Real Estate",
    description:
      "Qualifies buyers, schedules property viewings, and follows up on listing inquiries automatically.",
    fullDescription:
      "Qualifies buyer intent and budget, schedules property viewings on agent calendars, and follows up on portal inquiries within seconds - keeping hot leads from going cold.",
    gradient: "from-emerald-500 to-teal-600",
    avatar: "realestate",
  },
  {
    id: "insurance",
    name: "AI Insurance Renewal Agent",
    role: "Insurance Ops",
    industry: "Insurance",
    description:
      "Proactively calls policyholders for renewals, explains coverage changes, and processes updates.",
    fullDescription:
      "Runs proactive renewal outreach campaigns, explains policy changes in plain language, and processes updates or routes complex cases to licensed agents.",
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
  subtitle: "Native conversations in Telugu, Hindi, English - and more.",
  nativeEngineBadge: "Native Engine",
} as const;

export const voiceDemos = [
  {
    id: "telugu",
    language: "Telugu",
    languageNative: "తెలుగు",
    scriptBadge: "TE",
    persona: "Arjun",
    trait: "Energetic & Native",
    audioSrc: "/audio/telugu-lead-demo.mp3",
    fallbackLang: "te-IN",
    fallbackDuration: 8,
    script:
      "నమస్తే, OpsBrain AI నుండి మాట్లాడుతున్నాను. మీ inquiry గురించి మాట్లాడదాం. ఈ వారం demo schedule చేద్దామా?",
    transcript: [
      "నమస్తే, OpsBrain AI నుండి మాట్లాడుతున్నాను.",
      "మీ inquiry గురించి - మా product మీ requirementsకు suit అవుతుందా?",
      "చాలా బాగుంది! నేను గురువారం demo book చేస్తాను.",
    ],
  },
  {
    id: "hindi",
    language: "Hindi",
    languageNative: "हिंदी",
    scriptBadge: "HI",
    persona: "Priya",
    trait: "Warm & Conversational",
    audioSrc: "/audio/hindi-support-demo.mp3",
    fallbackLang: "hi-IN",
    fallbackDuration: 10,
    script:
      "नमस्ते, मैं OpsBrain AI से बोल रहा हूँ। आपकी inquiry के बारे में बात करना चाहता हूँ। क्या आप इस हफ्ते demo schedule कर सकते हैं?",
    transcript: [
      "नमस्ते, मैं OpsBrain AI से बोल रहा हूँ।",
      "आपकी inquiry के बारे में - क्या आप हमारे product में interested हैं?",
      "बढ़िया! मैं आपके लिए गुरुवार को demo book कर देता हूँ।",
    ],
  },
  {
    id: "english",
    language: "English",
    languageNative: "English",
    scriptBadge: "EN",
    persona: "Alex",
    trait: "Professional & Clear",
    audioSrc: "/audio/english-sales-demo.mp3",
    fallbackLang: "en-US",
    fallbackDuration: 11,
    script:
      "Hi, this is OpsBrain calling about your inquiry. I wanted to quickly understand your requirements and see if we can schedule a demo this week. Are you available Thursday afternoon?",
    transcript: [
      "Hi, this is OpsBrain calling about your inquiry.",
      "I wanted to quickly understand your requirements and see if we can schedule a demo this week.",
      "Great - I have Thursday at 2 PM open. Shall I send a calendar invite?",
    ],
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
  cta: { label: "Book Demo", href: "#contact" },
  secondaryCta: { label: "Log in", href: appUrl },
  disclaimer:
    "Illustrative estimates only - not financial advice. Actual results vary by industry, sales cycle, and team size.",
} as const;

export type RoiIndustryPreset = {
  id: string;
  label: string;
  leads: number;
  dealValueInr: number;
  dealValueUsd: number;
  conversionRate: number;
  responseDelay: number;
};

export const roiIndustryPresets: RoiIndustryPreset[] = [
  {
    id: "real-estate",
    label: "Real Estate",
    leads: 400,
    dealValueInr: 75000,
    dealValueUsd: 1500,
    conversionRate: 4,
    responseDelay: 3,
  },
  {
    id: "healthcare",
    label: "Healthcare",
    leads: 250,
    dealValueInr: 35000,
    dealValueUsd: 800,
    conversionRate: 6,
    responseDelay: 2,
  },
  {
    id: "b2b-saas",
    label: "B2B SaaS",
    leads: 300,
    dealValueInr: 25000,
    dealValueUsd: 500,
    conversionRate: 5,
    responseDelay: 2,
  },
  {
    id: "insurance",
    label: "Insurance",
    leads: 500,
    dealValueInr: 18000,
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
          "No. OpsBrain is designed for revenue and operations teams. Our onboarding team helps configure scripts, voice settings, escalation rules, and CRM field mapping during your 14-day pilot.",
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
  tabs: {
    contact: "Contact Us",
    demo: "Book Demo",
  },
  bookDemo: {
    placeholder:
      "Calendly scheduling widget will appear here. Connect your Calendly URL to enable inline booking.",
    calendlyUrl: "",
    mailtoFallback: "mailto:hello@opsbrain.ai?subject=Book%20a%20Demo",
  },
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
    { label: "Platform", href: "#capabilities" },
    { label: "AI Employees", href: "#ai-employees" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Integrations", href: "#trust-bar" },
  ],
  aiEmployees: [
    { label: "AI Sales Employee", href: "#ai-employees" },
    { label: "AI Customer Support", href: "#ai-employees" },
    { label: "AI Hospital Assistant", href: "#ai-employees" },
    { label: "AI Real Estate Assistant", href: "#ai-employees" },
    { label: "AI HR Recruiter", href: "#ai-employees" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#contact" },
    { label: "Blog", href: "#contact" },
    { label: "Contact", href: "#contact" },
    { label: "Book Demo", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const footer = {
  tagline: siteConfig.tagline,
  copyright: `© ${new Date().getFullYear()} OpsBrain AI. All rights reserved.`,
} as const;
