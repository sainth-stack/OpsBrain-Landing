import {
  aiEmployees,
  aiEmployeesSection,
  capabilities,
  capabilitiesSection,
  howItWorksTabs,
  platformOverview,
  siteConfig,
  trustBarIntegrations,
} from "@/content/site";

export type FaqItem = { question: string; answer: string };

export type BreadcrumbItem = { name: string; path: string };

export type SolutionSlug = "lead-calling" | "inbound-support" | "bulk-campaigns";

export const solutionPages: Record<
  SolutionSlug,
  {
    path: string;
    label: string;
    title: string;
    description: string;
    keywords: string[];
    faq: FaqItem[];
    benefits: string[];
    relatedEmployeeIds: string[];
  }
> = {
  "lead-calling": {
    path: "/solutions/lead-calling",
    label: "Instant Lead Calling",
    title: "Instant AI Lead Calling",
    description:
      "Respond to every inbound lead in under 60 seconds with AI voice agents that qualify, book meetings, and sync to your CRM in Telugu, Hindi, or English.",
    keywords: [
      "AI lead calling",
      "speed to lead",
      "instant outbound AI",
      "SDR automation",
    ],
    benefits: [
      "Call new leads within seconds of form submission",
      "Qualify interest with natural multilingual conversation",
      "Book demos directly on rep calendars with context-rich notes",
      "Bi-directional CRM sync for every call and outcome",
    ],
    relatedEmployeeIds: ["sales", "realestate", "school"],
    faq: [
      {
        question: "How fast can OpsBrain call a new lead?",
        answer:
          "OpsBrain AI employees typically place the first outbound call in under 60 seconds after a form submission, ad lead, or CRM trigger — so prospects hear from you while intent is highest.",
      },
      {
        question: "Can lead calling run in Telugu and Hindi?",
        answer:
          "Yes. Lead-calling workflows support Telugu, Hindi, English, and 50+ languages with native voice quality, including code-switching common in Indian markets.",
      },
      {
        question: "Does instant lead calling integrate with Salesforce or HubSpot?",
        answer:
          "Yes. Every call, qualification score, and booked meeting syncs to Salesforce, HubSpot, Pipedrive, or your CRM via API in real time.",
      },
      {
        question: "What happens if the AI cannot qualify the lead?",
        answer:
          "The AI can transfer to a human rep with full transcript and CRM context, or schedule a follow-up based on your playbook rules.",
      },
    ],
  },
  "inbound-support": {
    path: "/solutions/inbound-support",
    label: "24/7 Inbound Support",
    title: "24/7 AI Inbound Support",
    description:
      "Never miss an inbound call. OpsBrain AI employees answer 24/7, resolve tier-1 issues from your knowledge base, and escalate to humans with full context.",
    keywords: [
      "AI inbound support",
      "24/7 phone answering",
      "AI customer service",
      "call center automation",
    ],
    benefits: [
      "Answer every inbound call instantly, including after hours",
      "Resolve common FAQs from your knowledge base without wait times",
      "Escalate complex issues to humans with transcript and CRM record attached",
      "Log every interaction for QA, training, and compliance",
    ],
    relatedEmployeeIds: ["support", "hospital", "restaurant"],
    faq: [
      {
        question: "Can AI inbound support replace my entire call center?",
        answer:
          "OpsBrain is designed to handle tier-1 volume autonomously while routing complex or high-value calls to your team with full context — reducing cost without sacrificing customer experience.",
      },
      {
        question: "How does escalation to a human agent work?",
        answer:
          "When the AI detects frustration, complexity, or a configured trigger, it warm-transfers or schedules a callback with transcript, sentiment, and CRM fields already populated.",
      },
      {
        question: "Is inbound support available on weekends and holidays?",
        answer:
          "Yes. AI employees run 24/7/365 with consistent script adherence and multilingual coverage, so peak and off-hours volume is covered without overtime staffing.",
      },
      {
        question: "Which helpdesk tools does OpsBrain integrate with?",
        answer:
          "OpsBrain connects to Zendesk, Intercom, Salesforce Service Cloud, and custom ticketing systems via API, keeping tickets and call logs in sync.",
      },
    ],
  },
  "bulk-campaigns": {
    path: "/solutions/bulk-campaigns",
    label: "Bulk Outbound Campaigns",
    title: "Bulk AI Outbound Campaigns",
    description:
      "Launch parallel AI outbound call campaigns from CSV uploads or CRM lists. Configure scripts, languages, and schedules — then review conversions and recordings.",
    keywords: [
      "AI outbound campaigns",
      "bulk AI calling",
      "parallel voice campaigns",
      "automated dialer AI",
    ],
    benefits: [
      "Upload CSV lists or sync segments directly from your CRM",
      "Run parallel call waves with language and timezone-aware scheduling",
      "Track connect rates, conversions, and recordings in one dashboard",
      "Pause, resume, or adjust scripts without engineering support",
    ],
    relatedEmployeeIds: ["hr", "payment", "insurance"],
    faq: [
      {
        question: "How many calls can OpsBrain run in parallel?",
        answer:
          "OpsBrain scales to thousands of concurrent AI voice sessions depending on your plan and compliance requirements — far beyond what a manual outbound team can dial in a day.",
      },
      {
        question: "Can I use different scripts per campaign?",
        answer:
          "Yes. Each campaign supports its own script, voice persona, language, calling window, and CRM field mapping so renewals, collections, and recruiting flows stay separate.",
      },
      {
        question: "Is bulk calling compliant with TCPA and local regulations?",
        answer:
          "OpsBrain provides consent tracking, DNC list support, and configurable calling windows. Your legal team should approve scripts and list sources for your jurisdiction.",
      },
      {
        question: "What results can I review after a campaign?",
        answer:
          "Dashboards show connect rates, disposition codes, booked meetings, payment commitments, and full call recordings with searchable transcripts.",
      },
    ],
  },
};

export const hubPages = {
  aiEmployees: {
    path: "/ai-employees",
    title: "AI Employees by Industry",
    description:
      "Browse pre-built OpsBrain AI employees for sales, healthcare, hospitality, HR, insurance, and more. Deploy voice agents with CRM sync in under 30 minutes.",
    intro:
      "Choose a pre-configured AI employee persona — complete with industry scripts, multilingual voice, and CRM integrations — and go live without building from scratch.",
  },
  pricing: {
    path: "/pricing",
    title: "Pricing & Plans",
    description:
      "OpsBrain AI pricing with plans from $299/mo. Scale AI employees across lead calling, support, and outbound campaigns, or go custom with Enterprise.",
    faq: [
      {
        question: "How much does OpsBrain AI cost?",
        answer:
          "OpsBrain has three plans: Starter at $299/mo for 5 AI employees, Growth at $1,499/mo for 20 AI employees, and Enterprise with custom pricing for unlimited AI employees, SLAs, and compliance. Contact us to find the right fit for your pipeline.",
      },
      {
        question: "What is included in Enterprise plans?",
        answer:
          "Enterprise plans add SOC 2 controls, custom SLAs, EU data residency options, unlimited parallel calling, dedicated phone numbers, and priority support with custom integration work.",
      },
      {
        question: "Do you charge per minute or per seat?",
        answer:
          "OpsBrain is priced by AI-employee tiers — 5 with Starter, 20 with Growth, and unlimited with Enterprise — so you pay for outcomes, not idle SDR seats. Usage-based voice minutes are included within each plan.",
      },
    ] satisfies FaqItem[],
  },
  integrations: {
    path: "/integrations",
    title: "CRM & Stack Integrations",
    description:
      "Connect OpsBrain AI to Salesforce, HubSpot, Pipedrive, Twilio, Google Calendar, Zendesk, and more. Real-time bi-directional sync for calls, meetings, and tickets.",
  },
  platform: {
    path: "/platform",
    title: "AI Workforce Platform",
    description:
      "The OpsBrain platform unifies lead prospecting, AI voice calling, CRM sync, scheduling, and analytics — one operating system for autonomous revenue teams.",
  },
  solutions: {
    path: "/solutions",
    title: "AI Voice Solutions",
    description:
      "Instant lead calling, 24/7 inbound support, and bulk outbound campaigns — three OpsBrain workflows that deploy AI voice agents with CRM sync in under 30 minutes.",
    intro:
      "Pick the workflow that matches your revenue motion. Each solution includes multilingual voice, script configuration, and real-time CRM integration.",
  },
} as const;

const industrySolutionMap: Record<string, SolutionSlug> = {
  sales: "lead-calling",
  hr: "bulk-campaigns",
  hospital: "inbound-support",
  payment: "bulk-campaigns",
  support: "inbound-support",
  school: "lead-calling",
  restaurant: "inbound-support",
  realestate: "lead-calling",
  insurance: "bulk-campaigns",
};

const industrySeoMeta: Record<
  string,
  { title: string; description: string; keywords: string[]; paragraphs: string[]; faq: FaqItem[] }
> = {
  sales: {
    title: "AI Sales Employee for Outbound Teams",
    description:
      "Deploy an AI sales employee that calls leads in 60 seconds, qualifies buyers, books demos, and syncs to Salesforce or HubSpot — 24/7 SDR automation.",
    keywords: ["AI SDR", "AI sales agent", "outbound sales automation"],
    paragraphs: [
      "Revenue teams lose deals when reps cannot respond fast enough. An OpsBrain AI Sales Employee acts as an always-on SDR — dialing new leads within a minute of form submission, running qualification questions, handling objections from your playbook, and booking meetings on the right rep's calendar.",
      "Unlike static chatbots, the AI Sales Employee places real voice calls in Telugu, Hindi, or English. Every conversation is transcribed, scored, and written back to Salesforce, HubSpot, or Pipedrive so managers see pipeline impact without manual data entry.",
    ],
    faq: [
      {
        question: "Can the AI Sales Employee replace my SDR team?",
        answer:
          "It augments SDR capacity for speed-to-lead and repetitive qualification. High-value negotiations and complex deals still route to human reps with full call context attached.",
      },
      {
        question: "Which CRMs does the AI Sales Employee support?",
        answer:
          "Native connectors for Salesforce, HubSpot, and Pipedrive plus Calendly for scheduling. Custom fields and API mappings are configured during onboarding.",
      },
      {
        question: "How quickly can we go live with outbound sales calling?",
        answer:
          "Most sales teams deploy their first AI Sales Employee in under 30 minutes using pre-built scripts, then refine messaging with our onboarding team as they scale.",
      },
      {
        question: "Does it handle objection handling on live calls?",
        answer:
          "Yes. Scripts include branching logic for common objections — pricing, timing, authority — and the AI adapts follow-up questions based on responses before booking or escalating.",
      },
    ],
  },
  hr: {
    title: "AI HR Recruiter for High-Volume Hiring",
    description:
      "Automate first-round candidate screening, interview scheduling, and ATS updates with an AI HR recruiter that calls 50+ candidates per day in multiple languages.",
    keywords: ["AI recruiter", "AI HR screening", "automated interview scheduling"],
    paragraphs: [
      "Talent teams drown in applications while strong candidates accept other offers. The OpsBrain AI HR Recruiter runs structured screening calls, confirms availability, schedules interviews, and pushes notes into Greenhouse, Lever, or your ATS — without recruiters copying transcripts by hand.",
      "Multilingual outreach helps you engage candidates in their preferred language across regions. The AI follows compliance-friendly scripts, captures structured responses, and flags edge cases for human review.",
    ],
    faq: [
      {
        question: "Can the AI HR Recruiter integrate with Greenhouse or Lever?",
        answer:
          "Yes. Screening outcomes, scores, and interview times sync to Greenhouse, Lever, and Google Calendar with configurable field mapping.",
      },
      {
        question: "How many screening calls can it run daily?",
        answer:
          "The AI HR Recruiter routinely screens 50+ candidates per day in parallel waves, limited only by your list size and calling-window policies.",
      },
      {
        question: "Does it support multilingual candidate outreach?",
        answer:
          "Yes. Screening flows run in English, Hindi, Telugu, and 50+ additional languages with natural voice — not robotic translation.",
      },
      {
        question: "What happens when a candidate needs a human recruiter?",
        answer:
          "Complex compensation, visa, or sensitivity topics trigger escalation with full transcript and candidate profile attached for your team.",
      },
    ],
  },
  hospital: {
    title: "AI Hospital Assistant for Patient Front Desk",
    description:
      "24/7 AI hospital front desk for appointment booking, insurance pre-verification, and patient FAQs — with HIPAA-aware logs and EHR-friendly workflows.",
    keywords: ["AI healthcare front desk", "hospital appointment AI", "patient call automation"],
    paragraphs: [
      "Front desks miss calls during peak volume and after hours, leading to lost appointments and frustrated patients. The OpsBrain AI Hospital Assistant books and reschedules visits, pre-verifies insurance, answers common patient questions, and escalates urgent cases to staff with complete context.",
      "Built for healthcare operations, conversation logs support HIPAA-aware retention policies and integrate with Epic, Cerner, or scheduling APIs your team already uses.",
    ],
    faq: [
      {
        question: "Is the AI Hospital Assistant HIPAA compliant?",
        answer:
          "OpsBrain provides HIPAA-ready infrastructure with encryption, access controls, and audit logs. Your BAA and data handling policies are finalized during enterprise onboarding.",
      },
      {
        question: "Can it book appointments in Epic or Cerner?",
        answer:
          "Yes, via scheduling integrations and API connectors configured to your EHR workflow — including insurance pre-verification before the visit.",
      },
      {
        question: "How are urgent patient calls handled?",
        answer:
          "Urgent symptoms or emergency language triggers immediate escalation to on-call staff with patient details and call transcript attached.",
      },
      {
        question: "Does it run overnight and on weekends?",
        answer:
          "Yes. The assistant answers patient calls 24/7 so after-hours and weekend inquiries convert to booked appointments instead of voicemail.",
      },
    ],
  },
  payment: {
    title: "AI Payment Reminder & Collections Agent",
    description:
      "Reduce delinquency with polite AI payment reminder calls, structured payment plans on the call, and automatic billing system updates via Stripe or QuickBooks.",
    keywords: ["AI collections calls", "payment reminder automation", "billing outreach AI"],
    paragraphs: [
      "Collections teams struggle to reach every overdue account without damaging customer relationships. The OpsBrain AI Payment Reminder Agent runs courteous outbound campaigns, offers approved payment plans during the conversation, and logs outcomes to Stripe, QuickBooks, or Salesforce.",
      "Parallel calling lets finance teams cover entire aging buckets in hours instead of weeks — with consistent messaging and compliance-friendly scripts.",
    ],
    faq: [
      {
        question: "Can the AI negotiate payment plans on a live call?",
        answer:
          "Yes, within limits you configure — installment amounts, dates, and exceptions route to human collectors when needed.",
      },
      {
        question: "Which billing systems integrate with payment reminders?",
        answer:
          "Stripe, QuickBooks, and Salesforce billing objects are supported out of the box, with custom API mapping for proprietary systems.",
      },
      {
        question: "How does OpsBrain keep collections calls compliant?",
        answer:
          "Calling windows, consent records, and script approvals are enforced per campaign. Your compliance team reviews flows before launch.",
      },
    ],
  },
  support: {
    title: "AI Customer Support Agent — 24/7 Tier 1",
    description:
      "Resolve 70% of tier-1 support calls without escalation. AI answers FAQs from your knowledge base, updates Zendesk or Intercom, and hands off with full CRM context.",
    keywords: ["AI customer support agent", "tier 1 AI support", "24/7 helpdesk AI"],
    paragraphs: [
      "Support queues spike after hours and during product launches, leaving customers on hold. The OpsBrain AI Customer Support Agent resolves common issues from your knowledge base, creates or updates tickets in Zendesk or Intercom, and escalates only when human judgment is required.",
      "Every interaction includes searchable transcripts and disposition codes so QA and product teams spot trends without listening to every recording.",
    ],
    faq: [
      {
        question: "What percentage of calls can the AI resolve without humans?",
        answer:
          "Most teams see 60–70% of tier-1 issues resolved autonomously, depending on knowledge-base coverage and escalation rules.",
      },
      {
        question: "Does it integrate with Zendesk and Intercom?",
        answer:
          "Yes. Tickets, tags, and customer history sync bi-directionally so agents pick up exactly where the AI left off.",
      },
      {
        question: "Can customers request a human at any time?",
        answer:
          "Yes. Instant transfer or callback scheduling is available on every call, with transcript and CRM context attached for the agent.",
      },
    ],
  },
  school: {
    title: "AI School Admission Counselor for EdTech",
    description:
      "Engage prospective students and parents in their language, answer program and fee questions, and book campus visits or counselor interviews automatically.",
    keywords: ["AI admissions counselor", "EdTech enrollment AI", "school lead calling"],
    paragraphs: [
      "Admissions teams juggle inquiries across time zones and languages while campus visit slots fill unpredictably. The OpsBrain AI School Admission Counselor guides families through programs, fees, and eligibility — then books campus tours or counselor sessions on your calendar.",
      "HubSpot, Google Calendar, and Canvas LMS integrations keep enrollment pipelines current so counselors focus on high-intent applicants.",
    ],
    faq: [
      {
        question: "Can the admission counselor speak to parents in Hindi or Telugu?",
        answer:
          "Yes. Multilingual voice flows help international and regional families get answers in their preferred language without waiting for bilingual staff.",
      },
      {
        question: "Does it schedule campus visits automatically?",
        answer:
          "Yes. Available tour and interview slots are offered during the call and confirmed via SMS or email with calendar holds.",
      },
      {
        question: "Which systems does it sync with for admissions?",
        answer:
          "HubSpot CRM, Google Calendar, and Canvas LMS are supported, with custom API options for proprietary SIS platforms.",
      },
    ],
  },
  restaurant: {
    title: "AI Restaurant Receptionist for Peak Hours",
    description:
      "Zero missed calls during peak dining hours. AI takes reservations, manages waitlists, processes takeout orders, and sends confirmations in English, Hindi, or Telugu.",
    keywords: ["AI restaurant phone agent", "reservation automation", "hospitality AI receptionist"],
    paragraphs: [
      "Restaurants lose revenue when phones ring busy during service. The OpsBrain AI Restaurant Receptionist answers every call, manages reservations and waitlists, captures takeout orders, and sends confirmation texts — freeing hosts to focus on in-house guests.",
      "Toast POS, OpenTable, and SMS integrations keep front-of-house systems aligned without manual re-entry.",
    ],
    faq: [
      {
        question: "Can the AI handle takeout and delivery orders by phone?",
        answer:
          "Yes. Menu items, modifiers, and pickup times are captured during natural conversation and pushed to Toast POS or your order system.",
      },
      {
        question: "Does it integrate with OpenTable for reservations?",
        answer:
          "Yes. Real-time table availability and waitlist positions sync with OpenTable and SMS confirmations go to guests automatically.",
      },
      {
        question: "Can it answer in Hindi or Telugu for local guests?",
        answer:
          "Yes. Multilingual reception flows cover English, Hindi, and Telugu — common for hospitality teams serving diverse neighborhoods.",
      },
    ],
  },
  realestate: {
    title: "AI Real Estate Assistant for Listing Leads",
    description:
      "Follow up on portal inquiries in under 60 seconds. AI qualifies buyer intent and budget, schedules property viewings, and syncs to Salesforce or Follow Up Boss.",
    keywords: ["AI real estate assistant", "property lead follow up", "real estate AI calling"],
    paragraphs: [
      "Real estate leads go cold when agents are showing properties instead of dialing back portal inquiries. The OpsBrain AI Real Estate Assistant qualifies budget and timeline, schedules viewings on agent calendars, and follows up within seconds of every Zillow or portal lead.",
      "Integrations with Salesforce, Follow Up Boss, and Google Calendar mean brokers see every conversation in the CRM they already use.",
    ],
    faq: [
      {
        question: "How fast does the AI follow up on new listing leads?",
        answer:
          "Portal and form leads receive an outbound call in under 60 seconds — while buyer intent is highest and before competing agents respond.",
      },
      {
        question: "Can it schedule property viewings on agent calendars?",
        answer:
          "Yes. The AI checks agent availability, proposes times, and sends confirmations with property details and buyer notes attached.",
      },
      {
        question: "Does it work with Follow Up Boss and Salesforce?",
        answer:
          "Yes. Lead source, qualification scores, and showing outcomes sync bi-directionally to Follow Up Boss, Salesforce, and Google Calendar.",
      },
    ],
  },
  insurance: {
    title: "AI Insurance Renewal Agent for Policyholders",
    description:
      "Proactive renewal outreach at scale. AI explains coverage changes, processes updates, and routes complex cases to licensed agents with full policy context.",
    keywords: ["AI insurance renewal calls", "policyholder outreach automation", "insurance AI agent"],
    paragraphs: [
      "Renewal season overwhelms licensed agents with repetitive outreach while policyholders wait on hold. The OpsBrain AI Insurance Renewal Agent runs proactive campaigns, explains coverage changes in plain language, and processes straightforward renewals — escalating complex underwriting questions to licensed staff with context.",
      "Guidewire, Salesforce, and policy-admin integrations keep records accurate without double entry across teams.",
    ],
    faq: [
      {
        question: "Can the AI explain policy changes during renewal calls?",
        answer:
          "Yes. Approved talking points cover premium changes, coverage updates, and payment options in plain language before capturing consent.",
      },
      {
        question: "When does a call route to a licensed agent?",
        answer:
          "Underwriting exceptions, disputes, or regulatory triggers automatically route to licensed agents with transcript and policy data attached.",
      },
      {
        question: "Which insurance systems does OpsBrain integrate with?",
        answer:
          "Guidewire, Salesforce, and common policy-admin platforms via API, with custom mapping for carrier-specific workflows.",
      },
    ],
  },
};

export function getEmployeeBySlug(slug: string) {
  return aiEmployees.find((employee) => employee.id === slug);
}

export function getIndustryPageContent(slug: string) {
  const employee = getEmployeeBySlug(slug);
  const seo = industrySeoMeta[slug];
  const solutionSlug = industrySolutionMap[slug];
  if (!employee || !seo || !solutionSlug) return null;

  const solution = solutionPages[solutionSlug];
  return {
    employee,
    ...seo,
    solutionSlug,
    solution,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "AI Employees", path: hubPages.aiEmployees.path },
      { name: employee.name, path: `/ai-employees/${slug}` },
    ] satisfies BreadcrumbItem[],
  };
}

export function getSolutionPageContent(slug: string) {
  const tab = howItWorksTabs.find((item) => item.id === slug);
  const page = solutionPages[slug as SolutionSlug];
  if (!tab || !page) return null;

  return {
    tab,
    page,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Solutions", path: hubPages.solutions.path },
      { name: page.label, path: page.path },
    ] satisfies BreadcrumbItem[],
  };
}

export function getAllIndustrySlugs() {
  return aiEmployees.map((employee) => employee.id);
}

export function getAllSolutionSlugs(): SolutionSlug[] {
  return ["lead-calling", "inbound-support", "bulk-campaigns"];
}

export function getAllIntegrationNames() {
  const fromTrust = trustBarIntegrations.map((item) => item.label);
  const fromEmployees = aiEmployees.flatMap((employee) => employee.integrations);
  return [...new Set([...fromTrust, ...fromEmployees])].sort();
}

export const pricingTiers = [
  {
    name: "Starter",
    price: "$299/mo",
    headline: "5 AI employees",
    description:
      "Everything you need to get started with AI employees on your first workflows — lead calling, support, or outbound.",
    features: [
      "5 AI employees",
      "CRM + calendar integration",
      "Multilingual voice (Telugu, Hindi, English)",
      "Standard onboarding",
    ],
    cta: { label: "Get started", href: "/#contact" },
  },
  {
    name: "Growth",
    price: "$1,499/mo",
    headline: "20 AI employees",
    description:
      "Scale AI employees across teams with higher parallel call capacity and advanced analytics for revenue and operations leaders.",
    features: [
      "20 AI employees",
      "Bulk outbound campaigns",
      "Pipeline and agent analytics",
      "Priority support",
    ],
    cta: { label: "Get started", href: "/#contact" },
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    headline: "Unlimited AI employees",
    description:
      "Custom scale with enterprise SLAs, compliance, and dedicated solution engineering for global teams.",
    features: [
      "Unlimited AI employees",
      "99.9% uptime SLA",
      "SOC 2 Type II + GDPR",
      "Custom integrations",
      "Dedicated customer success manager",
    ],
    cta: { label: "Talk to us", href: "/#contact" },
  },
] as const;

export { aiEmployeesSection, capabilities, capabilitiesSection, platformOverview, siteConfig };
