import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  Cable,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Fingerprint,
  KeyRound,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";

const CONTROL_LANES = [
  {
    label: "Tools",
    value: "204 apps ready",
    detail: "Slack, GitHub, Gmail, Supabase",
    icon: Cable,
    tone: "text-cyan-200 border-cyan-300/35 bg-cyan-300/[0.08]",
  },
  {
    label: "Memory",
    value: "Context carried",
    detail: "facts, sessions, source receipts",
    icon: Brain,
    tone: "text-amber-200 border-amber-300/35 bg-amber-300/[0.08]",
  },
  {
    label: "Permission",
    value: "Scoped before action",
    detail: "who asked, what changed, why",
    icon: ShieldCheck,
    tone: "text-emerald-200 border-emerald-300/35 bg-emerald-300/[0.08]",
  },
  {
    label: "Proof",
    value: "Receipts attached",
    detail: "tests, screenshots, Boardroom trail",
    icon: BadgeCheck,
    tone: "text-rose-200 border-rose-300/35 bg-rose-300/[0.08]",
  },
];

const RUN_STEPS = [
  { label: "Ask", detail: "Plain request", icon: Compass },
  { label: "Scope", detail: "Safe lane", icon: Fingerprint },
  { label: "Act", detail: "Right tool", icon: KeyRound },
  { label: "Prove", detail: "Receipt", icon: ClipboardCheck },
];

const PRODUCT_SIGNALS = [
  {
    title: "One remote",
    body: "The agent does not need a new setup ritual for every tool.",
    icon: Cable,
  },
  {
    title: "Memory with receipts",
    body: "Context is useful only when you can see where it came from.",
    icon: Brain,
  },
  {
    title: "Permissioned action",
    body: "Important work moves through clear scope instead of blind trust.",
    icon: ShieldCheck,
  },
  {
    title: "Proof before done",
    body: "A run is not finished until the evidence is visible.",
    icon: BadgeCheck,
  },
];

function ControlRoomScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.045)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.035)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute inset-x-0 top-20 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-14 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />

      <div className="absolute inset-x-4 top-24 mx-auto hidden max-w-6xl sm:inset-x-8 md:block">
        <div className="grid gap-3 md:grid-cols-4">
          {CONTROL_LANES.map((lane) => (
            <div
              key={lane.label}
              className={`rounded-lg border px-4 py-3 backdrop-blur-md ${lane.tone}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <lane.icon className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    {lane.label}
                  </span>
                </div>
                <CheckCircle2 className="h-4 w-4 opacity-80" />
              </div>
              <p className="mt-3 text-sm font-semibold text-heading">{lane.value}</p>
              <p className="mt-1 text-xs text-body">{lane.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-20 mx-auto hidden max-w-5xl sm:inset-x-8 md:block">
        <div className="grid grid-cols-4 gap-2">
          {RUN_STEPS.map((step, index) => (
            <div key={step.label} className="relative rounded-lg border border-white/10 bg-black/35 px-3 py-3 backdrop-blur">
              {index < RUN_STEPS.length - 1 && (
                <div className="absolute left-[calc(100%+0.25rem)] top-1/2 hidden h-px w-[calc(100%-0.5rem)] -translate-y-1/2 bg-white/15 md:block" />
              )}
              <step.icon className="h-4 w-4 text-primary" />
              <p className="mt-3 text-xs font-semibold text-heading">{step.label}</p>
              <p className="mt-1 hidden text-[11px] text-body sm:block">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomepageSample() {
  useCanonical("/uipass-home-sample");
  useMetaTags({
    title: "UnClick homepage sample",
    description:
      "A UIPass and UXPass homepage sample for UnClick, focused on a distinctive control-room direction.",
    ogTitle: "UnClick homepage sample",
    ogDescription:
      "A sample homepage direction showing UnClick as the control room for AI work.",
    ogUrl: "https://unclick.world/uipass-home-sample",
  });

  return (
    <div className={presets.page}>
      <Navbar />

      <main>
        <section className="relative flex min-h-[82svh] items-center overflow-hidden border-b border-border/70 px-6 pb-24 pt-32">
          <ControlRoomScene />
          <div className="absolute inset-0 bg-background/80" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/12 bg-black/35 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-body backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI work control room
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="text-5xl font-semibold leading-none text-heading sm:text-7xl md:text-8xl">
                UnClick
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
                One place for tools, memory, permissions, and proof. Your agent can move faster without turning every task into a trust exercise.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-10 flex justify-center">
                <a href="#sample-run" className={presets.ctaPrimary}>
                  See the run path
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="sample-run" className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
                  First-run clarity
                </p>
                <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-heading sm:text-4xl">
                  The homepage should show the system, not just describe it.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-body">
                  This sample makes the promise visible immediately: request, scope, action, proof. That gives people and AI agents a clearer mental model before they scroll.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {PRODUCT_SIGNALS.map((signal) => (
                  <div key={signal.title} className="h-full rounded-lg border border-border/70 bg-card/70 p-5">
                    <signal.icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-4 text-base font-semibold text-heading">{signal.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{signal.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/70 bg-secondary/30 px-6 py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Sample only
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-heading">
                Approve the direction before it replaces the homepage.
              </h2>
            </div>
            <Link
              to="/"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-accent"
            >
              Compare current homepage
              <Route className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
