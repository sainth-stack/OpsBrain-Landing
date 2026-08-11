/**
 * Landing voice demo scripts — Cartesia Sonic (Simi / Arushi / Sindhu).
 * Regen: npm run generate:voice-demos
 */

export const CARTESIA_VOICES = {
  en: {
    agent: "cartesia:3b554273-4299-48b9-9aaf-eefd438e3941:en", // Simi
    customer: "cartesia:638efaaa-4d0c-442e-b701-3fae16aad012:en", // Sameer
  },
  hi: {
    agent: "cartesia:95d51f79-c397-46f9-b49a-23763d3eaa2d:hi", // Arushi
    customer: "cartesia:be79f378-47fe-4f9c-b92b-f02cefa62ccf:hi", // Sunil
  },
  te: {
    agent: "cartesia:07bc462a-c644-49f1-baf7-82d5599131be:te", // Sindhu
    customer: "cartesia:38bded0a-3ab4-42d1-8e47-2e0b6b10ced9:te", // Vikram
  },
};

export const DEMOS = [
  {
    file: "sales-en.mp3",
    lang: "en",
    persona: "Simi",
    trait: "Warm & Conversational",
    fallbackDuration: 28,
    dialogue: [
      {
        speaker: "agent",
        text: "Hello, this is Simi calling from OpsBrain. You asked about AI employees — is now a good time for one minute?",
      },
      {
        speaker: "customer",
        text: "Yes, go ahead.",
      },
      {
        speaker: "agent",
        text: "We call every new lead in under a minute and book the demo for you. Would Thursday at two work?",
      },
      {
        speaker: "customer",
        text: "Thursday works.",
      },
      {
        speaker: "agent",
        text: "I'll send the invite now. Thank you.",
      },
    ],
  },
  {
    file: "sales-hi.mp3",
    lang: "hi",
    persona: "Arushi",
    trait: "Hinglish & Natural",
    fallbackDuration: 32,
    dialogue: [
      {
        speaker: "agent",
        text: "नमस्ते जी, मैं OpsBrain से Arushi बोल रही हूँ। आपने AI employees के बारे में पूछा था — क्या अभी एक minute मिल सकता है?",
      },
      {
        speaker: "customer",
        text: "हाँ जी, बताइए।",
      },
      {
        speaker: "agent",
        text: "हम हर नई lead को एक minute में call करके qualify करते हैं, और आपकी team के लिए demo book कर देते हैं। गुरुवार दो बजे ठीक रहेगा?",
      },
      {
        speaker: "customer",
        text: "हाँ, गुरुवार ठीक है।",
      },
      {
        speaker: "agent",
        text: "Invite अभी भेज रही हूँ। धन्यवाद जी।",
      },
    ],
  },
  {
    file: "sales-te.mp3",
    lang: "te",
    persona: "Sindhu",
    trait: "Conversational Partner",
    fallbackDuration: 32,
    dialogue: [
      {
        speaker: "agent",
        text: "నమస్కారం అండి, నేను OpsBrain నుంచి Sindhu మాట్లాడుతున్నాను. AI employees గురించి enquire చేసారు కదా — ఇప్పుడు ఒక నిమిషం సమయం ఉందా?",
      },
      {
        speaker: "customer",
        text: "ఉంది అండి, చెప్పండి.",
      },
      {
        speaker: "agent",
        text: "కొత్త lead వస్తే ఒక నిమిషంలో call చేసి qualify చేసి, మీ team కి demo book చేస్తాం. గురువారం రెండు గంటలు సరిపోతుందా?",
      },
      {
        speaker: "customer",
        text: "సరే అండి, గురువారం ఫైన్.",
      },
      {
        speaker: "agent",
        text: "Invite ఇప్పుడే పంపిస్తాను. ధన్యవాదాలు అండి.",
      },
    ],
  },
];

export const HERO = {
  file: "hero-demo.mp3",
  lang: "en",
  voice: CARTESIA_VOICES.en.agent,
  text: "Hello, this is Simi calling from OpsBrain. You asked about AI employees — is now a good time for one minute?",
};
