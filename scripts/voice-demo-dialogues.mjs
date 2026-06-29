/**
 * Voice demo scripts + voice mapping.
 * Free regen: npm run generate:voice-demos:free
 */

/** Microsoft Edge neural TTS — "Conversation" voices where available. */
export const EDGE_VOICES = {
  en: {
    agent: "en-US-AvaNeural",
    customer: "en-US-AndrewNeural",
  },
  hi: {
    agent: "hi-IN-SwaraNeural",
    customer: "hi-IN-MadhurNeural",
  },
  te: {
    agent: "te-IN-ShrutiNeural",
    customer: "te-IN-MohanNeural",
  },
};

/** Per-line TTS tuning — slower + pitch shift reads more like a phone call. */
export const EDGE_PROSODY = {
  agent: { rate: "-4%", pitch: "+2Hz" },
  customer: { rate: "-2%", pitch: "-1Hz" },
};

export const VOICES = {
  en: { agent: "21m00Tcm4TlvDq8ikWAM", customer: "nPczCjzI2devNBz1zQrb" },
  hi: { agent: "FiIgWdzVKAalJyAgg8Pg", customer: "zT03pEAEi0VHKciJODfn" },
  te: { agent: "OwA6IqdLakQOd19pSLOn", customer: "3gsg3cxXyFLcGIfNbM6C" },
};

export const VOICE_FALLBACKS = {
  en: { agent: "cgSgspJ2msm6clMCkdW9", customer: "onwK4e9ZLuTAKqWW03F9" },
  hi: { agent: "EXAVITQu4vr4xnSDxMaL", customer: "pNInz6obpgDQGcFmaJgB" },
  te: { agent: "cgSgspJ2msm6clMCkdW9", customer: "onwK4e9ZLuTAKqWW03F9" },
};

/** Fewer, longer turns = fewer stitched seams (sounds less robotic). */
export const DEMOS = [
  {
    file: "sales-en.mp3",
    lang: "en",
    persona: "Sarah",
    trait: "Confident & Clear",
    fallbackDuration: 28,
    dialogue: [
      {
        speaker: "agent",
        text: "Hey! Sarah here from OpsBrain. You filled out our form yesterday — got a quick minute? We call every new lead in under sixty seconds and book the demo for you.",
      },
      {
        speaker: "customer",
        text: "Sure, go ahead. We're about fifteen on the sales team.",
      },
      {
        speaker: "agent",
        text: "Perfect. Could we do Thursday at two PM for a short walkthrough?",
      },
      {
        speaker: "customer",
        text: "Yeah, that works.",
      },
      {
        speaker: "agent",
        text: "Great — I'll send the calendar invite and a confirmation text right now. Thanks!",
      },
    ],
  },
  {
    file: "sales-hi.mp3",
    lang: "hi",
    persona: "Raju",
    trait: "Warm & Professional",
    fallbackDuration: 32,
    dialogue: [
      {
        speaker: "agent",
        text: "नमस्ते जी, Raju बोल रही हूँ OpsBrain से। आपने कल form भरा था — अभी दो minute मिलेंगे? हम lead आते ही एक minute में call करके demo book करवा देते हैं।",
      },
      {
        speaker: "customer",
        text: "हाँ जी, बताइए। team में लगभग पंद्रह लोग हैं।",
      },
      {
        speaker: "agent",
        text: "अच्छा। इस गुरुवार दोपहर दो बजे demo के लिए time ठीक रहेगा?",
      },
      {
        speaker: "customer",
        text: "हाँ, ठीक है।",
      },
      {
        speaker: "agent",
        text: "बढ़िया — calendar invite और confirmation message अभी भेज रही हूँ। धन्यवाद!",
      },
    ],
  },
  {
    file: "sales-te.mp3",
    lang: "en",
    persona: "Alex",
    trait: "Sharp & Persuasive",
    fallbackDuration: 38,
    dialogue: [
      {
        speaker: "agent",
        text: "Hey, this is Alex from OpsBrain! You just filled out our form — got sixty seconds? I'm calling because most sales teams lose deals just from slow follow-up. We fix that with AI.",
      },
      {
        speaker: "customer",
        text: "Yeah I've been looking at a few tools. What makes you different?",
      },
      {
        speaker: "agent",
        text: "Great question. OpsBrain calls every lead in under sixty seconds — day or night — qualifies them, and books the demo automatically. No SDR needed. Your team only talks to people who are ready to buy.",
      },
      {
        speaker: "customer",
        text: "Okay that sounds interesting. How quick can we get started?",
      },
      {
        speaker: "agent",
        text: "Honestly, same week. Can I grab Thursday at two PM to show you a live demo? Takes thirty minutes and you'll see exactly how it works for your pipeline.",
      },
      {
        speaker: "customer",
        text: "Yeah, Thursday works for me.",
      },
      {
        speaker: "agent",
        text: "Perfect — sending the calendar invite right now. Talk soon!",
      },
    ],
  },
];
