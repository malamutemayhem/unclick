import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Check, HelpCircle, ShieldCheck, X } from "lucide-react";
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
 * Option F: the split. Same AI, two endings: without UnClick and
 * with it. The hero is a sweepable comparison (drag the divider) and
 * the body is three honest pairs. Persuasion by contrast instead of
 * explanation.
 */

function WorldWithout() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-6 sm:p-8">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300/80">
        your AI alone
      </span>
      {[
        { icon: HelpCircle, text: "Who's Dana again?" },
        { icon: HelpCircle, text: "I can't open your calendar." },
        { icon: X, text: "I think the email sent?" },
      ].map((row) => (
        <div
          key={row.text}
          className="flex items-center gap-2.5 rounded-lg border border-red-400/20 bg-red-400/[0.05] px-3.5 py-2.5 text-[13px] text-red-100/80"
        >
          <row.icon className="h-3.5 w-3.5 shrink-0 text-red-300/80" />
          {row.text}
        </div>
      ))}
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-red-200/50">
        no memory · no hands · no record
      </span>
    </div>
  );
}

function WorldWith() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 bg-[#06202c]/60 p-6 sm:p-8">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
        the same AI, on UnClick
      </span>
      {[
        { icon: Check, text: "Dana, your Tuesday client. Replied in your tone." },
        { icon: ShieldCheck, text: "Calendar clash found. Fix approved by you." },
        { icon: BadgeCheck, text: "Sent, checked, receipt saved." },
      ].map((row) => (
        <div
          key={row.text}
          className="flex items-center gap-2.5 rounded-lg border border-primary/25 bg-primary/[0.06] px-3.5 py-2.5 text-[13px] text-body"
        >
          <row.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
          {row.text}
        </div>
      ))}
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/60">
        memory · hands · receipts
      </span>
    </div>
  );
}

function SplitStage() {
  const reduced = useReducedMotion() ?? false;
  const [percent, setPercent] = useState(50);

  return (
    <div className="relative">
      <div
        className="relative h-[330px] overflow-hidden rounded-2xl border border-[#86dadd]/15 bg-[#0a1c26]/80 shadow-[0_40px_90px_-32px_rgba(0,0,0,0.8)] backdrop-blur-sm sm:h-[300px]"
        aria-label="Comparison: your AI alone versus the same AI on UnClick"
      >
        <div className="absolute inset-0">
          <WorldWithout />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
        >
          <WorldWith />
        </div>

        {/* Divider */}
        <div
          className="pointer-events-none absolute bottom-0 top-0 w-px bg-primary/70 shadow-[0_0_18px_2px_hsl(182_46%_57%/0.5)]"
          style={{ left: `${percent}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-[#071e29] font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-primary">
            drag
          </span>
        </div>

        <input
          type="range"
          min={6}
          max={94}
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          aria-label="Sweep between your AI alone and the same AI on UnClick"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      {!reduced && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60"
        >
          drag the line
        </motion.p>
      )}
    </div>
  );
}

const PAIRS = [
  {
    title: "Memory",
    without: "Starts blank, every single chat.",
    with: "Picks up exactly where you left off.",
  },
  {
    title: "Safety",
    without: "Hopes for the best.",
    with: "Checked before it runs. Blocked when it shouldn't.",
  },
  {
    title: "Finish",
    without: "Says it did it.",
    with: "Proves it did it, receipt included.",
  },
];

const HomePreviewF = () => {
  useCanonical("/home-preview-f");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Same AI, different ending. Without UnClick: no memory, no hands, no record. With it: memory, hands, receipts.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Same AI. Different ending.",
    ogUrl: "https://unclick.world/home-preview-f",
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
      <OptionRibbon active="f" />

      <main>
        {/* ── Hero: the sweep ────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-36">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                Same AI.
                <br />
                <GradientText>Different ending.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-12 text-left">
                <SplitStage />
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="mt-10 flex justify-center">
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Get the good ending
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Three honest pairs ─────────────────────────────────── */}
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {PAIRS.map((pair, i) => (
              <FadeIn key={pair.title} delay={0.06 * i}>
                <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#86dadd]/15 bg-[#071e29]/80 backdrop-blur-sm">
                  <span className="border-b border-white/[0.06] px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70">
                    {pair.title}
                  </span>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-start gap-2 text-[13px] text-red-100/70">
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-300/70" />
                      <span className="[text-wrap:balance]">{pair.without}</span>
                    </div>
                    <div className={cn("flex items-start gap-2 text-[13px] text-body")}>
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="[text-wrap:balance]">{pair.with}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewF;
