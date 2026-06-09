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
      "One install gives Claude, ChatGPT, Cursor, OpenClaw-style workflows, and MCP-compatible AI agents tools, memory, signed permissions, and proof harnesses.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription:
      "Every tool. Persistent memory. Signed permissions. XPass proof harnesses. One install.",
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
