/**
 * Voice demo dialogue scripts — single source of truth for audio generation.
 * Natural back-and-forth conversations in English, Hindi, and Telugu.
 */

export const VOICES = {
  en: {
    agent: "cgSgspJ2msm6clMCkdW9", // Jessica — premade, free-tier OK
    customer: "onwK4e9ZLuTAKqWW03F9", // Daniel — premade, free-tier OK
  },
  hi: {
    // Premade voices — community library voices (Anika, Raju) require a paid plan via API
    agent: "EXAVITQu4vr4xnSDxMaL", // Sarah — female
    customer: "pNInz6obpgDQGcFmaJgB", // Adam — male
  },
  te: {
    agent: "hpp4J3VqNfWAUOO0d1Us", // Bella — female
    customer: "ErXwobaYiN019PkySvjV", // Antoni — male
  },
};

export const DEMOS = [
  // ── Sales ──────────────────────────────────────────────────────────────
  {
    file: "sales-en.mp3",
    lang: "en",
    persona: "Sarah",
    trait: "Confident & Clear",
    fallbackDuration: 38,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] Hi, this is Sarah from OpsBrain. You filled out a form on our site yesterday — do you have two minutes?",
      },
      {
        speaker: "customer",
        text: "[friendly] Yeah, sure. What is this about?",
      },
      {
        speaker: "agent",
        text: "We help sales teams call new leads within sixty seconds and book demos automatically. How big is your sales team right now?",
      },
      {
        speaker: "customer",
        text: "About fifteen people.",
      },
      {
        speaker: "agent",
        text: "[pleased] Got it. Would Thursday at two PM work for a quick fifteen-minute demo?",
      },
      {
        speaker: "customer",
        text: "Yeah, that works.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] Perfect — I'll send a calendar invite and confirmation text right now. Thanks!",
      },
    ],
  },
  {
    file: "sales-hi.mp3",
    lang: "hi",
    persona: "Priya",
    trait: "Warm & Professional",
    fallbackDuration: 42,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] नमस्ते जी, मैं OpsBrain से प्रिया बोल रही हूँ। आपने कल हमारी साइट पर फ़ॉर्म भरा था — क्या अभी दो minute बात हो सकती है?",
      },
      {
        speaker: "customer",
        text: "[friendly] हाँ बिल्कुल, बताइए।",
      },
      {
        speaker: "agent",
        text: "हम sales teams को lead आते ही साठ second में call करके demo book करने में help करते हैं। आपकी team में कितने लोग हैं?",
      },
      {
        speaker: "customer",
        text: "लगभग पंद्रह log।",
      },
      {
        speaker: "agent",
        text: "[pleased] समझ गई। क्या इस गुरुवार दोपहर दो बजे demo के लिए time ठीक रहेगा?",
      },
      {
        speaker: "customer",
        text: "हाँ, ठीक है।",
      },
      {
        speaker: "agent",
        text: "[cheerfully] बढ़िया! Calendar invite और confirmation SMS अभी भेज रही हूँ। धन्यवाद!",
      },
    ],
  },
  {
    file: "sales-te.mp3",
    lang: "te",
    persona: "Ananya",
    trait: "Energetic & Native",
    fallbackDuration: 42,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] నమస్కారం అండి, OpsBrain నుండి Ananya. మీరు నిన్న మా వెబ్‌సైట్‌లో ఫారం పూరించారు — ఇప్పుడు రెండు నిమిషాలు మాట్లాడవచ్చా?",
      },
      {
        speaker: "customer",
        text: "[friendly] అవును అండి, చెప్పండి.",
      },
      {
        speaker: "agent",
        text: "మేము సేల్స్ టీమ్‌లకు లీడ్ వచ్చిన వెంటనే కాల్ చేసి డెమో బుక్ చేయడంలో సహాయం చేస్తాము. మీ టీమ్‌లో ఎంత మంది ఉన్నారు?",
      },
      {
        speaker: "customer",
        text: "సుమారు పదిహేనుగురు.",
      },
      {
        speaker: "agent",
        text: "[pleased] బాగుంది! ఈ గురువారం మధ్యాహ్నం రెండు గంటలకు డెమో ఫిక్స్ చేద్దామా?",
      },
      {
        speaker: "customer",
        text: "అవును, సరే అండి.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] చాలా బాగుంది! Calendar invite మరియు confirmation SMS ఇప్పుడే పంపిస్తున్నాను. ధన్యవాదాలు!",
      },
    ],
  },

  // ── Support ────────────────────────────────────────────────────────────
  {
    file: "support-en.mp3",
    lang: "en",
    persona: "Maya",
    trait: "Calm & Helpful",
    fallbackDuration: 36,
    dialogue: [
      {
        speaker: "agent",
        text: "[calmly] Hi, thanks for calling OpsBrain support — this is Maya. How can I help you today?",
      },
      {
        speaker: "customer",
        text: "Hi, my CRM isn't syncing with Salesforce.",
      },
      {
        speaker: "agent",
        text: "I can see that on your account. Let me walk you through the fix — it'll take about two minutes.",
      },
      {
        speaker: "customer",
        text: "Okay, go ahead.",
      },
      {
        speaker: "agent",
        text: "Open Settings, then Integrations, and toggle Salesforce sync back on. That should do it.",
      },
      {
        speaker: "customer",
        text: "[relieved] Oh, it's working now. Thanks!",
      },
      {
        speaker: "agent",
        text: "[warmly] You're welcome! I'll email you the step-by-step guide as well. Have a great day!",
      },
    ],
  },
  {
    file: "support-hi.mp3",
    lang: "hi",
    persona: "Kavya",
    trait: "Patient & Reassuring",
    fallbackDuration: 40,
    dialogue: [
      {
        speaker: "agent",
        text: "[calmly] नमस्ते, OpsBrain support से काव्या बोल रही हूँ। बताइए, कैसे help कर सकती हूँ?",
      },
      {
        speaker: "customer",
        text: "Mera CRM Salesforce ke saath sync nahi ho raha.",
      },
      {
        speaker: "agent",
        text: "Main dekh sakti hoon aapke account par issue hai. Do minute mein fix kar deti hoon — chaliye shuru karte hain.",
      },
      {
        speaker: "customer",
        text: "Theek hai, bataiye.",
      },
      {
        speaker: "agent",
        text: "Settings mein jaakar Integrations kholiye, aur Salesforce sync ko wapas on kar dijiye.",
      },
      {
        speaker: "customer",
        text: "[relieved] Arre, ab kaam kar raha hai. Shukriya!",
      },
      {
        speaker: "agent",
        text: "[warmly] Khushi hui! Main step-by-step guide aapke email par bhi bhej deti hoon. Achha din!",
      },
    ],
  },
  {
    file: "support-te.mp3",
    lang: "te",
    persona: "Lakshmi",
    trait: "Friendly & Clear",
    fallbackDuration: 40,
    dialogue: [
      {
        speaker: "agent",
        text: "[calmly] నమస్కారం అండి, OpsBrain support నుండి లక్ష్మి మాట్లాడుతున్నాను. ఎలా సహాయం చేయగలను?",
      },
      {
        speaker: "customer",
        text: "నా CRM Salesforce తో sync అవ్వట్లేదు అండి.",
      },
      {
        speaker: "agent",
        text: "మీ అకౌంట్‌లో issue కనిపిస్తోంది. రెండు నిమిషాల్లో fix చేద్దాం — మొదలు పెడదాం.",
      },
      {
        speaker: "customer",
        text: "సరే అండి, చెప్పండి.",
      },
      {
        speaker: "agent",
        text: "Settings కి వెళ్లి Integrations open చేసి, Salesforce sync ని మళ్లీ on చేయండి.",
      },
      {
        speaker: "customer",
        text: "[relieved] ఆ, ఇప్పుడు work అవుతోంది. Thanks అండి!",
      },
      {
        speaker: "agent",
        text: "[warmly] సంతోషం! Step-by-step guide మీ email కి కూడా పంపిస్తున్నాను. మంచి రోజు!",
      },
    ],
  },

  // ── HR ─────────────────────────────────────────────────────────────────
  {
    file: "hr-en.mp3",
    lang: "en",
    persona: "Emily",
    trait: "Warm & Professional",
    fallbackDuration: 36,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] Hi, this is Emily from OpsBrain HR. I'm calling about your software engineer application — do you have a few minutes?",
      },
      {
        speaker: "customer",
        text: "Yes, I do. Go ahead.",
      },
      {
        speaker: "agent",
        text: "Great. Can you tell me about your current role and why you're looking to move?",
      },
      {
        speaker: "customer",
        text: "I'm a backend engineer at a fintech startup. Looking for more scale and ownership.",
      },
      {
        speaker: "agent",
        text: "[pleased] That's a great fit. Are you available for an interview this Friday at ten AM?",
      },
      {
        speaker: "customer",
        text: "Friday at ten works for me.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] Perfect — I'll send the calendar invite right away. Good luck!",
      },
    ],
  },
  {
    file: "hr-hi.mp3",
    lang: "hi",
    persona: "Neha",
    trait: "Friendly & Clear",
    fallbackDuration: 40,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] नमस्ते, OpsBrain HR से नेहा बोल रही हूँ। आपकी software engineer application के बारे में call कर रही हूँ — क्या दो minute बात हो सकती है?",
      },
      {
        speaker: "customer",
        text: "Haan ji, bilkul.",
      },
      {
        speaker: "agent",
        text: "Aap abhi kahan kaam kar rahe hain aur move kyun karna chahte hain?",
      },
      {
        speaker: "customer",
        text: "Main ek fintech startup mein backend engineer hoon. Zyada scale aur ownership chahiye.",
      },
      {
        speaker: "agent",
        text: "[pleased] Bahut accha fit hai. Kya is shukravar subah das baje interview ke liye time hai?",
      },
      {
        speaker: "customer",
        text: "Haan, shukravar das baje theek hai.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] Badhiya! Calendar invite abhi bhej rahi hoon. All the best!",
      },
    ],
  },
  {
    file: "hr-te.mp3",
    lang: "te",
    persona: "Swathi",
    trait: "Encouraging & Native",
    fallbackDuration: 40,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] నమస్కారం అండి, OpsBrain HR నుండి స్వాతి మాట్లాడుతున్నాను. మీ software engineer application గురించి call చేస్తున్నాను — రెండు నిమిషాలు మాట్లాడవచ్చా?",
      },
      {
        speaker: "customer",
        text: "అవును అండి, చెప్పండి.",
      },
      {
        speaker: "agent",
        text: "ఇప్పుడు ఎక్కడ work చేస్తున్నారు, ఎందుకు move అవ్వాలనుకుంటున్నారు?",
      },
      {
        speaker: "customer",
        text: "ఒక fintech startup లో backend engineer గా ఉన్నాను. ఇంకా scale మరియు ownership కావాలి.",
      },
      {
        speaker: "agent",
        text: "[pleased] చాలా మంచి fit అండి. ఈ శుక్రవారం ఉదయం పది గంటలకు interview కి time ఉందా?",
      },
      {
        speaker: "customer",
        text: "అవును, శుక్రవారం పది గంటలకు సరే.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] బాగుంది! Calendar invite ఇప్పుడే పంపిస్తున్నాను. All the best!",
      },
    ],
  },

  // ── Real Estate ────────────────────────────────────────────────────────
  {
    file: "realestate-en.mp3",
    lang: "en",
    persona: "Rachel",
    trait: "Confident & Helpful",
    fallbackDuration: 36,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] Hi, this is Rachel from OpsBrain Realty. You inquired about the three-bedroom on Oak Street — are you still looking?",
      },
      {
        speaker: "customer",
        text: "Yes, we're actively looking in that area.",
      },
      {
        speaker: "agent",
        text: "Wonderful. It's a corner unit with a balcony and covered parking. What's your budget range?",
      },
      {
        speaker: "customer",
        text: "Around eighty-five lakhs.",
      },
      {
        speaker: "agent",
        text: "[pleased] That fits well. I have Saturday at eleven AM for a site visit — shall I book it?",
      },
      {
        speaker: "customer",
        text: "Saturday eleven works. Please book it.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] Done! I'll send directions and a confirmation on WhatsApp right now.",
      },
    ],
  },
  {
    file: "realestate-hi.mp3",
    lang: "hi",
    persona: "Anjali",
    trait: "Warm & Persuasive",
    fallbackDuration: 40,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] नमस्ते, OpsBrain Realty से Anjali बोल रही हूँ। आपने Oak Street की three-bedroom property के बारे में पूछा था — अभी भी देख रहे हैं?",
      },
      {
        speaker: "customer",
        text: "Haan ji, us area mein dekh rahe hain.",
      },
      {
        speaker: "agent",
        text: "Bahut acchi property hai — corner unit, balcony aur covered parking bhi hai. Aapka budget kya hai?",
      },
      {
        speaker: "customer",
        text: "Lagbhag pachasi lakh ke aas paas.",
      },
      {
        speaker: "agent",
        text: "[pleased] Bilkul fit hai. Is shanivaar gyarah baje site visit ke liye slot hai — book kar doon?",
      },
      {
        speaker: "customer",
        text: "Haan, shanivaar gyarah baje theek hai.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] Ho gaya! Directions aur confirmation WhatsApp par abhi bhej rahi hoon.",
      },
    ],
  },
  {
    file: "realestate-te.mp3",
    lang: "te",
    persona: "Divya",
    trait: "Energetic & Local",
    fallbackDuration: 40,
    dialogue: [
      {
        speaker: "agent",
        text: "[warmly] నమస్కారం అండి, OpsBrain Realty నుండి దివ్య మాట్లాడుతున్నాను. Oak Street లో three-bedroom property గురించి అడిగారు — ఇంకా చూస్తున్నారా?",
      },
      {
        speaker: "customer",
        text: "అవును అండి, aa area లో చూస్తున్నాము.",
      },
      {
        speaker: "agent",
        text: "చాలా మంచి property అండి — corner unit, balcony మరియు covered parking కూడా ఉంది. మీ budget ఎంత?",
      },
      {
        speaker: "customer",
        text: "ఎనిమిది లక్షల దాకా.",
      },
      {
        speaker: "agent",
        text: "[pleased] చాలా బాగా fit అవుతుంది. ఈ శనివారం పదకొండు గంటలకు site visit కి slot ఉంది — book చేద్దామా?",
      },
      {
        speaker: "customer",
        text: "అవును, శనివారం పదకొండు గంటలకు సరే.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] అయ్యింది! Directions మరియు confirmation WhatsApp లో ఇప్పుడే పంపిస్తున్నాను.",
      },
    ],
  },

  // ── Healthcare ─────────────────────────────────────────────────────────
  {
    file: "healthcare-en.mp3",
    lang: "en",
    persona: "Sophia",
    trait: "Calm & Reassuring",
    fallbackDuration: 36,
    dialogue: [
      {
        speaker: "agent",
        text: "[calmly] Hi, thank you for calling OpsBrain Health. This is Sophia — how can I help you today?",
      },
      {
        speaker: "customer",
        text: "I need to book an appointment with Dr. Patel.",
      },
      {
        speaker: "agent",
        text: "Of course. Is this for a follow-up or a new consultation?",
      },
      {
        speaker: "customer",
        text: "It's a follow-up for my blood pressure check.",
      },
      {
        speaker: "agent",
        text: "[warmly] I have Tuesday at three PM available. Does that work for you?",
      },
      {
        speaker: "customer",
        text: "Tuesday at three is perfect.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] Confirmed! I'll send a reminder text the day before. Take care!",
      },
    ],
  },
  {
    file: "healthcare-hi.mp3",
    lang: "hi",
    persona: "Meera",
    trait: "Patient & Caring",
    fallbackDuration: 40,
    dialogue: [
      {
        speaker: "agent",
        text: "[calmly] नमस्ते, OpsBrain Health से मीरा बोल रही हूँ। बताइए, कैसे help कर सकती हूँ?",
      },
      {
        speaker: "customer",
        text: "Mujhe Dr. Patel ke saath appointment book karni hai.",
      },
      {
        speaker: "agent",
        text: "Zaroor. Ye follow-up hai ya naya consultation?",
      },
      {
        speaker: "customer",
        text: "Blood pressure check ke liye follow-up hai.",
      },
      {
        speaker: "agent",
        text: "[warmly] Mangalvaar dopahar teen baje slot available hai. Theek rahega?",
      },
      {
        speaker: "customer",
        text: "Haan, mangalvaar teen baje bilkul theek hai.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] Confirm ho gaya! Ek din pehle reminder SMS bhej dungi. Apna khayal rakhiye!",
      },
    ],
  },
  {
    file: "healthcare-te.mp3",
    lang: "te",
    persona: "Keerthi",
    trait: "Gentle & Clear",
    fallbackDuration: 40,
    dialogue: [
      {
        speaker: "agent",
        text: "[calmly] నమస్కారం అండి, OpsBrain Health నుండి కీర్తి మాట్లాడుతున్నాను. ఎలా సహాయం చేయగలను?",
      },
      {
        speaker: "customer",
        text: "Dr. Patel tho appointment book cheyali andi.",
      },
      {
        speaker: "agent",
        text: "Follow-up నా కొత్త consultation?",
      },
      {
        speaker: "customer",
        text: "Blood pressure check follow-up అండి.",
      },
      {
        speaker: "agent",
        text: "[warmly] మంగళవారం మధ్యాహ్నం మూడు గంటలకు slot ఉంది. మీకు ok నా?",
      },
      {
        speaker: "customer",
        text: "అవును, మంగళవారం మూడు గంటలకు perfect అండి.",
      },
      {
        speaker: "agent",
        text: "[cheerfully] Confirm అయ్యింది! ఒక రోజు ముందు reminder SMS పంపిస్తాము. జాగ్రత్తగా ఉండండి!",
      },
    ],
  },
];
