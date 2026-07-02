import { useEffect } from "react";
import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  Github,
  Link2,
  Mail,
  MessageSquare,
  NotebookPen,
  ShieldCheck,
  Slack,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import {
  AiTetherDiagram,
  InBuildTeamCard,
  SessionSplit,
  SharedBoardCard,
} from "@/components/home/second-session";
import { SITE_STATS } from "@/config/site-stats";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import "@/components/home-preview/preview.css";

/**
 * Option S: the second session. Ground-up concept built on the
 * value-prop research verdict (2026-07-02): CONTEXT is the lead claim
 * (shipped, provable, the retention engine), COLLABORATION is the
 * second act (AI seats coordinating is shipped; human team sharing is
 * in build and labeled that way). One line carries the page: one
 * memory for every AI you use.
 *
 * The scene's building blocks live in
 * src/components/home/second-session.tsx and are shared with the live
 * Memory page, which adopted this concept (operator call, 2026-07-02).
 *
 * Rendering budget: static DOM and whileInView fades only. No canvas,
 * no rAF loop, no backdrop filters, no per-frame work of any kind, so
 * the page costs nothing after load on any hardware.
 */

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
            <SessionSplit className="mx-auto mt-14 max-w-4xl" />
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
                hosted for you · export or delete any time
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
              <AiTetherDiagram className="mt-10" />
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
                <SharedBoardCard />
              </FadeIn>
              <FadeIn delay={0.16}>
                <InBuildTeamCard />
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
