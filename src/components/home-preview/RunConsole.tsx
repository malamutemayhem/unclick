import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  BadgeCheck,
  Check,
  CreditCard,
  GitBranch,
  Inbox,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * RunConsole: the homepage set piece. A glass terminal that replays
 * three scripted agent runs so a visitor watches UnClick work within
 * seconds of landing: ask, tools firing with latencies, a gate
 * decision, memory capture, and a stamped XPass receipt.
 *
 * Every endpoint name shown is a real UnClick endpoint id. Latencies
 * are illustrative and fixed so captures stay deterministic.
 * Under prefers-reduced-motion the run renders complete and still.
 */

type Step =
  | { kind: "tool"; name: string; detail: string; ms: number }
  | { kind: "gate"; gate: string; verdict: string }
  | { kind: "memory"; text: string }
  | { kind: "receipt"; title: string; lines: string[] };

type Scenario = {
  id: string;
  label: string;
  icon: typeof GitBranch;
  ask: string;
  steps: Step[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "ship",
    label: "Ship a fix",
    icon: GitBranch,
    ask: "Fix the broken pricing link and ship it",
    steps: [
      { kind: "tool", name: "load_memory", detail: "context + standing rules", ms: 24 },
      { kind: "gate", gate: "XGate · ScopeGate", verdict: "approved · repo in scope, draft first" },
      { kind: "tool", name: "github_action", detail: "branch + patch + draft PR", ms: 412 },
      { kind: "tool", name: "vercel_create_deployment", detail: "preview build", ms: 688 },
      {
        kind: "receipt",
        title: "XPass · PASS",
        lines: ["draft PR opened, preview green", "screenshots attached · receipt in Ledger"],
      },
    ],
  },
  {
    id: "triage",
    label: "Triage my morning",
    icon: Inbox,
    ask: "What needs my attention this morning?",
    steps: [
      { kind: "tool", name: "load_memory", detail: "preferences + active projects", ms: 31 },
      { kind: "tool", name: "email_read_inbox", detail: "14 unread · 3 important", ms: 89 },
      { kind: "tool", name: "list_calendly_events", detail: "2 bookings today", ms: 64 },
      { kind: "tool", name: "post_message", detail: "summary to Boardroom", ms: 47 },
      { kind: "memory", text: "saved · prefers a ranked morning summary" },
      {
        kind: "receipt",
        title: "Done in 4 calls",
        lines: ["3 ranked actions with owners", "calendar conflict flagged · receipt in Ledger"],
      },
    ],
  },
  {
    id: "pay",
    label: "Pay an invoice",
    icon: CreditCard,
    ask: "Pay the overdue Acme invoice",
    steps: [
      { kind: "tool", name: "xero_invoices", detail: "found INV-0042 · overdue", ms: 118 },
      { kind: "gate", gate: "XGate · SpendGate", verdict: "approved · under your cap" },
      { kind: "tool", name: "xero_payments", detail: "payment scheduled", ms: 203 },
      { kind: "memory", text: "saved · Acme runs on net-30 terms" },
      {
        kind: "receipt",
        title: "XPass · PASS",
        lines: ["INV-0042 paid and reconciled", "signed receipt in Ledger"],
      },
    ],
  },
];

type StepState = "hidden" | "running" | "done";

function runDuration(step: Step): number {
  switch (step.kind) {
    case "tool":
      return 520 + Math.min(step.ms, 700) * 0.6;
    case "gate":
      return 880;
    case "memory":
      return 480;
    case "receipt":
      return 420;
  }
}

function ToolRow({ step, state }: { step: Extract<Step, { kind: "tool" }>; state: StepState }) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[12.5px] leading-6">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center">
        {state === "running" ? (
          <Loader2 className="hp-running h-3.5 w-3.5 text-primary/80" />
        ) : (
          <Check className="h-3.5 w-3.5 text-primary" />
        )}
      </span>
      <span className="shrink-0 text-heading">{step.name}</span>
      <span className="truncate text-muted-foreground">{step.detail}</span>
      <span className="ml-auto shrink-0 tabular-nums text-primary/70">
        {state === "running" ? "···" : `${step.ms}ms`}
      </span>
    </div>
  );
}

function GateRow({ step, state }: { step: Extract<Step, { kind: "gate" }>; state: StepState }) {
  return (
    <div className="flex items-center gap-2.5 rounded-md border border-amber-400/25 bg-amber-400/[0.05] px-2.5 py-1.5 font-mono text-[12.5px] leading-6">
      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-amber-300/90" />
      <span className="shrink-0 text-amber-200/90">{step.gate}</span>
      <span className="truncate text-amber-100/60">
        {state === "running" ? "checking ···" : step.verdict}
      </span>
    </div>
  );
}

function MemoryRow({ step }: { step: Extract<Step, { kind: "memory" }> }) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[12.5px] leading-6 text-muted-foreground">
      <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/60" />
      <span className="text-primary/80">memory</span>
      <span className="truncate">{step.text}</span>
    </div>
  );
}

function ReceiptCard({
  step,
  state,
  reduced,
}: {
  step: Extract<Step, { kind: "receipt" }>;
  state: StepState;
  reduced: boolean;
}) {
  return (
    <div className="relative mt-1 rounded-lg border border-primary/30 bg-primary/[0.06] p-3.5 pr-24">
      {step.lines.map((line) => (
        <p key={line} className="font-mono text-[12px] leading-5 text-body">
          {line}
        </p>
      ))}
      <motion.div
        initial={reduced ? false : { scale: 1.9, opacity: 0, rotate: 4 }}
        animate={state === "done" || reduced ? { scale: 1, opacity: 1, rotate: -6 } : {}}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded border-2 border-primary/80 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary"
      >
        <span className="inline-flex items-center gap-1">
          <BadgeCheck className="h-3 w-3" />
          {step.title}
        </span>
      </motion.div>
    </div>
  );
}

export default function RunConsole() {
  const reduced = useReducedMotion() ?? false;
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [states, setStates] = useState<StepState[]>([]);
  const scenario = SCENARIOS[scenarioIdx];

  // Pointer tilt: a quiet 3D response, desktop pointers only.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 160, damping: 18 });
  const springY = useSpring(tiltY, { stiffness: 160, damping: 18 });
  const frameRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(py * -3.2);
    tiltY.set(px * 4);
  };

  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Sequencer: type the ask, run each step, hold, advance scenario.
  // Under reduced motion the run renders complete (derived below), so
  // the sequencer simply does not start.
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    (async () => {
      setTypedChars(0);
      setStates(scenario.steps.map(() => "hidden"));
      await sleep(450);
      for (let c = 1; c <= scenario.ask.length; c++) {
        if (cancelled) return;
        setTypedChars(c);
        await sleep(20);
      }
      await sleep(430);
      for (let i = 0; i < scenario.steps.length; i++) {
        if (cancelled) return;
        setStates((prev) => prev.map((s, j) => (j === i ? "running" : s)));
        await sleep(runDuration(scenario.steps[i]));
        if (cancelled) return;
        setStates((prev) => prev.map((s, j) => (j === i ? "done" : s)));
        await sleep(240);
      }
      await sleep(3100);
      if (!cancelled) {
        setScenarioIdx((idx) => (idx + 1) % SCENARIOS.length);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [scenario, reduced, runKey]);

  const selectScenario = (idx: number) => {
    if (idx === scenarioIdx) {
      setRunKey((k) => k + 1);
    } else {
      setScenarioIdx(idx);
    }
  };

  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={frameRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={reduced ? undefined : { rotateX: springX, rotateY: springY }}
        className="relative rounded-2xl border border-[#86dadd]/20 bg-[#071e29]/90 shadow-[0_40px_90px_-32px_rgba(0,0,0,0.85),0_0_70px_-28px_rgba(97,193,196,0.45)] backdrop-blur-md"
      >
        <span className="hp-cross left-2 top-2" aria-hidden="true" />
        <span className="hp-cross right-2 top-2" aria-hidden="true" />
        <span className="hp-cross bottom-2 left-2" aria-hidden="true" />
        <span className="hp-cross bottom-2 right-2" aria-hidden="true" />

        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            unclick · live run
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="hp-live-dot h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            live
          </span>
        </div>

        {/* Scenario tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-white/[0.07] px-3 py-2.5">
          {SCENARIOS.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => selectScenario(idx)}
              aria-pressed={idx === scenarioIdx}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] transition-colors",
                idx === scenarioIdx
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-white/[0.05] hover:text-body",
              )}
            >
              <s.icon className="h-3 w-3" />
              {s.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setRunKey((k) => k + 1)}
            aria-label="Replay run"
            className="ml-auto rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-body"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Run body. Fixed height so the card never jumps between scenarios. */}
        <div className="flex h-[330px] flex-col gap-2 overflow-hidden px-4 py-4 sm:h-[272px]">
          <div className="font-mono text-[12.5px] leading-6">
            <span className="select-none text-primary/70">you › </span>
            <span className="text-heading">
              {reduced ? scenario.ask : scenario.ask.slice(0, typedChars)}
            </span>
            {!reduced && typedChars < scenario.ask.length && (
              <span className="hp-caret" aria-hidden="true" />
            )}
          </div>

          {scenario.steps.map((step, i) => {
            const state: StepState = reduced ? "done" : (states[i] ?? "hidden");
            if (state === "hidden") return null;
            const row = (() => {
              switch (step.kind) {
                case "tool":
                  return <ToolRow step={step} state={state} />;
                case "gate":
                  return <GateRow step={step} state={state} />;
                case "memory":
                  return <MemoryRow step={step} />;
                case "receipt":
                  return <ReceiptCard step={step} state={state} reduced={reduced} />;
              }
            })();
            return (
              <motion.div
                key={`${scenario.id}-${i}`}
                initial={reduced ? false : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {row}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Truth note: the run is a scripted replay, and says so. */}
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/50">
        scripted replay · real endpoint names · timings illustrative
      </p>
    </div>
  );
}
