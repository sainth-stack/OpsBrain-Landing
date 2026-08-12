export type LiveCallAgent = {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  industry: string;
  region: string;
  gender: "female" | "male";
  languages: string[];
  description: string;
  workflow: {
    label: string;
    icon: "phone" | "bot" | "calendar" | "check" | "message" | "link";
  }[];
  avatar: string;
};

/** Top Indian languages supported on live demo calls. */
export const topIndianLanguages = [
  "English",
  "Hindi",
  "Telugu",
  "Tamil",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Punjabi",
] as const;

/** Shared hyper-realistic portraits - one woman, one man for all agent cards. */
export const liveCallAgentPortraits = {
  female: "/agents/agent-woman.jpg",
  male: "/agents/agent-man.jpg",
} as const;

export const liveCallPage = {
  path: "/try-a-live-call",
  eyebrow: "Live voice demo",
  title: "Talk to a hyper-realistic AI agent",
  subtitle:
    "Choose an agent built for your industry, pick a language, and get a live demo call on your phone.",
} as const;

/** Ten Cartesia-style hyper-realistic personas for the try-a-live-call gallery. */
export const liveCallAgents: LiveCallAgent[] = [
  {
    id: "bhavani-hospital",
    name: "Bhavani",
    subtitle: "India Voice AI Agent",
    role: "Clinic AI Receptionist",
    industry: "Healthcare",
    region: "India",
    gender: "female",
    languages: [...topIndianLanguages],
    description:
      "Answers clinic calls 24/7, understands the patient need, checks availability, and books the appointment.",
    workflow: [
      { label: "Answers the clinic line", icon: "phone" },
      { label: "Understands the patient need", icon: "bot" },
      { label: "Checks calendar availability", icon: "calendar" },
      { label: "Books the appointment", icon: "check" },
    ],
    avatar: "hospital",
  },
  {
    id: "sindhu-realestate",
    name: "Sindhu",
    subtitle: "India Voice AI Agent",
    role: "Real Estate AI Assistant",
    industry: "Real Estate",
    region: "India",
    gender: "female",
    languages: [...topIndianLanguages],
    description:
      "Calls 99acres and Facebook leads in seconds, qualifies budget and location, and books the site visit.",
    workflow: [
      { label: "Calls the new enquiry", icon: "phone" },
      { label: "Qualifies budget and location", icon: "bot" },
      { label: "Offers weekend slots", icon: "calendar" },
      { label: "Books the site visit", icon: "check" },
    ],
    avatar: "realestate",
  },
  {
    id: "ramya-school",
    name: "Ramya",
    subtitle: "India Voice AI Agent",
    role: "Admissions AI Counselor",
    industry: "EdTech",
    region: "India",
    gender: "female",
    languages: [...topIndianLanguages],
    description:
      "Screens student inquiries, explains fees and batches, and books counseling sessions for parents.",
    workflow: [
      { label: "Answers the admissions call", icon: "phone" },
      { label: "Explains course and fees", icon: "bot" },
      { label: "Checks counseling slots", icon: "calendar" },
      { label: "Books the session", icon: "check" },
    ],
    avatar: "school",
  },
  {
    id: "bhavani-sales",
    name: "Bhavani",
    subtitle: "India Voice AI Agent",
    role: "AI Sales Employee",
    industry: "Sales",
    region: "India",
    gender: "female",
    languages: [...topIndianLanguages],
    description:
      "Calls every new form fill in under a minute, qualifies interest, and books the demo on your calendar.",
    workflow: [
      { label: "Calls the new lead", icon: "phone" },
      { label: "Qualifies interest", icon: "bot" },
      { label: "Handles objections", icon: "message" },
      { label: "Books the demo", icon: "check" },
    ],
    avatar: "sales",
  },
  {
    id: "sindhu-restaurant",
    name: "Sindhu",
    subtitle: "India Voice AI Agent",
    role: "Restaurant AI Host",
    industry: "Hospitality",
    region: "India",
    gender: "female",
    languages: [...topIndianLanguages],
    description:
      "Takes every rush-hour call, manages reservations and waitlists, and confirms party packages.",
    workflow: [
      { label: "Answers during peak hours", icon: "phone" },
      { label: "Checks table availability", icon: "calendar" },
      { label: "Confirms the booking", icon: "check" },
      { label: "Sends WhatsApp confirmation", icon: "message" },
    ],
    avatar: "restaurant",
  },
  {
    id: "ramya-payment",
    name: "Ramya",
    subtitle: "India Voice AI Agent",
    role: "AI Payment Reminder Agent",
    industry: "Finance",
    region: "India",
    gender: "female",
    languages: [...topIndianLanguages],
    description:
      "Calls customers about overdue payments, understands intent, and sends a payment link or plan.",
    workflow: [
      { label: "Calls about the overdue bill", icon: "phone" },
      { label: "Understands payment intent", icon: "bot" },
      { label: "Offers a payment plan", icon: "message" },
      { label: "Sends the payment link", icon: "link" },
    ],
    avatar: "payment",
  },
  {
    id: "simi-support",
    name: "Simi",
    subtitle: "India Voice AI Agent",
    role: "AI Customer Support Agent",
    industry: "Support",
    region: "India",
    gender: "female",
    languages: [...topIndianLanguages],
    description:
      "Resolves FAQs from your knowledge base 24/7 and escalates complex tickets with full context.",
    workflow: [
      { label: "Answers the support line", icon: "phone" },
      { label: "Looks up the knowledge base", icon: "bot" },
      { label: "Resolves common issues", icon: "check" },
      { label: "Escalates with context", icon: "message" },
    ],
    avatar: "support",
  },
  {
    id: "devansh-hr",
    name: "Devansh",
    subtitle: "India Voice AI Agent",
    role: "AI HR Recruiter",
    industry: "HR",
    region: "India",
    gender: "male",
    languages: [...topIndianLanguages],
    description:
      "Screens candidates, checks notice period and availability, and schedules interviews on your calendar.",
    workflow: [
      { label: "Calls the applicant", icon: "phone" },
      { label: "Screens experience and notice", icon: "bot" },
      { label: "Offers interview slots", icon: "calendar" },
      { label: "Books the round", icon: "check" },
    ],
    avatar: "hr",
  },
  {
    id: "arushi-insurance",
    name: "Arushi",
    subtitle: "India Voice AI Agent",
    role: "AI Insurance Renewal Agent",
    industry: "Insurance",
    region: "India",
    gender: "female",
    languages: [...topIndianLanguages],
    description:
      "Calls policyholders before expiry, explains cover in plain language, and completes the renewal.",
    workflow: [
      { label: "Calls before policy expiry", icon: "phone" },
      { label: "Explains cover simply", icon: "bot" },
      { label: "Confirms renewal choice", icon: "message" },
      { label: "Sends the renewal link", icon: "link" },
    ],
    avatar: "insurance",
  },
  {
    id: "sameer-sales",
    name: "Sameer",
    subtitle: "India Voice AI Agent",
    role: "AI Outbound Sales Agent",
    industry: "Sales",
    region: "India",
    gender: "male",
    languages: [...topIndianLanguages],
    description:
      "Runs outbound qualification calls, books meetings for the sales team, and syncs notes to the CRM.",
    workflow: [
      { label: "Places the outbound call", icon: "phone" },
      { label: "Qualifies the prospect", icon: "bot" },
      { label: "Books the meeting", icon: "calendar" },
      { label: "Syncs notes to CRM", icon: "check" },
    ],
    avatar: "sales",
  },
];
