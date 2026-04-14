import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InstallSection from "@/components/InstallSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/use-canonical";

const Index = () => {
  useCanonical("/");

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <InstallSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
