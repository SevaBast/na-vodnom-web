import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Reviews = () => {
  const { t } = useTranslation();
  useEffect(() => {
    // Завантажуємо скрипт Elfsight, якщо він ще не завантажений
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section id="reviews" className="py-16 tablet:py-20 bg-background">
      <div className="container mx-auto px-4 tablet:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 tablet:mb-14 lg:mb-16 animate-fade-in-up">
          <h2 className="text-5xl tablet:text-4xl lg:text-5xl font-bold text-foreground mb-4 tablet:mb-5 lg:mb-6">
            {t('sections.reviews.titlePart1')} <span className="text-primary">{t('sections.reviews.titlePart2')}</span>
          </h2>
          <p className="text-base tablet:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('sections.reviews.description')}
          </p>
        </div>

        {/* Google Reviews Widget */}
        <div className="animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div 
              className="elfsight-app-6a82ca81-7cbd-44d1-8c74-48688a0919dc" 
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};