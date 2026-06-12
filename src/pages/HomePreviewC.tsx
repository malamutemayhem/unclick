import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Check, ShieldCheck, Sparkles } from "lucide-react";
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
 * Option C: the conversation. The homepage IS a chat thread: three
 * asks, three replies, every reply ending in evidence. No diagrams,
 * no stations; the product is shown as the one interface everyone on
 * earth already knows how to read. Headline angle: "Just ask."
 */

type Chip = { label: string; kind: "app" | "gate" | "pass" | "memory" };

type Exchange = {
  ask: string;
  reply: string;
  chips: Chip[];
};

/* Non-breaking spaces glue final word pairs (no-hangers rule). */
const EXCHANGES: Exchange[] = [
  {
    ask: "What needs me this morning?",
    reply:
      "Three things. I drafted the two replies that matter and flagged a calendar clash.",
    chips: [
      { label: "Gmail", kind: "app" },
      { label: "Calendar", kind: "app" },
      { label: "remembered your tone", kind: "memory" },
      { label: "receipt saved", kind: "pass" },
    ],
  },
  {
    ask: "Pay the cleaner on Friday",
    reply:
      "Scheduled. The payment gate held it until you tapped yes, then it went through.",
    chips: [
      { label: "gate · you approved", kind: "gate" },
      { label: "Xero", kind: "app" },
      { label: "receipt saved", kind: "pass" },
    ],
  },
  {
    ask: "Keep things moving overnight",
    reply:
      "Done while you slept: two checks ran, one fix shipped, and the next job is already queued.",
    chips: [
      { label: "the team", kind: "memory" },
      { label: "checked twice", kind: "gate" },
      { label: "pass", kind: "pass" },
    ],
  },
];

function ChipBadge({ chip }: { chip: Chip }) {
  const icon = {
    app: <Check className="h-2.5 w-2.5" />,
    gate: <ShieldCheck className="h-2.5 w-2.5" />,
    pass: <BadgeCheck className="h-2.5 w-2.5" />,
    memory: <Sparkles className="h-2.5 w-2.5" />,
  }[chip.kind];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]",
        chip.kind === "gate" && "border-amber-400/30 bg-amber-400/[0.07] text-amber-200/90",
        chip.kind === "pass" && "border-primary/40 bg-primary/[0.1] font-bold uppercase tracking-[0.1em] text-primary",
        (chip.kind === "app" || chip.kind === "memory") &&
          "border-white/[0.1] bg-[#06202c]/80 text-body/90",
      )}
    >
      {icon}
      {chip.label}
    </span>
  );
}

function Bubble({
  side,
  children,
  delay = 0,
}: {
  side: "you" | "ai";
  children: React.ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className={cn("flex w-full", side === "you" ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] sm:max-w-[70%]",
          side === "you" ? "text-right" : "text-left",
        )}
      >
        <span className="mb-1 block px-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground/60">
          {side === "you" ? "you" : "your AI, on UnClick"}
        </span>
        <div
          className={cn(
            "rounded-2xl border px-5 py-3.5 text-left text-[15px] leading-relaxed backdrop-blur-md",
            side === "you"
              ? "rounded-br-md border-primary/35 bg-primary/[0.13] text-heading"
              : "rounded-bl-md border-white/[0.1] bg-[#0a2c3c]/85 text-body shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)]",
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

const HomePreviewC = () => {
  useCanonical("/home-preview-c");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Just ask. UnClick turns asking into done: every app, your memory, checked both ways, receipts included.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Just ask. UnClick turns asking into done.",
    ogUrl: "https://unclick.world/home-preview-c",
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
      <OptionRibbon active="c" />

      <main>
        {/* ── Hero: two words ────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-10 pt-32 text-center sm:pt-40">
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
              <h1 className="mt-6 text-6xl font-extrabold leading-[1.0] tracking-[-0.03em] text-heading sm:text-8xl">
                Just <GradientText>ask.</GradientText>
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mx-auto mt-6 max-w-md text-lg text-body [text-wrap:balance]">
                UnClick turns asking into done. Every app, your memory, receipts{"\u00A0"}included.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── The thread ─────────────────────────────────────────── */}
        <section aria-label="A conversation with your AI" className="px-6 py-12">
          <div className="mx-auto flex max-w-2xl flex-col gap-7">
            {EXCHANGES.map((exchange, i) => (
              <div key={i} className="flex flex-col gap-3.5">
                <Bubble side="you">{exchange.ask}</Bubble>
                <Bubble side="ai" delay={0.18}>
                  <p>{exchange.reply}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exchange.chips.map((chip) => (
                      <ChipBadge key={chip.label} chip={chip} />
                    ))}
                  </div>
                </Bubble>
              </div>
            ))}
          </div>
        </section>

        {/* ── The point ──────────────────────────────────────────── */}
        <section className="px-6 py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-5xl">
                Every answer ends with a{"\u00A0"}receipt.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-5 max-w-md text-body [text-wrap:balance]">
                Any AI you already use. Every app you already have. Checked before it runs, proven{"\u00A0"}after.
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

export default HomePreviewC;
