# OpsBrain AI Landing Page

Production marketing site for OpsBrain AI — autonomous AI employees for lead calling, support, and CRM sync.

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
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Set to `true` in production to enable analytics stubs |

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Deploy

Deploy to [Vercel](https://vercel.com):

1. Connect this repository
2. Set `LEAD_WEBHOOK_URL` in project environment variables
3. Deploy — Next.js App Router with zero config

## Lead Form

Submissions POST to `/api/leads`, log server-side, and optionally forward to `LEAD_WEBHOOK_URL`.
