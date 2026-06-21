# OpsBrain AI Landing Page

Production marketing site for OpsBrain AI — autonomous AI employees for lead calling, support, and CRM sync. Built with Next.js App Router; all marketing pages are server-rendered for SEO.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `LEAD_WEBHOOK_URL` | Optional webhook URL for lead form submissions (Slack, Zapier, etc.) |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Set to `true` in production to enable analytics |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional PostHog project API key |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML verification token |

When analytics is enabled, the site tracks:

- `lead_submit` — contact / lead form submission
- `demo_click` — Book Demo CTA clicks
- `voice_demo_play` — voice demo audio playback
- `roi_calculate` — ROI calculator interactions

## SEO Architecture

```
src/content/
  site.ts           # Core marketing copy, nav, footer
  seo-pages.ts      # Industry, solution, pricing, platform metadata
  competitors.ts    # Compare hub + 12 alternative pages
  blog/posts.ts     # Blog articles (server-rendered)

src/lib/seo.ts      # buildPageMetadata, JSON-LD helpers
src/app/sitemap.ts  # All indexable routes
src/app/robots.ts   # Allows /, disallows /api/
```

**Phases**

- **Phase 0** — SSR crawlability, root metadata, structured data, analytics wiring
- **Phase 1** — Industry (`/ai-employees/*`), solutions, pricing, integrations, platform
- **Phase 2** — Compare hub + competitor alternative pages
- **Phase 3** — Blog, compliance guide, sitemap expansion, GSC verification

**Hreflang:** English-only pages today (`lang="en"`). Dedicated Hindi/Telugu landing pages are deferred — see TODO in `src/app/layout.tsx`.

## Indexable URLs & Target Keywords

| URL | Target keywords |
|-----|-----------------|
| `/` | AI employees, AI voice agents, lead calling automation |
| `/platform` | AI workforce platform, revenue operations AI |
| `/pricing` | OpsBrain pricing, AI employee pilot |
| `/integrations` | OpsBrain Salesforce integration, CRM voice AI |
| `/ai-employees` | AI employees by industry |
| `/ai-employees/sales` | AI sales employee, AI SDR outbound |
| `/ai-employees/hr` | AI HR recruiter, screening automation |
| `/ai-employees/hospital` | AI hospital front desk, patient calling |
| `/ai-employees/payment` | AI payment reminder, collections calls |
| `/ai-employees/support` | AI customer support agent, tier 1 AI |
| `/ai-employees/school` | AI admissions counselor, EdTech enrollment |
| `/ai-employees/restaurant` | AI restaurant receptionist, reservations |
| `/ai-employees/realestate` | AI real estate assistant, listing leads |
| `/ai-employees/insurance` | AI insurance renewal agent |
| `/solutions/lead-calling` | instant AI lead calling, speed to lead |
| `/solutions/inbound-support` | 24/7 AI inbound support |
| `/solutions/bulk-campaigns` | bulk AI outbound campaigns |
| `/compare` | AI voice agent comparison, AI SDR tools comparison |
| `/compare/bland-ai-alternative` | Bland AI alternative |
| `/compare/vapi-alternative` | Vapi alternative |
| `/compare/retell-alternative` | Retell AI alternative |
| `/compare/synthflow-alternative` | Synthflow alternative |
| `/compare/air-ai-alternative` | Air AI alternative |
| `/compare/11x-alternative` | 11x alternative |
| `/compare/artisan-alternative` | Artisan alternative |
| `/compare/regie-alternative` | Regie.ai alternative |
| `/compare/apollo-ai-alternative` | Apollo AI alternative |
| `/compare/intercom-fin-alternative` | Intercom Fin alternative |
| `/compare/best-ai-voice-agent` | best AI voice agent comparison |
| `/compare/ai-sdr-tools-comparison` | AI SDR tools comparison |
| `/blog` | AI voice calling guides, SDR automation |
| `/blog/respond-to-leads-in-60-seconds-ai-voice` | speed to lead AI voice |
| `/blog/telugu-hindi-ai-voice-agents-deployment-guide` | Telugu Hindi AI voice agents |
| `/blog/ai-sdr-vs-human-sdr-cost-conversion` | AI SDR vs human SDR |
| `/guides/tcpa-gdpr-ai-calling` | TCPA GDPR AI calling compliance |
| `/privacy` | OpsBrain privacy policy |
| `/terms` | OpsBrain terms of service |

**Total indexable URLs:** 37 (verify via `/sitemap.xml` after build).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Deploy

Deploy to [Vercel](https://vercel.com):

1. Connect this repository
2. Set env vars (`LEAD_WEBHOOK_URL`, analytics, `NEXT_PUBLIC_GSC_VERIFICATION`)
3. Deploy — Next.js App Router with zero config
4. Submit `https://opsbrainai.com/sitemap.xml` in Google Search Console

## Lead Form

Submissions POST to `/api/leads`, log server-side, and optionally forward to `LEAD_WEBHOOK_URL`.

## Launch Checklist

- [x] Marketing pages SSR with content in HTML (no `ssr: false` on key sections)
- [x] Per-page canonical via `buildPageMetadata` (no root layout canonical override)
- [x] FAQ JSON-LD matches visible FAQ on pages that include it
- [x] OG images: default `/og-image.jpg`; compare pages share same stable asset
- [x] `robots.txt` + `sitemap.xml` generated at build time
- [x] Analytics events wired (`lead_submit`, `demo_click`, `voice_demo_play`, `roi_calculate`)
- [x] Custom `not-found.tsx` with helpful links
- [ ] Submit sitemap in GSC after setting `NEXT_PUBLIC_GSC_VERIFICATION`
- [ ] Run Lighthouse on `/` after deploy
