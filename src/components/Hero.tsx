import { Button } from "@/components/ui/button";
import { restaurantInfo } from "@/data/restaurantData";
import Aurora from "./Aurora";
import { useEffect } from "react";

export const Hero = () => {
  const scrollToMenu = () => {
    const menuElement = document.querySelector("#menu");
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactElement = document.querySelector("#contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Force remove blur filters after animations complete (mobile fix)
  useEffect(() => {
    const timeouts = [
      setTimeout(() => {
        const elements = document.querySelectorAll('.animate-blur-in, .animate-blur-in-delay-1, .animate-blur-in-delay-2, .animate-blur-in-delay-3');
        elements.forEach(el => {
          (el as HTMLElement).style.filter = 'none';
          (el as HTMLElement).style.webkitFilter = 'none';
          el.classList.add('animation-completed');
        });
      }, 2500), // After all animations complete
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-smooth-hero overflow-hidden pt-32 md:pt-20 pb-16 md:pb-8">
      {/* Aurora Background */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <Aurora
          colorStops={["#603813", "#b29f94", "#8B6A3A"]}
          blend={0.4}
          amplitude={0.3}
          speed={0.3}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Restaurant Logo */}
          <div className="flex justify-center animate-blur-in">
            <img 
              src="./logo-new.svg" 
              alt={restaurantInfo.name}
              className="h-64 md:h-40 lg:h-48 w-auto"
            />
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-blur-in-delay-1">
            {restaurantInfo.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-blur-in-delay-2">
            <Button 
              variant="hero"
              size="lg" 
              onClick={scrollToMenu}
              className="animate-glow"
            >
              View Menu
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              onClick={scrollToContact}
            >
              Book a Table
            </Button>
          </div>

          {/* Working Hours */}
          <div className="pt-5 text-center animate-blur-in-delay-3">
            <p className="text-sm text-muted-foreground mb-2">Working Hours</p>
            <div className="text-sm text-foreground">
              {Object.entries(restaurantInfo.workingHours).map(([day, hours]) => (
                <div key={day} className="text-sm text-foreground flex justify-between">
                  <span className="font-medium mr-0.5">{day}:</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};