import { restaurantInfo } from "@/data/restaurantData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { useState } from "react";
import { CallPopup } from "./CallPopup";
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const [isBookTablePopupOpen, setIsBookTablePopupOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Instagram Link */}
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start">
              <Button
                variant="hero"
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-background hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm group relative overflow-hidden"
              >
                <a 
                  href="https://www.instagram.com/na.vodnom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 relative z-10"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xl font-bold">{t('footer.followUs')}</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 text-center">{t('footer.contact')}</h3>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-background/90 font-medium ">{t('footer.address')}</p>
                <p className="text-background/70 text-sm">{restaurantInfo.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-background/90 font-medium">{t('footer.phone')}</p>
                <button 
                  onClick={handleBookTable}
                  className="text-background/70 text-sm hover:text-primary transition-colors cursor-pointer"
                >
                  {restaurantInfo.phone}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-background/90 font-medium">{t('footer.email')}</p>
                <a 
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-background/70 text-sm hover:text-primary transition-colors"
                >
                  {restaurantInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6 text-center">{t('footer.hours')}</h3>
            <div className="space-y-3">
              {Object.entries(restaurantInfo.workingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-background/80">{t(`workingHours.days.${day}`)}</span>
                  <span className="text-background/90 font-medium">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-background/20 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center text-center text-sm text-background/60 space-y-2">
          <p>© 2024 {restaurantInfo.name}. {t('footer.allRightsReserved')}</p>
          <a 
            href="https://www.linkedin.com/in/vsevolod-bastiuchenko-203a31196/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors font-semibold text-background/80"
          >
            Created by VB
          </a>
        </div>
      </div>
      
      {/* Call Popup - тільки для комп'ютерної версії */}
      <CallPopup
        isOpen={isBookTablePopupOpen}
        onClose={() => setIsBookTablePopupOpen(false)}
        purpose="booking"
      />
    </footer>
  );
};