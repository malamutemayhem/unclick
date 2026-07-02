import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { SITE_STATS } from "@/config/site-stats";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option G: the manifesto. Almost no interface at all: giant type,
 * one kinetic verb, a wall of app names, three statements, the mark.
 * The fastest possible read of what UnClick is.
 */

const VERBS = ["send", "pay", "book", "fix", "ship", "check"];

function KineticVerb() {
  const reduced = useReducedMotion() ?? false;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setIdx((v) => (v + 1) % VERBS.length), 1500);
    return () => window.clearInterval(t);
  }, [reduced]);

  return (
    <span className="relative inline-flex items-baseline">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={VERBS[idx]}
          initial={reduced ? false : { y: "0.6em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: "-0.5em", opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-r from-[#61c1c4] via-[#86dadd] to-[#bdeff0] bg-clip-text text-transparent"
        >
          {VERBS[idx]}.
        </motion.span>
      </AnimatePresence>
      <motion.span
        key={`tick-${VERBS[idx]}`}
        initial={reduced ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.55, type: "spring", stiffness: 400, damping: 18 }}
        className="ml-4 inline-flex h-[0.55em] w-[0.55em] items-center justify-center self-center rounded-full border-2 border-primary/60 text-primary"
        aria-hidden="true"
      >
        <Check className="h-[55%] w-[55%]" strokeWidth={3.2} />
      </motion.span>
    </span>
  );
}

/* The catalog as a word-wall: weight and tint carry the scale. */
const WALL = [
  "Gmail", "GitHub", "Stripe", "Slack", "Spotify", "Notion", "Shopify", "Vercel",
  "Discord", "Telegram", "Xero", "Linear", "Figma", "OpenAI", "Calendly", "Mailchimp",
  "YouTube", "Reddit", "HubSpot", "Trello", "Jira", "Etsy", "eBay", "PayPal",
  "Airtable", "Dropbox", "Todoist", "Zendesk", "Miro", "Webflow", "WordPress", "Square",
  "Wise", "Typeform", "Pinterest", "Twilio", "Sentry", "Netlify", "NASA", "Whatsapp",
];

function WordWall() {
  return (
    <p
      aria-label={`${SITE_STATS.TOOLS_DISPLAY} apps in the catalog`}
      className="mx-auto max-w-3xl text-center leading-[1.9]"
    >
      {WALL.map((word, i) => (
        <span
          key={word}
          className={cn(
            "mx-2 inline-block font-semibold tracking-tight",
            i % 7 === 0 && "text-2xl text-heading",
            i % 7 === 1 && "text-base text-body/70",
            i % 7 === 2 && "text-lg text-primary/80",
            i % 7 === 3 && "text-sm text-muted-foreground/60",
            i % 7 === 4 && "text-xl text-body",
            i % 7 === 5 && "text-base text-primary/60",
            i % 7 === 6 && "text-lg text-body/80",
          )}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

function Statement({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <section className="px-6 py-24 text-center sm:py-28">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-[-0.025em] text-heading [text-wrap:balance] sm:text-6xl">
            {children}
          </h2>
        </FadeIn>
        {sub && (
          <FadeIn delay={0.12}>
            <p className="mx-auto mt-6 max-w-md font-mono text-[11px] uppercase tracking-[0.2em] text-primary/70">
              {sub}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

const HomePreviewG = () => {
  useCanonical("/home-preview-g");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Your AI can think. Now it can send, pay, book, fix, ship, and check, with receipts. Every tool. One install.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Your AI can think. Now it can do.",
    ogUrl: "https://unclick.world/home-preview-g",
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
      <OptionRibbon active="g" />

      <main>
        {/* ── Hero: the verb ─────────────────────────────────────── */}
        <section className="relative flex min-h-[min(90svh,820px)] items-center overflow-hidden px-6 pb-16 pt-28">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-8 text-5xl font-extrabold leading-[1.06] tracking-[-0.03em] text-heading sm:text-7xl">
                <span className="[text-wrap:balance]">Your AI can{" "}think.</span>
                <br />
                <span className="whitespace-nowrap">
                  Now it can <KineticVerb />
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-12 flex justify-center">
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
        </section>

        {/* ── The catalog, as words ──────────────────────────────── */}
        <section className="px-6 py-20">
          <FadeIn>
            <WordWall />
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-primary/70">
              {SITE_STATS.ENDPOINTS_DISPLAY} actions · {SITE_STATS.TOOLS_DISPLAY} apps · one connection
            </p>
          </FadeIn>
        </section>

        {/* ── Three statements ───────────────────────────────────── */}
        <Statement sub="memory">It remembers. You stop repeating yourself.</Statement>
        <Statement sub="the gate and the receipt">
          Checked before it runs. Proven after.
        </Statement>
        <Statement sub="the team">
          Not one bot. A whole team.
        </Statement>

        {/* ── The mark ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-28 text-center">
          <div className="hp-floor !bottom-auto !top-0 rotate-180 opacity-60" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <FadeIn>
              <h2 className="text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-heading sm:text-7xl">
                Where AI <GradientText>belongs.</GradientText>
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

export default HomePreviewG;
