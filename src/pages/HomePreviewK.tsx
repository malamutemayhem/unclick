import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import AppRail from "@/components/home-preview/AppRail";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option K: the remote. The brand name made literal: a remote
 * control where every button is something your AI can now actually
 * do. Buttons press themselves in sequence and each press produces
 * a result with a receipt. Apps are the channels.
 */

const BUTTONS = [
  { verb: "send", result: "two emails sent, your tone" },
  { verb: "pay", result: "held at the gate until you said yes" },
  { verb: "book", result: "venue booked for Friday" },
  { verb: "fix", result: "broken link fixed, checked twice" },
  { verb: "ship", result: "update live, receipt saved" },
  { verb: "check", result: "five checks, all green" },
];

function Remote() {
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setActive((v) => (v + 1) % BUTTONS.length), 2100);
    return () => window.clearInterval(t);
  }, [reduced]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12">
      {/* The remote body */}
      <div className="relative w-[230px] shrink-0 rounded-[2rem] border border-[#86dadd]/25 bg-gradient-to-b from-[#0a2c3c]/95 to-[#061b25]/95 p-5 pb-7 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_hsl(187_60%_75%/0.12)]">
        {/* IR notch */}
        <div
          className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-primary/30 shadow-[0_0_12px_2px_hsl(182_46%_57%/0.35)]"
          aria-hidden="true"
        />

        {/* Power: the UnClick button */}
        <button
          type="button"
          aria-label="UnClick"
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary/60 bg-primary/[0.15] shadow-[0_0_30px_-6px_hsl(182_46%_57%/0.6)]"
        >
          <img src="/logo-cursor.svg" alt="" className="h-7 w-7" onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.parentElement as HTMLElement).innerHTML =
              '<span class="font-extrabold text-primary text-[11px] tracking-tight">UC</span>';
          }} />
        </button>

        {/* The verb buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          {BUTTONS.map((btn, i) => {
            const isActive = i === active;
            return (
              <button
                key={btn.verb}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-xl border px-3 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300",
                  isActive
                    ? "border-primary/70 bg-primary/[0.2] text-heading shadow-[0_0_26px_-6px_hsl(182_46%_57%/0.7)] scale-[1.04]"
                    : "border-white/[0.09] bg-[#06202c]/80 text-body/70 hover:border-primary/30 hover:text-body",
                )}
              >
                {btn.verb}
              </button>
            );
          })}
        </div>
      </div>

      {/* The result of the press */}
      <div className="flex min-h-[6.5rem] w-full max-w-xs items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={BUTTONS[active].verb}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full rounded-2xl border border-primary/30 bg-primary/[0.07] px-5 py-4 text-left backdrop-blur-sm"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
              {BUTTONS[active].verb} pressed
            </span>
            <p className="mt-1.5 text-[15px] leading-relaxed text-heading">
              {BUTTONS[active].result}
            </p>
            <span className="mt-2.5 inline-flex -rotate-2 items-center gap-1 rounded border-2 border-primary/70 px-1.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-primary">
              <BadgeCheck className="h-2.5 w-2.5" />
              receipt
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const HomePreviewK = () => {
  useCanonical("/home-preview-k");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "One remote. Everything. Press send, pay, book, fix, ship, or check, and every press comes back with a receipt.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "One remote. Everything.",
    ogUrl: "https://unclick.world/home-preview-k",
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
      <OptionRibbon active="k" />

      <main>
        {/* ── Hero: the remote itself ────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32 text-center sm:pt-36">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-4xl">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                One remote.
                <br />
                <GradientText>Everything.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-14">
                <Remote />
              </div>
            </FadeIn>

            <FadeIn delay={0.26}>
              <div className="mt-12 flex justify-center">
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Pick it up
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── The channels ───────────────────────────────────────── */}
        <section className="px-6 pb-2 pt-16 text-center">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-4xl">
                Every app is a{" "}channel.
              </h2>
            </FadeIn>
          </div>
        </section>
        <AppRail />

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewK;
