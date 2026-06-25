# Voice demo audio

Landing page voice demos (`/#voice-demos`) use **3 MP3 files** — English, Hindi, and Telugu.

| File | Persona | Language |
|------|---------|----------|
| `sales-en.mp3` | Sarah | English |
| `sales-hi.mp3` | Priya | Hindi |
| `sales-te.mp3` | Ananya | Telugu |

Scripts: `scripts/voice-demo-dialogues.mjs`  
Site: `src/content/site.ts` → `voiceDemos`

## Regenerate for free (recommended)

Uses **Microsoft Edge neural TTS** — the same “Read aloud” voices in Edge browser.

- **Not** an AI model like ElevenLabs  
- **No** API key or subscription  
- **Requires** `ffmpeg` (`brew install ffmpeg`) and Python `edge-tts`:

```bash
pip3 install -r scripts/requirements-voice.txt
npm run generate:voice-demos:free
```

One file only:

```bash
node scripts/generate-voice-demos-free.mjs --only=sales-te
```

Commit the MP3s to deploy — visitors play static files, no runtime TTS cost.

## Regenerate with ElevenLabs (paid credits)

```bash
npm run generate:voice-demos
```

Needs `ELEVENLABS_API_KEY` in `.env` and ~500 credits per file.
