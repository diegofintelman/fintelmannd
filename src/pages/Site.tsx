import Navbar from "@/components/portfolio-landing/Navbar";
import SitesHeroSection from "@/components/portfolio-landing/SitesHeroSection";
import SitesPortfolioSection from "@/components/portfolio-landing/SitesPortfolioSection";
import SitesProcessSection from "@/components/portfolio-landing/SitesProcessSection";
import FinalCtaSection from "@/components/portfolio-landing/FinalCtaSection";
import ContactSection from "@/components/portfolio-landing/ContactSection";

const Site = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <SitesHeroSection />
        <SitesPortfolioSection />
        <SitesProcessSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Site;
