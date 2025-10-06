import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuCategory, MenuItem, menuCategories, menuItems } from "@/data/menuData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Heart } from "lucide-react";
import { useMyOrder } from "@/context/MyOrderContext";
import { CelebrationsCarousel } from "./CelebrationsCarousel";

export const CelebrationsSection = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'sk' | 'en';
  
  // Function to get default category for celebrations
  const getDefaultCategory = (): MenuCategory => {
    const celebrationsItems = menuItems.filter(item => item.menuType === 'celebrations');
    const availableCategories = Array.from(
      new Set(celebrationsItems.map(item => item.category))
    );
    return availableCategories[0] || 'cold-buffet'; // Return first category or fallback
  };

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(getDefaultCategory());
  const [isExpanded, setIsExpanded] = useState(false);
  const { addItem, getItemQuantity, decreaseItemQuantity, increaseItemQuantity } = useMyOrder();

  // Filter items by celebrations menu type
  const celebrationsItems = menuItems.filter(item => 
    item.menuType === 'celebrations'
  );

  const filteredItems = celebrationsItems.filter(item => item.category === selectedCategory);

  // Get available categories for celebrations menu
  const availableCategories = Array.from(
    new Set(celebrationsItems.map(item => item.category))
  );

  return (
    <section id="celebrations" className="pt-0 pb-10 sm:pb-16 lg:pb-20 bg-background -mt-8">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-10 sm:pt-16 lg:pt-20">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up px-2">
          <h2 className="text-5xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            {t('sections.celebrations.titlePart1')} <span className="text-primary">{t('sections.celebrations.titlePart2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('sections.celebrations.description')}
          </p>
          
          {/* Expand/Collapse Button */}
          <Button
            variant="hero"
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gradient-primary text-white/80 backdrop-blur-lg border border-white/5 hover:shadow-lg shadow-sm hover:text-white/90 h-10 w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
            size="default"
          >
            <span className="mr-2">🎉</span>
            {isExpanded ? t('sections.celebrations.hideMenu') : t('sections.celebrations.showMenu')}
          </Button>
        </div>

        {/* Celebrations Carousel Gallery */}
        <CelebrationsCarousel />

        {/* Expandable Content */}
        {isExpanded && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
              {availableCategories.map(categoryKey => {
                const category = menuCategories[categoryKey];
                return (
                  <Button
                    key={categoryKey}
                    variant={selectedCategory === categoryKey ? 'hero' : 'outline'}
                    onClick={() => setSelectedCategory(categoryKey)}
                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105"
                    size="default"
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span className="hidden xs:inline sm:inline">{t(`menu.categories.${categoryKey}`)}</span>
                    <span className="xs:hidden sm:hidden">{t(`menu.categories.${categoryKey}`).split(' ')[0]}</span>
                  </Button>
                );
              })}
            </div>

            {/* Menu Items List - Using Original Style */}
            <CelebrationsList 
              key={selectedCategory}
              filteredItems={filteredItems}
              selectedCategory={selectedCategory}
              onAddToOrder={addItem}
              onIncreaseQuantity={increaseItemQuantity}
              onDecreaseQuantity={decreaseItemQuantity}
              getItemQuantity={getItemQuantity}
            />
          </>
        )}
      </div>
    </section>
  );
};

// List Component using original style from MenuSection
interface CelebrationsListProps {
  filteredItems: MenuItem[];
  selectedCategory: MenuCategory | 'all';
  onAddToOrder: (menuItem: MenuItem) => void;
  onIncreaseQuantity: (menuItemId: string) => void;
  onDecreaseQuantity: (menuItemId: string) => void;
  getItemQuantity: (menuItemId: string) => number;
}

const CelebrationsList = ({ 
  filteredItems, 
  selectedCategory, 
  onAddToOrder, 
  onIncreaseQuantity, 
  onDecreaseQuantity, 
  getItemQuantity 
}: CelebrationsListProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'sk' | 'en';
  
  // Group items by category
  const itemsByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<MenuCategory, MenuItem[]>);

  // If a specific category is selected, show only that category
  const categoriesToShow = selectedCategory === 'all' 
    ? (Object.keys(itemsByCategory) as MenuCategory[]).sort((a, b) => {
        const orderA = menuCategories[a]?.order || 999;
        const orderB = menuCategories[b]?.order || 999;
        return orderA - orderB;
      })
    : itemsByCategory[selectedCategory] ? [selectedCategory] : [];

  return (
    <div className="animate-fade-in px-2 sm:px-0">
      {categoriesToShow.map((category, categoryIndex) => {
        const categoryItems = itemsByCategory[category] || [];
        
        return (
          <div key={category} className="mb-8">
            {selectedCategory === 'all' && (
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center">
                <span className="mr-2">{menuCategories[category]?.icon}</span>
                {t(`menu.categories.${category}`) || category}
              </h3>
            )}
            
            {/* List Items for this category */}
            <div className="space-y-3 mb-6">
              {categoryItems.map((item, index) => {
                const itemQuantity = getItemQuantity(item.id);
                
                return (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gradient-card border border-glass-border rounded-lg hover:shadow-elegant hover:scale-105 transition-all duration-300 hover:bg-accent/10"
                  >
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {item.name[currentLanguage]}
                      </h4>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description[currentLanguage]}
                        </p>
                      )}
                      
                      {/* Weight and Calories */}
                      {(item.weight || item.calories) && (
                        <div className="flex gap-4 mb-2 text-xs text-muted-foreground italic">
                          {item.weight && (
                            <span>weight: {item.weight}g</span>
                          )}
                          {item.calories && (
                            <span>calories: {item.calories} kcal</span>
                          )}
                        </div>
                      )}
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        {item.isNew && (
                          <Badge variant="destructive" className="bg-accent text-accent-foreground text-xs">
                            {t('menu.badges.new')}
                          </Badge>
                        )}
                        {item.isPopular && (
                          <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                            {t('menu.badges.popular')}
                          </Badge>
                        )}
                        {item.isVegetarian && (
                          <Badge variant="secondary" className="bg-success/20 text-success text-xs">
                            {t('menu.badges.vegetarian')}
                          </Badge>
                        )}
                        {item.isSpicy && (
                          <Badge variant="secondary" className="bg-destructive/20 text-destructive text-xs">
                            {t('menu.badges.spicy')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 ml-4">
                      <span className="text-xl font-bold text-primary">
                        €{item.price}
                      </span>
                      
                      {/* Add to Favorites Buttons */}
                      {itemQuantity === 0 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddToOrder(item)}
                          className="flex items-center gap-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground px-3 py-2"
                        >
                          <Heart className="w-4 h-4" />
                          <span className="hidden sm:inline text-sm">{t('menu.actions.addToFavorites')}</span>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDecreaseQuantity(item.id)}
                          className="flex items-center gap-2 transition-all duration-300 text-destructive hover:text-destructive-foreground hover:bg-destructive px-3 py-2"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                          <span className="hidden sm:inline text-sm">{t('menu.actions.removeFromFavorites')}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* No items message */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
          <p className="text-muted-foreground text-base sm:text-lg">
            No items available in this category yet
          </p>
        </div>
      )}
    </div>
  );
};