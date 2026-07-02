import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, BadgeCheck, Bot, Sparkles, User } from "lucide-react";
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
 * Option I: the team brain. The story none of the others tell: a
 * human team where every person's AI is wired into the same UnClick
 * layer, so the whole team shares one memory, one set of rules, and
 * one record of what happened.
 */

const PEOPLE = [
  { name: "You", ai: "Claude" },
  { name: "Sam", ai: "ChatGPT" },
  { name: "Priya", ai: "Cursor" },
];

function TeamWiring() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* People row */}
      <div className="grid grid-cols-3 gap-3">
        {PEOPLE.map((person, i) => (
          <motion.div
            key={person.name}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-[#86dadd]/15 bg-[#071e29]/85 px-3 py-4 backdrop-blur-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-primary/[0.12] text-primary">
              <User className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-heading">{person.name}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-[#06202c]/80 px-2 py-0.5 font-mono text-[10px] text-body/80">
              <Bot className="h-3 w-3 text-primary/70" />
              {person.ai}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Wires down */}
      <div className="grid grid-cols-3" aria-hidden="true">
        {PEOPLE.map((person) => (
          <div key={person.name} className="flex justify-center">
            <span className="h-8 w-px bg-gradient-to-b from-primary/50 to-primary/20" />
          </div>
        ))}
      </div>

      {/* The shared layer */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: 0.4 }}
        className="rounded-xl border border-primary/40 bg-gradient-to-br from-[#0a2c3c]/95 to-[#06202c]/95 px-6 py-5 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85),0_0_50px_-20px_hsl(182_46%_57%/0.4)]"
      >
        <span className="text-lg font-extrabold tracking-tight text-heading">UnClick</span>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary/75">
          <span>one memory</span>
          <span className="h-3 w-px bg-primary/30" aria-hidden="true" />
          <span>one set of rules</span>
          <span className="h-3 w-px bg-primary/30" aria-hidden="true" />
          <span>one record</span>
        </div>
      </motion.div>
    </div>
  );
}

const HANDOFF = [
  {
    who: "Sam's AI",
    line: "Chased the Acme invoice, drafted the follow-up.",
    chip: "receipt saved",
  },
  {
    who: "your AI, next morning",
    line: "Picking up from Sam: follow-up approved and sent. Nothing repeated, nothing lost.",
    chip: "same memory",
  },
];

function HandoffDemo() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-3">
      {HANDOFF.map((msg, i) => (
        <motion.div
          key={msg.who}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.4, delay: 0.12 + i * 0.25 }}
        >
          <span className="mb-1 block px-1 text-left font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground/60">
            {msg.who}
          </span>
          <div className="rounded-2xl rounded-bl-md border border-white/[0.1] bg-[#0a2c3c]/85 px-5 py-3.5 text-left text-[14.5px] leading-relaxed text-body backdrop-blur-md">
            {msg.line}
            <div className="mt-2.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]",
                  i === 0
                    ? "border-primary/40 bg-primary/[0.1] font-bold uppercase tracking-[0.1em] text-primary"
                    : "border-white/[0.1] bg-[#06202c]/80 text-body/90",
                )}
              >
                {i === 0 ? <BadgeCheck className="h-2.5 w-2.5" /> : <Sparkles className="h-2.5 w-2.5" />}
                {msg.chip}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const HomePreviewI = () => {
  useCanonical("/home-preview-i");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "One brain for the whole team. Everyone's AI shares the same memory, the same rules, and the same record of what happened.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "One brain. The whole team.",
    ogUrl: "https://unclick.world/home-preview-i",
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
      <OptionRibbon active="i" />

      <main>
        {/* ── Hero: the wiring ───────────────────────────────────── */}
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
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.025em] text-heading sm:text-7xl">
                One brain.
                <br />
                <GradientText>The whole{" "}team.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="mt-12">
                <TeamWiring />
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="mt-9 flex justify-center">
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Wire your team in
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── The handoff ────────────────────────────────────────── */}
        <section className="px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-4xl">
                Your AI knows what Sam's AI{" "}did.
              </h2>
            </FadeIn>
            <div className="mt-10">
              <HandoffDemo />
            </div>
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-9 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                <ArrowDown className="h-3 w-3 text-primary/60" aria-hidden="true" />
                every job lands in one shared room
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

export default HomePreviewI;
