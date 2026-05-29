/**
 * UnClick Design System
 *
 * Canonical tokens, presets, and helpers for the Apple-inspired polish pass.
 * Locked 2026-05-28. Live tokens are CSS custom properties in src/index.css;
 * the values here are mirrored so TypeScript callers can reason about them.
 *
 * Rules of the system (do not break without an ADR):
 *
 *  1. One accent. Teal. Used sparingly.
 *  2. One halo per page. The soft primary radial. Not stacked.
 *  3. Sentence case headlines. Never Title Case.
 *  4. Short sentences. Plain English. No jargon.
 *  5. One CTA per section. Strip the third button.
 *  6. Motion budget = FadeIn on first paint. No aurora, no marquee, no grain.
 *  7. No em dashes anywhere.
 */

/** Raw token values. Mirror src/index.css. */
export const tokens = {
  bg: "hsl(0 0% 4%)",
  fg: "hsl(0 0% 91%)",
  card: "hsl(0 0% 7%)",
  border: "hsl(0 0% 15%)",
  muted: "hsl(0 0% 10%)",
  mutedFg: "hsl(0 0% 55%)",
  bodyFg: "hsl(0 0% 72%)",
  headingFg: "hsl(0 0% 91%)",
  primary: "hsl(182 46% 57%)",
  primaryFg: "hsl(0 0% 4%)",
  destructive: "hsl(0 84% 60%)",
} as const;

/** Tailwind class presets so pages compose with a shared vocabulary. */
export const presets = {
  // Page shell
  page: "relative min-h-screen bg-background text-foreground antialiased",

  // The single soft halo. Use exactly once per page, positioned above text.
  halo:
    "pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 " +
    "w-[700px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px]",

  // Hero shell
  heroSection: "relative pt-28 pb-20 overflow-hidden px-6",
  heroInner: "relative z-10 mx-auto max-w-4xl text-center",

  // Eyebrow pill
  eyebrow:
    "mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 " +
    "bg-primary/[0.07] px-4 py-1.5 backdrop-blur-sm",
  eyebrowText: "font-mono text-xs font-medium tracking-wide text-primary",

  // Headlines
  h1:
    "text-5xl font-semibold leading-[1.05] tracking-tight " +
    "sm:text-6xl md:text-7xl text-heading",
  h2:
    "text-3xl font-semibold tracking-tight " +
    "sm:text-4xl text-heading",
  h3:
    "text-lg font-semibold text-heading",

  // Body
  lede: "mt-6 text-lg text-body max-w-2xl mx-auto leading-relaxed",
  body: "text-sm text-body leading-relaxed",

  // The single primary CTA
  ctaPrimary:
    "inline-flex items-center justify-center gap-2 rounded-lg " +
    "bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground " +
    "transition-opacity hover:opacity-90",

  // The optional secondary CTA - use sparingly. Often the page is stronger without it.
  ctaGhost:
    "inline-flex items-center gap-1.5 rounded-lg border border-border/60 " +
    "bg-card/40 px-6 py-3 text-sm font-medium text-heading " +
    "backdrop-blur-sm transition-colors hover:bg-card/70",

  // Product / feature tile (monochrome accent only)
  tile:
    "group relative block h-full rounded-xl border border-border/60 " +
    "bg-card/60 p-6 backdrop-blur-sm transition-all " +
    "hover:border-primary/40 hover:bg-card/80 hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.25)]",
  tileIcon:
    "flex h-10 w-10 items-center justify-center rounded-lg " +
    "bg-primary/10 text-primary mb-4",

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
