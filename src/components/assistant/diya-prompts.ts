/** Matches backend `SITE_OPENING_TEXT` - Diya's default voice + panel greeting. */
export const DIYA_WELCOME_HEADLINE = "Hi, I'm Diya from OpsBrain.";
export const DIYA_WELCOME_BODY = "What would you like to know?";
export const DIYA_WELCOME = `${DIYA_WELCOME_HEADLINE} ${DIYA_WELCOME_BODY}`;

export const DIYA_ENDED_MESSAGE =
  "Thanks for chatting - come back anytime if you have more questions.";

const DEFAULT_CHIPS = [
  "What's in the ₹2,999 plan?",
  "How do AI employees work?",
  "Book a demo",
] as const;

const PRICING_CHIPS = [
  "What's in the ₹2,999 plan?",
  "How does annual pricing work?",
  "How many voice minutes are included?",
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

const SPARK_CHIPS = [
  "What is OpsSpark?",
  "Which social platforms can I connect?",
  "Book a demo",
] as const;

const MEET_CHIPS = [
  "What is OpsMeet?",
  "Does OpsMeet join Google Meet?",
  "Book a demo",
] as const;

export function getPromptChips(pathname: string): readonly string[] {
  if (pathname.startsWith("/pricing")) return PRICING_CHIPS;
  if (pathname.startsWith("/solutions")) return SOLUTION_CHIPS;
  if (pathname.startsWith("/ai-employees")) return EMPLOYEE_CHIPS;
  if (pathname.startsWith("/products/spark")) return SPARK_CHIPS;
  if (pathname.startsWith("/products/meet")) return MEET_CHIPS;
  return DEFAULT_CHIPS;
}
