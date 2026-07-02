import { useEffect } from "react";
import {
  BadgeCheck,
  Bot,
  Brain,
  CalendarDays,
  Check,
  CreditCard,
  Github,
  Link2,
  Mail,
  MessageSquare,
  NotebookPen,
  RefreshCw,
  ShieldCheck,
  Slack,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { SITE_STATS } from "@/config/site-stats";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option S: the second session. Ground-up concept built on the
 * value-prop research verdict (2026-07-02): CONTEXT is the lead claim
 * (shipped, provable, the retention engine), COLLABORATION is the
 * second act (AI seats coordinating is shipped; human team sharing is
 * in build and labeled that way). One line carries the page: one
 * memory for every AI you use.
 *
 * Rendering budget: static DOM and whileInView fades only. No canvas,
 * no rAF loop, no backdrop filters, no per-frame work of any kind, so
 * the page costs nothing after load on any hardware.
 */

/* ── The hero split: day one vs day two ─────────────────────── */

const WITHOUT_LINES = [
  "So, tell me about your business again?",
  "Which stack are you on?",
  "Where did we leave off last time?",
];

const WITH_LINES = [
  { from: "unclick", text: "identity, facts, and yesterday's session loaded" },
  { from: "ai", text: "Morning. Picking the pricing page back up where we stopped." },
  { from: "ai", text: "Your tone, your stack, your rules: already in the room." },
];

function SessionCard({ side }: { side: "without" | "with" }) {
  const withUnclick = side === "with";
  return (
    <div
      className={cn(
        "relative flex-1 rounded-2xl border p-5 sm:p-6",
        withUnclick
          ? "border-primary/40 bg-gradient-to-b from-[#0a2c3c]/95 to-[#071e29]/95 shadow-[0_0_60px_-24px_hsl(182_46%_57%/0.55)]"
          : "border-white/[0.08] bg-[#06202c]/60",
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "font-mono text-[10px] font-semibold uppercase tracking-[0.22em]",
            withUnclick ? "text-primary/80" : "text-muted-foreground/60",
          )}
        >
          {withUnclick ? "with UnClick" : "without UnClick"}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/50">
          {withUnclick ? "session 48" : "session 47"}
        </p>
      </div>

      <div className="mt-4 space-y-2.5">
        {withUnclick
          ? WITH_LINES.map((line) =>
              line.from === "unclick" ? (
                <div
                  key={line.text}
                  className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/[0.07] px-3 py-2 font-mono text-[11.5px] text-primary/90"
                >
                  <Brain className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{line.text}</span>
                </div>
              ) : (
                <div
                  key={line.text}
                  className="rounded-lg rounded-tl-sm border border-white/[0.08] bg-[#0b3040]/80 px-3.5 py-2.5 text-[13.5px] text-body"
                >
                  {line.text}
                </div>
              ),
            )
          : WITHOUT_LINES.map((line) => (
              <div
                key={line}
                className="rounded-lg rounded-tl-sm border border-white/[0.06] bg-[#0a2531]/60 px-3.5 py-2.5 text-[13.5px] text-muted-foreground/75"
              >
                {line}
              </div>
            ))}
      </div>

      <p
        className={cn(
          "mt-4 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em]",
          withUnclick ? "text-primary/75" : "text-muted-foreground/50",
        )}
      >
        {withUnclick ? (
          <>
            <Check className="h-3 w-3" />
            one call and it knows you
          </>
        ) : (
          <>
            <RefreshCw className="h-3 w-3" />
            every session starts from zero
          </>
        )}
      </p>
    </div>
  );
}

/* ── The memory, in plain words ─────────────────────────────── */

const MEMORY_LAYERS = [
  {
    icon: Sparkles,
    name: "Standing rules",
    detail: "How you like to work, loaded first in every session.",
  },
  {
    icon: NotebookPen,
    name: "Facts and decisions",
    detail: "Saved as they happen, recalled when they matter.",
  },
  {
    icon: MessageSquare,
    name: "Where you left off",
    detail: "Each session ends with a summary the next one reads.",
  },
];

/* ── The AIs that plug in ───────────────────────────────────── */

const SEATS = [
  { name: "Sam", ai: "ChatGPT", img: "/faces/sam.svg" },
  { name: "Priya", ai: "Cursor", img: "/faces/priya.svg" },
  { name: "Sarah", ai: "Claude", img: "/faces/sarah.svg" },
  { name: "Leo", ai: "Copilot", img: "/faces/leo.svg" },
  { name: "Mia", ai: "local model", img: "/faces/mia.svg" },
];

const AI_CHIPS = ["ChatGPT", "Claude", "Cursor", "Copilot", "local model"];

const BOARD_POSTS = [
  { who: "Sarah's Claude", what: "posted: pricing copy drafted, ready for eyes", tag: "update" },
  { who: "Priya's Cursor", what: "handed off: broken link fix, tests green", tag: "handoff" },
  { who: "Sam's ChatGPT", what: "voted on: follow-up sequence idea", tag: "idea" },
];

const APPS = [
  { name: "Gmail", icon: Mail },
  { name: "Slack", icon: Slack },
  { name: "GitHub", icon: Github },
  { name: "Stripe", icon: CreditCard },
  { name: "Calendar", icon: CalendarDays },
];

const HomePreviewS = () => {
  useCanonical("/home-preview-s");
  useMetaTags({
    title: "UnClick. One memory for every AI you use.",
    description:
      "Tell it once. ChatGPT, Claude, Cursor, and your local model read the same memory, use the same tools, and pick up where the last one left off.",
    ogTitle: "UnClick. One memory for every AI you use.",
    ogDescription: "Tell it once. Every AI knows.",
    ogUrl: "https://unclick.world/home-preview-s",
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
      <OptionRibbon active="s" />

      <main>
        {/* ── Act one: the second session ─────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[860px] -translate-x-1/2 [background:radial-gradient(ellipse_closest-side,hsl(182_46%_57%/0.085),transparent_72%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.04] tracking-[-0.025em] text-heading sm:text-7xl">
                One memory.
                <br />
                <GradientText>Every AI you use.</GradientText>
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-body sm:text-xl">
                Your AI forgets you the moment a session ends. UnClick is the layer it plugs into:
                the same memory, the same tools, and the same story of your work, whichever AI you
                open next.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.18}>
            <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-4 sm:flex-row">
              <SessionCard side="without" />
              <SessionCard side="with" />
            </div>
          </FadeIn>
        </section>

        {/* ── Act two: tell it once ───────────────────────────── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                01 · memory
              </p>
              <h2 className="mt-2 max-w-xl text-3xl font-extrabold tracking-[-0.02em] text-heading sm:text-4xl">
                Tell it once.
              </h2>
            </FadeIn>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {MEMORY_LAYERS.map((layer, i) => (
                <FadeIn key={layer.name} delay={0.05 + i * 0.06}>
                  <div className="h-full rounded-2xl border border-[#86dadd]/15 bg-[#07222e]/70 p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/[0.08] text-primary">
                      <layer.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[15px] font-bold text-heading">{layer.name}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-body/85">
                      {layer.detail}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/65">
                stored in your database, yours to export or delete
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Act three: it travels ───────────────────────────── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl text-center">
            <FadeIn>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                02 · portability
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-heading sm:text-4xl">
                Switch AIs. Your memory comes with you.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] text-body">
                UnClick is not another assistant. Any compatible AI plugs in and reads the same
                memory. Change models, change tools, change your mind. Nothing resets.
              </p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="mx-auto mt-10 max-w-2xl">
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {AI_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#06202c]/90 px-3 py-1.5 font-mono text-[12px] text-body/90"
                    >
                      <Bot className="h-3.5 w-3.5 text-primary/75" />
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Static tethers: five hairlines converging on the one
                    memory card. An SVG that never changes after paint. */}
                <svg
                  viewBox="0 0 400 56"
                  preserveAspectRatio="none"
                  className="mx-auto -my-1 block h-14 w-full max-w-md"
                  aria-hidden="true"
                >
                  {[30, 115, 200, 285, 370].map((x) => (
                    <path
                      key={x}
                      d={`M ${x} 0 C ${x} 34, 200 22, 200 56`}
                      fill="none"
                      stroke="hsl(183 50% 62% / 0.35)"
                      strokeWidth="1.5"
                    />
                  ))}
                </svg>

                <div className="mx-auto flex max-w-xs items-center justify-center gap-2.5 rounded-2xl border border-primary/40 bg-gradient-to-b from-[#0a2c3c]/95 to-[#071e29]/95 px-5 py-4 shadow-[0_0_50px_-18px_hsl(182_46%_57%/0.6)]">
                  <Brain className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-left font-mono text-[12.5px] leading-snug text-body">
                    your memory
                    <span className="block text-[10.5px] uppercase tracking-[0.14em] text-primary/70">
                      one account · every seat
                    </span>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Act four: it acts, with receipts ────────────────── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="rounded-2xl border border-[#86dadd]/15 bg-[#07222e]/70 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-md">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                      03 · action
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] text-heading sm:text-3xl">
                      It remembers. It also does.
                    </h2>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-body/90">
                      {SITE_STATS.ENDPOINTS_DISPLAY} actions across {SITE_STATS.TOOLS_DISPLAY} apps,
                      behind permissions you set. Checked before it runs. A receipt after it does.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.06] px-2.5 py-1 font-mono text-[10.5px] text-primary/90">
                        <ShieldCheck className="h-3 w-3" />
                        checked before
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.06] px-2.5 py-1 font-mono text-[10.5px] text-primary/90">
                        <BadgeCheck className="h-3 w-3" />
                        receipt after
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.06] px-2.5 py-1 font-mono text-[10.5px] text-primary/90">
                        <Link2 className="h-3 w-3" />
                        sign in once
                      </span>
                    </div>
                  </div>
                  <div className="grid flex-1 grid-cols-5 gap-2 sm:max-w-xs">
                    {APPS.map((app) => (
                      <div
                        key={app.name}
                        className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.09] bg-[#06202c]/75 px-1 py-3"
                      >
                        <app.icon className="h-[18px] w-[18px] text-primary/90" />
                        <span className="font-mono text-[8.5px] uppercase tracking-[0.06em] text-muted-foreground/70">
                          {app.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Act five: the team layer ────────────────────────── */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                04 · collaboration
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-[-0.02em] text-heading sm:text-4xl">
                Every AI on the job, on the same page.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] text-body">
                Run more than one AI? They already share the memory. They also share a board:
                updates, handoffs, and ideas land in one place, whoever's seat posted them.
              </p>
            </FadeIn>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
              <FadeIn delay={0.08}>
                <div className="rounded-2xl border border-[#86dadd]/15 bg-[#07222e]/70 p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary/80" />
                    <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-primary/70">
                      the shared board
                    </p>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {BOARD_POSTS.map((post) => (
                      <div
                        key={post.what}
                        className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2.5"
                      >
                        <p className="min-w-0 text-[13px] text-body">
                          <span className="font-semibold text-heading">{post.who}</span>{" "}
                          <span className="text-body/85">{post.what}</span>
                        </p>
                        <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-primary">
                          {post.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-end justify-center gap-x-4 gap-y-3">
                    {SEATS.map((seat) => (
                      <div key={seat.name} className="flex w-[76px] flex-col items-center">
                        <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-primary/45 bg-[#07212d]/85">
                          <img src={seat.img} alt="" className="h-full w-full" />
                        </span>
                        <span className="mt-1.5 text-[11.5px] font-semibold text-body">
                          {seat.name}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-foreground/70">
                          {seat.ai}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.16}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-primary/35 bg-primary/[0.04] p-5 sm:p-6">
                  <div>
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-primary">
                      in build
                    </span>
                    <h3 className="mt-4 text-xl font-extrabold tracking-[-0.01em] text-heading">
                      Invite your team.
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-body/85">
                      Same board, same memory, their own AI subscriptions. Ten people, ten
                      different AIs, one shared floor. We run our own team on it first; you get it
                      when it holds.
                    </p>
                  </div>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
                    dogfood first · claims second
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── The close ───────────────────────────────────────── */}
        <section className="px-6 pb-4 pt-16 text-center">
          <FadeIn>
            <h2 className="mx-auto max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-heading sm:text-5xl">
              Tell it once. <GradientText>Every AI knows.</GradientText>
            </h2>
          </FadeIn>
        </section>

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewS;
