import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import InstallSection from "@/components/InstallSection";
import { GradientText } from "@/components/brand";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import "@/components/home-preview/preview.css";

/**
 * Option Q: the keynote. Apple event title cards: each screen is a
 * single huge statement in empty space, scaling gently into place as
 * it arrives. Eleven words from "Hello." to the mark.
 */

const SLIDES: { text: string; accent?: string; small?: string }[] = [
  { text: "Hello." },
  { text: "Every tool." },
  { text: "One", accent: "install." },
  { text: "Any AI." },
  { text: "Receipts", accent: "included." },
];

function Slide({
  slide,
  index,
}: {
  slide: (typeof SLIDES)[number];
  index: number;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <section
      className={cn(
        "grid place-items-center px-6",
        index === 0 ? "min-h-[88svh] pt-20" : "min-h-[82svh]",
      )}
    >
      <motion.h2
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-26%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-6xl font-extrabold leading-[1.0] tracking-[-0.035em] text-heading sm:text-8xl md:text-9xl"
      >
        {slide.text}
        {slide.accent && (
          <>
            {" "}
            <GradientText>{slide.accent}</GradientText>
          </>
        )}
      </motion.h2>
    </section>
  );
}

const HomePreviewQ = () => {
  useCanonical("/home-preview-q");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Hello. Every tool. One install. Any AI. Receipts included. UnClick, the universal remote for AI.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Hello. Every tool. One install.",
    ogUrl: "https://unclick.world/home-preview-q",
  });

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const reduced = useReducedMotion() ?? false;

  return (
    <div className="relative min-h-screen bg-transparent text-foreground antialiased">
      <Navbar />
      <OptionRibbon active="q" />

      <main>
        {/* h1 for structure; visually the slides carry the page. */}
        <h1 className="sr-only">UnClick. Every tool. One install. Any AI. Receipts included.</h1>

        {SLIDES.map((slide, i) => (
          <Slide key={slide.text} slide={slide} index={i} />
        ))}

        {/* The mark */}
        <section className="grid min-h-[88svh] place-items-center px-6">
          <div className="text-center">
            <motion.p
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-26%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl font-extrabold tracking-[-0.04em] text-heading sm:text-9xl"
            >
              Un<GradientText>Click</GradientText>
            </motion.p>
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-26%" }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-primary/70"
            >
              where AI belongs
            </motion.p>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-26%" }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-12 flex justify-center"
            >
              <a
                href="#install"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("install")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-9 py-4 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_hsl(182_46%_57%/0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_52px_-12px_hsl(182_46%_57%/0.7)]"
              >
                Get started
              </a>
            </motion.div>
          </div>
        </section>

        <InstallSection />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default HomePreviewQ;
