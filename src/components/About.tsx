import { restaurantInfo } from "@/data/restaurantData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { CallPopup } from "./CallPopup";
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();
  const [isBookTablePopupOpen, setIsBookTablePopupOpen] = useState(false);

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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 tablet:mb-16 animate-fade-in-up">
          <h2 className="text-5xl tablet:text-4xl lg:text-5xl font-bold text-foreground mb-4 tablet:mb-6">
            {t('about.titlePart1')} <span className="text-primary">{t('about.titlePart2')}</span>
          </h2>
          <p className="text-base tablet:text-lg text-darkBrown-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 tablet:gap-12 items-center">
          {/* Story Section */}
          <div className="space-y-8 animate-slide-in">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                {t('about.subtitle')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('about.description')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We take pride in creating not just dishes, but true culinary masterpieces 
                that combine tradition and modernity. Each dish is prepared with love 
                and attention to detail by our experienced chefs.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-card p-4 rounded-lg border border-glass-border">
                <div className="text-2xl mb-2">🌟</div>
                <h4 className="font-semibold text-foreground mb-2">{t('values.quality.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('values.quality.description')}
                </p>
              </div>
              <div className="bg-gradient-card p-4 rounded-lg border border-glass-border">
                <div className="text-2xl mb-2">❤️</div>
                <h4 className="font-semibold text-foreground mb-2">{t('values.hospitality.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('values.hospitality.description')}
                </p>
              </div>
              <div className="bg-gradient-card p-4 rounded-lg border border-glass-border">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-semibold text-foreground mb-2">{t('values.creativity.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('values.creativity.description')}
                </p>
              </div>
              <div className="bg-gradient-card p-4 rounded-lg border border-glass-border">
                <div className="text-2xl mb-2">🏡</div>
                <h4 className="font-semibold text-foreground mb-2">{t('values.coziness.title')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('values.coziness.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-gradient-card border-glass-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <MapPin className="w-5 h-5" />
                  {t('about.address')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-medium mb-2">{restaurantInfo.address}</p>
                <div className="aspect-video bg-muted/50 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d146.0!2d18.7756087!3d49.21419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471459004c77e3f9%3A0x8751f4b0fe0269d!2sNa%20vodnom!5e0!3m2!1sen!2s!4v1727732400000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Na vodnom Restaurant Location"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-glass-border hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Clock className="w-5 h-5" />
                  {t('workingHours.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(restaurantInfo.workingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t(`workingHours.days.${day}`)}</span>
                      <span className="font-medium text-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-gradient-card border-glass-border hover:shadow-elegant transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-primary text-base">
                    <Phone className="w-4 h-4" />
                    {t('about.phone')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <button 
                    onClick={handleBookTable}
                    className="text-foreground font-medium hover:text-primary transition-colors cursor-pointer"
                  >
                    {restaurantInfo.phone}
                  </button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-glass-border hover:shadow-elegant transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-primary text-base">
                    <Mail className="w-4 h-4" />
                    {t('about.email')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <a 
                    href={`mailto:${restaurantInfo.email}`}
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {restaurantInfo.email}
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call Popup - тільки для комп'ютерної версії */}
      <CallPopup
        isOpen={isBookTablePopupOpen}
        onClose={() => setIsBookTablePopupOpen(false)}
        purpose="booking"
      />
    </section>
  );
};