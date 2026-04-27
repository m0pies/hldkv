import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import WhyMeSection from "./components/WhyMeSection";
import ProcessSection from "./components/ProcessSection";
import CasesSection from "./components/CasesSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import FloatingCTA from "./components/FloatingCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FloatingCTA />
      <ServicesSection />
      <WhyMeSection />
      <ProcessSection />
      <CasesSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
