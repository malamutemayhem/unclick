import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookMarked,
  Cable,
  CheckCircle2,
  ClipboardCheck,
  Fingerprint,
  KeyRound,
  MousePointer2,
  PlugZap,
  Power,
  Radio,
  ReceiptText,
  Route,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";

const REMOTE_KEYS = [
  {
    id: "apps",
    label: "Apps",
    kicker: "reach",
    detail: "Find the right connector without a setup ritual.",
    receipt: "tool lane chosen: GitHub, Gmail, Supabase, Slack",
    icon: Cable,
    tone: "border-cyan-200/45 bg-cyan-200/[0.08] text-cyan-100",
  },
  {
    id: "memory",
    label: "Memory",
    kicker: "carry",
    detail: "Bring back the useful facts and show where they came from.",
    receipt: "context loaded: facts, sessions, source pointers",
    icon: BookMarked,
    tone: "border-amber-200/45 bg-amber-200/[0.08] text-amber-100",
  },
  {
    id: "scope",
    label: "Scope",
    kicker: "guard",
    detail: "Name the job, the boundaries, and the risky surfaces.",
    receipt: "scope locked: files, route, proof, no production risk",
    icon: Fingerprint,
    tone: "border-emerald-200/45 bg-emerald-200/[0.08] text-emerald-100",
  },
  {
    id: "run",
    label: "Run",
    kicker: "act",
    detail: "Call the tool, worker, or pass that fits the job.",
    receipt: "work started: narrow lane, live status, Boardroom trail",
    icon: KeyRound,
    tone: "border-sky-200/45 bg-sky-200/[0.08] text-sky-100",
  },
  {
    id: "proof",
    label: "Proof",
    kicker: "finish",
    detail: "Attach the build, screenshot, test, link, or blocker.",
    receipt: "done held until proof is visible",
    icon: BadgeCheck,
    tone: "border-rose-200/45 bg-rose-200/[0.08] text-rose-100",
  },
] as const;

const PROOF_TAPE = [
  "wake accepted",
  "context read",
  "scope chosen",
  "tool called",
  "receipt saved",
  "proof linked",
];

const WORK_ORDERS = [
  {
    label: "No vague magic",
    body: "The page shows the control loop instead of promising an invisible agent.",
    icon: SlidersHorizontal,
  },
  {
    label: "Human stays on top",
    body: "Permission, scope, and proof are visible before trust is asked for.",
    icon: ShieldCheck,
  },
  {
    label: "Agent can read it",
    body: "The structure is plain, labelled, and easy for browser agents to follow.",
    icon: MousePointer2,
  },
  {
    label: "Proof has a shape",
    body: "Done is not a mood. It needs a receipt, screenshot, check, or link.",
    icon: ReceiptText,
  },
];

type RemoteKey = (typeof REMOTE_KEYS)[number];
type RemoteKeyId = RemoteKey["id"];

function RemoteHeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(0_0%_5%)_0%,hsl(0_0%_4%)_38%,hsl(187_24%_8%)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.035)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="absolute -right-12 top-20 hidden h-[600px] w-[310px] rotate-[-11deg] rounded-[2rem] border border-white/12 bg-[hsl(0_0%_8%)] p-5 shadow-[0_40px_120px_hsl(0_0%_0%/0.55)] sm:block lg:right-[8%]">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-body">
            <Power className="h-4 w-4 text-primary" />
            UNC-01
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-300" />
        </div>

        <div className="rounded-lg border border-white/10 bg-black/45 p-4 font-mono text-[11px] leading-relaxed text-cyan-100">
          <div>REMOTE READY</div>
          <div>ASK - SCOPE - RUN - PROVE</div>
          <div className="mt-3 text-emerald-200">human stays in control</div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {REMOTE_KEYS.slice(0, 4).map((key) => (
            <div key={key.id} className={`min-h-20 rounded-lg border p-3 ${key.tone}`}>
              <key.icon className="h-4 w-4" />
              <div className="mt-4 text-sm font-semibold text-heading">{key.label}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-7 flex h-24 w-24 items-center justify-center rounded-full border border-primary/45 bg-primary/[0.08]">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-7 rounded-lg border border-rose-200/35 bg-rose-200/[0.08] p-3 text-rose-100">
          <BadgeCheck className="h-4 w-4" />
          <div className="mt-4 text-sm font-semibold text-heading">Proof</div>
        </div>
      </div>

      <div className="absolute left-6 top-28 hidden w-64 -rotate-3 border border-dashed border-amber-200/30 bg-amber-100/[0.08] p-4 font-mono text-[11px] uppercase leading-6 text-amber-100 md:block">
        {PROOF_TAPE.map((line) => (
          <div key={line} className="flex items-center justify-between border-b border-amber-100/15 py-1 last:border-b-0">
            <span>{line}</span>
            <span>ok</span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 left-1/2 hidden w-[760px] -translate-x-1/2 border-y border-white/10 bg-black/30 px-5 py-3 font-mono text-xs text-body backdrop-blur sm:block">
        <div className="grid grid-cols-5 gap-3">
          {REMOTE_KEYS.map((key) => (
            <div key={key.id} className="flex items-center gap-2">
              <key.icon className="h-4 w-4 text-primary" />
              <span>{key.kicker}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-6 top-28 h-36 rounded-[1.75rem] border border-white/10 bg-black/25 p-4 sm:hidden">
        <div className="grid h-full grid-cols-3 gap-2">
          {REMOTE_KEYS.slice(0, 3).map((key) => (
            <div key={key.id} className={`rounded-lg border ${key.tone}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RemoteBench({
  activeKey,
  onSelect,
}: {
  activeKey: RemoteKey;
  onSelect: (id: RemoteKeyId) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
      <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="font-mono text-xs uppercase text-primary">Sample remote</p>
            <h2 className="mt-2 text-2xl font-semibold text-heading">Press a key</h2>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/40 bg-primary/[0.08] text-primary">
            <Radio className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-2">
          {REMOTE_KEYS.map((key) => {
            const selected = key.id === activeKey.id;
            return (
              <button
                key={key.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(key.id)}
                className={`min-h-24 rounded-lg border p-4 text-left transition ${
                  selected
                    ? `${key.tone} shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]`
                    : "border-border bg-secondary/35 text-body hover:border-primary/45 hover:bg-secondary/65"
                }`}
              >
                <key.icon className="h-5 w-5" />
                <span className="mt-5 block text-base font-semibold text-heading">{key.label}</span>
                <span className="mt-1 block font-mono text-xs uppercase text-body">{key.kicker}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-amber-200/35 bg-amber-100/[0.06] p-5">
        <div className="flex items-center justify-between gap-4 border-b border-amber-100/20 pb-4">
          <div>
            <p className="font-mono text-xs uppercase text-amber-100">Live receipt</p>
            <h2 className="mt-2 text-2xl font-semibold text-heading">{activeKey.label}</h2>
          </div>
          <ReceiptText className="h-6 w-6 text-amber-100" />
        </div>

        <div className="mt-6 space-y-4 font-mono text-sm leading-relaxed text-amber-50/90">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{activeKey.receipt}</span>
          </div>
          <div className="flex items-start gap-3">
            <PlugZap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{activeKey.detail}</span>
          </div>
        </div>

        <div className="mt-8 grid gap-2">
          {PROOF_TAPE.map((line, index) => (
            <div key={line} className="flex items-center justify-between border-t border-amber-100/15 pt-2 font-mono text-xs uppercase text-body">
              <span>{String(index + 1).padStart(2, "0")} {line}</span>
              <span className="text-emerald-200">kept</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomepageSample() {
  const [activeKeyId, setActiveKeyId] = useState<RemoteKeyId>("proof");
  const activeKey = REMOTE_KEYS.find((key) => key.id === activeKeyId) ?? REMOTE_KEYS[4];

  useCanonical("/uipass-home-sample");
  useMetaTags({
    title: "UnClick homepage sample",
    description:
      "A UIPass and UXPass homepage sample for UnClick, focused on a more distinctive remote-and-receipt direction.",
    ogTitle: "UnClick homepage sample",
    ogDescription:
      "A sample homepage direction showing UnClick as the universal remote for AI work.",
    ogUrl: "https://unclick.world/uipass-home-sample",
  });

  return (
    <div className={presets.page}>
      <Navbar />

      <main>
        <section className="relative flex min-h-[86svh] items-center overflow-hidden border-b border-border px-5 pb-24 pt-32 sm:px-6">
          <RemoteHeroScene />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.56)_0%,hsl(var(--background)/0.72)_48%,hsl(var(--background))_100%)]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-black/35 px-4 py-2 text-xs font-medium uppercase text-primary backdrop-blur">
                <Power className="h-3.5 w-3.5" />
                Universal remote for AI
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="text-5xl font-semibold leading-none text-heading sm:text-7xl md:text-8xl">
                UnClick
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-body">
                A remote your AI reaches for before it touches your stuff. It finds the tool, carries the context, asks for scope, and prints the proof.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a href="#sample-run" className={presets.ctaPrimary}>
                  Press the sample
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
              <p className="font-mono text-xs uppercase text-primary">Sample two</p>
              <h2 className="mt-3 text-3xl font-semibold text-heading sm:text-4xl">
                Remote first. Receipt always.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-body">
                This version avoids the usual chat bubbles, fake agent panels, and vague command-centre mood. It turns the homepage into a product object with a clear promise.
              </p>
            </div>

            <RemoteBench activeKey={activeKey} onSelect={setActiveKeyId} />
          </div>
        </section>

        <section className="border-y border-border bg-secondary/30 px-5 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <p className="font-mono text-xs uppercase text-primary">UIPass read</p>
              <h2 className="mt-3 text-3xl font-semibold text-heading sm:text-4xl">
                More ownable, less generic.
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {WORK_ORDERS.map((order) => (
                <div key={order.label} className="rounded-lg border border-border bg-card/70 p-5">
                  <order.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-5 text-base font-semibold text-heading">{order.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{order.body}</p>
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
