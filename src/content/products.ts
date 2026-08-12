import { PRODUCT_LOGIN } from "@/lib/api-config";

export type ProductSlug = "spark" | "meet";

export type ProductNavItem = {
  id: string;
  name: string;
  href: string;
  tagline: string;
  badge?: string;
  /** External app login URL for this product. */
  loginHref?: string;
};

export const productNavItems: ProductNavItem[] = [
  {
    id: "opsbrain-ai",
    name: "OpsBrain AI",
    href: "/",
    tagline: "AI employees that call and qualify leads.",
    badge: "Flagship",
    loginHref: PRODUCT_LOGIN.opsbrain,
  },
  {
    id: "spark",
    name: "OpsSpark",
    href: "/products/spark",
    tagline: "AI social for founders.",
    loginHref: PRODUCT_LOGIN.spark,
  },
  {
    id: "meet",
    name: "OpsMeet",
    href: "/products/meet",
    tagline: "Notes and action plans from meetings.",
    loginHref: PRODUCT_LOGIN.meet,
  },
];

/** Second column in the Products mega-menu. */
export const opsbrainAiNavItems: ProductNavItem[] = [
  {
    id: "ai-employees",
    name: "AI Employees",
    href: "/ai-employees",
    tagline: "Industry personas ready to deploy.",
  },
  {
    id: "integrations",
    name: "Integrations",
    href: "/integrations",
    tagline: "CRM, calendar, and telephony.",
  },
  {
    id: "platform",
    name: "Platform",
    href: "/platform",
    tagline: "Prospect, call, book, and sync.",
  },
];

export const useCaseNavItems: ProductNavItem[] = [
  {
    id: "sales",
    name: "Sales",
    href: "/ai-employees/sales",
    tagline: "Call every new form fill in under a minute.",
  },
  {
    id: "realestate",
    name: "Real estate",
    href: "/ai-employees/realestate",
    tagline: "Qualify buyers and book site visits.",
  },
  {
    id: "hospital",
    name: "Healthcare",
    href: "/ai-employees/hospital",
    tagline: "Book OPD appointments 24/7.",
  },
  {
    id: "school",
    name: "Admissions",
    href: "/ai-employees/school",
    tagline: "Screen inquiries and book counseling.",
  },
  {
    id: "restaurant",
    name: "Restaurants",
    href: "/ai-employees/restaurant",
    tagline: "Take reservations during rush hour.",
  },
  {
    id: "support",
    name: "Support",
    href: "/ai-employees/support",
    tagline: "Resolve FAQs and escalate with context.",
  },
];

export const moreFromOpsBrain = {
  id: "more-from-opsbrain",
  eyebrow: "More from OpsBrain",
  title: "Two more products, built the same way.",
  subtitle:
    "Focused tools for founders and operators. Use them with OpsBrain, or on their own.",
  cards: [
    {
      slug: "spark" as const,
      name: "OpsSpark",
      line: "AI social for founders.",
      body: "Write, schedule, and publish to Instagram, LinkedIn, Facebook, and X - without a marketing hire.",
      href: "/products/spark",
      cta: "See OpsSpark",
      loginHref: PRODUCT_LOGIN.spark,
    },
    {
      slug: "meet" as const,
      name: "OpsMeet",
      line: "Meetings that don’t disappear.",
      body: "Join the call, capture what was said, and leave with notes and a clear action plan.",
      href: "/products/meet",
      cta: "See OpsMeet",
      loginHref: PRODUCT_LOGIN.meet,
    },
  ],
} as const;

export const pricingOtherProductsNote = {
  text: "Looking for OpsSpark or OpsMeet?",
  cta: "See product pricing.",
  links: [
    { label: "OpsSpark", href: "/products/spark#pricing" },
    { label: "OpsMeet", href: "/products/meet#pricing" },
  ],
} as const;

export const aboutAlsoFromOpsBrain = {
  eyebrow: "Also from OpsBrain",
  title: "OpsSpark and OpsMeet",
  subtitle:
    "We also build AI social for founders, and a meeting assistant for notes and action plans.",
} as const;

export type ProductPageContent = {
  slug: ProductSlug;
  name: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  subtitle: string;
  loginHref: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  problem: {
    title: string;
    items: { title: string; description: string }[];
  };
  capabilitiesTitle: string;
  capabilities: { title: string; description: string }[];
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  };
  whoItsFor: {
    title: string;
    items: string[];
    notFor: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    tiers: { name: string; price: string; note: string; features: string[] }[];
  };
  faq: { question: string; answer: string }[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

export const productPages: Record<ProductSlug, ProductPageContent> = {
  spark: {
    slug: "spark",
    name: "OpsSpark",
    path: "/products/spark",
    seoTitle: "OpsSpark - AI social for founders",
    seoDescription:
      "OpsSpark is AI social for founders and small teams. Generate on-brand posts, schedule, and publish to Instagram, LinkedIn, Facebook, and X from one place.",
    keywords: [
      "AI social media",
      "social media for founders",
      "AI content scheduler",
      "OpsSpark",
    ],
    eyebrow: "OpsSpark",
    h1: "Your social, on brand, on schedule.",
    subtitle:
      "For founders who need a consistent presence without a marketing team.",
    loginHref: PRODUCT_LOGIN.spark,
    primaryCta: { label: "Get started", href: "/#contact" },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
    problem: {
      title: "Social falls behind when you are busy building.",
      items: [
        {
          title: "Inconsistent posting",
          description:
            "Weeks go quiet. Then a burst of posts. Algorithms and customers both notice the gap.",
        },
        {
          title: "No time to write",
          description:
            "Founders know the story. They do not have hours to draft captions, images, and variants for every channel.",
        },
        {
          title: "Too many tools",
          description:
            "One app to write, another to design, another to schedule. Work gets lost between tabs.",
        },
      ],
    },
    capabilitiesTitle: "What OpsSpark does",
    capabilities: [
      {
        title: "Connect your accounts",
        description:
          "Link Instagram, LinkedIn, Facebook, and X. Publish from one calendar.",
      },
      {
        title: "Write in your voice",
        description:
          "Set brand voice once. OpsSpark drafts posts, images, and short video that sound like you.",
      },
      {
        title: "Schedule and publish",
        description:
          "Approve what goes out. OpsSpark posts on time - no last-minute scrambling.",
      },
      {
        title: "See what worked",
        description:
          "Simple analytics so you know which posts landed, without a marketing dashboard.",
      },
    ],
    howItWorks: {
      title: "How OpsSpark works",
      subtitle: "Three steps. Then it runs on your calendar.",
      steps: [
        {
          title: "Connect accounts",
          description: "Sign in and link the platforms you already use.",
        },
        {
          title: "Set brand voice",
          description: "Tell OpsSpark who you are, who you serve, and how you sound.",
        },
        {
          title: "Generate, approve, publish",
          description:
            "Review drafts, pick a time, and publish. Edit anything before it goes live.",
        },
      ],
    },
    whoItsFor: {
      title: "Who OpsSpark is for",
      items: [
        "Startup founders who need a public presence",
        "Local businesses posting without a marketing hire",
        "Lean teams that want one social workflow",
      ],
      notFor:
        "OpsSpark is social software - not a PR agency, media list, or journalist pitching tool.",
    },
    pricing: {
      title: "Simple plans",
      subtitle: "Start free. Upgrade when you post more.",
      tiers: [
        {
          name: "Free",
          price: "$0",
          note: "Try OpsSpark on two accounts",
          features: [
            "2 connected accounts",
            "10 posts / month",
            "AI text and image drafts",
          ],
        },
        {
          name: "Pro",
          price: "$99",
          note: "For founders posting every week",
          features: [
            "10 connected accounts",
            "100 posts / month",
            "Brand voice",
            "Approval workflow",
          ],
        },
        {
          name: "Growth",
          price: "$299",
          note: "For teams shipping content at scale",
          features: [
            "50 connected accounts",
            "500 posts / month",
            "AI video",
            "Higher AI limits",
          ],
        },
      ],
    },
    faq: [
      {
        question: "Is OpsSpark a PR agency?",
        answer:
          "No. OpsSpark is software. It helps you create, schedule, and publish social posts. It does not pitch journalists or run PR retainers.",
      },
      {
        question: "Which platforms can I connect?",
        answer:
          "Instagram, LinkedIn, Facebook, and X. You publish from one calendar.",
      },
      {
        question: "Can I edit AI drafts?",
        answer:
          "Yes. Every post is a draft until you approve it. Change the copy, media, or time before it goes live.",
      },
      {
        question: "Do I need OpsSpark if I already use OpsBrain?",
        answer:
          "No. They are separate products. Use OpsSpark if you want social publishing. Use OpsBrain if you want AI employees that call and qualify leads.",
      },
      {
        question: "How do I get started?",
        answer:
          "Log in to OpsSpark, or tell us you want OpsSpark and we will get you on the right plan.",
      },
    ],
    cta: {
      title: "Put your social on a schedule.",
      description:
        "Log in to OpsSpark, or tell us about your brand and we will point you to the right plan.",
      primaryLabel: "Get started",
      primaryHref: "/#contact",
      secondaryLabel: "See OpsBrain",
      secondaryHref: "/",
    },
  },
  meet: {
    slug: "meet",
    name: "OpsMeet",
    path: "/products/meet",
    seoTitle: "OpsMeet - notes and action plans from meetings",
    seoDescription:
      "OpsMeet joins your calls, captures what was said, and turns every meeting into notes and a clear action plan.",
    keywords: [
      "AI meeting assistant",
      "meeting notes",
      "meeting action items",
      "Google Meet AI notes",
      "OpsMeet",
    ],
    eyebrow: "OpsMeet",
    h1: "Every meeting becomes notes and an action plan.",
    subtitle:
      "Capture the call. Walk out with a summary and next steps.",
    loginHref: PRODUCT_LOGIN.meet,
    primaryCta: { label: "Get started", href: "/#contact" },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
    problem: {
      title: "Meetings end. The work does not get written down.",
      items: [
        {
          title: "Notes get lost",
          description:
            "Someone was supposed to write it up. They did not. A week later, nobody agrees what was decided.",
        },
        {
          title: "Action items vanish",
          description:
            "Owners, dates, and follow-ups live in chat threads - or nowhere.",
        },
        {
          title: "You cannot relisten",
          description:
            "If you missed the call, you get a vague recap. The detail is gone.",
        },
      ],
    },
    capabilitiesTitle: "What OpsMeet does",
    capabilities: [
      {
        title: "Join or record the call",
        description:
          "OpsMeet works with Google Meet. Capture the session you choose - nothing runs in the background without you.",
      },
      {
        title: "Full transcript",
        description:
          "A readable record of what was said, so you can search instead of guessing.",
      },
      {
        title: "A summary you will actually read",
        description:
          "Short, structured notes - decisions, context, and open questions. Not a wall of text.",
      },
      {
        title: "An action plan",
        description:
          "Next steps with owners. Leave the call knowing who does what.",
      },
    ],
    howItWorks: {
      title: "How OpsMeet works",
      subtitle: "From live call to follow-through.",
      steps: [
        {
          title: "Connect Meet",
          description: "Sign in and connect Google Meet for the calls you want captured.",
        },
        {
          title: "Capture the session",
          description:
            "The assistant joins or records when you start it. You stay in control.",
        },
        {
          title: "Get notes and actions",
          description:
            "After the call, open the dashboard: transcript, summary, and an action plan.",
        },
      ],
    },
    whoItsFor: {
      title: "Who OpsMeet is for",
      items: [
        "Founders who live in back-to-back calls",
        "Sales and customer teams that need a clean recap",
        "Operators who turn meetings into work",
      ],
      notFor:
        "OpsMeet is a meeting assistant - not a second Diya, and not a sales-calling product. For outbound voice, use OpsBrain.",
    },
    pricing: {
      title: "Pricing",
      subtitle: "Plans are not public yet. Tell us how your team meets - we will get you set up.",
      tiers: [
        {
          name: "Talk to us",
          price: "Custom",
          note: "We will match OpsMeet to how your team runs calls",
          features: [
            "Google Meet capture",
            "Transcripts and summaries",
            "Action plans after each call",
            "Onboarding with our team",
          ],
        },
      ],
    },
    faq: [
      {
        question: "Which meetings does OpsMeet support?",
        answer:
          "Google Meet today. Recording starts only when you choose to capture a session.",
      },
      {
        question: "Does it join every call automatically?",
        answer:
          "No. You decide which sessions to capture. OpsMeet does not record in the background without you.",
      },
      {
        question: "What do I get after the meeting?",
        answer:
          "A transcript, a short summary, and an action plan with next steps - in your dashboard.",
      },
      {
        question: "Is this the same as OpsBrain?",
        answer:
          "No. OpsBrain is AI employees that call and qualify leads. OpsMeet is for the meetings you already take.",
      },
      {
        question: "How much does OpsMeet cost?",
        answer:
          "Public plans are not listed yet. Contact us and we will place you on the right setup.",
      },
    ],
    cta: {
      title: "Stop losing what was said in the room.",
      description:
        "Log in to OpsMeet, or tell us how your team runs meetings.",
      primaryLabel: "Get started",
      primaryHref: "/#contact",
      secondaryLabel: "See OpsBrain",
      secondaryHref: "/",
    },
  },
};

export function getProductPage(slug: string): ProductPageContent | undefined {
  if (slug === "spark" || slug === "meet") {
    return productPages[slug];
  }
  return undefined;
}

export const productSlugs: ProductSlug[] = ["spark", "meet"];
