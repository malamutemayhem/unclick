import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Cable,
  CheckCircle2,
  CircleDot,
  GitBranch,
  KeyRound,
  Layers3,
  Link2,
  MemoryStick,
  MousePointerClick,
  PlugZap,
  Route,
  ShieldCheck,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";

const PATCHES = [
  {
    id: "publish",
    label: "Publish fix",
    ask: "Ship the homepage patch safely",
    path: ["Memory", "GitHub", "UIPass", "Vercel"],
    output: "draft PR, screenshots, cloud checks",
    color: "#63d6d9",
    icon: GitBranch,
  },
  {
    id: "triage",
    label: "Triage inbox",
    ask: "Find what needs a reply",
    path: ["Gmail", "Memory", "Calendar", "Boardroom"],
    output: "ranked actions, owners, due dates",
    color: "#f4c95d",
    icon: Layers3,
  },
  {
    id: "guard",
    label: "Guard risky work",
    ask: "Check before tools touch production",
    path: ["Scope", "SecurityPass", "LegalPass", "Human"],
    output: "blocked, approved, or narrowed",
    color: "#ff7a6b",
    icon: ShieldCheck,
  },
] as const;

const SOCKET_COLUMNS = [
  {
    title: "AI seat",
    items: ["ask", "plan", "act", "report"],
    icon: Bot,
  },
  {
    title: "Context",
    items: ["memory", "files", "history", "rules"],
    icon: MemoryStick,
  },
  {
    title: "Tools",
    items: ["github", "gmail", "browser", "vercel"],
    icon: Wrench,
  },
  {
    title: "Guards",
    items: ["scope", "xpass", "crews", "human"],
    icon: ShieldCheck,
  },
] as const;

const RULES = [
  "No loose tool access",
  "No mystery context",
  "No action without a lane",
  "No generic dashboard promise",
];

type Patch = (typeof PATCHES)[number];
type PatchId = Patch["id"];

function CablePath({ activePatch }: { activePatch: Patch }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 760"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M98 350 C250 230 390 520 552 388 S835 248 1080 356"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M98 350 C250 230 390 520 552 388 S835 248 1080 356"
        fill="none"
        stroke={activePatch.color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M108 468 C290 605 420 215 618 318 S860 584 1094 460"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M92 236 C310 120 430 300 610 246 S880 126 1100 230"
        fill="none"
        stroke="rgba(244,201,93,0.16)"
        strokeWidth="3"
        strokeDasharray="14 16"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Socket({
  label,
  active,
  color,
}: {
  label: string;
  active: boolean;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 py-3">
      <span className="font-mono text-[11px] uppercase text-white/55">{label}</span>
      <span
        className="h-3.5 w-3.5 border"
        style={{
          borderColor: active ? color : "rgba(255,255,255,0.22)",
          backgroundColor: active ? color : "transparent",
          boxShadow: active ? `0 0 22px ${color}` : "none",
        }}
      />
    </div>
  );
}

function PatchbayHero({ activePatch }: { activePatch: Patch }) {
  const activeWords = new Set(activePatch.path.map((word) => word.toLowerCase()));

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#090806_0%,#11100d_48%,#061312_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <CablePath activePatch={activePatch} />

      <div className="absolute inset-x-5 bottom-8 hidden grid-cols-4 gap-3 lg:grid">
        {SOCKET_COLUMNS.map((column) => (
          <div key={column.title} className="border border-white/12 bg-black/42 p-5 backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <column.icon className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs uppercase text-white/70">{column.title}</span>
              </div>
              <CircleDot className="h-4 w-4 text-white/30" />
            </div>
            {column.items.map((item) => (
              <Socket
                key={item}
                label={item}
                active={activeWords.has(item) || activePatch.ask.toLowerCase().includes(item)}
                color={activePatch.color}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-28 hidden w-[340px] border border-[#f4c95d]/35 bg-[#f4c95d]/10 p-5 font-mono text-xs uppercase text-[#f4c95d] md:block">
        {RULES.map((rule) => (
          <div key={rule} className="flex items-center justify-between border-b border-[#f4c95d]/20 py-3 last:border-b-0">
            <span>{rule}</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-5 top-28 h-44 border border-primary/20 bg-black/30 p-4 sm:hidden">
        <div className="grid h-full grid-cols-4 gap-2">
          {SOCKET_COLUMNS.map((column) => (
            <div key={column.title} className="border border-white/12 bg-white/[0.03]">
              <div
                className="h-full w-full"
                style={{
                  background:
                    column.items.some((item) => activeWords.has(item))
                      ? `${activePatch.color}22`
                      : "transparent",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PatchControl({
  activePatch,
  onSelect,
}: {
  activePatch: Patch;
  onSelect: (id: PatchId) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="border border-border bg-background p-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="font-mono text-xs uppercase text-primary">Patch sample</p>
            <h2 className="mt-2 text-2xl font-semibold text-heading">Choose a job</h2>
          </div>
          <PlugZap className="h-6 w-6 text-primary" />
        </div>

        <div className="mt-4 grid gap-2">
          {PATCHES.map((patch) => {
            const selected = patch.id === activePatch.id;
            return (
              <button
                key={patch.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelect(patch.id)}
                className={`grid min-h-20 grid-cols-[2.75rem_1fr] items-center gap-3 border px-4 text-left transition ${
                  selected
                    ? "bg-white/[0.08]"
                    : "border-border bg-card/35 hover:bg-card/70"
                }`}
                style={{ borderColor: selected ? patch.color : undefined }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center border bg-background"
                  style={{ borderColor: patch.color, color: patch.color }}
                >
                  <patch.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-heading">{patch.label}</span>
                  <span className="mt-1 block text-sm text-body">{patch.ask}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border border-border bg-card/45 p-5">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="font-mono text-xs uppercase text-primary">Live patch</p>
            <h2 className="mt-2 text-2xl font-semibold text-heading">{activePatch.label}</h2>
          </div>
          <Cable className="h-6 w-6" style={{ color: activePatch.color }} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
          {activePatch.path.map((lane, index) => (
            <div key={`${lane}-${index}`} className="contents">
              <div className="border border-white/12 bg-background p-4">
                <p className="font-mono text-xs uppercase text-body">lane {index + 1}</p>
                <p className="mt-2 text-lg font-semibold text-heading">{lane}</p>
              </div>
              {index < activePatch.path.length - 1 && (
                <ArrowRight className="hidden h-5 w-5 text-body sm:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 border-t border-border pt-5">
          <TerminalSquare className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-body">
            Output: <span className="text-heading">{activePatch.output}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageSample() {
  const [activePatchId, setActivePatchId] = useState<PatchId>("publish");
  const activePatch = PATCHES.find((patch) => patch.id === activePatchId) ?? PATCHES[0];

  useCanonical("/uipass-home-sample");
  useMetaTags({
    title: "UnClick homepage sample",
    description:
      "A UIPass and UXPass homepage sample for UnClick, focused on a distinctive AI patchbay direction.",
    ogTitle: "UnClick homepage sample",
    ogDescription:
      "A sample homepage direction showing UnClick as the patchbay between AI, tools, memory, and safeguards.",
    ogUrl: "https://unclick.world/uipass-home-sample",
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <Navbar />

      <main>
        <section className="relative min-h-[88svh] overflow-hidden border-b border-border px-5 pb-16 pt-32 sm:px-6">
          <PatchbayHero activePatch={activePatch} />
          <div
            className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--background)/0.94)_34%,hsl(var(--background)/0.64)_58%,transparent_100%)] sm:w-[62rem]"
            aria-hidden="true"
          />

          <div className="relative z-10 grid min-h-[calc(88svh-8rem)] items-center">
            <div className="max-w-3xl">
              <FadeIn>
                <div className="mb-5 inline-flex items-center gap-2 border border-primary/35 bg-black/45 px-4 py-2 text-xs font-medium uppercase text-primary backdrop-blur">
                  <Link2 className="h-3.5 w-3.5" />
                  AI patchbay
                </div>
              </FadeIn>

              <FadeIn delay={0.05}>
                <h1 className="text-5xl font-semibold leading-none text-heading sm:text-7xl md:text-8xl">
                  UnClick
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-body sm:text-2xl">
                  Plug an AI seat into tools, memory, checks, and human boundaries from one live board.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#sample-run" className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                    Patch a run
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    to="/"
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-black/35 px-6 py-3 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:bg-card/70"
                  >
                    Compare current homepage
                    <Route className="h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section id="sample-run" className="px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <p className="font-mono text-xs uppercase text-primary">Sample four</p>
              <h2 className="mt-3 text-3xl font-semibold text-heading sm:text-4xl">
                A patchbay, not a page about AI.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-body">
                This direction stops selling an abstract promise. It makes UnClick feel like the wiring layer where agents connect to real work.
              </p>
            </div>

            <PatchControl activePatch={activePatch} onSelect={setActivePatchId} />
          </div>
        </section>

        <section className="border-y border-border bg-secondary/30 px-5 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-3 md:grid-cols-4">
              {RULES.map((rule) => (
                <div key={rule} className="border border-border bg-background p-5">
                  <MousePointerClick className="h-5 w-5 text-primary" />
                  <p className="mt-5 text-base font-semibold text-heading">{rule}</p>
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
