import { motion, useReducedMotion } from "framer-motion";
import { MousePointerClick, Zap } from "lucide-react";

/**
 * CompareStrip: the old way vs the UnClick way, staged as two
 * terminal panes. Claims (latency, token counts) match the live
 * homepage's Problem section exactly; only the staging changed.
 */

const OLD_STEPS = [
  "Open browser",
  "Navigate to page",
  "Fill form fields",
  "Click submit",
  "Wait for redirect",
  "Parse response",
];

function PaneHeader({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof Zap;
  label: string;
  tone: "old" | "new";
}) {
  return (
    <div
      className={`flex items-center gap-2 border-b px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] ${
        tone === "old"
          ? "border-destructive/15 text-destructive/70"
          : "border-primary/20 text-primary"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}

export default function CompareStrip() {
  const reduced = useReducedMotion() ?? false;
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <div className="relative grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
      <motion.div
        {...enter(0)}
        className="overflow-hidden rounded-xl border border-destructive/20 bg-destructive/[0.03]"
      >
        <PaneHeader icon={MousePointerClick} label="the old way · clicking" tone="old" />
        <div className="space-y-2 p-4 font-mono text-xs text-muted-foreground">
          {OLD_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2.5 line-through opacity-60">
              <span className="w-4 shrink-0 text-right tabular-nums text-destructive/50">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
          <div className="border-t border-destructive/15 pt-3 text-destructive/60">
            Six fragile steps to parse
          </div>
        </div>
      </motion.div>

      <div className="hidden items-center md:flex" aria-hidden="true">
        <span className="rounded-full border border-border/60 bg-card/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          vs
        </span>
      </div>

      <motion.div
        {...enter(0.12)}
        className="overflow-hidden rounded-xl border border-primary/25 bg-primary/[0.04]"
      >
        <PaneHeader icon={Zap} label="the unclick way · calling" tone="new" />
        <div className="flex h-[calc(100%-2.6rem)] flex-col justify-between p-4 font-mono text-xs">
          <div className="space-y-2">
            <div className="text-heading">POST /v1/schedule/events</div>
            <div className="text-primary">→ 201 Created</div>
          </div>
          <div className="border-t border-primary/15 pt-3 text-primary/60">
            One call, one answer
          </div>
        </div>
      </motion.div>
    </div>
  );
}
