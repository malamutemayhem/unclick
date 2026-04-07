import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useMetaTags } from "@/hooks/useMetaTags";

const FAQPage = () => {
  useMetaTags({
    title: "FAQ - UnClick",
    ogTitle: "FAQ - UnClick",
    ogDescription: "Answers to common questions about UnClick, MCP tools, the Arena, and how to get started.",
    ogUrl: "https://unclick.world/faq",
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-14">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;
