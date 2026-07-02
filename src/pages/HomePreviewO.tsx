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
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option O: the switch. The most Apple interaction there is: one
 * giant toggle. Flip it and the page quietly comes alive: work
 * starts appearing underneath, with receipts. Default starts off so
 * the visitor gets the moment; reduced motion starts on.
 */

const WORK = [
  { line: "inbox sorted, two drafts ready", chip: "receipt" },
  { line: "overdue invoice chased", chip: "receipt" },
  { line: "follow-up queued for Monday", chip: "queued" },
];

function GiantSwitch() {
  const reduced = useReducedMotion() ?? false;
  const [on, setOn] = useState(reduced);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Autopilot"
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-24 w-44 rounded-full border transition-colors duration-300 sm:h-28 sm:w-52",
          on
            ? "border-primary/60 bg-primary/[0.25] shadow-[0_0_60px_-12px_hsl(182_46%_57%/0.7)]"
            : "border-white/[0.14] bg-[#06202c]/90 shadow-[inset_0_2px_14px_rgba(0,0,0,0.6)]",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className={cn(
            "absolute top-2 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] sm:h-24 sm:w-24",
            on
              ? "right-2 from-[#bdeff0] to-[#61c1c4]"
              : "left-2 from-[#1a3a4a] to-[#0d2733]",
          )}
        >
          <span
            className={cn(
              "font-mono text-[10px] font-bold uppercase tracking-[0.14em]",
              on ? "text-[#06202c]" : "text-body/50",
            )}
          >
            {on ? "on" : "off"}
          </span>
        </motion.span>
      </button>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.24em] text-primary/75">
        autopilot
      </p>

      {/* What turns on */}
      <div className="mt-9 min-h-[10.5rem] w-full">
        <AnimatePresence>
          {on && (
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {WORK.map((item, i) => (
                <motion.div
                  key={item.line}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: reduced ? 0 : 0.25 + i * 0.3 }}
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#071e29]/85 px-4 py-3 text-left backdrop-blur-sm"
                >
                  <span className="text-[13.5px] text-body">{item.line}</span>
                  <span
                    className={cn(
                      "ml-3 inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em]",
                      item.chip === "receipt"
                        ? "border-primary/40 bg-primary/[0.1] font-bold text-primary"
                        : "border-white/[0.1] bg-[#06202c]/80 text-muted-foreground",
                    )}
                  >
                    {item.chip === "receipt" && <BadgeCheck className="h-2.5 w-2.5" />}
                    {item.chip}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {!on && (
          <p className="pt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/45">
            flip it
          </p>
        )}
      </div>
    </div>
  );
}

const HomePreviewO = () => {
  useCanonical("/home-preview-o");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Flip one switch. Work starts finishing itself, with receipts, and anything risky waits for your yes.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Flip one switch.",
    ogUrl: "https://unclick.world/home-preview-o",
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
      <OptionRibbon active="o" />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-32 text-center sm:pt-40">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-3xl">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                Flip one <GradientText>switch.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="mt-14">
                <GiantSwitch />
              </div>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p className="mx-auto mt-6 max-w-sm text-body [text-wrap:balance]">
                Anything risky still waits for your{" "}yes.
              </p>
            </FadeIn>

            <FadeIn delay={0.28}>
              <div className="mt-9 flex justify-center">
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Get started
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewO;
