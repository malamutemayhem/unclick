import BubbleHome from "@/components/home/BubbleHome";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";

/**
 * Index (the bubble goes live, 2026-06-12).
 *
 * The homepage renders the BubbleHome scene: one glass bubble tethered
 * to the whole team, web-slinging down the page through the story
 * stages. Chosen from the home-preview design lane (option R); the
 * previous Hero/Problem/TrustSignals composition remains in
 * src/components for the other pages that use those sections.
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

  return <BubbleHome />;
};

export default Index;
