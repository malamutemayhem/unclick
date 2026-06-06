import PageShell from "@/components/PageShell";
import FAQ from "@/components/FAQ";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";

const FAQPage = () => {
  useCanonical("/faq");
  useMetaTags({
    title: "FAQ - UnClick",
    ogTitle: "FAQ - UnClick",
    ogDescription:
      "Answers to common questions about UnClick, MCP tools, the Arena, and how to get started.",
    ogUrl: "https://unclick.world/faq",
  });

  return (
    <PageShell
      eyebrow="FAQ"
      title="Frequently asked."
      lede="Common questions about UnClick, MCP tools, the Arena, and getting started."
    >
      <FAQ />
    </PageShell>
  );
};

export default FAQPage;
