import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  ListChecks,
  NotebookTabs,
  PenLine,
  ReceiptText,
  Route,
  ScanLine,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";

const DOCKET_STEPS = [
  {
    id: "intake",
    label: "Intake",
    verb: "Catch the ask",
    line: "Turn a messy request into a named job.",
    receipt: "request accepted, context loaded, owner visible",
    icon: ClipboardList,
  },
  {
    id: "scope",
    label: "Scope",
    verb: "Draw the line",
    line: "Name the safe lane before anything moves.",
    receipt: "files, tools, risks, and proof bar declared",
    icon: ShieldCheck,
  },
  {
    id: "action",
    label: "Action",
    verb: "Call the right pass",
    line: "Use the connector, worker, XPass, or Council when the job needs it.",
    receipt: "UIPass, UXPass, TestPass, CopyPass, or Crews invited",
    icon: ListChecks,
  },
  {
    id: "proof",
    label: "Proof",
    verb: "Stamp the result",
    line: "No proof means not done. The receipt is the finish line.",
    receipt: "screenshots, checks, PR, deploy, or honest blocker attached",
    icon: BadgeCheck,
  },
] as const;

const LEDGER_LINES = [
  "human request",
  "memory receipt",
  "scope packet",
  "pass verdict",
  "screen proof",
  "done stamp",
];

const DIFFERENCE_ROWS = [
  {
    label: "Looks less like",
    value: "a chatbot wrapper",
    icon: PenLine,
  },
  {
    label: "Feels more like",
    value: "a work desk for agents",
    icon: NotebookTabs,
  },
  {
    label: "First promise",
    value: "proof before done",
    icon: ReceiptText,
  },
  {
    label: "Human role",
    value: "approver, not passenger",
    icon: FileCheck2,
  },
];

type DocketStep = (typeof DOCKET_STEPS)[number];
type DocketStepId = DocketStep["id"];

function DocketSheet({ activeStep }: { activeStep: DocketStep }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,hsl(182_46%_57%/0.16),transparent_26%),linear-gradient(135deg,hsl(0_0%_4%)_0%,hsl(0_0%_6%)_52%,hsl(12_28%_8%)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.028)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.02)_1px,transparent_1px)] bg-[size:84px_84px]" />

      <div className="absolute left-[-5rem] top-28 hidden h-[520px] w-[420px] rotate-[-7deg] border border-primary/20 bg-[hsl(182_46%_57%/0.06)] px-6 py-7 font-mono text-xs uppercase text-primary/90 md:block">
        <div className="mb-6 flex items-center justify-between border-b border-primary/25 pb-3">
          <span>UnClick intake</span>
          <span>live</span>
        </div>
        {LEDGER_LINES.map((line, index) => (
          <div key={line} className="flex items-center justify-between border-b border-primary/15 py-4">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{line}</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
        ))}
      </div>

      <div className="absolute right-[-2rem] top-20 hidden h-[620px] w-[455px] rotate-[5deg] border border-[hsl(48_76%_88%/0.35)] bg-[hsl(46_80%_91%)] p-7 text-[hsl(30_15%_12%)] shadow-[0_40px_130px_hsl(0_0%_0%/0.55)] lg:block">
        <div className="mb-5 flex items-start justify-between gap-6 border-b-2 border-dashed border-[hsl(30_15%_12%/0.28)] pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide opacity-70">Work docket</p>
            <p className="mt-2 text-3xl font-semibold leading-none">UNC-0001</p>
          </div>
          <div className="rounded-full border-2 border-[hsl(355_72%_42%/0.65)] px-4 py-2 font-mono text-xs uppercase text-[hsl(355_72%_42%)]">
            prove it
          </div>
        </div>

        <div className="space-y-3">
          {DOCKET_STEPS.map((step) => {
            const selected = step.id === activeStep.id;
            return (
              <div
                key={step.id}
                className={`grid grid-cols-[2rem_1fr] gap-3 border-b border-[hsl(30_15%_12%/0.18)] py-3 ${
                  selected ? "opacity-100" : "opacity-45"
                }`}
              >
                <step.icon className="h-5 w-5" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide">{step.label}</p>
                  <p className="mt-1 text-sm font-semibold">{step.verb}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 border-2 border-[hsl(355_72%_42%/0.55)] px-5 py-4 text-center font-mono text-sm uppercase text-[hsl(355_72%_42%)]">
          not done until proven
        </div>
      </div>

      <div className="absolute inset-x-5 top-28 h-40 rounded-[1.25rem] border border-primary/25 bg-primary/[0.05] p-4 sm:hidden">
        <div className="grid h-full grid-cols-4 gap-2">
          {DOCKET_STEPS.map((step) => (
            <div
              key={step.id}
              className={`rounded-lg border ${
                step.id === activeStep.id
                  ? "border-primary bg-primary/[0.18]"
                  : "border-primary/20 bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DocketConsole({
  activeStep,
  onSelect,
}: {
  activeStep: DocketStep;
  onSelect: (id: DocketStepId) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="border border-border bg-background p-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="font-mono text-xs uppercase text-primary">Run docket</p>
            <h2 className="mt-2 text-2xl font-semibold text-heading">Pick the stamp</h2>
          </div>
          <Stamp className="h-6 w-6 text-primary" />
        </div>

        <div className="mt-4 grid gap-2">
          {DOCKET_STEPS.map((step) => {
            const selected = step.id === activeStep.id;
            return (
              <button
                key={step.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(step.id)}
                className={`grid min-h-20 grid-cols-[2.5rem_1fr] items-center gap-3 border px-4 text-left transition ${
                  selected
                    ? "border-primary bg-primary/[0.1]"
                    : "border-border bg-card/40 hover:border-primary/45 hover:bg-card/70"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center border border-border bg-background text-primary">
                  <step.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase text-body">{step.label}</span>
                  <span className="mt-1 block text-base font-semibold text-heading">{step.verb}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border border-[hsl(48_76%_88%/0.3)] bg-[hsl(46_80%_91%)] p-5 text-[hsl(30_15%_12%)]">
        <div className="flex items-start justify-between gap-4 border-b-2 border-dashed border-[hsl(30_15%_12%/0.28)] pb-4">
          <div>
            <p className="font-mono text-xs uppercase opacity-70">Selected docket line</p>
            <h2 className="mt-2 text-3xl font-semibold">{activeStep.label}</h2>
          </div>
          <div className="rounded-full border-2 border-[hsl(355_72%_42%/0.65)] px-4 py-2 font-mono text-xs uppercase text-[hsl(355_72%_42%)]">
            stamped
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase opacity-60">What it does</p>
            <p className="mt-2 text-lg font-semibold leading-snug">{activeStep.line}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase opacity-60">Receipt</p>
            <p className="mt-2 text-lg font-semibold leading-snug">{activeStep.receipt}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-2 font-mono text-xs uppercase">
          {LEDGER_LINES.map((line, index) => (
            <div key={line} className="flex items-center justify-between border-t border-[hsl(30_15%_12%/0.18)] pt-2">
              <span>{String(index + 1).padStart(2, "0")} {line}</span>
              <span>kept</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomepageSample() {
  const [activeStepId, setActiveStepId] = useState<DocketStepId>("proof");
  const activeStep = DOCKET_STEPS.find((step) => step.id === activeStepId) ?? DOCKET_STEPS[3];

  useCanonical("/uipass-home-sample");
  useMetaTags({
    title: "UnClick homepage sample",
    description:
      "A UIPass and UXPass homepage sample for UnClick, focused on a distinctive work-docket direction.",
    ogTitle: "UnClick homepage sample",
    ogDescription:
      "A sample homepage direction showing UnClick as the work docket for AI action and proof.",
    ogUrl: "https://unclick.world/uipass-home-sample",
  });

  return (
    <div className={presets.page}>
      <Navbar />

      <main>
        <section className="relative flex min-h-[86svh] items-center overflow-hidden border-b border-border px-5 pb-24 pt-32 sm:px-6">
          <DocketSheet activeStep={activeStep} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.38)_0%,hsl(var(--background)/0.68)_58%,hsl(var(--background))_100%)]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 border border-primary/35 bg-black/35 px-4 py-2 text-xs font-medium uppercase text-primary backdrop-blur">
                <ScanLine className="h-3.5 w-3.5" />
                Work docket for AI
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="text-5xl font-semibold leading-none text-heading sm:text-7xl md:text-8xl">
                UnClick
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
                The place AI checks in before it acts. Every request gets context, scope, action, and a receipt you can inspect.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a href="#sample-run" className={presets.ctaPrimary}>
                  Open the docket
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/" className={presets.ctaGhost}>
                  Compare current homepage
                  <Route className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="sample-run" className="px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <p className="font-mono text-xs uppercase text-primary">Sample three</p>
              <h2 className="mt-3 text-3xl font-semibold text-heading sm:text-4xl">
                A work order, not a promise.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-body">
                This direction moves away from AI shine. It shows UnClick as the desk where messy AI work becomes named, scoped, checked, and proven.
              </p>
            </div>

            <DocketConsole activeStep={activeStep} onSelect={setActiveStepId} />
          </div>
        </section>

        <section className="border-y border-border bg-secondary/30 px-5 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <p className="font-mono text-xs uppercase text-primary">UIPass read</p>
              <h2 className="mt-3 text-3xl font-semibold text-heading sm:text-4xl">
                Sharper, plainer, harder to confuse with everyone else.
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {DIFFERENCE_ROWS.map((row) => (
                <div key={row.label} className="border border-border bg-card/65 p-5">
                  <row.icon className="h-5 w-5 text-primary" />
                  <p className="mt-5 font-mono text-xs uppercase text-body">{row.label}</p>
                  <h3 className="mt-2 text-lg font-semibold text-heading">{row.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
