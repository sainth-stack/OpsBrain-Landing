/** Matches backend `SITE_OPENING_TEXT` — Diya's default voice + panel greeting. */
export const DIYA_WELCOME_HEADLINE = "Welcome to OpsBrain AI.";
export const DIYA_WELCOME_BODY =
  "I'm Diya, your AI guide. Ask me about our plans, AI employees, voice and WhatsApp campaigns, or CRM integrations.";
export const DIYA_WELCOME = `${DIYA_WELCOME_HEADLINE} ${DIYA_WELCOME_BODY}`;

export const DIYA_ENDED_MESSAGE =
  "Thanks for stopping by. I'm here whenever you want to explore plans, AI employees, or integrations.";

const DEFAULT_CHIPS = [
  "What's in the $399 plan?",
  "How do AI employees work?",
  "Book a demo",
] as const;

const PRICING_CHIPS = [
  "What's in the $399 plan?",
  "Compare Starter vs Growth",
  "Book a demo",
] as const;

const SOLUTION_CHIPS = [
  "How does OpsBrain help my industry?",
  "What channels are included?",
  "Book a demo",
] as const;

const EMPLOYEE_CHIPS = [
  "Tell me about this AI employee",
  "How does voice calling work?",
  "Book a demo",
] as const;

export function getPromptChips(pathname: string): readonly string[] {
  if (pathname.startsWith("/pricing")) return PRICING_CHIPS;
  if (pathname.startsWith("/solutions")) return SOLUTION_CHIPS;
  if (pathname.startsWith("/ai-employees")) return EMPLOYEE_CHIPS;
  return DEFAULT_CHIPS;
}
