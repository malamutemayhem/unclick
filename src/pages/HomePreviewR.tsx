import { useEffect } from "react";
import BubbleHome from "@/components/home/BubbleHome";
import OptionRibbon from "@/components/home-preview/OptionRibbon";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";

/**
 * Option R: the bubble's journey. This option went live as the
 * homepage; the scene itself lives in src/components/home/BubbleHome.
 * This route stays as the design-lane preview wrapper (noindex, with
 * the option switcher ribbon) so the podium comparison still works.
 */
const HomePreviewR = () => {
  useCanonical("/home-preview-r");
  useMetaTags({
    title: "UnClick. The universal remote for AI.",
    description:
      "Everyone's AI. One bubble. The whole team holds a string to the same layer: memory, apps, gates, proof, and one running story.",
    ogTitle: "UnClick. The universal remote for AI.",
    ogDescription: "Everyone's AI. One bubble.",
    ogUrl: "https://unclick.world/home-preview-r",
  });

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <>
      <BubbleHome />
      <OptionRibbon active="r" />
    </>
  );
};

export default HomePreviewR;
