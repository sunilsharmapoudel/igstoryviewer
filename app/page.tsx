import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <HowToSection />
      <FaqSection />
    </main>
  );
}
