import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import RunRail from "@/components/home-preview/RunRail";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import "@/components/home-preview/preview.css";

/**
 * HomePreview v2: the homepage redesign demo on its own route.
 *
 * Brief (2026-06-11): the moat is the whole system working together,
 * not five products on shelves. Say it with far fewer words. Keep
 * "Universal remote for AI" and "Every tool. One install." and the
 * navy + teal grid branding; everything else restarts.
 *
 * Concept: the page IS one run. The hero types a single ask, and
 * scrolling carries it down a teal rail through five stations
 * (memory, gate, apps, receipt, autopilot) to the moat statement.
 * Roughly sixty words of copy sit above the install section.
 *
 * Self-contained: new visuals live under src/components/home-preview/;
 * Navbar, InstallSection, FAQ, and Footer are imported untouched.
 * noindex while it is a design sample.
 */

/* Birds-eye, not one worked example: the bubble cycles through varied
   asks so the system reads as the subject, never a single use case. */
const ASKS = [
  "Chase that overdue invoice",
  "Plan my week",
  "Fix the broken link on my site",
  "Find me a cheaper flight",
];

function TypedAsk() {
  const reduced = useReducedMotion() ?? false;
  const [askIdx, setAskIdx] = useState(0);
  const [chars, setChars] = useState(reduced ? ASKS[0].length : 0);
  const ask = ASKS[askIdx % ASKS.length];
  const done = chars >= ask.length;

  // Type an ask, hold it, untype it, move to the next: the system
  // handles anything, so the bubble never settles on one use case.
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    (async () => {
      setChars(0);
      await sleep(askIdx === 0 ? 700 : 350);
      for (let i = 1; i <= ask.length; i++) {
        if (cancelled) return;
        setChars(i);
        await sleep(40);
      }
      await sleep(2400);
      for (let i = ask.length - 1; i >= 0; i--) {
        if (cancelled) return;
        setChars(i);
        await sleep(13);
      }
      await sleep(220);
      if (!cancelled) setAskIdx((v) => v + 1);
    })();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [askIdx, ask, reduced]);

  // A chat bubble, not a terminal: this is something you say to your
  // AI. Right-aligned with a tail, like every messaging app.
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-end gap-1.5">
      <span className="pr-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        you, to your AI
      </span>
      <div className="flex min-h-[3.25rem] items-center rounded-2xl rounded-br-md border border-primary/35 bg-primary/[0.12] px-5 py-3 text-left shadow-[0_24px_70px_-28px_rgba(0,0,0,0.85),0_0_50px_-22px_rgba(97,193,196,0.4)] backdrop-blur-md">
        <span className="text-base text-heading sm:text-lg">
          {ask.slice(0, chars)}
          {!reduced && !done && <span className="hp-caret" aria-hidden="true" />}
        </span>
      </div>
    </div>
  );
}

const HomePreview = () => {
  useCanonical("/home-preview");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "One install gives your AI every tool, a memory that is yours, permission gates, receipts for every job, and autopilot to keep it moving.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Every tool. One install. Watch one ask travel the rails.",
    ogUrl: "https://unclick.world/home-preview",
  });

  // Keep the preview out of search while it is a design sample.
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

      {/* Preview ribbon: this route is a design demo, not the live home. */}
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[#071e29]/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:bg-[#0a2c3c]"
        >
          <Eye className="h-3.5 w-3.5 shrink-0" />
          <span className="whitespace-nowrap">current</span>
        </Link>
        <Link
          to="/home-preview-b"
          className="inline-flex items-center rounded-full border border-primary/30 bg-[#071e29]/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:bg-[#0a2c3c]"
        >
          <span className="whitespace-nowrap">option b</span>
        </Link>
      </div>

      <main>
        {/* ── Hero: eight words and one ask ──────────────────────── */}
        <section className="relative flex min-h-[min(88svh,760px)] items-center overflow-hidden px-6 pb-16 pt-28 sm:min-h-[min(92svh,860px)]">
          <div className="hp-floor" aria-hidden="true" />
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                Every tool.
                <br />
                <GradientText>One install.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-12">
                <TypedAsk />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-12 flex flex-col items-center gap-6">
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
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="inline-flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.24em] text-primary/60"
                  aria-hidden="true"
                >
                  watch what happens
                  <ChevronDown className="hp-cue h-3.5 w-3.5" />
                </motion.span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── The run: one ask travels the rails ─────────────────── */}
        <RunRail />

        {/* ── Install (live component, unchanged) ─────────────────── */}
        <InstallSection />

        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreview;
