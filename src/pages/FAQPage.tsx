import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const FAQPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-14">
      <FAQ />
    </div>
    <Footer />
  </div>
);

export default FAQPage;
