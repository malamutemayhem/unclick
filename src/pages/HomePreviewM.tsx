import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Brain, ShieldCheck, Users } from "lucide-react";
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
 * Option M: the widget. Apple-inspired: the day rendered as a small
 * stack of frosted widgets, like glancing at a lock screen. One big
 * summary widget, three small ones, almost no other interface.
 */

function Widget({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-[1.7rem] border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-[0_30px_70px_-28px_rgba(0,0,0,0.85)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

function WidgetStack() {
  return (
    <div className="mx-auto grid w-full max-w-xl gap-3.5">
      {/* The big one: today */}
      <Widget>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/75">
            today
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/55">
            while you were out
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-5xl font-extrabold tabular-nums tracking-tight text-heading">3</span>
            <span className="ml-2 text-[15px] text-body">things done</span>
          </div>
          <span className="inline-flex -rotate-3 items-center gap-1 rounded border-2 border-primary/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
            <BadgeCheck className="h-3 w-3" />
            3 receipts
          </span>
        </div>
        <div className="mt-4 space-y-1.5 border-t border-white/[0.07] pt-4">
          {["invoice chased", "two replies drafted", "broken link fixed"].map((line) => (
            <p key={line} className="flex items-center gap-2 text-[13.5px] text-body">
              <span className="h-1 w-1 rounded-full bg-primary/70" aria-hidden="true" />
              {line}
            </p>
          ))}
        </div>
      </Widget>

      {/* Three small ones */}
      <div className="grid grid-cols-3 gap-3.5">
        <Widget delay={0.08} className="p-4 text-center">
          <Brain className="mx-auto h-4 w-4 text-primary/80" aria-hidden="true" />
          <p className="mt-2 text-[12px] font-semibold text-heading">Memory</p>
          <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground/60">
            up to date
          </p>
        </Widget>
        <Widget delay={0.14} className="p-4 text-center">
          <ShieldCheck className="mx-auto h-4 w-4 text-amber-300/85" aria-hidden="true" />
          <p className="mt-2 text-[12px] font-semibold text-heading">Gate</p>
          <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground/60">
            1 held for you
          </p>
        </Widget>
        <Widget delay={0.2} className="p-4 text-center">
          <Users className="mx-auto h-4 w-4 text-primary/80" aria-hidden="true" />
          <p className="mt-2 text-[12px] font-semibold text-heading">Team</p>
          <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted-foreground/60">
            2 jobs queued
          </p>
        </Widget>
      </div>
    </div>
  );
}

const HomePreviewM = () => {
  useCanonical("/home-preview-m");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "It just works. And proves it. Your AI's day at a glance: things done, receipts kept, one held for your yes.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "It just works. And proves it.",
    ogUrl: "https://unclick.world/home-preview-m",
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
      <OptionRibbon active="m" />

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
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.04] tracking-[-0.025em] text-heading [text-wrap:balance] sm:text-7xl">
                It just works.
                <br />
                <GradientText>And proves{" "}it.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-14">
                <WidgetStack />
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

export default HomePreviewM;
