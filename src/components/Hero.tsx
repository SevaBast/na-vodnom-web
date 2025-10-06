import { Button } from "@/components/ui/button";
import { restaurantInfo } from "@/data/restaurantData";
import Aurora from "./Aurora";
import { useEffect, useState } from "react";
import { CallPopup } from "./CallPopup";
import { useTranslation } from 'react-i18next';

// Manual logo size and positioning controls
const LOGO_CONFIG = {
  // Logo size classes (change these for different sizes)
  sizeClasses: "h-60 tablet:h-52 lg:h-72 xl:h-80", // Mobile: 192px, Tablet: 208px, Desktop: 288px, XL: 320px
  
  // Manual style adjustments (uncomment and modify as needed)
  manualStyle: {
    transform: 'scale(1.2)', // Make logo bigger/smaller (1.0 = normal, 1.2 = 20% bigger)
    marginTop: '-0px', // Move logo up (negative) or down (positive)
    // marginLeft: '0px', // Move logo left (negative) or right (positive)
    marginBottom: '50px', // Add space below logo
  }
};

export const Hero = () => {
  const { t } = useTranslation();
  const [isBookTablePopupOpen, setIsBookTablePopupOpen] = useState(false);
  const [isEventManagerPopupOpen, setIsEventManagerPopupOpen] = useState(false);

  const scrollToMenu = () => {
    const menuElement = document.querySelector("#menu");
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Функція для перевірки чи це мобільний пристрій
  const isMobile = () => {
    // Перевіряємо розмір екрану та UserAgent
    return window.matchMedia('(max-width: 768px)').matches || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleBookTable = () => {
    if (isMobile()) {
      // На мобільних пристроях створюємо невидиме посилання та клікаємо по ньому
      const link = document.createElement('a');
      link.href = 'tel:+421901900008';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // На комп'ютері показуємо попап
      setIsBookTablePopupOpen(true);
    }
  };

  const handleCallEventManager = () => {
    if (isMobile()) {
      // На мобільних пристроях створюємо невидиме посилання та клікаємо по ньому
      const link = document.createElement('a');
      link.href = 'tel:+421902966666';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // На комп'ютері показуємо попап
      setIsEventManagerPopupOpen(true);
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
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-smooth-hero overflow-hidden pt-32 tablet:pt-20 lg:pt-20 pb-16 tablet:pb-12 lg:pb-8">
      {/* Aurora Background */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <Aurora
          colorStops={["#603813", "#b29f94", "#8B6A3A"]}
          blend={0.4}
          amplitude={0.3}
          speed={0.3}
        />
      </div>

      <div className="container mx-auto px-4 tablet:px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-6 tablet:space-y-7 lg:space-y-8">
          {/* Restaurant Logo - Manual size and positioning controls */}
          <div className="flex justify-center animate-blur-in">
            <img 
              src="./logo-new.svg" 
              alt={restaurantInfo.name}
              className={`${LOGO_CONFIG.sizeClasses} w-auto`}
              style={LOGO_CONFIG.manualStyle}
            />
          </div>

          {/* Description */}
          <p className="text-base tablet:text-lg text-[#5c4a38] max-w-3xl mx-auto leading-relaxed animate-blur-in-delay-1">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col tablet:flex-row gap-3 lg:gap-4 justify-center items-center pt-6 tablet:pt-7 lg:pt-8 animate-blur-in-delay-2">
            <Button 
              variant="hero"
              size="lg" 
              onClick={scrollToMenu}
              className="animate-glow w-full tablet:w-auto"
            >
              {t('hero.viewMenu')}
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              onClick={handleBookTable}
              className="w-full tablet:w-auto"
            >
              {t('hero.bookTable')}
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              onClick={handleCallEventManager}
              className="w-full tablet:w-auto"
            >
              {t('hero.eventManager')}
            </Button>
          </div>

          {/* Working Hours */}
          <div className="pt-5 text-center animate-blur-in-delay-3">
            <p className="text-sm text-muted-foreground mb-2">{t('hero.workingHours')}</p>
            <div className="text-sm text-foreground">
              {Object.entries(restaurantInfo.workingHours).map(([day, hours]) => (
                <div key={day} className="text-sm text-foreground flex justify-between">
                  <span className="font-medium mr-0.5">{t(`workingHours.days.${day}`)}:</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call Popups - тільки для комп'ютерної версії */}
      <CallPopup
        isOpen={isBookTablePopupOpen}
        onClose={() => setIsBookTablePopupOpen(false)}
        purpose="booking"
      />
      
      <CallPopup
        isOpen={isEventManagerPopupOpen}
        onClose={() => setIsEventManagerPopupOpen(false)}
        purpose="events"
      />
    </section>
  );
};