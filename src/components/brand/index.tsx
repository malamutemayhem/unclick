/**
 * UnClick brand primitives (deck-aligned, 2026-06-07).
 *
 * Small, reusable building blocks that port the investor-deck visual
 * language into the site: the navy aurora canvas, teal "eyebrow" labels,
 * gradient accent text, teal pills, glass cards, and icon chips.
 *
 * Style rules: one teal accent, used sparingly. No em dashes. Motion stays
 * discreet (the aurora drift lives in src/index.css and respects
 * prefers-reduced-motion).
 */
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fixed, full-viewport ambient background: navy gradient + two slow-drifting
 * teal glows + a faint masked grid. Render once near the top of a page. The
 * page shell must be transparent so this shows through (see presets.page).
 */
export const AuroraBackground = () => (
  <>
    <div className="aurora-field" aria-hidden="true" />
    <div className="aurora-grid" aria-hidden="true" />
  </>
);

/**
 * Renders the AuroraBackground site-wide, including /admin, so the navy
 * canvas and grid carry through every surface.
 */
export const SiteAurora = () => <AuroraBackground />;

/** UPPERCASE, wide-tracked teal label with a short leading tick. */
export const Eyebrow = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-primary",
      className,
    )}
  >
    <span aria-hidden="true" className="h-px w-6 rounded bg-primary/70" />
    {children}
  </span>
);

/** Left-to-right teal gradient text. Wrap accent words only. */
export const GradientText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "bg-gradient-to-r from-[#61c1c4] via-[#86dadd] to-[#bdeff0] bg-clip-text text-transparent",
      className,
    )}
  >
    {children}
  </span>
);

/** Rounded-full teal-tint badge. */
export const Pill = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/[0.12] px-4 py-1.5 text-sm font-semibold text-primary",
      className,
    )}
  >
    {children}
  </span>
);

/** Translucent glass panel for the dark canvas (hairline teal border + blur). */
export const GlassCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-[18px] border border-[#86dadd]/15 bg-white/[0.045] p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm",
      className,
    )}
  >
    {children}
  </div>
);

/** Rounded-square teal-tint chip for an icon. */
export const IconChip = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/[0.06] text-primary",
      className,
    )}
  >
    {children}
  </div>
);
