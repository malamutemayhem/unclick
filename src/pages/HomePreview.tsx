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
import RunRail, { ASK } from "@/components/home-preview/RunRail";
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

function TypedAsk() {
  const reduced = useReducedMotion() ?? false;
  const [chars, setChars] = useState(reduced ? ASK.length : 0);
  const done = chars >= ASK.length;

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const start = window.setTimeout(() => {
      const tick = window.setInterval(() => {
        i += 1;
        setChars(i);
        if (i >= ASK.length) window.clearInterval(tick);
      }, 45);
    }, 700);
    return () => window.clearTimeout(start);
  }, [reduced]);

  return (
    <div className="mx-auto inline-flex items-center gap-2.5 rounded-xl border border-[#86dadd]/20 bg-[#071e29]/90 px-5 py-3.5 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.85),0_0_50px_-20px_rgba(97,193,196,0.45)] backdrop-blur-md">
      <span className="hp-live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
      <span className="font-mono text-sm text-primary/70">you ›</span>
      <span className="font-mono text-sm text-heading sm:text-base">
        {ASK.slice(0, chars)}
        {!done && <span className="hp-caret" aria-hidden="true" />}
      </span>
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
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[#071e29]/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:bg-[#0a2c3c]"
        >
          <Eye className="h-3.5 w-3.5 shrink-0" />
          <span className="whitespace-nowrap">design preview · view current</span>
        </Link>
      </div>

      <main>
        {/* ── Hero: eight words and one ask ──────────────────────── */}
        <section className="relative flex min-h-[88svh] items-center overflow-hidden px-6 pb-20 pt-28 sm:min-h-[92svh]">
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
                  follow the run
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
