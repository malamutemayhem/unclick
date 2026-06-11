import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Bot, Hash, ShieldCheck, User } from "lucide-react";
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
 * Option L: the team room. The whole team's AIs report into one
 * shared room, humans included. The most relatable team artifact
 * there is: a group thread where the work actually lands.
 */

type RoomMsg = {
  who: string;
  human: boolean;
  text: string;
  chips?: { label: string; kind: "pass" | "gate" | "plain" }[];
};

const FEED: RoomMsg[] = [
  {
    who: "Sam's AI · ChatGPT",
    human: false,
    text: "Acme invoice chased. Friendly tone, firm on the date.",
    chips: [{ label: "receipt", kind: "pass" }],
  },
  {
    who: "Priya's AI · Cursor",
    human: false,
    text: "Broken pricing link fixed and shipped. Five checks, all green.",
    chips: [
      { label: "checked before it ran", kind: "gate" },
      { label: "pass", kind: "pass" },
    ],
  },
  {
    who: "Priya",
    human: true,
    text: "Nice. Queue the follow-ups for Monday?",
  },
  {
    who: "your AI · Claude",
    human: false,
    text: "Queued. Three follow-ups, Monday 9am. I'll report back here.",
    chips: [{ label: "queued", kind: "plain" }],
  },
];

function RoomFeed() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-[#86dadd]/18 bg-[#071e29]/90 shadow-[0_40px_90px_-32px_rgba(0,0,0,0.85)] backdrop-blur-md">
      {/* Room header */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <Hash className="h-3.5 w-3.5 text-primary/70" aria-hidden="true" />
        <span className="font-mono text-[12px] font-semibold text-heading">the-room</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
          3 people · 3 AIs
        </span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-4 px-4 py-5">
        {FEED.map((msg, i) => (
          <motion.div
            key={`${msg.who}-${i}`}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.16 }}
            className="flex items-start gap-3"
          >
            <span
              className={cn(
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                msg.human
                  ? "border-primary/55 bg-primary/[0.15] text-primary"
                  : "border-white/[0.12] bg-[#06202c]/85 text-body/80",
              )}
              aria-hidden="true"
            >
              {msg.human ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </span>
            <div className="min-w-0">
              <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/65">
                {msg.who}
              </span>
              <p
                className={cn(
                  "mt-1 text-[14px] leading-relaxed",
                  msg.human ? "font-medium text-heading" : "text-body",
                )}
              >
                {msg.text}
              </p>
              {msg.chips && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {msg.chips.map((chip) => (
                    <span
                      key={chip.label}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]",
                        chip.kind === "pass" &&
                          "border-primary/40 bg-primary/[0.1] font-bold uppercase tracking-[0.1em] text-primary",
                        chip.kind === "gate" &&
                          "border-amber-400/30 bg-amber-400/[0.07] text-amber-200/90",
                        chip.kind === "plain" && "border-white/[0.1] bg-[#06202c]/80 text-body/90",
                      )}
                    >
                      {chip.kind === "pass" && <BadgeCheck className="h-2.5 w-2.5" />}
                      {chip.kind === "gate" && <ShieldCheck className="h-2.5 w-2.5" />}
                      {chip.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const HomePreviewL = () => {
  useCanonical("/home-preview-l");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "The whole team's AI, in one room. Everyone's AI reports its work, with receipts, where the whole team can see it.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "The whole team's AI, in one room.",
    ogUrl: "https://unclick.world/home-preview-l",
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
      <OptionRibbon active="l" />

      <main>
        {/* ── Hero: the room ─────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32 text-center sm:pt-36">
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
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-[-0.025em] text-heading [text-wrap:balance] sm:text-6xl">
                The whole team's AI,
                <br />
                in <GradientText>one{" "}room.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="mt-11">
                <RoomFeed />
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="mt-10 flex justify-center">
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Open the room
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── The point ──────────────────────────────────────────── */}
        <section className="px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-4xl">
                Different AIs. Different people. One{" "}truth.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-5 max-w-md text-body [text-wrap:balance]">
                Work lands in one place with receipts, so nobody asks what the AI actually did.
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

export default HomePreviewL;
