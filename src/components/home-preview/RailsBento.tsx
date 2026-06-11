import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AppWindow,
  ArrowRight,
  BadgeCheck,
  Brain,
  Calendar,
  Check,
  Github,
  Link2,
  Mail,
  MessageSquare,
  Plane,
  ShieldQuestion,
  Wallet,
} from "lucide-react";
import { SITE_STATS } from "@/config/site-stats";
import { cn } from "@/lib/utils";

/**
 * RailsBento: the five product rails in a weighted bento grid.
 * Same five surfaces and hrefs as the live homepage, but with real
 * hierarchy (Apps is the hero rail) and a live detail inside each
 * card instead of icon + sentence alone. Hover gets a pointer-
 * following teal spotlight (CSS vars set here, gradient in
 * preview.css).
 */

function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--hp-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--hp-y", `${e.clientY - rect.top}px`);
  };
  return { ref, onMouseMove };
}

function BentoCard({
  to,
  label,
  title,
  blurb,
  icon: Icon,
  className,
  children,
}: {
  to: string;
  label: string;
  title: string;
  blurb: string;
  icon: typeof AppWindow;
  className?: string;
  children?: React.ReactNode;
}) {
  const { ref, onMouseMove } = useSpotlight();
  return (
    <Link to={to} className={cn("group block", className)}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="hp-card relative flex h-full flex-col rounded-[18px] border border-[#86dadd]/15 bg-white/[0.045] p-6 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-[0_24px_70px_-28px_rgba(97,193,196,0.4)]"
      >
        <div className="hp-spot" aria-hidden="true" />
        <span className="hp-cross left-2 top-2" aria-hidden="true" />
        <span className="hp-cross bottom-2 right-2" aria-hidden="true" />

        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/[0.06] text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            {label}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-heading">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-body">{blurb}</p>

        {children && <div className="mt-4 flex-1">{children}</div>}

        <div className="mt-4 flex items-center gap-1.5 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Learn more <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

/* A four-row window of endpoint calls that advances every couple of
   seconds, so the Apps rail looks like traffic, not a brochure. */
const CALL_FEED = [
  { name: "weather_forecast", detail: "Melbourne · 7 days", ms: 41 },
  { name: "github_action", detail: "merge check on PR", ms: 388 },
  { name: "stripe_invoices", detail: "list overdue", ms: 92 },
  { name: "spotify_search", detail: "focus playlist", ms: 77 },
  { name: "ptv_departures", detail: "next train · Flinders St", ms: 58 },
  { name: "save_fact", detail: "client prefers Tuesdays", ms: 26 },
  { name: "nasa_apod", detail: "picture of the day", ms: 103 },
  { name: "deepl_translate_text", detail: "to Japanese", ms: 64 },
];

function LiveCallFeed() {
  const reduced = useReducedMotion() ?? false;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(
      () => setOffset((o) => (o + 1) % CALL_FEED.length),
      2100,
    );
    return () => window.clearInterval(t);
  }, [reduced]);

  const visible = Array.from({ length: 4 }, (_, i) => CALL_FEED[(offset + i) % CALL_FEED.length]);

  return (
    <div className="rounded-lg border border-white/[0.07] bg-[#06202c]/70 p-3.5">
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((call) => (
          <motion.div
            key={call.name}
            layout
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2.5 py-1 font-mono text-[12px] leading-6"
          >
            <Check className="h-3 w-3 shrink-0 text-primary/80" />
            <span className="shrink-0 text-heading/90">{call.name}</span>
            <span className="truncate text-muted-foreground/80">{call.detail}</span>
            <span className="ml-auto shrink-0 tabular-nums text-primary/60">{call.ms}ms</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const MEMORY_FACTS = [
  "Chris ships drafts first, always",
  "invoices over $500 need a human",
  "the deck palette is navy + teal",
];

function MemoryDetail() {
  const reduced = useReducedMotion() ?? false;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % MEMORY_FACTS.length), 3400);
    return () => window.clearInterval(t);
  }, [reduced]);

  return (
    <div className="rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-3 font-mono text-[12px]">
      <span className="text-primary/70">remembered › </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={idx}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-body"
        >
          {MEMORY_FACTS[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

const JOBS = [
  { name: "refresh app catalog", state: "proved" },
  { name: "rotate stale API key", state: "running" },
  { name: "weekly memory digest", state: "queued" },
] as const;

function AutopilotDetail() {
  return (
    <div className="space-y-1.5">
      {JOBS.map((job) => (
        <div
          key={job.name}
          className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2 font-mono text-[12px]"
        >
          <span className="truncate text-body">{job.name}</span>
          <span
            className={cn(
              "ml-3 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
              job.state === "proved" && "bg-primary/15 text-primary",
              job.state === "running" && "bg-amber-400/15 text-amber-300",
              job.state === "queued" && "bg-white/[0.06] text-muted-foreground",
            )}
          >
            {job.state}
          </span>
        </div>
      ))}
    </div>
  );
}

const PLATFORM_ICONS = [Mail, Github, Calendar, MessageSquare, Wallet] as const;

function ConnectionsDetail() {
  return (
    <div className="flex items-center gap-2">
      {PLATFORM_ICONS.map((Icon, i) => (
        <span
          key={i}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/25 bg-primary/[0.08] text-primary/80"
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
      ))}
      <span className="ml-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
        +{SITE_STATS.BACKSTAGEPASS_PLATFORMS} more
      </span>
    </div>
  );
}

function XPassDetail() {
  return (
    <div className="inline-flex -rotate-3 items-center gap-1.5 rounded border-2 border-primary/70 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
      <BadgeCheck className="h-3.5 w-3.5" />
      pass
    </div>
  );
}

export default function RailsBento() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-12">
      <BentoCard
        to="/tools"
        label="rail 01"
        title="Apps"
        blurb={`Every tool your agent needs, in one install. ${SITE_STATS.ENDPOINTS_DISPLAY} callable endpoints.`}
        icon={AppWindow}
        className="lg:col-span-7 lg:row-span-2"
      >
        <LiveCallFeed />
      </BentoCard>

      <BentoCard
        to="/memory"
        label="rail 02"
        title="Memory"
        blurb="Cross-session memory that remembers and shows what it captured."
        icon={Brain}
        className="lg:col-span-5"
      >
        <MemoryDetail />
      </BentoCard>

      <BentoCard
        to="/admin/autopilot"
        label="rail 03"
        title="AutoPilot"
        blurb="The work hub that plans, routes, checks, and proves jobs."
        icon={Plane}
        className="lg:col-span-5"
      >
        <AutopilotDetail />
      </BentoCard>

      <BentoCard
        to="/admin/keychain"
        label="rail 04"
        title="Connections"
        blurb="Sign in once. Your agent uses everything else."
        icon={Link2}
        className="lg:col-span-4"
      >
        <ConnectionsDetail />
      </BentoCard>

      <BentoCard
        to="/dogfood"
        label="rail 05"
        title="XPass"
        blurb="The roadworthy checklist for AI work before it ships."
        icon={BadgeCheck}
        className="lg:col-span-4"
      >
        <XPassDetail />
      </BentoCard>

      <BentoCard
        to="/why"
        label="map"
        title="Why UnClick"
        blurb="The five-pillar case, including where self-hosted agents win."
        icon={ShieldQuestion}
        className="lg:col-span-4"
      />
    </div>
  );
}
