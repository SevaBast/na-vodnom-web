import { useState } from "react";
import { useTranslation } from "react-i18next";
import { galleryImages } from "@/data/restaurantData";
import { Button } from "@/components/ui/button";
import { GalleryCarousel } from "./GalleryCarousel";

export const Gallery = () => {
  const { t } = useTranslation();
  // Function to get default category
  const getDefaultCategory = (): string => {
    const availableCategories = Array.from(new Set(galleryImages.map(img => img.category)));
    return availableCategories[0] || 'food'; // Return first category or fallback
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(getDefaultCategory());

  const categories = [
    { key: 'food', icon: '🍽️' },
    { key: 'interior', icon: '🏛️' },
    { key: 'atmosphere', icon: '✨' },
    { key: 'staff', icon: '👥' }
  ];

  return (
    <section id="gallery" className="py-16 tablet:py-20 bg-muted/30">
      <div className="container mx-auto px-4 tablet:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 tablet:mb-14 lg:mb-16 animate-fade-in-up">
          <h2 className="text-5xl tablet:text-4xl lg:text-5xl font-bold text-foreground mb-4 tablet:mb-5 lg:mb-6">
            {t('gallery.titlePart1')} <span className="text-primary">{t('gallery.titlePart2')}</span>
          </h2>
          <p className="text-base tablet:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 tablet:gap-3 lg:gap-4 mb-8 tablet:mb-10 lg:mb-12 animate-slide-in">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? 'hero' : 'glass'}
              onClick={() => setSelectedCategory(category.key)}
              className="transition-all duration-300 hover:scale-105 text-sm tablet:text-base px-3 tablet:px-4 lg:px-5 py-2 tablet:py-2.5"
            >
              <span className="mr-1 tablet:mr-2">{category.icon}</span>
              <span>{t(`gallery.categories.${category.key}`)}</span>
            </Button>
          ))}
        </div>

        {/* Gallery Carousel */}
        <div key={selectedCategory} className="animate-fade-in">
          <GalleryCarousel category={selectedCategory} />
        </div>
      </div>
    </section>
  );
};