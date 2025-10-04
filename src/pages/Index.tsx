import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { CelebrationsSection } from "@/components/CelebrationsSection";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CelebrationsSection />
      <MenuSection />
      <Gallery />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
