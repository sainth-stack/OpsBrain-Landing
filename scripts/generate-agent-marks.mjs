#!/usr/bin/env node
/**
 * Generates OpsBrain AI Agent Mark system:
 * - 9 agents × 2 themes (light/dark) → SVG + PNG @1x (64) + @2x (128)
 * - 3×3 preview grid mockup
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/assets/agent-marks");

/** @typedef {{ id: string; name: string; role: string; from: string; to: string; glyph: string }} AgentDef */

/** @type {AgentDef[]} */
const AGENTS = [
  {
    id: "sales",
    name: "AI Sales Employee",
    role: "Outbound Sales",
    from: "#6366F1",
    to: "#7C3AED",
    glyph: `
      <path d="M17 41 L25 33 L31 37 L37 25" stroke="PRIMARY" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="37" cy="25" r="2.5" fill="SECONDARY"/>
      <rect x="36" y="24" width="13" height="21" rx="3.5" fill="PRIMARY"/>
      <rect x="38.5" y="27" width="8" height="2" rx="1" fill="SECONDARY"/>
      <rect x="38.5" y="31" width="5.5" height="1.5" rx="0.75" fill="SECONDARY" opacity="0.7"/>
    `,
  },
  {
    id: "hr",
    name: "AI HR Recruiter",
    role: "Talent Acquisition",
    from: "#8B5CF6",
    to: "#9333EA",
    glyph: `
      <circle cx="28" cy="26" r="5" fill="PRIMARY"/>
      <path d="M18 42 C18 36 22 33 28 33 C34 33 38 36 38 42" fill="PRIMARY"/>
      <circle cx="42" cy="40" r="7" fill="PRIMARY"/>
      <path d="M39 40 L41.5 42.5 L46 38" stroke="SECONDARY" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `,
  },
  {
    id: "hospital",
    name: "AI Hospital Assistant",
    role: "Healthcare Front Desk",
    from: "#14B8A6",
    to: "#059669",
    glyph: `
      <path d="M32 18 L44 24 V34 C44 40 32 44 32 44 C32 44 20 40 20 34 V24 Z" fill="PRIMARY"/>
      <rect x="29" y="27" width="6" height="12" rx="1" fill="SECONDARY"/>
      <rect x="26" y="30" width="12" height="6" rx="1" fill="SECONDARY"/>
    `,
  },
  {
    id: "payment",
    name: "AI Payment Reminder Agent",
    role: "Collections & Billing",
    from: "#F59E0B",
    to: "#EA580C",
    glyph: `
      <path d="M34 20 C34 17 42 17 42 20 V24 C42 27 34 27 34 24 Z" fill="PRIMARY"/>
      <path d="M38 27 V30" stroke="PRIMARY" stroke-width="2" stroke-linecap="round"/>
      <path d="M26 32 C26 28 30 26 34 26 C38 26 42 28 42 32 C42 36 38 38 34 38 C30 38 26 36 26 32 Z" fill="PRIMARY"/>
      <path d="M31.5 32 H36.5 M34 29.5 V34.5" stroke="SECONDARY" stroke-width="2" stroke-linecap="round"/>
    `,
  },
  {
    id: "support",
    name: "AI Customer Support Agent",
    role: "24/7 Support",
    from: "#06B6D4",
    to: "#2563EB",
    glyph: `
      <path d="M22 28 C22 22 42 22 42 28" stroke="PRIMARY" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <rect x="18" y="28" width="6" height="10" rx="3" fill="PRIMARY"/>
      <rect x="40" y="28" width="6" height="10" rx="3" fill="PRIMARY"/>
      <rect x="24" y="34" width="16" height="11" rx="4" fill="PRIMARY"/>
      <circle cx="28" cy="39.5" r="1.25" fill="SECONDARY"/>
      <circle cx="32" cy="39.5" r="1.25" fill="SECONDARY"/>
      <circle cx="36" cy="39.5" r="1.25" fill="SECONDARY"/>
    `,
  },
  {
    id: "school",
    name: "AI School Admission Counselor",
    role: "EdTech Admissions",
    from: "#3B82F6",
    to: "#4F46E5",
    glyph: `
      <polygon points="32,18 46,26 32,34 18,26" fill="PRIMARY"/>
      <rect x="28" y="34" width="8" height="3" fill="PRIMARY"/>
      <rect x="22" y="40" width="3" height="8" rx="1" fill="PRIMARY"/>
      <rect x="27" y="36" width="3" height="12" rx="1" fill="PRIMARY"/>
      <rect x="32" y="38" width="3" height="10" rx="1" fill="PRIMARY"/>
      <rect x="37" y="34" width="3" height="14" rx="1" fill="PRIMARY"/>
    `,
  },
  {
    id: "restaurant",
    name: "AI Restaurant Receptionist",
    role: "Hospitality",
    from: "#F43F5E",
    to: "#EC4899",
    glyph: `
      <path d="M32 20 C32 20 24 24 24 32 C24 36 27.5 38 32 38 C36.5 38 40 36 40 32 C40 24 32 20 32 20 Z" fill="PRIMARY"/>
      <line x1="32" y1="16" x2="32" y2="20" stroke="PRIMARY" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="32" cy="44" rx="12" ry="3.5" fill="PRIMARY"/>
      <ellipse cx="32" cy="42.5" rx="9" ry="2" fill="SECONDARY" opacity="0.35"/>
    `,
  },
  {
    id: "realestate",
    name: "AI Real Estate Assistant",
    role: "Property Sales",
    from: "#10B981",
    to: "#14B8A6",
    glyph: `
      <path d="M32 20 L44 30 V42 H20 V30 Z" fill="PRIMARY"/>
      <rect x="28" y="34" width="8" height="8" fill="SECONDARY" opacity="0.35"/>
      <path d="M32 16 C32 16 28 20 28 24 C28 27 32 29 32 29 C32 29 36 27 36 24 C36 20 32 16 32 16 Z" fill="PRIMARY"/>
      <circle cx="32" cy="23" r="2.5" fill="SECONDARY"/>
    `,
  },
  {
    id: "insurance",
    name: "AI Insurance Renewal Agent",
    role: "Insurance Ops",
    from: "#0EA5E9",
    to: "#06B6D4",
    glyph: `
      <path d="M32 18 L44 24 V32 C44 38 32 42 32 42 C32 42 20 38 20 32 V24 Z" fill="PRIMARY"/>
      <rect x="26" y="28" width="12" height="14" rx="2" fill="SECONDARY" opacity="0.25"/>
      <rect x="26" y="28" width="12" height="14" rx="2" stroke="SECONDARY" stroke-width="1.5" fill="none"/>
      <path d="M29 34 L31.5 36.5 L36 32" stroke="SECONDARY" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `,
  },
];

const BRAND = {
  primary: "#4F46E5",
  accent: "#10B981",
};

const THEMES = {
  light: {
    bgBase: "#FFFFFF",
    bgFromOpacity: 0.14,
    bgToOpacity: 0.08,
    borderOpacity: 0.12,
    glyphPrimary: (from) => from,
    glyphSecondary: () => "#FFFFFF",
    circuitOpacity: 0.14,
  },
  dark: {
    bgBase: "#0F172A",
    bgFromOpacity: 0.32,
    bgToOpacity: 0.18,
    borderOpacity: 0.22,
    glyphPrimary: (from, to) => to,
    glyphSecondary: () => "#FFFFFF",
    circuitOpacity: 0.2,
  },
};

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function circuitMotif(primary, opacity) {
  return `
    <g opacity="${opacity}" aria-hidden="true">
      <circle cx="50" cy="50" r="1.5" fill="${primary}"/>
      <circle cx="56" cy="46" r="1.5" fill="${primary}"/>
      <circle cx="54" cy="54" r="1" fill="${BRAND.accent}"/>
      <line x1="50" y1="50" x2="56" y2="46" stroke="${primary}" stroke-width="0.75"/>
      <line x1="56" y1="46" x2="54" y2="54" stroke="${primary}" stroke-width="0.75"/>
    </g>
  `;
}

function svgInnerContent(agent, themeName, idSuffix = "") {
  const theme = THEMES[themeName];
  const primary = theme.glyphPrimary(agent.from, agent.to);
  const secondary = theme.glyphSecondary();
  const glyph = agent.glyph
    .replace(/PRIMARY/g, primary)
    .replace(/SECONDARY/g, secondary);

  return `
    <defs>
      <linearGradient id="bg-${agent.id}-${themeName}${idSuffix}" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="${rgba(agent.from, theme.bgFromOpacity)}"/>
        <stop offset="100%" stop-color="${rgba(agent.to, theme.bgToOpacity)}"/>
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="${theme.bgBase}"/>
    <rect width="64" height="64" rx="12" fill="url(#bg-${agent.id}-${themeName}${idSuffix})"/>
    <rect x="0.5" y="0.5" width="63" height="63" rx="11.5" stroke="${rgba(agent.from, theme.borderOpacity)}" fill="none"/>
    ${circuitMotif(primary, theme.circuitOpacity)}
    <g>${glyph}</g>
  `;
}

function buildSvg(agent, themeName) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${agent.name} mark">
  ${svgInnerContent(agent, themeName)}
</svg>`;
}

function renderPng(svg, size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
  });
  return resvg.render().asPng();
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeSvgAndPng(agent, themeName) {
  const dir = join(OUT, agent.id);
  ensureDir(dir);
  const svg = buildSvg(agent, themeName);
  const base = `${agent.id}-${themeName}`;
  writeFileSync(join(dir, `${base}.svg`), svg, "utf8");

  for (const [suffix, size] of [
    ["", 64],
    ["@2x", 128],
  ]) {
    const png = renderPng(svg, size);
    writeFileSync(join(dir, `${base}${suffix}.png`), png);
  }
}


function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPreviewGrid() {
  const cell = 96;
  const gap = 24;
  const pad = 48;
  const gridTop = 72;
  const cols = 3;
  const rows = 3;
  const width = pad * 2 + cols * cell + (cols - 1) * gap;
  const height = gridTop + pad + rows * cell + (rows - 1) * gap + 56;
  const scale = cell / 64;

  let cells = "";
  AGENTS.forEach((agent, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = pad + col * (cell + gap);
    const y = gridTop + row * (cell + gap);
    cells += `<g transform="translate(${x}, ${y}) scale(${scale})">${svgInnerContent(agent, "light", `-preview-${i}`)}</g>\n`;
    cells += `<text x="${x + cell / 2}" y="${y + cell + 20}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="#1E293B">${escapeXml(agent.name.replace("AI ", ""))}</text>\n`;
    cells += `<text x="${x + cell / 2}" y="${y + cell + 34}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="9" fill="#64748B">${escapeXml(agent.role)}</text>\n`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#FFFFFF"/>
  <text x="${width / 2}" y="32" text-anchor="middle" font-family="Plus Jakarta Sans, Inter, system-ui, sans-serif" font-size="18" font-weight="700" fill="#0F172A">OpsBrain AI Agent Mark System</text>
  <text x="${width / 2}" y="52" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#64748B">Light mode, 3x3 grid, 64px marks scaled to 96px for preview</text>
  ${cells}
</svg>`;
}

function main() {
  ensureDir(OUT);
  ensureDir(join(OUT, "preview"));

  for (const agent of AGENTS) {
    for (const theme of ["light", "dark"]) {
      writeSvgAndPng(agent, theme);
      console.log(`✓ ${agent.id}-${theme}`);
    }
  }

  const previewSvg = buildPreviewGrid();
  writeFileSync(join(OUT, "preview", "grid-preview.svg"), previewSvg, "utf8");
  const previewPng = renderPng(previewSvg, widthFromSvg(previewSvg));
  writeFileSync(join(OUT, "preview", "grid-preview.png"), previewPng);
  const previewPng2x = renderPng(previewSvg, widthFromSvg(previewSvg) * 2);
  writeFileSync(join(OUT, "preview", "grid-preview@2x.png"), previewPng2x);
  console.log("✓ preview/grid-preview");

  writeManifest();
  console.log("\nDone. Assets in src/assets/agent-marks/");
}

function widthFromSvg(svg) {
  const m = svg.match(/width="(\d+)"/);
  return m ? Number(m[1]) : 960;
}

function writeManifest() {
  const manifest = {
    version: "1.0.0",
    brand: BRAND,
    template: {
      size: 64,
      radius: 12,
      safeZone: 40,
      padding: 12,
    },
    agents: AGENTS.map(({ id, name, role, from, to }) => ({
      id,
      name,
      role,
      gradient: { from, to },
      files: {
        light: {
          svg: `agent-marks/${id}/${id}-light.svg`,
          png: `agent-marks/${id}/${id}-light.png`,
          png2x: `agent-marks/${id}/${id}-light@2x.png`,
        },
        dark: {
          svg: `agent-marks/${id}/${id}-dark.svg`,
          png: `agent-marks/${id}/${id}-dark.png`,
          png2x: `agent-marks/${id}/${id}-dark@2x.png`,
        },
      },
    })),
  };
  writeFileSync(join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
}

main();
