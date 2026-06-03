import Navbar from "@/components/portfolio-landing/Navbar";
import HeroSection from "@/components/portfolio-landing/HeroSection";
import PositioningSection from "@/components/portfolio-landing/PositioningSection";
import ServicesSection from "@/components/portfolio-landing/ServicesSection";
import CaseStudiesSection from "@/components/portfolio-landing/CaseStudiesSection";
import SitesCTASection from "@/components/portfolio-landing/SitesCTASection";
import ProcessSection from "@/components/portfolio-landing/ProcessSection";
import AgencySection from "@/components/portfolio-landing/AgencySection";
import ToolsSection from "@/components/portfolio-landing/ToolsSection";
import ContactSection from "@/components/portfolio-landing/ContactSection";

const Trafego = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <PositioningSection />
        <ServicesSection />
        <CaseStudiesSection />
        <ProcessSection />
        <AgencySection />
        <ToolsSection />
        <SitesCTASection />
        <ContactSection />
      </main>
    </>
  );
};

export default Trafego;
