import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck, Bot, Check, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option D: the control room. Headline angle: "Give your AI hands."
 * The hero is a live working board: jobs changing state, gate
 * decisions scrolling past, receipts stacking, memory capturing,
 * the team busy. The system is shown operating, all at once, like
 * standing in mission control. Clearly captioned as a simulation.
 */

function PanelShell({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-[#86dadd]/15 bg-[#071e29]/85 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2">
        <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-primary/70">
          {title}
        </span>
        <span className="hp-live-dot h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
      </div>
      <div className="flex-1 p-3">{children}</div>
    </div>
  );
}

const JOB_CYCLE = [
  ["chase the invoice", "draft the replies", "weekly summary"],
  ["draft the replies", "weekly summary", "tidy the inbox"],
  ["weekly summary", "tidy the inbox", "book the venue"],
];
const JOB_STATES = ["done", "running", "queued"] as const;

function JobsPanel({ tick }: { tick: number }) {
  const jobs = JOB_CYCLE[tick % JOB_CYCLE.length];
  return (
    <div className="space-y-1.5">
      <AnimatePresence initial={false} mode="popLayout">
        {jobs.map((job, i) => (
          <motion.div
            key={job}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between rounded-md border border-white/[0.06] bg-[#06202c]/70 px-2.5 py-1.5 font-mono text-[11px]"
          >
            <span className="truncate text-body">{job}</span>
            <span
              className={cn(
                "ml-2 shrink-0 rounded-full px-1.5 py-px text-[8.5px] font-bold uppercase tracking-[0.1em]",
                JOB_STATES[i] === "done" && "bg-primary/15 text-primary",
                JOB_STATES[i] === "running" && "bg-amber-400/15 text-amber-300",
                JOB_STATES[i] === "queued" && "bg-white/[0.06] text-muted-foreground",
              )}
            >
              {JOB_STATES[i]}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const GATE_FEED = [
  { text: "read calendar · ok", ok: true },
  { text: "send two emails · ok", ok: true },
  { text: "touch secrets · blocked", ok: false },
  { text: "publish update · ok", ok: true },
  { text: "spend over cap · blocked", ok: false },
  { text: "read invoices · ok", ok: true },
];

function GatePanel({ tick }: { tick: number }) {
  const visible = Array.from({ length: 3 }, (_, i) => GATE_FEED[(tick + i) % GATE_FEED.length]);
  return (
    <div className="space-y-1.5">
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((entry) => (
          <motion.div
            key={entry.text}
            layout
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-[11px]",
              entry.ok
                ? "border-white/[0.06] bg-[#06202c]/70 text-body/90"
                : "border-red-400/30 bg-red-400/[0.06] text-red-200/90",
            )}
          >
            <ShieldCheck className={cn("h-3 w-3 shrink-0", entry.ok ? "text-primary/70" : "text-red-300")} />
            <span className="truncate">{entry.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ReceiptsPanel({ tick, reduced }: { tick: number; reduced: boolean }) {
  const count = reduced ? 1284 : 1281 + (tick % 4);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 py-2">
      <span className="text-3xl font-extrabold tabular-nums tracking-tight text-heading">
        {count.toLocaleString()}
      </span>
      <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground/70">
        receipts kept
      </span>
      <span className="mt-1 inline-flex -rotate-3 items-center gap-1 rounded border-2 border-primary/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
        <BadgeCheck className="h-3 w-3" />
        pass
      </span>
    </div>
  );
}

const MEMORY_FEED = [
  "prefers drafts first",
  "cleaner is paid Fridays",
  "tone: friendly, brief",
  "report goes out Monday",
];

function MemoryPanel({ tick }: { tick: number }) {
  const fact = MEMORY_FEED[tick % MEMORY_FEED.length];
  return (
    <div className="flex h-full items-center">
      <div className="w-full rounded-md border border-white/[0.06] bg-[#06202c]/70 px-2.5 py-2 font-mono text-[11px]">
        <span className="mb-1 flex items-center gap-1.5 text-primary/80">
          <Sparkles className="h-3 w-3" /> remembered ›
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={fact}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="block text-body"
          >
            {fact}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

const APP_FEED = [
  { app: "Gmail", action: "two drafts ready" },
  { app: "Xero", action: "invoice reconciled" },
  { app: "Slack", action: "summary posted" },
  { app: "Calendar", action: "clash flagged" },
  { app: "GitHub", action: "fix shipped" },
];

function AppsPanel({ tick }: { tick: number }) {
  const visible = Array.from({ length: 3 }, (_, i) => APP_FEED[(tick + i) % APP_FEED.length]);
  return (
    <div className="space-y-1.5">
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((row) => (
          <motion.div
            key={row.app}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-[#06202c]/70 px-2.5 py-1.5 text-[11.5px]"
          >
            <span className="font-semibold text-heading">{row.app}</span>
            <span className="truncate text-body/75">{row.action}</span>
            <Check className="ml-auto h-3 w-3 shrink-0 text-primary/80" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

const TEAM = ["researcher", "designer", "copywriter", "devil's advocate"];

function TeamPanel({ tick }: { tick: number }) {
  return (
    <div className="flex h-full flex-wrap content-center gap-1.5">
      {TEAM.map((role, i) => (
        <span
          key={role}
          className={cn(
            "inline-flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[10px] transition-colors duration-500",
            i === tick % TEAM.length
              ? "border-primary/50 bg-primary/[0.12] text-primary"
              : "border-white/[0.08] bg-[#06202c]/70 text-body/70",
          )}
        >
          <Bot className="h-3 w-3" />
          {role}
        </span>
      ))}
    </div>
  );
}

function ControlBoard() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setInterval(() => setTick((v) => v + 1), 2400);
    return () => window.clearInterval(t);
  }, [reduced, inView]);

  return (
    <div ref={ref}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <PanelShell title="jobs">
          <JobsPanel tick={tick} />
        </PanelShell>
        <PanelShell title="the gate">
          <GatePanel tick={tick} />
        </PanelShell>
        <PanelShell title="receipts">
          <ReceiptsPanel tick={tick} reduced={reduced} />
        </PanelShell>
        <PanelShell title="memory">
          <MemoryPanel tick={tick} />
        </PanelShell>
        <PanelShell title="apps">
          <AppsPanel tick={tick} />
        </PanelShell>
        <PanelShell title="the team">
          <TeamPanel tick={tick} />
        </PanelShell>
      </div>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/50">
        simulated board · yours fills with real work after install
      </p>
    </div>
  );
}

const HomePreviewD = () => {
  useCanonical("/home-preview-d");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Give your AI hands. A working board of jobs, gates, receipts, memory, apps, and the team, all moving at once.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Give your AI hands.",
    ogUrl: "https://unclick.world/home-preview-d",
  });

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground antialiased">
      <Navbar />
      <OptionRibbon active="d" />

      <main>
        {/* ── Hero: the board is the proof ───────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <FadeIn>
                <div className="flex justify-center">
                  <Eyebrow>Universal remote for AI</Eyebrow>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                  Give your AI <GradientText>hands.</GradientText>
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mx-auto mt-6 max-w-md text-lg text-body [text-wrap:balance]">
                  Thinking was the easy part. This is the rest of the job, running.
                </p>
              </FadeIn>
              <FadeIn delay={0.16}>
                <div className="mt-9 flex justify-center">
                  <a
                    href="#install"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                  >
                    Get started
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.22}>
              <div className="mt-14">
                <ControlBoard />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── One line of context ────────────────────────────────── */}
        <section className="px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-4xl">
                Any AI on top. Every app underneath. Checks in between.
              </h2>
            </FadeIn>
          </div>
        </section>

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewD;
