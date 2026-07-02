import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, User } from "lucide-react";
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
 * Option H: the table. The deck's round-table slide as the hero,
 * top down: UnClick IS the table, every AI gets a seat, and so do
 * you. Multiple AIs connected at once is the whole story.
 */

const SEATS = [
  { name: "ChatGPT", human: false },
  { name: "Claude", human: false },
  { name: "you", human: true },
  { name: "Copilot", human: false },
  { name: "Cursor", human: false },
  { name: "Windsurf", human: false },
  { name: "your local model", human: false },
  { name: "your team", human: true },
];

function RoundTable() {
  const reduced = useReducedMotion() ?? false;
  const cx = 50;
  const cy = 50;
  const rx = 38;
  const ry = 30;

  return (
    <div className="relative mx-auto aspect-[10/8] w-full max-w-[620px]">
      {/* The table: UnClick itself */}
      <div
        className="absolute left-1/2 top-1/2 h-[52%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/40 bg-gradient-to-br from-[#0a2c3c]/90 to-[#06202c]/95 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85),inset_0_0_60px_-20px_hsl(182_46%_57%/0.25)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[40%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/15"
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="text-xl font-extrabold tracking-tight text-heading sm:text-2xl">
          UnClick
        </span>
        <span className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-primary/60">
          the table
        </span>
      </div>

      {/* Seats around the ellipse */}
      {SEATS.map((seat, i) => {
        const angle = (Math.PI * 2 * i) / SEATS.length - Math.PI / 2;
        const x = cx + rx * Math.cos(angle);
        const y = cy + ry * Math.sin(angle);
        return (
          <motion.div
            key={seat.name}
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.15 + i * 0.09 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-full border py-1.5 pl-2 pr-3 text-[11.5px] backdrop-blur-sm sm:text-[12.5px]",
                seat.human
                  ? "border-primary/55 bg-primary/[0.16] font-semibold text-heading shadow-[0_0_24px_-6px_hsl(182_46%_57%/0.6)]"
                  : "border-white/[0.1] bg-[#06202c]/85 text-body",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border",
                  seat.human
                    ? "border-primary/60 bg-primary/20 text-primary"
                    : "border-primary/25 bg-primary/[0.08] text-primary/80",
                )}
                aria-hidden="true"
              >
                {seat.human ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
              </span>
              {seat.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

const HomePreviewH = () => {
  useCanonical("/home-preview-h");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Give your AI a seat at the table. Every AI you use, your team, and every app, around one table: UnClick.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Give your AI a seat at the table.",
    ogUrl: "https://unclick.world/home-preview-h",
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
      <OptionRibbon active="h" />

      <main>
        {/* ── Hero: the table ────────────────────────────────────── */}
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
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-[-0.025em] text-heading [text-wrap:balance] sm:text-6xl">
                Give your AI a seat at{" "}the{" "}
                <GradientText>table.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-12">
                <RoundTable />
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="mx-auto mt-8 max-w-md text-body [text-wrap:balance]">
                Every AI you use, all at the same table. Same memory, same rules, same{" "}receipts.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex justify-center">
                <a
                  href="#install"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
                >
                  Pull up a chair
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── What's on the table ────────────────────────────────── */}
        <section className="px-6 py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-heading [text-wrap:balance] sm:text-4xl">
                And on the table: every{" "}app.
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

export default HomePreviewH;
