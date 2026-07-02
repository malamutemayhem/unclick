import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Bot,
  CalendarClock,
  Check,
  Inbox,
  Moon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
 * Option E: the story. A day with UnClick told as four timestamped
 * panels, comic-strip rhythm, deck-style warmth. Each panel is a
 * small staged scene (CSS diorama) with one caption line. The honest
 * blocked moment gets its own frame on purpose.
 */

function Panel({
  time,
  caption,
  index,
  children,
}: {
  time: string;
  caption: string;
  index: number;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-[#86dadd]/15 bg-[#071e29]/85 backdrop-blur-sm"
    >
      <span className="hp-cross left-2 top-2" aria-hidden="true" />
      <span className="hp-cross bottom-2 right-2" aria-hidden="true" />
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70">
          {time}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
          frame {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="flex min-h-[170px] items-center justify-center p-6">{children}</div>
      <figcaption className="border-t border-white/[0.06] px-4 py-3 text-center text-[14px] text-body [text-wrap:balance]">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

function SceneMorning() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground/70">
        <Inbox className="h-4 w-4 text-primary/70" /> overnight inbox · 14
      </div>
      {["reply to Dana (drafted)", "invoice query (drafted)", "calendar clash (flagged)"].map(
        (line, i) => (
          <div
            key={line}
            className="flex items-center gap-2 rounded-md border border-white/[0.07] bg-[#06202c]/70 px-3 py-1.5 font-mono text-[11px] text-body"
          >
            <span className="w-3 text-right tabular-nums text-primary/70">{i + 1}</span>
            {line}
            <Check className="ml-auto h-3 w-3 text-primary/80" />
          </div>
        ),
      )}
    </div>
  );
}

function SceneBlocked() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-[#06202c]/80">
          <Bot className="h-5 w-5 text-body/80" />
        </span>
        <span className="font-mono text-[11px] text-muted-foreground/70">wants to spend $740</span>
      </div>
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 360, damping: 18, delay: 0.25 }}
        className="flex items-center gap-2 rounded-lg border-2 border-red-400/50 bg-red-400/[0.08] px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-red-200"
      >
        <ShieldCheck className="h-4 w-4" />
        blocked · over your cap
      </motion.div>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
        it asked you first
      </span>
    </div>
  );
}

function SceneShipped() {
  return (
    <div className="relative flex w-full max-w-xs flex-col gap-1.5 rounded-lg border border-primary/30 bg-primary/[0.06] p-4 pr-20">
      <p className="font-mono text-[11px] leading-5 text-body">fix shipped to the site</p>
      <p className="font-mono text-[11px] leading-5 text-body">five checks, all green</p>
      <p className="font-mono text-[11px] leading-5 text-body">receipt saved for you</p>
      <motion.span
        initial={{ scale: 1.8, opacity: 0, rotate: 5 }}
        whileInView={{ scale: 1, opacity: 1, rotate: -7 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.3 }}
        className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded border-2 border-primary/80 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary"
      >
        <BadgeCheck className="h-3 w-3" />
        pass
      </motion.span>
    </div>
  );
}

function SceneNight() {
  const roles = ["researcher", "designer", "copywriter"];
  return (
    <div className="flex flex-col items-center gap-3.5">
      <Moon className="h-5 w-5 text-primary/60" aria-hidden="true" />
      <div className="flex flex-wrap justify-center gap-1.5">
        {roles.map((role, i) => (
          <motion.span
            key={role}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.12 }}
            className="inline-flex items-center gap-1.5 rounded border border-primary/20 bg-primary/[0.07] px-2 py-1 font-mono text-[10px] text-primary/90"
          >
            <Bot className="h-3 w-3" />
            {role}
          </motion.span>
        ))}
      </div>
      <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground/70">
        <CalendarClock className="h-3.5 w-3.5 text-primary/60" />
        3 jobs queued for tomorrow
      </div>
    </div>
  );
}

const PANELS = [
  {
    time: "7:58 am",
    caption: "It already sorted the morning. You read three lines, not forty emails.",
    scene: <SceneMorning />,
  },
  {
    time: "11:30 am",
    caption: "It tried to overspend. The gate said no, and asked you instead.",
    scene: <SceneBlocked />,
  },
  {
    time: "2:14 pm",
    caption: "Shipped, checked five ways, receipt in your pocket.",
    scene: <SceneShipped />,
  },
  {
    time: "overnight",
    caption: "The team kept working. Tomorrow is already lighter.",
    scene: <SceneNight />,
  },
];

const HomePreviewE = () => {
  useCanonical("/home-preview-e");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "A day with UnClick: sorted mornings, honest blocks, shipped work with receipts, and a team that works overnight.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "A day with UnClick.",
    ogUrl: "https://unclick.world/home-preview-e",
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
      <OptionRibbon active="e" />

      <main>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-12 pt-32 text-center sm:pt-40">
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
                A day with <GradientText>UnClick.</GradientText>
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mx-auto mt-6 max-w-md text-lg text-body [text-wrap:balance]">
                Four frames from an ordinary Tuesday. Yours could look like this.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── The strip ──────────────────────────────────────────── */}
        <section aria-label="A day with UnClick, in four frames" className="px-6 py-10">
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {PANELS.map((panel, i) => (
              <Panel key={panel.time} time={panel.time} caption={panel.caption} index={i + 1}>
                {panel.scene}
              </Panel>
            ))}
          </div>
        </section>

        {/* ── Closer ─────────────────────────────────────────────── */}
        <section className="px-6 py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-5xl">
                Tomorrow runs itself.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-5 max-w-md text-body [text-wrap:balance]">
                Every tool. One install. Receipts for all of it.
              </p>
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

export default HomePreviewE;
