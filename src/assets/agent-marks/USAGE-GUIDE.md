# OpsBrain AI Agent Mark — Usage Guide

---

## Sizing

| Context | Size | Asset |
|---------|------|-------|
| Card grid (landing) | 64 px | `@1x` PNG or inline SVG |
| Modal / detail view | 72–80 px | SVG (scales cleanly) |
| Compact list / table | 32 px | SVG preferred; `@1x` PNG acceptable |
| Retina displays | 64 px CSS → `@2x` PNG | `srcSet` with 128 px asset |
| Favicon / micro | Not recommended below 24 px | Use OpsBrain brain mark instead |

### React (landing site)

```tsx
import { AgentMark } from "@/components/visuals/AgentMark";

<AgentMark type="sales" theme="light" size={64} />
<AgentMark type="hospital" theme="dark" size={48} />
```

### Static PNG with retina

```tsx
import salesLight from "@/assets/agent-marks/sales/sales-light.png";
import salesLight2x from "@/assets/agent-marks/sales/sales-light@2x.png";

<img
  src={salesLight.src}
  srcSet={`${salesLight.src} 1x, ${salesLight2x.src} 2x`}
  width={64}
  height={64}
  alt="AI Sales Employee"
/>
```

---

## Spacing

- **Minimum clear space:** 8 px on all sides (½ mark width at 64 px display)
- **Card layout:** 12–16 px between mark and title text
- **Grid gap:** 24 px minimum between marks in a 3×3 layout
- **Alignment:** Center mark vertically with first line of label text

```
        ← 8px →
    ┌─────────┐
    │  mark   │  ← 12px →  AI Sales Employee
    └─────────┘              Outbound Sales
```

---

## Theme Selection

| Surface | Theme |
|---------|-------|
| White / light gray backgrounds | **Light** |
| Dark navy / slate backgrounds | **Dark** |
| Mixed (e.g. gradient cards) | Light mark on dark cards; dark mark on light cards |
| `#0F172A` hero sections | **Dark** |

Do not invert or recolor marks manually. Use the provided light/dark variants.

---

## Do's

- Use SVG when possible for crisp scaling
- Pair each mark with its official agent name and role
- Maintain the 12 px corner radius container — do not crop to circle
- Use `@2x` PNG on retina when SVG is unavailable (email, PDF)
- Keep the circuit motif intact — it ties marks to OpsBrain brand
- Use marks at consistent sizes within a single UI section

---

## Don'ts

- **No faces, characters, or emoji** — these are product marks, not avatars
- **No gradient fills inside glyphs** — flat 2-color geometry only
- **No drop shadows, glows, or 3D effects** on the mark itself
- **No rotation** beyond 0° — marks are orientation-locked
- **No recoloring** outside the defined light/dark palettes
- **No stretching** — always scale proportionally (1:1 aspect ratio)
- **No combining marks** into a composite icon
- **No placing marks on busy photographic backgrounds** without a solid container
- **Don't use below 32 px** — legibility degrades; use text label instead

---

## Accessibility

- Marks are decorative when paired with visible agent name text → `aria-hidden="true"`
- Standalone use (no adjacent label) → provide `aria-label="{Agent Name} mark"`
- Minimum contrast: glyph primary against background meets WCAG AA at 64 px

---

## Preview

See `preview/grid-preview.svg` (and `.png`) for the full 3×3 light-mode grid on white.

---

## Related Assets

- **OpsBrain brain mark** — company logo (`src/assets/brand/mark.png`); use for navbar, favicon, OG
- **Agent marks** — product icons for individual AI employee personas only
