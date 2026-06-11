import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import FadeIn from "@/components/FadeIn";
import { Eyebrow, GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import "@/components/home-preview/preview.css";

/**
 * Option N: the object. Apple product-shot minimalism: one
 * beautifully typeset receipt floating in vast space, levitating
 * gently. The receipt is the product. Nothing else competes.
 */

const RECEIPT_LINES = [
  { label: "asked", value: "chase the overdue invoice" },
  { label: "used", value: "Xero · Gmail" },
  { label: "allowed", value: "invoices and email only" },
  { label: "checked", value: "works · safe · honest" },
];

function FloatingReceipt() {
  const reduced = useReducedMotion() ?? false;
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <motion.div
        animate={reduced ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-white/[0.12] bg-gradient-to-b from-[#0d3344]/95 to-[#071e29]/95 p-7 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.95),0_0_80px_-30px_hsl(182_46%_57%/0.5)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/75">
            proof receipt
          </span>
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground/55">
            no. 1,284
          </span>
        </div>

        <dl className="space-y-3.5 py-5">
          {RECEIPT_LINES.map((line) => (
            <div key={line.label} className="flex items-baseline justify-between gap-4">
              <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                {line.label}
              </dt>
              <dd className="text-right text-[13.5px] text-body">{line.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-body/70">
            <Check className="h-3 w-3 text-primary" />
            kept forever, yours
          </span>
          <motion.span
            initial={reduced ? false : { scale: 1.8, opacity: 0, rotate: 6 }}
            whileInView={{ scale: 1, opacity: 1, rotate: -7 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.7 }}
            className="inline-flex items-center gap-1 rounded border-2 border-primary/80 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-primary"
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            pass
          </motion.span>
        </div>
      </motion.div>

      {/* Soft ground shadow that breathes with the levitation */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          animate={{ scaleX: [1, 0.92, 1], opacity: [0.45, 0.3, 0.45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-7 h-3 w-3/4 rounded-[50%] bg-black/60 blur-md"
        />
      )}
    </div>
  );
}

const HomePreviewN = () => {
  useCanonical("/home-preview-n");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Done. Proven. Every job your AI finishes leaves one of these: what it was asked, what it used, what was allowed, what was checked.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Done. Proven.",
    ogUrl: "https://unclick.world/home-preview-n",
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
      <OptionRibbon active="n" />

      <main>
        <section className="relative flex min-h-[min(94svh,900px)] items-center overflow-hidden px-6 pb-16 pt-28 text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[100px]"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <FadeIn>
              <div className="flex justify-center">
                <Eyebrow>Universal remote for AI</Eyebrow>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="mt-6 text-6xl font-extrabold leading-[1.0] tracking-[-0.03em] text-heading sm:text-8xl">
                Done. <GradientText>Proven.</GradientText>
              </h1>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-14">
                <FloatingReceipt />
              </div>
            </FadeIn>

            <FadeIn delay={0.28}>
              <p className="mx-auto mt-10 max-w-sm text-body [text-wrap:balance]">
                Every job your AI finishes leaves one of{" "}these.
              </p>
            </FadeIn>

            <FadeIn delay={0.34}>
              <div className="mt-8 flex justify-center">
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

export default HomePreviewN;
