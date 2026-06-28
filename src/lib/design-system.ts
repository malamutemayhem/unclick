/**
 * UnClick Design System
 *
 * Canonical tokens, presets, and helpers. Locked 2026-05-28; canon merged
 * 2026-06-11 (Creative Studio Council ruling): the deck grammar shipped on
 * Hero and BrochurePage IS the system. The presets below encode it, so pages
 * compose instead of hand-rolling. Live tokens are CSS custom properties in
 * src/index.css; the values here are mirrored so TypeScript callers can
 * reason about them.
 *
 * Rules of the system (do not break without an ADR):
 *
 *  1. One accent. Teal. Used sparingly.
 *  2. One halo per page. The soft primary radial. Not stacked.
 *  3. Sentence case headlines. Never Title Case.
 *  4. Short sentences. Plain English. No jargon.
 *  5. One CTA per section. Strip the third button.
 *  6. Motion budget = discreet. One slow-drifting teal aurora on the dark
 *     canvas (16-24s) plus FadeIn on first paint. No marquee, no grain.
 *     (Updated 2026-06-07: subtle, beautiful background movement.)
 *  7. No em dashes anywhere.
 *  8. Headlines are extrabold with tight tracking; the primary CTA carries
 *     the teal glow and lift; panels are glass (white tint + hairline +
 *     blur), never opaque slabs. Compose from presets and the brand
 *     primitives in src/components/brand; raw brand hexes belong only in
 *     this file, src/index.css, and src/components/brand.
 */

/** Raw token values. Mirror src/index.css. */
export const tokens = {
  bg: "hsl(199 76% 10%)",
  fg: "hsl(185 40% 95%)",
  card: "hsl(199 52% 12%)",
  border: "hsl(195 32% 22%)",
  muted: "hsl(199 40% 16%)",
  mutedFg: "hsl(189 24% 68%)",
  bodyFg: "hsl(187 33% 82%)",
  headingFg: "hsl(185 42% 96%)",
  primary: "hsl(182 46% 57%)",
  primaryFg: "hsl(195 80% 7%)",
  destructive: "hsl(4 73% 64%)",
  // Deck accents (hex, for gradients and raw use).
  teal: "#61c1c4",
  tealBright: "#86dadd",
  navy: "#06202c",
} as const;

/** Tailwind class presets so pages compose with a shared vocabulary. */
export const presets = {
  // Page shell. Transparent so the AuroraBackground (fixed, behind content)
  // shows through; the navy base color lives on <body> in src/index.css.
  page: "relative min-h-screen bg-transparent text-foreground antialiased",

  // The single soft halo. Use exactly once per page, positioned above text.
  halo:
    "pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 " +
    "w-[700px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px]",

  // Hero shell
  heroSection: "relative pt-28 pb-20 overflow-hidden px-6",
  heroInner: "relative z-10 mx-auto max-w-4xl text-center",

  // Headlines. The display scale is the homepage hero; product pages
  // (PageShell, BrochurePage) use the product scale. Same grammar both ways.
  h1:
    "text-5xl font-extrabold leading-[1.03] tracking-[-0.025em] " +
    "sm:text-6xl md:text-7xl text-heading",
  h1Product:
    "text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] " +
    "sm:text-5xl md:text-6xl text-heading",
  h2:
    "text-3xl font-bold tracking-tight " +
    "sm:text-4xl text-heading",
  h3:
    "text-lg font-semibold text-heading",

  // Body
  lede: "mt-6 text-lg text-body max-w-2xl mx-auto leading-relaxed",
  body: "text-sm text-body leading-relaxed",

  // The single primary CTA: teal glow, gentle lift on hover.
  ctaPrimary:
    "inline-flex items-center justify-center gap-2 rounded-lg " +
    "bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground " +
    "shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all " +
    "hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]",

  // The optional secondary CTA - glass, quiet. Often the page is stronger without it.
  ctaGhost:
    "inline-flex items-center justify-center gap-2 rounded-lg " +
    "border border-[#86dadd]/15 bg-white/[0.045] px-6 py-3.5 " +
    "text-sm font-medium text-heading backdrop-blur-sm transition-all " +
    "hover:border-primary/40 hover:bg-white/[0.07]",

  // Product / feature tile: glass panel, teal hover (mirrors brand GlassCard).
  tile:
    "group relative block h-full rounded-[18px] border border-[#86dadd]/15 " +
    "bg-white/[0.045] p-6 backdrop-blur-sm transition-all duration-300 " +
    "hover:border-primary/40 hover:bg-white/[0.07] " +
    "hover:shadow-[0_20px_60px_-24px_rgba(97,193,196,0.35)]",
  tileIcon:
    "flex h-11 w-11 items-center justify-center rounded-xl " +
    "border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/[0.06] " +
    "text-primary mb-4",

  // Floating menu surface (nav dropdowns, popovers over content)
  menu:
    "rounded-2xl border border-primary/15 bg-popover/95 p-1.5 " +
    "shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md",

  // Section wrapper
  section: "px-6 py-20",
  sectionInner: "mx-auto max-w-5xl",
  sectionHeader: "text-center max-w-2xl mx-auto",
} as const;

/** Motion presets compatible with framer-motion variants. */
export const motion = {
  fadeUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  stagger: (i: number, base = 0.04) => ({
    transition: { delay: i * base },
  }),
} as const;

/** Voice helpers - shared microcopy. */
export const voice = {
  productLine: "Universal remote for AI",
  // Use these in copy. Never use "Fishbowl" - it is Boardroom now.
  productNames: {
    apps: "Apps",
    memory: "Memory",
    connections: "Connections",
    xpass: "XPass",
    autopilot: "Autopilot",
    boardroom: "Boardroom",
  },
} as const;

export type DesignSystem = {
  tokens: typeof tokens;
  presets: typeof presets;
  motion: typeof motion;
  voice: typeof voice;
};
