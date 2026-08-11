# Voice demo audio

Landing demos are **Cartesia Sonic 3.5** plus quiet office ambience.

Industry carousel (`/#industries`): Telugu / English / Hindi filters. Each industry has its own clip (`industry-{slug}-{te|en|hi}.mp3`).

| File | Persona | Language |
|------|---------|----------|
| `sales-en.mp3` | Simi | English |
| `sales-hi.mp3` | Arushi | Hindi |
| `sales-te.mp3` | Sindhu | Telugu |
| `hero-demo.mp3` | Simi | English |
| `industry-*-{te,en,hi}.mp3` | TE: Sindhu / Ramya / Bhavani · EN: Sindhu / Devansh / Simi · HI: Arushi / Aadhya / Sameer | per card |

Generator: `OpsBrain-Backend/scripts/generate_landing_voice_demos.py`

```bash
cd OpsBrain-Backend
source venv/bin/activate
python scripts/generate_landing_voice_demos.py --industry
```

Bump `?v=` in `src/content/site.ts` after regenerating.
