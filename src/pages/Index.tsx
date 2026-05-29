import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import InstallSection from "@/components/InstallSection";
import Stats from "@/components/Stats";
import TrustSignals from "@/components/TrustSignals";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";
import { presets } from "@/lib/design-system";

/**
 * Index (Apple-inspired polish pass, 2026-05-28).
 *
 *  - Dropped VantaWavesBackground from the page wrap. The single soft halo
 *    inside Hero is the only ambient effect on the homepage.
 *  - All sections inherit the design tokens from src/index.css.
 *  - Meta tags updated to match the new positioning.
 */
const Index = () => {
  useCanonical("/");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "One install gives your AI agent every tool, memory that remembers, signed permissions, and built-in proof the work was done right.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription:
      "Every tool. Persistent memory. Signed permissions. Built-in proof. One install.",
    ogUrl: "https://unclick.world/",
  });

  return (
    <div className={presets.page}>
      <Navbar />
      <Hero />
      <Problem />
      <InstallSection />
      <Stats />
      <TrustSignals />
      <FinalCTA />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
