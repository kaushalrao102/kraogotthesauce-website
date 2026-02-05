import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WaveformDivider from "@/components/WaveformDivider";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { StructuredData } from "@/components/StructuredData";

const Index = () => {
  return (
    <>
      <StructuredData />
      <Header />
      <ScrollProgress />
      <div className="min-h-screen bg-background page-load-fade">
        <main id="main-content" className="relative bg-background" tabIndex={-1}>
          <HeroSection />
          <WaveformDivider />
          <ServicesSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
