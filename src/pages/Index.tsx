import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WaveformDivider from "@/components/WaveformDivider";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background page-load-fade">
      <Header />
      <ScrollProgress />
      <main>
        <HeroSection />
        <WaveformDivider />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
