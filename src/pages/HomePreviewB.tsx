import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check, ShieldCheck, Sparkles } from "lucide-react";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import SystemMap from "@/components/home-preview/SystemMap";
import AppRail from "@/components/home-preview/AppRail";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * HomePreviewB: the from-scratch alternative to the run-rail demo.
 *
 * Where option A tells the story in time (one ask travels stations),
 * option B tells it in space: the whole system visible at once as a
 * living map, then a handful of big plain statements lifted straight
 * from the deck. Same brand canvas, same shared components, even
 * fewer words.
 *
 * Typography hard rule: no hangers. Headings balance their lines and
 * the final word pairs are glued with non-breaking spaces.
 */

function Band({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-6 py-20 sm:py-24", className)}>
      <div className="mx-auto max-w-3xl text-center">{children}</div>
    </section>
  );
}

function BandHeading({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn>
      <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-4xl">
        {children}
      </h2>
    </FadeIn>
  );
}

const SEATS = ["ChatGPT", "Claude", "Copilot", "Cursor", "your local model"];

function SeatChips() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      {SEATS.map((seat, i) => (
        <motion.span
          key={seat}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-[#06202c]/70 py-1.5 pl-2 pr-3.5 text-[13px] text-body"
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.1] font-mono text-[9px] font-bold text-primary"
            aria-hidden="true"
          >
            {seat[0].toUpperCase()}
          </span>
          {seat}
        </motion.span>
      ))}
    </div>
  );
}

function MemoryChips() {
  const facts = ["how you like things done", "what you said last time"];
  return (
    <div className="mx-auto mt-8 max-w-sm space-y-2 text-left">
      {facts.map((fact, i) => (
        <motion.div
          key={fact}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: 0.12 + i * 0.16 }}
          className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2 font-mono text-[12px]"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary/70" />
          <span className="text-primary/80">remembers ›</span>
          <span className="truncate text-body">{fact}</span>
        </motion.div>
      ))}
    </div>
  );
}

const GATES = [
  { name: "commands", ok: true },
  { name: "data", ok: true },
  { name: "publish", ok: true },
  { name: "secrets", ok: false },
] as const;

const CHECKS = ["works", "reads well", "safe", "honest", "looks right"];

function CheckedBothWays() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="mx-auto mt-9 flex max-w-xl flex-col items-center gap-5">
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        {GATES.map((gate, i) => (
          <motion.div
            key={gate.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.12 }}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5",
              gate.ok
                ? "border-primary/25 bg-primary/[0.05]"
                : "border-red-400/40 bg-red-400/[0.07]",
            )}
          >
            {gate.ok ? (
              <Check className="h-3.5 w-3.5 text-primary" />
            ) : (
              <ShieldCheck className="h-3.5 w-3.5 text-red-300" />
            )}
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.12em]",
                gate.ok ? "text-body/80" : "text-red-200/90",
              )}
            >
              {gate.name}
            </span>
            <span
              className={cn(
                "rounded-full px-1.5 py-px font-mono text-[8.5px] font-bold uppercase tracking-[0.1em]",
                gate.ok ? "bg-primary/15 text-primary" : "bg-red-400/20 text-red-200",
              )}
            >
              {gate.ok ? "ok" : "blocked"}
            </span>
          </motion.div>
        ))}
      </div>

      <ArrowRight className="h-4 w-4 rotate-90 text-primary/50" aria-hidden="true" />

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {CHECKS.map((check, i) => (
          <motion.span
            key={check}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.1 }}
            className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-[#06202c]/70 px-2 py-0.5 font-mono text-[10.5px] text-body"
          >
            <Check className="h-2.5 w-2.5 text-primary" />
            {check}
          </motion.span>
        ))}
        <motion.span
          initial={reduced ? false : { scale: 1.7, opacity: 0, rotate: 5 }}
          whileInView={{ scale: 1, opacity: 1, rotate: -5 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.7 }}
          className="ml-1.5 inline-flex items-center gap-1 rounded border-2 border-primary/80 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary"
        >
          <BadgeCheck className="h-3 w-3" />
          pass
        </motion.span>
      </div>
    </div>
  );
}

const ROLES = ["researcher", "designer", "copywriter", "devil's advocate"];

function RoleChips() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-1.5">
      {ROLES.map((role, i) => (
        <motion.span
          key={role}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.25, delay: 0.1 + i * 0.08 }}
          className="rounded border border-primary/20 bg-primary/[0.07] px-2.5 py-1 font-mono text-[11px] text-primary/90"
        >
          {role}
        </motion.span>
      ))}
    </div>
  );
}

const HomePreviewB = () => {
  useCanonical("/home-preview-b");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "One install gives your AI every tool, a memory that is yours, permission gates, receipts for every job, and a team that keeps going.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Every tool. One install. The whole system on one map.",
    ogUrl: "https://unclick.world/home-preview-b",
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

      {/* Preview ribbon */}
      <OptionRibbon active="b" />

      <main>
        {/* ── Hero: the whole system on one map ──────────────────── */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-36">
          <div className="hp-floor" aria-hidden="true" />
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="min-w-0 text-center lg:text-left">
              <FadeIn>
                <div className="flex justify-center lg:justify-start">
                  <Eyebrow>Universal remote for AI</Eyebrow>
                </div>
              </FadeIn>

              <FadeIn delay={0.05}>
                <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-6xl xl:text-7xl">
                  Every tool.
                  <br />
                  <GradientText>One install.</GradientText>
                </h1>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="mt-7 font-mono text-[12px] uppercase tracking-[0.2em] text-primary/75">
                  any AI · every app · proof it{" "}worked
                </p>
              </FadeIn>

              <FadeIn delay={0.18}>
                <div className="mt-9 flex justify-center lg:justify-start">
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
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.15} className="min-w-0">
              <div className="mx-auto max-w-[560px]">
                <SystemMap />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── The statements ─────────────────────────────────────── */}
        <Band>
          <BandHeading>Give your AI a seat at the{" "}table.</BandHeading>
          <SeatChips />
        </Band>

        <Band className="pt-4 sm:pt-6">
          <BandHeading>Every app you already{" "}use.</BandHeading>
        </Band>
        <div className="-mt-10">
          <AppRail />
        </div>

        <Band>
          <BandHeading>Your AI forgets everything. UnClick{" "}doesn't.</BandHeading>
          <MemoryChips />
        </Band>

        <Band className="pt-4 sm:pt-6">
          <BandHeading>
            Checked before it runs.
            <br />
            <GradientText>Checked after, with a{" "}receipt.</GradientText>
          </BandHeading>
          <CheckedBothWays />
        </Band>

        <Band>
          <BandHeading>Not one bot. A whole{" "}team.</BandHeading>
          <RoleChips />
        </Band>

        {/* ── Closer ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-28">
          <div className="hp-floor !bottom-auto !top-0 rotate-180 opacity-60" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-heading sm:text-5xl md:text-6xl">
                Where AI{" "}<GradientText>belongs.</GradientText>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <a
                href="#install"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.5)] transition-shadow hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
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

export default HomePreviewB;
