import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  BadgeCheck,
  Brain,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AppRail from "@/components/home-preview/AppRail";

/**
 * RunRail: the page IS one run. A single ask enters at the hero and
 * scrolling carries it down a teal rail through five stations:
 * memory, gate, apps, receipt, autopilot. The collective system is
 * the story; each station gets one short line and a small vignette.
 *
 * Mechanics: the rail's progress line is scaleY-driven by scroll
 * (transform only, springed). A sticky "packet" chip rides beside
 * the rail on desktop and collects a dot per station passed. Under
 * prefers-reduced-motion everything renders complete and still.
 */

/* Rail x-position: left edge on small screens, centered from lg up. */
const RAIL_X = "left-5 lg:left-1/2 lg:-translate-x-1/2";

/* Every AI gets a seat: the deck's round-table idea as simple chips. */
const SEATS = ["ChatGPT", "Claude", "Copilot", "Cursor", "your local model"];

function AnyAIVignette() {
  return (
    <div className="flex flex-wrap gap-2 lg:justify-end">
      {SEATS.map((seat, i) => (
        <motion.span
          key={seat}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, delay: 0.12 + i * 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-[#06202c]/70 py-1.5 pl-2 pr-3.5 text-[12.5px] text-body"
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.1] font-mono text-[9px] font-bold text-primary"
            aria-hidden="true"
          >
            {seat[0].toUpperCase()}
          </span>
          {seat}
        </motion.span>
      ))}
    </div>
  );
}

function MemoryVignette() {
  const facts = ["how you like things done", "what you said last time"];
  return (
    <div className="space-y-2">
      {facts.map((fact, i) => (
        <motion.div
          key={fact}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.2 }}
          className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2 font-mono text-[12px]"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/70" />
          <span className="text-primary/80">remembers ›</span>
          <span className="truncate text-body">{fact}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* The deck's gate panels, including the honest red one: a blocked
   attempt is the feature working. */
const GATES = [
  { name: "commands", ok: true },
  { name: "data", ok: true },
  { name: "publish", ok: true },
  { name: "secrets", ok: false },
] as const;

function GateVignette() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {GATES.map((gate, i) => (
          <motion.div
            key={gate.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: 0.12 + i * 0.14 }}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 text-center",
              gate.ok
                ? "border-primary/25 bg-primary/[0.05]"
                : "border-red-400/40 bg-red-400/[0.07]",
            )}
          >
            {gate.ok ? (
              <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
              <ShieldCheck className="h-3.5 w-3.5 text-red-300" />
            )}
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.12em]",
                gate.ok ? "text-body/80" : "text-red-200/90",
              )}
            >
              {gate.name}
            </span>
            <span
              className={cn(
                "rounded-full px-1.5 py-px font-mono text-[8.5px] font-bold uppercase tracking-[0.1em]",
                gate.ok ? "bg-primary/15 text-primary" : "bg-red-400/20 text-red-200",
              )}
            >
              {gate.ok ? "ok" : "blocked"}
            </span>
          </motion.div>
        ))}
      </div>
      <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60 lg:text-left">
        only what you've allowed
      </p>
    </div>
  );
}

const CALLS = [
  { app: "Gmail", action: "your email" },
  { app: "Xero", action: "your books" },
  { app: "Slack", action: "your messages" },
];

function AppsVignette() {
  return (
    <div className="space-y-1.5">
      {CALLS.map((call, i) => (
        <motion.div
          key={call.app}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: 0.15 + i * 0.18 }}
          className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2 text-[13px]"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/[0.08] font-mono text-[10px] font-bold text-primary"
            aria-hidden="true"
          >
            {call.app[0]}
          </span>
          <span className="shrink-0 font-semibold text-heading">{call.app}</span>
          <span className="truncate text-body/80">{call.action}</span>
          <Check className="ml-auto h-3.5 w-3.5 shrink-0 text-primary" />
        </motion.div>
      ))}
    </div>
  );
}

/* The deck's five plain checks, then the stamp. */
const CHECKS = ["works", "reads well", "safe", "honest", "looks right"];

function ProofVignette({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative rounded-lg border border-primary/30 bg-primary/[0.06] p-3.5 pr-24">
      <div className="flex flex-wrap gap-1.5">
        {CHECKS.map((check, i) => (
          <motion.span
            key={check}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.25, delay: 0.12 + i * 0.14 }}
            className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-[#06202c]/70 px-2 py-0.5 font-mono text-[10.5px] text-body"
          >
            <Check className="h-2.5 w-2.5 text-primary" />
            {check}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={reduced ? false : { scale: 1.9, opacity: 0, rotate: 4 }}
        whileInView={{ scale: 1, opacity: 1, rotate: -6 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.95 }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded border-2 border-primary/80 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary"
      >
        <span className="inline-flex items-center gap-1">
          <BadgeCheck className="h-3 w-3" />
          pass
        </span>
      </motion.div>
    </div>
  );
}

const ROLES = ["researcher", "designer", "copywriter", "devil's advocate"];

const JOBS = [
  { name: "finished while you slept", state: "done" },
  { name: "running right now", state: "running" },
  { name: "queued for later", state: "queued" },
] as const;

function TeamVignette() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {ROLES.map((role, i) => (
          <motion.span
            key={role}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.1 }}
            className="rounded border border-primary/20 bg-primary/[0.07] px-2 py-0.5 font-mono text-[10.5px] text-primary/90"
          >
            {role}
          </motion.span>
        ))}
      </div>
      <div className="space-y-1.5">
        {JOBS.map((job, i) => (
          <motion.div
            key={job.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: 0.45 + i * 0.15 }}
            className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2 font-mono text-[12px]"
          >
            <span className="truncate text-body">{job.name}</span>
            <span
              className={cn(
                "ml-3 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                job.state === "done" && "bg-primary/15 text-primary",
                job.state === "running" && "bg-amber-400/15 text-amber-300",
                job.state === "queued" && "bg-white/[0.06] text-muted-foreground",
              )}
            >
              {job.state}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

type StationDef = {
  id: string;
  label: string;
  headline: string;
  vignette: (reduced: boolean) => React.ReactNode;
};

const STATIONS: StationDef[] = [
  {
    id: "any-ai",
    label: "any ai",
    headline: "Bring the AI you already use.",
    vignette: () => <AnyAIVignette />,
  },
  {
    id: "memory",
    label: "memory",
    headline: "It already knows how you work.",
    vignette: () => <MemoryVignette />,
  },
  {
    id: "gate",
    label: "the gate",
    headline: "Checked before it runs.",
    vignette: () => <GateVignette />,
  },
  {
    id: "apps",
    label: "apps",
    headline: "Every app you already use.",
    vignette: () => <AppsVignette />,
  },
  {
    id: "proof",
    label: "proof",
    headline: "Checked after, with a receipt.",
    vignette: (reduced) => <ProofVignette reduced={reduced} />,
  },
  {
    id: "team",
    label: "the team",
    headline: "Not one bot. A whole team.",
    vignette: () => <TeamVignette />,
  },
];

function Station({
  station,
  index,
}: {
  station: StationDef;
  index: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const onRight = index % 2 === 1;

  return (
    <div className="relative py-14 sm:py-16">
      {/* Node on the rail */}
      <motion.span
        initial={reduced ? false : { scale: 0.4, opacity: 0.4 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-45%" }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className={cn(
          "absolute top-12 z-10 h-3 w-3 rounded-full border-2 border-primary bg-[#06202c] shadow-[0_0_16px_3px_hsl(182_46%_57%/0.45)]",
          RAIL_X,
          "-translate-x-[5px] lg:-translate-x-1/2",
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "pl-12 lg:w-[calc(50%-4.5rem)] lg:pl-0",
          onRight ? "lg:ml-[calc(50%+4.5rem)]" : "lg:mr-[calc(50%+4.5rem)] lg:text-right",
        )}
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/70">
            {String(index + 1).padStart(2, "0")} · {station.label}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-3xl">
            {station.headline}
          </h2>
          <div className={cn("relative mt-5 max-w-md", onRight ? "" : "lg:ml-auto")}>
            <span className="hp-cross -left-1 -top-1" aria-hidden="true" />
            <span className="hp-cross -bottom-1 -right-1" aria-hidden="true" />
            <div className="lg:text-left">{station.vignette(reduced)}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** Closing seal: the five stations drawn as one connected circuit. */
function MoatSeal() {
  const reduced = useReducedMotion() ?? false;
  const labels = ["any ai", "memory", "gates", "apps", "proof", "team"];
  const cx = 160;
  const cy = 160;
  const r = 118;
  const points = labels.map((_, i) => {
    const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const ringPath =
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <div className="relative mx-auto mt-14 h-[320px] w-[320px]" aria-hidden="true">
      <svg viewBox="0 0 320 320" className="h-full w-full">
        <motion.path
          d={ringPath}
          fill="none"
          stroke="hsl(182 46% 57% / 0.55)"
          strokeWidth="1.5"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {points.map((p, i) => {
          // Spokes start outside the centered wordmark so nothing
          // strikes through the name.
          const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
          const ix = cx + 44 * Math.cos(angle);
          const iy = cy + 44 * Math.sin(angle);
          return (
            <motion.line
              key={`spoke-${i}`}
              x1={ix}
              y1={iy}
              x2={p.x}
              y2={p.y}
              stroke="hsl(182 46% 57% / 0.22)"
              strokeWidth="1"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.9 + i * 0.12, ease: "easeOut" }}
            />
          );
        })}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#06202c"
            stroke="hsl(182 46% 57%)"
            strokeWidth="2"
            initial={reduced ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.2 + i * 0.18 }}
          />
        ))}
      </svg>
      {labels.map((label, i) => {
        const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
        const lx = cx + (r + 28) * Math.cos(angle);
        const ly = cy + (r + 24) * Math.sin(angle);
        return (
          <span
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70"
            style={{ left: lx, top: ly }}
          >
            {label}
          </span>
        );
      })}
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="text-lg font-extrabold tracking-tight text-heading">UnClick</span>
        <span className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-primary/60">
          where AI belongs
        </span>
      </span>
    </div>
  );
}

export default function RunRail() {
  const reduced = useReducedMotion() ?? false;
  const runRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: runRef,
    offset: ["start 0.6", "end 0.85"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.min(STATIONS.length, Math.floor(v * (STATIONS.length + 0.4))));
  });

  return (
    <section ref={runRef} aria-label="One ask travelling the UnClick rails" className="relative mx-auto max-w-5xl px-6">
      {/* Rail track + progress (transform only) */}
      <div
        className={cn("absolute bottom-0 top-0 w-px bg-white/[0.08]", RAIL_X)}
        aria-hidden="true"
      />
      <motion.div
        style={reduced ? undefined : { scaleY: progress }}
        className={cn(
          "absolute bottom-0 top-0 w-px origin-top bg-gradient-to-b from-primary/80 via-primary/60 to-primary/30",
          RAIL_X,
          "shadow-[0_0_12px_1px_hsl(182_46%_57%/0.35)]",
        )}
        aria-hidden="true"
      />

      {/* The packet: the ask riding the rail (desktop only). It
          retires once the run ends so the moat owns the terminus. */}
      {!reduced && (
        <div className="pointer-events-none sticky top-[44vh] z-20 hidden h-0 lg:block" aria-hidden="true">
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500",
              stage >= STATIONS.length ? "opacity-0" : "opacity-100",
            )}
          >
            <div className="flex items-center gap-2 rounded-full border border-primary/40 bg-[#071e29]/95 py-1.5 pl-3 pr-2.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8),0_0_24px_-6px_hsl(182_46%_57%/0.5)] backdrop-blur-md">
              <ChevronRight className="h-3 w-3 text-primary" />
              <span className="whitespace-nowrap font-mono text-[11px] text-heading">your ask</span>
              <span className="ml-1 flex items-center gap-1">
                {STATIONS.map((s, i) => (
                  <span
                    key={s.id}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                      i < stage ? "bg-primary" : "bg-white/15",
                    )}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stations */}
      <div>
        {STATIONS.slice(0, 4).map((station, i) => (
          <Station key={station.id} station={station} index={i} />
        ))}
      </div>

      {/* The apps burst: catalog scale right where the ask acts */}
      <div className="-mx-6">
        <AppRail />
      </div>

      <div>
        {STATIONS.slice(4).map((station, i) => (
          <Station key={station.id} station={station} index={i + 4} />
        ))}
      </div>

      {/* Terminus: the collective moat */}
      <div className="relative pb-24 pt-16 text-center">
        <span
          className={cn(
            "absolute top-0 z-10 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_4px_hsl(182_46%_57%/0.55)]",
            RAIL_X,
            "-translate-x-[5px] lg:-translate-x-1/2",
          )}
          aria-hidden="true"
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mx-auto max-w-3xl bg-gradient-to-b from-transparent via-[#06202c]/80 to-transparent px-6 pt-16"
        >
          <Brain className="sr-only" />
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-heading sm:text-5xl md:text-6xl">
            Each piece is replaceable.
            <br />
            <span className="bg-gradient-to-r from-[#61c1c4] via-[#86dadd] to-[#bdeff0] bg-clip-text text-transparent">
              The system isn't.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-body [text-wrap:balance]">
            Any AI, memory, gates, apps, proof, and a team that keeps{"\u00A0"}going.
          </p>
          <MoatSeal />
        </motion.div>
      </div>
    </section>
  );
}
