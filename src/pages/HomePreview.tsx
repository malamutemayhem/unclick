import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import RunConsole from "@/components/home-preview/RunConsole";
import AppRail from "@/components/home-preview/AppRail";
import RailsBento from "@/components/home-preview/RailsBento";
import CompareStrip from "@/components/home-preview/CompareStrip";
import ProofBand from "@/components/home-preview/ProofBand";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { SITE_STATS } from "@/config/site-stats";
import "@/components/home-preview/preview.css";

/**
 * HomePreview: the proposed homepage redesign, served on its own
 * route so it can be compared against the live homepage before it
 * replaces anything. Self-contained on purpose: every new visual
 * lives under src/components/home-preview/ and this page; shared
 * components (Navbar, InstallSection, FAQ, Footer) are imported
 * untouched so form and function carry over exactly.
 *
 * Design thesis: UnClick is the rails between an AI and the real
 * world, so the homepage should look like the rails operating.
 * One set piece (the live run console), one motif (the blueprint
 * grid), the same navy + teal deck palette, and real catalog
 * numbers. noindex while it is a preview.
 */

function Station({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary/80 shadow-[0_0_12px_2px_hsl(182_46%_57%/0.5)]" />
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/70">
        rail {index} · {label}
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-primary/80 shadow-[0_0_12px_2px_hsl(182_46%_57%/0.5)]" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
    </div>
  );
}

const HomePreview = () => {
  useCanonical("/home-preview");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "One install gives your AI agent every tool, memory that remembers, signed permissions, and built-in proof the work was done right.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription:
      "Every tool. Persistent memory. Signed permissions. Built-in proof. One install.",
    ogUrl: "https://unclick.world/home-preview",
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

      {/* Preview ribbon: this route is a design demo, not the live home. */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-[#071e29]/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:bg-[#0a2c3c]"
        >
          <Eye className="h-3.5 w-3.5 shrink-0" />
          <span className="whitespace-nowrap">design preview · view current</span>
        </Link>
      </div>

      <main>
        {/* ── Hero: the live run ─────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-36">
          <div className="hp-floor" aria-hidden="true" />
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
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
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-body lg:mx-0">
                  UnClick gives your AI agent every tool it needs, memory that
                  remembers, and built-in proof the work was done right.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
                  <Link
                    to="/why"
                    className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-6 py-3.5 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:bg-card/70"
                  >
                    <Play className="h-3.5 w-3.5 text-primary" />
                    Why UnClick
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground lg:justify-start">
                  <span>{SITE_STATS.ENDPOINTS_DISPLAY} endpoints</span>
                  <span className="h-3 w-px bg-border/80" aria-hidden="true" />
                  <span>{SITE_STATS.TOOLS_DISPLAY} apps</span>
                  <span className="h-3 w-px bg-border/80" aria-hidden="true" />
                  <span>one URL to install</span>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.18} className="min-w-0">
              <RunConsole />
            </FadeIn>
          </div>
        </section>

        {/* ── App ticker ─────────────────────────────────────────── */}
        <AppRail />

        {/* ── The rails (bento) ──────────────────────────────────── */}
        <section id="products" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="mx-auto max-w-2xl text-center">
                <Station index="01-05" label="the network" />
                <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                  The <GradientText>rails</GradientText> your agent plugs into.
                </h2>
                <p className="mt-3 text-body">
                  One layer that sits behind Claude, ChatGPT, Cursor, and every MCP client.
                  Tools to act. Memory to remember. Connections to sign in. AutoPilot to
                  move work. XPass to prove it.
                </p>
              </div>
            </FadeIn>

            <div className="mt-14">
              <FadeIn delay={0.1}>
                <RailsBento />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Why this exists ────────────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="mx-auto max-w-2xl text-center">
                <Station index="06" label="the point" />
                <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                  Stop clicking. Start calling.
                </h2>
                <p className="mt-3 text-body">
                  Asking your AI to drive a web dashboard is surgery with oven mitts.
                  UnClick gives it an endpoint instead: call once, get JSON back,
                  prove the work before it ships.
                </p>
              </div>
            </FadeIn>

            <div className="mt-12">
              <CompareStrip />
            </div>
          </div>
        </section>

        {/* ── Install (live component, unchanged) ─────────────────── */}
        <InstallSection />

        {/* ── Proof in numbers ───────────────────────────────────── */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <ProofBand />
            </FadeIn>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 py-32">
          <div className="hp-floor !bottom-auto !top-0 rotate-180 opacity-60" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl md:text-5xl">
                Let your AI stop pretending to be human.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-4 max-w-md text-body">
                Just your email. No credit card. Be one of the first to try it.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <a
                href="#install"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.5)] transition-shadow hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
              >
                Get started free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </FadeIn>
          </div>
        </section>

        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreview;
