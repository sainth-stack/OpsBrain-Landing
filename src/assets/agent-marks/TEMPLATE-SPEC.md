# OpsBrain AI Agent Mark — Master Template Spec

Version 1.0 · Unified geometric mark system for 9 industry-specific AI agents.

---

## Brand Foundation

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#4F46E5` | Brand anchor, circuit motif accent |
| Accent | `#10B981` | Secondary circuit node (subtle only) |
| Typography | Inter + Plus Jakarta Sans | Labels adjacent to marks |
| Style reference | Linear, Stripe, Intercom Fin | Geometric product marks — not mascots |

---

## Container

| Property | Value |
|----------|-------|
| Canvas | **64 × 64 px** |
| Corner radius | **12 px** |
| Safe zone (glyph) | **40 × 40 px** centered (12 px inset) |
| Min display size | **32 px** (half-scale) |
| Primary format | **SVG** |
| Raster exports | **64 px (@1x)** and **128 px (@2x)** PNG |

```
┌────────────────────────────── 64px ──────────────────────────────┐
│ 12px radius                                          circuit motif │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │                                                                │ │
│ │              ┌──── 40px safe zone ────┐                        │ │
│ │              │    geometric glyph     │                        │ │
│ │              └────────────────────────┘                        │ │
│ │                                                                │ │
│ └────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

---

## Color Rules

### Per-agent gradient (container only)

Gradients apply to the **background fill only** — never inside glyphs.

| Agent | Gradient |
|-------|----------|
| Sales | `#6366F1` → `#7C3AED` (indigo → violet) |
| HR | `#8B5CF6` → `#9333EA` (violet → purple) |
| Hospital | `#14B8A6` → `#059669` (teal → emerald) |
| Payment | `#F59E0B` → `#EA580C` (amber → orange) |
| Support | `#06B6D4` → `#2563EB` (cyan → blue) |
| School | `#3B82F6` → `#4F46E5` (blue → indigo) |
| Restaurant | `#F43F5E` → `#EC4899` (rose → pink) |
| Real Estate | `#10B981` → `#14B8A6` (emerald → teal) |
| Insurance | `#0EA5E9` → `#06B6D4` (sky → cyan) |

### Glyph colors (max 2)

| Role | Light mode | Dark mode |
|------|------------|-----------|
| Primary | Agent gradient start color | Agent gradient end color (lighter) |
| Secondary | `#FFFFFF` | `#FFFFFF` |

No gradients, shadows, or third colors inside glyphs.

### Background treatment

**Light mode**
- Base: `#FFFFFF`
- Gradient overlay: agent colors at 14% → 8% opacity
- Border: 1 px, agent start color at 12% opacity

**Dark mode**
- Base: `#0F172A`
- Gradient overlay: agent colors at 32% → 18% opacity
- Border: 1 px, agent start color at 22% opacity

---

## Brain / Circuit Motif

Optional brand tie-in — bottom-right corner only:

- 2–3 geometric nodes (circles, 1–1.5 px radius)
- 1–2 connecting lines (0.75 px stroke)
- One node may use brand accent `#10B981`
- Opacity: 14% (light) / 20% (dark)
- Must not compete with the primary glyph at 32 px

---

## Glyph Concepts

| Agent | Geometry |
|-------|----------|
| Sales | Upward trend line + phone handset |
| HR | Person silhouette + check badge |
| Hospital | Medical cross in shield |
| Payment | Bell + currency symbol |
| Support | Headset + chat bubble |
| School | Graduation cap + speech wave bars |
| Restaurant | Cloche dome + plate ring |
| Real Estate | House + location pin |
| Insurance | Shield + document check |

---

## File Naming

```
agent-marks/
  {agent-id}/
    {agent-id}-light.svg
    {agent-id}-light.png       ← 64×64
    {agent-id}-light@2x.png    ← 128×128
    {agent-id}-dark.svg
    {agent-id}-dark.png
    {agent-id}-dark@2x.png
  preview/
    grid-preview.svg
    grid-preview.png
    grid-preview@2x.png
  manifest.json
```

Agent IDs: `sales`, `hr`, `hospital`, `payment`, `support`, `school`, `restaurant`, `realestate`, `insurance`

---

## Regeneration

```bash
node scripts/generate-agent-marks.mjs
```
