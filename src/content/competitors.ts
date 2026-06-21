/** Shared OG image for compare hub and alternative pages. */
export const COMPARE_OG_IMAGE = "/og-image.jpg";

export const COMPARE_LAST_UPDATED = "June 1, 2026";

export type CompareCategory =
  | "voice-platforms"
  | "ai-sdr"
  | "support-ai"
  | "roundup";

export type CompareCategoryMeta = {
  id: CompareCategory;
  label: string;
  description: string;
};

export const compareCategories: CompareCategoryMeta[] = [
  {
    id: "voice-platforms",
    label: "Voice Platforms",
    description: "Developer-first voice APIs and conversational voice infrastructure.",
  },
  {
    id: "ai-sdr",
    label: "AI SDR",
    description: "Autonomous outbound sales agents and AI-powered prospecting tools.",
  },
  {
    id: "support-ai",
    label: "Support AI",
    description: "AI agents for customer support, helpdesk, and inbound resolution.",
  },
  {
    id: "roundup",
    label: "Category Roundups",
    description: "Side-by-side guides for evaluating AI voice and SDR categories.",
  },
];

export type ComparisonTableRow = {
  feature: string;
  competitor: string;
  opsbrain: string;
};

export type CompareFaqItem = { question: string; answer: string };

export type ComparePageContent = {
  slug: string;
  category: CompareCategory;
  competitorName: string;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string;
  comparisonRows: ComparisonTableRow[];
  whenCompetitor: string[];
  whenOpsBrain: string[];
  faq: CompareFaqItem[];
  relatedIndustrySlugs: [string, string];
  competitorColumnLabel?: string;
};

const defaultOpsBrainRows: ComparisonTableRow[] = [
  {
    feature: "Deployment time",
    competitor: "Varies — often requires engineering sprints",
    opsbrain: "Under 30 minutes with pre-built personas",
  },
  {
    feature: "Voice & languages (Telugu/Hindi)",
    competitor: "Varies by vendor configuration",
    opsbrain: "Native Telugu, Hindi, English + 50 languages",
  },
  {
    feature: "CRM sync",
    competitor: "Often via custom integration work",
    opsbrain: "Salesforce, HubSpot, Pipedrive out of the box",
  },
  {
    feature: "Inbound + outbound",
    competitor: "Often optimized for one direction",
    opsbrain: "Full inbound support and outbound campaigns",
  },
  {
    feature: "Industry templates",
    competitor: "Generic scripts; vertical packs vary",
    opsbrain: "9+ industry AI employee personas included",
  },
  {
    feature: "Pricing model",
    competitor: "Usage-based API or opaque enterprise",
    opsbrain: "Pilot-first; scoped quote by workflow volume",
  },
  {
    feature: "Compliance (SOC 2 / GDPR)",
    competitor: "Varies; often shared responsibility",
    opsbrain: "SOC 2 Type II, GDPR-ready infrastructure",
  },
  {
    feature: "Support & onboarding",
    competitor: "Docs-first or developer community",
    opsbrain: "Guided pilot with revenue-team onboarding",
  },
  {
    feature: "End-to-end revenue workflow",
    competitor: "Voice layer only in many cases",
    opsbrain: "Prospect → call → qualify → book → CRM sync",
  },
  {
    feature: "Pilot availability",
    competitor: "Free tier or self-serve trial varies",
    opsbrain: "14-day pilot with live workflow validation",
  },
];

function page(
  partial: Omit<ComparePageContent, "comparisonRows"> & {
    comparisonRows?: ComparisonTableRow[];
  },
): ComparePageContent {
  return {
    ...partial,
    comparisonRows: partial.comparisonRows ?? defaultOpsBrainRows,
  };
}

export const comparePages: ComparePageContent[] = [
  page({
    slug: "bland-ai-alternative",
    category: "voice-platforms",
    competitorName: "Bland AI",
    h1: "Bland AI Alternative",
    title: "Bland AI Alternative for Revenue Teams",
    description:
      "Compare Bland AI vs OpsBrain for AI phone agents. See deployment time, Telugu/Hindi voice, CRM sync, and industry templates for outbound revenue workflows.",
    keywords: ["Bland AI alternative", "Bland AI vs OpsBrain", "AI phone agent comparison"],
    intro:
      "Teams searching for a Bland AI alternative usually need more than a programmable voice API — they want qualified meetings, CRM updates, and industry-ready scripts without a long engineering cycle. OpsBrain packages voice, workflows, and revenue integrations as deployable AI employees.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Deployment time"
        ? { ...row, competitor: "API-first; revenue workflows require custom build" }
        : row.feature === "Voice & languages (Telugu/Hindi)"
          ? { ...row, competitor: "Multilingual via configuration; Indian language depth varies" }
          : row.feature === "End-to-end revenue workflow"
            ? { ...row, competitor: "Voice orchestration; CRM workflows are DIY" }
            : row,
    ),
    whenCompetitor: [
      "You want a developer-centric voice API and plan to build all business logic in-house.",
      "Your team has engineering capacity to own telephony, prompts, and CRM wiring end to end.",
    ],
    whenOpsBrain: [
      "You need Telugu and Hindi outbound calling with native voice quality on day one.",
      "Revenue ops wants lead-to-meeting workflows live in under 30 minutes, not sprints.",
      "Pre-built industry personas (sales, real estate, healthcare) must include CRM field mapping.",
      "Inbound support and bulk outbound campaigns should run on one platform.",
      "A 14-day pilot should prove ROI before annual commitment.",
      "SOC 2 Type II and GDPR-ready infrastructure are required for enterprise buyers.",
    ],
    faq: [
      {
        question: "Can OpsBrain replace Bland AI for outbound sales calls?",
        answer:
          "If your goal is booked meetings and CRM-synced conversations rather than raw call orchestration, OpsBrain is built for that outcome. Teams that only need a voice API may still prefer a developer-first platform.",
      },
      {
        question: "Does OpsBrain support the same telephony flexibility as Bland AI?",
        answer:
          "OpsBrain integrates with Twilio and major carriers while abstracting script, qualification, and scheduling logic so revenue teams do not maintain custom call trees.",
      },
      {
        question: "How hard is migration from Bland AI to OpsBrain?",
        answer:
          "During the pilot, OpsBrain imports your scripts, ICP criteria, and CRM mappings. Most teams parallel-run one workflow before cutover — typically within two weeks.",
      },
      {
        question: "Which industries fit best after leaving a voice API?",
        answer:
          "Real estate, B2B SaaS, healthcare front desk, insurance renewals, and high-volume SDR teams see the fastest time-to-value with pre-built personas.",
      },
    ],
    relatedIndustrySlugs: ["sales", "realestate"],
  }),
  page({
    slug: "vapi-alternative",
    category: "voice-platforms",
    competitorName: "Vapi",
    h1: "Vapi Alternative",
    title: "Vapi Alternative with CRM-Ready AI Employees",
    description:
      "Evaluating a Vapi alternative? Compare voice deployment, Telugu/Hindi support, inbound+outbound workflows, and revenue CRM sync vs OpsBrain AI employees.",
    keywords: ["Vapi alternative", "Vapi vs OpsBrain", "AI voice agent platform"],
    intro:
      "Vapi searches often come from product teams evaluating voice infrastructure. OpsBrain targets revenue and operations leaders who need qualified pipeline, not just conversational plumbing — with personas, pilots, and CRM sync included.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Deployment time"
        ? { ...row, competitor: "Fast for devs; revenue playbook is custom" }
        : row.feature === "Industry templates"
          ? { ...row, competitor: "Bring your own prompts and flows" }
          : row,
    ),
    whenCompetitor: [
      "Engineers want maximum control over voice stack, latency tuning, and model selection.",
      "You already have an internal platform team to own orchestration and QA.",
    ],
    whenOpsBrain: [
      "Sales or ops leaders — not engineers — must own deployment and iteration.",
      "Telugu and Hindi calling are core to your market, not an add-on language pack.",
      "HubSpot or Salesforce must update automatically after every call.",
      "You want one vendor for lead calling, support, and bulk campaigns.",
      "14-day pilot with onboarding beats a blank API project.",
    ],
    faq: [
      {
        question: "Is OpsBrain a Vapi competitor for developers?",
        answer:
          "OpsBrain competes on business outcomes — meetings booked, tickets resolved, renewals processed — rather than raw developer primitives. Technical teams still get APIs, but the product is opinionated for revenue workflows.",
      },
      {
        question: "Can we migrate Vapi call flows to OpsBrain?",
        answer:
          "Yes. Script logic, qualification branches, and CRM field maps are recreated during onboarding. OpsBrain runs a parallel pilot on one use case before full migration.",
      },
      {
        question: "Does OpsBrain offer multilingual voice like Vapi integrations?",
        answer:
          "OpsBrain includes native Telugu, Hindi, and English voice engines tuned for sales and support conversations, including code-switching common in Indian markets.",
      },
      {
        question: "What CRM integrations are included?",
        answer:
          "Salesforce, HubSpot, Pipedrive, Google Calendar, Zendesk, and custom REST endpoints with bi-directional sync.",
      },
    ],
    relatedIndustrySlugs: ["sales", "support"],
  }),
  page({
    slug: "retell-alternative",
    category: "voice-platforms",
    competitorName: "Retell AI",
    h1: "Retell AI Alternative",
    title: "Retell AI Alternative for Inbound & Outbound",
    description:
      "Looking for a Retell AI alternative? Compare OpsBrain AI employees on deployment speed, Indian language voice, CRM automation, and industry templates.",
    keywords: ["Retell AI alternative", "Retell vs OpsBrain", "conversational voice AI"],
    intro:
      "Retell AI attracts teams building conversational voice experiences. OpsBrain serves organizations that need revenue and support outcomes — with compliance, industry playbooks, and CRM automation bundled rather than assembled.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Inbound + outbound"
        ? { ...row, competitor: "Strong voice UX; workflow depth varies by build" }
        : row.feature === "Compliance (SOC 2 / GDPR)"
          ? { ...row, competitor: "Security posture depends on your implementation" }
          : row,
    ),
    whenCompetitor: [
      "You are prototyping voice UX and want granular control over conversation design.",
      "A small engineering team prefers composing stacks from best-of-breed APIs.",
    ],
    whenOpsBrain: [
      "You must run production inbound support and outbound sales on one system.",
      "Healthcare, insurance, or real estate templates reduce compliance review time.",
      "Enterprise buyers require SOC 2 Type II and audit logs out of the box.",
      "Non-technical ops teams need to edit scripts without redeploying code.",
      "Telugu and Hindi are production languages, not experiments.",
    ],
    faq: [
      {
        question: "How does OpsBrain compare to Retell for phone support?",
        answer:
          "OpsBrain includes tier-1 support personas with knowledge-base grounding, escalation rules, and Zendesk sync — not only voice conversation layers.",
      },
      {
        question: "Can we run a pilot before replacing Retell?",
        answer:
          "Yes. The 14-day pilot covers one inbound or outbound workflow with success metrics agreed upfront.",
      },
      {
        question: "Is migration from Retell AI disruptive?",
        answer:
          "OpsBrain maps existing prompts to persona playbooks and connects the same phone numbers during a phased rollout.",
      },
    ],
    relatedIndustrySlugs: ["support", "hospital"],
  }),
  page({
    slug: "synthflow-alternative",
    category: "voice-platforms",
    competitorName: "Synthflow",
    h1: "Synthflow Alternative",
    title: "Synthflow Alternative with Industry Personas",
    description:
      "Compare Synthflow vs OpsBrain for AI calling: deployment time, Telugu/Hindi voice, CRM sync, compliance, and full revenue workflows for ops teams.",
    keywords: ["Synthflow alternative", "Synthflow vs OpsBrain", "no-code AI calling"],
    intro:
      "Synthflow appeals to teams wanting no-code voice agents. OpsBrain extends no-code deployment with industry-specific AI employees, deeper CRM automation, and pilots designed for revenue leaders measuring pipeline impact.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Industry templates"
        ? { ...row, competitor: "Templates available; vertical depth varies" }
        : row.feature === "End-to-end revenue workflow"
          ? { ...row, competitor: "Call automation focus; full funnel varies" }
          : row,
    ),
    whenCompetitor: [
      "You want a visual flow builder and lightweight call automation quickly.",
      "Your use case is narrow (e.g., appointment reminders) without heavy CRM logic.",
    ],
    whenOpsBrain: [
      "You need nine industry personas with qualification and scheduling built in.",
      "Bulk outbound campaigns and inbound support share one analytics layer.",
      "Enterprise security reviews require SOC 2 and GDPR documentation today.",
      "Indian language revenue calling is a primary channel, not an afterthought.",
    ],
    faq: [
      {
        question: "Is OpsBrain as no-code as Synthflow?",
        answer:
          "Yes for revenue and ops users — scripts, languages, and escalation rules are configured in a guided UI. Engineers can still extend via API.",
      },
      {
        question: "Can Synthflow flows be recreated in OpsBrain?",
        answer:
          "During onboarding, existing call logic is mapped to OpsBrain personas. Most teams migrate one workflow at a time.",
      },
      {
        question: "Which metrics improve after switching?",
        answer:
          "Teams typically track speed-to-lead, connect rates, meetings booked, and CRM data completeness — not just call completion.",
      },
    ],
    relatedIndustrySlugs: ["restaurant", "insurance"],
  }),
  page({
    slug: "air-ai-alternative",
    category: "ai-sdr",
    competitorName: "Air AI",
    h1: "Air AI Alternative",
    title: "Air AI Alternative for AI Outbound Sales",
    description:
      "Compare Air AI vs OpsBrain for AI SDR workflows: multilingual calling, CRM sync, inbound support, industry templates, and 14-day pilot pricing.",
    keywords: ["Air AI alternative", "Air AI vs OpsBrain", "AI SDR platform"],
    intro:
      "Air AI searches reflect demand for autonomous outbound agents. OpsBrain delivers comparable outbound automation while adding inbound support, Indian language voice, and vertical personas for teams selling across regions.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Voice & languages (Telugu/Hindi)"
        ? { ...row, competitor: "English-first; multilingual varies" }
        : row.feature === "Inbound + outbound"
          ? { ...row, competitor: "Outbound-focused product positioning" }
          : row,
    ),
    whenCompetitor: [
      "Your motion is English-only outbound and you want a dedicated AI SDR brand.",
      "You prioritize email + call sequences in a single SDR-shaped product.",
    ],
    whenOpsBrain: [
      "Telugu and Hindi prospecting are required for your ICP.",
      "Support and sales AI employees should live on one platform and CRM.",
      "Real estate, healthcare, or insurance personas accelerate compliance review.",
      "You want a pilot tied to meetings booked, not just activity metrics.",
    ],
    faq: [
      {
        question: "Does OpsBrain replace Air AI for outbound?",
        answer:
          "For teams needing multilingual voice, CRM-native workflows, and inbound plus outbound coverage, OpsBrain is a strong alternative. Evaluate both on your primary geography and language requirements.",
      },
      {
        question: "How quickly can we switch from Air AI?",
        answer:
          "List imports, scripts, and CRM mappings transfer during the 14-day pilot. Parallel running one cohort is recommended before full cutover.",
      },
      {
        question: "Can OpsBrain book meetings like an AI SDR?",
        answer:
          "Yes. Calendar integration, timezone handling, and confirmation emails are standard on the AI Sales Employee persona.",
      },
    ],
    relatedIndustrySlugs: ["sales", "school"],
  }),
  page({
    slug: "11x-alternative",
    category: "ai-sdr",
    competitorName: "11x",
    h1: "11x Alternative",
    title: "11x Alternative for Autonomous Sales Agents",
    description:
      "Evaluating an 11x alternative? OpsBrain compares on deployment speed, Telugu/Hindi voice, CRM sync, industry playbooks, and pilot-first pricing for AI SDR teams.",
    keywords: ["11x alternative", "11x vs OpsBrain", "autonomous sales agent"],
    intro:
      "11x popularized the AI digital worker narrative. OpsBrain focuses on deployable AI employees with voice in 50+ languages, vertical templates, and measurable revenue workflows — especially for teams operating in India and global markets.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Industry templates"
        ? { ...row, competitor: "Digital worker framing; vertical packs vary" }
        : row.feature === "Pricing model"
          ? { ...row, competitor: "Enterprise-oriented; public pricing limited" }
          : row,
    ),
    whenCompetitor: [
      "You want a digital worker brand positioned for enterprise outbound at scale.",
      "Your evaluation criteria center on AI worker orchestration metaphors.",
    ],
    whenOpsBrain: [
      "Indian language outbound is non-negotiable for pipeline growth.",
      "You need hospital, insurance, or hospitality personas — not generic SDR bots.",
      "Inbound call coverage must sit beside outbound in one subscription.",
      "Ops teams want pilot proof on connect-to-meeting conversion before expansion.",
    ],
    faq: [
      {
        question: "Is OpsBrain an 11x competitor?",
        answer:
          "Both automate sales outreach. OpsBrain differentiates on multilingual voice depth, industry personas, and combined inbound/outbound workflows.",
      },
      {
        question: "Can we migrate 11x playbooks to OpsBrain?",
        answer:
          "Scripts and ICP rules are recreated in OpsBrain personas during onboarding with side-by-side QA on live calls.",
      },
      {
        question: "What compliance certifications does OpsBrain offer?",
        answer:
          "SOC 2 Type II, GDPR-ready controls, encryption at rest and in transit, and immutable audit logs for enterprise plans.",
      },
    ],
    relatedIndustrySlugs: ["sales", "hr"],
  }),
  page({
    slug: "artisan-alternative",
    category: "ai-sdr",
    competitorName: "Artisan",
    h1: "Artisan Alternative",
    title: "Artisan Alternative — AI SDR Ava vs OpsBrain",
    description:
      "Compare Artisan (Ava) vs OpsBrain for AI outbound: voice languages, CRM automation, industry templates, inbound support, and 14-day pilot options.",
    keywords: ["Artisan alternative", "Artisan Ava alternative", "AI SDR comparison"],
    intro:
      "Artisan's Ava agent targets outbound email and LinkedIn-heavy SDR workflows. OpsBrain emphasizes voice-first revenue automation — phone outreach in Telugu and Hindi, meeting booking, and CRM sync for teams where calling still closes deals.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Inbound + outbound"
        ? { ...row, competitor: "Multichannel outbound emphasis" }
        : row.feature === "Voice & languages (Telugu/Hindi)"
          ? { ...row, competitor: "Voice not primary channel in positioning" }
          : row,
    ),
    whenCompetitor: [
      "Email and LinkedIn sequences dominate your outbound mix with minimal calling.",
      "You prefer an AI SDR persona marketed as a named digital employee (Ava).",
    ],
    whenOpsBrain: [
      "Speed-to-lead phone outreach drives your funnel — especially in APAC markets.",
      "Voice demos, objection handling, and calendar booking must happen on the call.",
      "Support calls and sales calls should share CRM context.",
      "Industry-specific scripts reduce time-to-first meeting.",
    ],
    faq: [
      {
        question: "Does OpsBrain do email outreach like Artisan?",
        answer:
          "OpsBrain orchestrates multi-channel sequences but is optimized for AI voice as the primary conversion channel. Teams heavy on email-only may weigh Artisan differently.",
      },
      {
        question: "Can OpsBrain integrate with our existing SDR stack?",
        answer:
          "Yes — Salesforce, HubSpot, Outreach-compatible workflows via API, and calendar tools are supported.",
      },
      {
        question: "How does migration from Artisan work?",
        answer:
          "OpsBrain imports lead lists and rebuilds voice playbooks during the pilot while keeping email nurture with your existing tools if needed.",
      },
    ],
    relatedIndustrySlugs: ["sales", "realestate"],
  }),
  page({
    slug: "regie-alternative",
    category: "ai-sdr",
    competitorName: "Regie.ai",
    h1: "Regie.ai Alternative",
    title: "Regie.ai Alternative for AI Sales Content & Calls",
    description:
      "Compare Regie.ai vs OpsBrain: AI sales engagement, voice calling in Telugu/Hindi, CRM sync, industry personas, and revenue workflow automation.",
    keywords: ["Regie.ai alternative", "Regie alternative", "AI sales engagement"],
    intro:
      "Regie.ai buyers often want AI-generated sequences and sales engagement tooling. OpsBrain complements or replaces that stack when live voice conversations, meeting booking, and multilingual calling become the bottleneck.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "End-to-end revenue workflow"
        ? { ...row, competitor: "Content + sequences; voice is partner-dependent" }
        : row.feature === "Deployment time"
          ? { ...row, competitor: "Fast for content; voice workflows vary" }
          : row,
    ),
    whenCompetitor: [
      "Your team needs AI copy for sequences and rep productivity inside existing SEPs.",
      "Calling is secondary to email personalization at scale.",
    ],
    whenOpsBrain: [
      "Outbound calls in Telugu or Hindi must happen within 60 seconds of lead capture.",
      "You want voice, CRM sync, and analytics without stitching multiple vendors.",
      "Bulk campaigns and inbound support share one ops dashboard.",
    ],
    faq: [
      {
        question: "Can OpsBrain replace Regie for our sales team?",
        answer:
          "If voice outreach and CRM-logged conversations are core KPIs, yes. If AI-written email is the primary value, some teams keep Regie for content and OpsBrain for calls.",
      },
      {
        question: "Does OpsBrain generate call scripts?",
        answer:
          "Yes — industry personas include editable scripts with branching logic, plus onboarding support to tune messaging.",
      },
      {
        question: "What is the migration path from Regie.ai?",
        answer:
          "OpsBrain connects to the same CRM, imports active sequences as voice playbooks, and validates on a pilot cohort before broad rollout.",
      },
    ],
    relatedIndustrySlugs: ["sales", "payment"],
  }),
  page({
    slug: "apollo-ai-alternative",
    category: "ai-sdr",
    competitorName: "Apollo AI",
    h1: "Apollo AI Alternative",
    title: "Apollo AI Alternative for Prospecting & Calls",
    description:
      "Compare Apollo.io AI features vs OpsBrain AI employees for voice outreach, Telugu/Hindi calling, meeting booking, and autonomous CRM workflows.",
    keywords: ["Apollo AI alternative", "Apollo.io AI alternative", "AI prospecting calls"],
    intro:
      "Apollo.io combines prospecting data with engagement tools. Teams searching for an Apollo AI alternative often need autonomous voice execution — not just lists and sequences — with Indian language support and full call-to-CRM automation.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "End-to-end revenue workflow"
        ? { ...row, competitor: "Prospecting database + sequences; voice add-ons vary" }
        : row.feature === "Industry templates"
          ? { ...row, competitor: "Horizontal sales tool; vertical agents limited" }
          : row,
    ),
    whenCompetitor: [
      "Prospecting data and email sequences inside one familiar sales intelligence UI.",
      "Your reps manually call from lists Apollo provides.",
    ],
    whenOpsBrain: [
      "AI should dial, qualify, and book — not just supply contacts.",
      "Telugu and Hindi conversations require native voice, not English-only bots.",
      "CRM must update automatically with call recordings and scores.",
      "Real estate, healthcare, or insurance workflows need pre-built compliance language.",
    ],
    faq: [
      {
        question: "Does OpsBrain include prospecting data like Apollo?",
        answer:
          "OpsBrain focuses on execution — calling, qualifying, scheduling, and syncing. Many teams pair OpsBrain with their existing data provider or CRM lists.",
      },
      {
        question: "Can we upload Apollo exports into OpsBrain?",
        answer:
          "Yes. CSV and CRM segment imports feed bulk outbound campaigns with configurable scripts and schedules.",
      },
      {
        question: "How does pricing compare to Apollo AI add-ons?",
        answer:
          "OpsBrain uses scoped quotes based on call volume and personas. A 14-day pilot validates ROI before annual commitment.",
      },
    ],
    relatedIndustrySlugs: ["sales", "insurance"],
  }),
  page({
    slug: "intercom-fin-alternative",
    category: "support-ai",
    competitorName: "Intercom Fin",
    h1: "Intercom Fin Alternative",
    title: "Intercom Fin Alternative for AI Phone Support",
    description:
      "Compare Intercom Fin vs OpsBrain for AI support: voice + chat coverage, Telugu/Hindi, CRM/helpdesk sync, outbound campaigns, and industry templates.",
    keywords: ["Intercom Fin alternative", "Fin AI alternative", "AI customer support agent"],
    intro:
      "Intercom Fin excels at AI answers inside the Intercom messenger. Teams seeking an Intercom Fin alternative for phone-heavy support — or combined voice sales and support — often need multilingual voice agents and outbound capabilities Fin does not prioritize.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Inbound + outbound"
        ? { ...row, competitor: "Messenger-first AI; voice not core" }
        : row.feature === "Voice & languages (Telugu/Hindi)"
          ? { ...row, competitor: "Text-first; voice requires other products" }
          : row.feature === "CRM sync"
            ? { ...row, competitor: "Strong Intercom ecosystem; external CRM via integrations" }
            : row,
    ),
    whenCompetitor: [
      "Support is primarily in-app chat and you are standardized on Intercom.",
      "Fin's messenger UX and help center integration are your main requirements.",
    ],
    whenOpsBrain: [
      "Phone support volume exceeds chat — especially after hours.",
      "Telugu and Hindi callers need voice, not text-only AI.",
      "Sales and support AI employees should share CRM history.",
      "Outbound renewal or payment reminder calls run on the same platform.",
    ],
    faq: [
      {
        question: "Can OpsBrain replace Fin for our support team?",
        answer:
          "For phone-first and multilingual support, yes. Chat-heavy teams deeply embedded in Intercom may use Fin for messenger and OpsBrain for voice — or migrate voice workloads over time.",
      },
      {
        question: "Does OpsBrain integrate with Zendesk or Intercom?",
        answer:
          "OpsBrain syncs with Zendesk, Intercom, Salesforce Service Cloud, and custom ticketing APIs.",
      },
      {
        question: "How do we migrate off Intercom Fin?",
        answer:
          "Knowledge-base articles feed OpsBrain support personas during onboarding. Phone numbers port to OpsBrain with parallel running until QA sign-off.",
      },
    ],
    relatedIndustrySlugs: ["support", "hospital"],
  }),
  page({
    slug: "best-ai-voice-agent",
    category: "roundup",
    competitorName: "Category",
    competitorColumnLabel: "Typical voice platforms",
    h1: "Best AI Voice Agent Platforms Compared",
    title: "Best AI Voice Agent Comparison (2026)",
    description:
      "Compare the best AI voice agent platforms for revenue teams: deployment, Telugu/Hindi voice, CRM sync, compliance, and industry templates vs developer-first APIs.",
    keywords: [
      "best AI voice agent",
      "AI voice agent comparison",
      "AI phone agent platforms",
    ],
    intro:
      "Buyers comparing the best AI voice agent platforms weigh developer flexibility against time-to-revenue. This guide contrasts typical voice API vendors with OpsBrain's AI employee model for teams that need calls, CRM updates, and industry playbooks live quickly.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Deployment time"
        ? { ...row, competitor: "Days to weeks with engineering" }
        : row,
    ),
    whenCompetitor: [
      "You have engineering resources to compose voice, LLM, and telephony stacks.",
      "Your use case is experimental or limited to a single custom flow.",
      "Messenger or text-only support is sufficient.",
    ],
    whenOpsBrain: [
      "Revenue or ops leaders must deploy without a dedicated voice engineering team.",
      "Telugu, Hindi, and English calling are production requirements.",
      "Nine industry personas cover sales, support, healthcare, and hospitality.",
      "14-day pilots validate connect rates and meetings booked before scale.",
      "SOC 2 Type II and GDPR documentation satisfy enterprise security reviews.",
      "Inbound support and outbound campaigns share analytics and CRM sync.",
    ],
    faq: [
      {
        question: "What makes an AI voice agent platform best for revenue teams?",
        answer:
          "Look beyond latency benchmarks — measure speed-to-lead, qualification accuracy, meeting booking rate, and CRM completeness after each call.",
      },
      {
        question: "Do I need a developer-first voice API?",
        answer:
          "APIs excel when you build custom products. Revenue teams hitting pipeline targets usually prefer pre-built personas with pilots and onboarding.",
      },
      {
        question: "How important are Indian languages for AI voice agents?",
        answer:
          "For APAC go-to-market, native Telugu and Hindi voice quality materially affects connect and conversion rates versus English-only agents.",
      },
      {
        question: "Can OpsBrain replace multiple voice tools?",
        answer:
          "Many teams consolidate outbound, inbound, and bulk campaigns on OpsBrain after a pilot proves lower tooling overhead and better CRM sync.",
      },
    ],
    relatedIndustrySlugs: ["sales", "support"],
  }),
  page({
    slug: "ai-sdr-tools-comparison",
    category: "roundup",
    competitorName: "Category",
    competitorColumnLabel: "Typical AI SDR tools",
    h1: "AI SDR Tools Comparison",
    title: "AI SDR Tools Comparison for 2026",
    description:
      "AI SDR tools comparison: evaluate autonomous outbound agents on voice languages, CRM sync, inbound coverage, industry templates, pricing, and pilot options.",
    keywords: [
      "AI SDR tools comparison",
      "AI SDR vs human SDR",
      "best AI SDR software",
    ],
    intro:
      "AI SDR tools comparison searches spike as teams chase outbound efficiency. This roundup contrasts typical AI SDR products with OpsBrain when voice — especially multilingual phone outreach — and full-funnel CRM automation matter more than email-only sequences.",
    comparisonRows: defaultOpsBrainRows.map((row) =>
      row.feature === "Voice & languages (Telugu/Hindi)"
        ? { ...row, competitor: "Often email/LinkedIn-first; voice optional" }
        : row.feature === "Inbound + outbound"
          ? { ...row, competitor: "Outbound-only positioning common" }
          : row,
    ),
    whenCompetitor: [
      "Email and LinkedIn automation cover most of your pipeline motion.",
      "You want a well-known AI SDR brand for English-only outbound.",
    ],
    whenOpsBrain: [
      "Phone outreach within 60 seconds of lead capture is your KPI.",
      "Telugu and Hindi calling unlock your core geography.",
      "Support and sales conversations should share one CRM timeline.",
      "Industry templates (real estate, insurance, EdTech) shorten rollout.",
      "Pilot pricing de-risks adoption before headcount replacement decisions.",
    ],
    faq: [
      {
        question: "How do AI SDR tools compare on price?",
        answer:
          "Pricing varies from per-seat SaaS to opaque enterprise contracts. OpsBrain scopes quotes by call volume and offers a 14-day pilot to prove conversion lift.",
      },
      {
        question: "Will an AI SDR replace human reps?",
        answer:
          "AI SDR tools handle repetitive qualification and scheduling; humans focus on complex deals. OpsBrain escalates with full transcript context.",
      },
      {
        question: "What metrics should we compare?",
        answer:
          "Speed-to-lead, connect rate, meetings booked, cost per meeting, and CRM field completeness — not just emails sent.",
      },
      {
        question: "Can OpsBrain run bulk outbound like AI SDR campaigns?",
        answer:
          "Yes. CSV and CRM list imports power parallel call waves with dashboards for dispositions and recordings.",
      },
    ],
    relatedIndustrySlugs: ["sales", "hr"],
  }),
];

export const compareHub = {
  path: "/compare",
  title: "Compare AI Voice & SDR Platforms",
  description:
    "Compare OpsBrain to Bland AI, Vapi, Retell, Synthflow, Air AI, 11x, Artisan, Regie, Apollo, Intercom Fin, and category leaders. Neutral AI voice agent and SDR comparisons.",
  keywords: [
    "AI voice agent comparison",
    "AI SDR tools comparison",
    "OpsBrain alternatives",
  ],
};

export function getComparePage(slug: string) {
  return comparePages.find((page) => page.slug === slug);
}

export function getAllCompareSlugs() {
  return comparePages.map((page) => page.slug);
}

export function getComparePagesByCategory(category: CompareCategory) {
  return comparePages.filter((page) => page.category === category);
}
