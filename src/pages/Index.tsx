import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Niches from "@/components/Niches";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import AgencySection from "@/components/AgencySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Niches />
        <Testimonials />
        <Contact />
        <AgencySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
