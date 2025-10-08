import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, Minus } from 'lucide-react';
import { menuCategories, menuItems, menuTypes } from '@/data/menuData';
import { MenuCategory, MenuType, MenuItem } from '@/data/menuData';
import { useMyOrder } from "@/context/MyOrderContext";
import { MyOrder } from "./MyOrder";
import { useTranslation } from 'react-i18next';
import { formatPrice } from "@/lib/utils";

// Компонент оптимізованого зображення для меню з lazy loading
const MenuItemOptimizedImage = ({ 
  menuItem, 
  currentLanguage,
  index,
  className 
}: { 
  menuItem: MenuItem; 
  currentLanguage: 'sk' | 'en';
  index: number;
  className: string; 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Перші 2-3 зображення завантажуються негайно, решта lazy
  const loading = index < 3 ? 'eager' : 'lazy';

  return (
    <div className="relative overflow-hidden h-48">
      {/* Placeholder поки завантажується */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img 
        src={menuItem.image || './placeholder.svg'}
        alt={menuItem.name[currentLanguage]}
        className={`${className} transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export const MenuSection = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'sk' | 'en';
  const [selectedMenuType, setSelectedMenuType] = useState<MenuType>('main');
  
  // Manual default categories for each menu type
  const defaultCategories: Record<MenuType, MenuCategory> = {
    'main': 'main-dishes',           // Головне меню - починається з Предjedlá
    'breakfast': 'special-breakfast', // Сніданки - починається з спеціальних сніданків
    'kids': 'all-kids-menu',        // Дитяче меню - починається з всього дитячого меню
    'drinks': 'alcoholic-drinks',   // Напої - починається з Алкогольних напоїв
    'celebrations': 'cold-buffet'   // Celebrations (включає cold-buffet) - починається з Студеного буфету
  };
  
  // Function to get default category for menu type
  const getDefaultCategory = (menuType: MenuType): MenuCategory => {
    // First try to use manually set default
    const manualDefault = defaultCategories[menuType];
    if (manualDefault) {
      // Check if this category actually exists for this menu type
      const filtered = menuItems.filter(item => item.menuType === menuType);
      const availableCategories = Array.from(
        new Set(filtered.map(item => item.category))
      ).filter(category => category !== 'my-choice') as MenuCategory[];
      
      if (availableCategories.includes(manualDefault)) {
        return manualDefault;
      }
    }
    
    // Fallback to first available category
    const filtered = menuItems.filter(item => item.menuType === menuType);
    const availableCategories = Array.from(
      new Set(filtered.map(item => item.category))
    ).filter(category => category !== 'my-choice') as MenuCategory[];
    return availableCategories[0] || 'appetizers';
  };

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'my-choice'>(
    getDefaultCategory('main')
  );
  
  const { myOrder, addItem, getItemQuantity, decreaseItemQuantity, increaseItemQuantity } = useMyOrder();

  // Handle favorites button click
  const handleMyChoiceClick = () => {
    setSelectedCategory('my-choice');
    setSelectedMenuType('main');
    
    // Smooth scroll to menu section
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };  // Filter items by menu type and category
  const filteredByMenuType = menuItems.filter(item => 
    item.menuType === selectedMenuType
  );

  const filteredItems = selectedCategory === 'my-choice'
    ? [] // For "My Choice" category don't show regular menu
    : filteredByMenuType.filter(item => item.category === selectedCategory);

  // Get available categories for current menu type
  const availableCategories = Array.from(
    new Set(filteredByMenuType.map(item => item.category))
  ).filter(category => category !== 'my-choice');

  return (
    <section id="menu" className="pt-0 pb-10 tablet:pb-14 lg:pb-20 bg-background -mt-8">
      <div className="container mx-auto px-3 tablet:px-5 lg:px-6 pt-10 tablet:pt-14 lg:pt-20">
        {/* Section Header */}
        <div className="text-center mb-8 tablet:mb-10 lg:mb-16 animate-fade-in-up px-2">
          <h2 className="text-5xl tablet:text-4xl lg:text-5xl font-bold text-foreground mb-4 tablet:mb-5 lg:mb-6">
            {t('sections.menu.titlePart1')} <span className="text-primary">{t('sections.menu.titlePart2')}</span>
          </h2>
          <p className="text-sm tablet:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('sections.menu.description')}
          </p>
        </div>

        {/* Menu Type Tabs */}
        <div className="flex flex-col tablet:flex-row justify-center gap-2 tablet:gap-3 lg:gap-4 mb-8 animate-fade-in-up">
          {Object.entries(menuTypes)
            .filter(([key]) => key !== 'celebrations') // Exclude celebrations from Our Menu
            .map(([key, menuType]) => (
            <Button
              key={key}
              variant={selectedMenuType === key ? 'hero' : 'outline'}
              onClick={() => {
                setSelectedMenuType(key as MenuType);
                setSelectedCategory(getDefaultCategory(key as MenuType)); // Set default category when changing menu type
              }}
              className="w-full tablet:w-auto px-4 tablet:px-5 lg:px-6 py-2 tablet:py-3 text-sm tablet:text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105"
              size="default"
            >
              <span className="mr-2">{menuType.icon}</span>
              <span className="truncate">{t(`menu.types.${key}`)}</span>
            </Button>
          ))}
          
          {/* My Favorites Button */}
          <Button
            variant={selectedCategory === 'my-choice' ? 'hero' : 'outline'}
            onClick={handleMyChoiceClick}
            className="w-full tablet:w-auto px-4 tablet:px-5 lg:px-6 py-2 tablet:py-3 text-sm tablet:text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 relative"
            size="default"
          >
            <span className="mr-2">{menuCategories['my-choice'].icon}</span>
            <span className="truncate">{t('menu.categories.my-choice')}</span>
            {myOrder.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {myOrder.totalItems}
              </span>
            )}
          </Button>
        </div>

        {/* Category Filter - Hidden when My Choice is selected */}
        {selectedCategory !== 'my-choice' && (
          <div className="flex flex-wrap justify-center gap-2 tablet:gap-3 lg:gap-4 mb-10 tablet:mb-12 animate-slide-in">
            {availableCategories.map((categoryKey) => {
              const category = menuCategories[categoryKey as MenuCategory];
              if (!category) return null;
              
              return (
                <button
                  key={categoryKey}
                  data-category={categoryKey}
                  onClick={() => setSelectedCategory(categoryKey as MenuCategory)}
                  className={`${
                    selectedCategory === categoryKey 
                      ? 'bg-gradient-primary text-primary-foreground hover:shadow-elegant hover:scale-105 font-semibold' 
                      : 'bg-white/20 backdrop-blur-md border border-white/30 text-foreground/80 hover:bg-white/10 hover:text-primary'
                  } transition-[background-color,color,transform,box-shadow] duration-300 text-xs tablet:text-sm lg:text-base px-3 tablet:px-4 lg:px-5 py-2 tablet:py-2.5 rounded-full shadow-lg whitespace-nowrap`}
                >
                  <span className="mr-1 tablet:mr-2">{category.icon}</span>
                  <span className="truncate">{t(`menu.categories.${categoryKey}`)}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content based on selected category */}
        {selectedCategory === 'my-choice' ? (
          <div key="my-choice" className="animate-fade-in">
            <MyOrder onBackToMenu={() => setSelectedCategory(getDefaultCategory(selectedMenuType))} />
          </div>
        ) : selectedMenuType === 'drinks' ? (
          <div key={`${selectedMenuType}-${selectedCategory}`} className="animate-fade-in">
            <DrinksMenu 
              filteredItems={filteredByMenuType}
              selectedCategory={selectedCategory}
              onAddToOrder={addItem}
              onIncreaseQuantity={increaseItemQuantity}
              onDecreaseQuantity={decreaseItemQuantity}
              getItemQuantity={getItemQuantity}
            />
          </div>
        ) : (
          <div key={`${selectedMenuType}-${selectedCategory}`} className="animate-fade-in">
            {/* Check if we have items that should be displayed as list */}
            {filteredItems.some(item => item.displayAsList) ? (
              <ListMenu 
                filteredItems={filteredItems}
                selectedCategory={selectedCategory}
                onAddToOrder={addItem}
                onIncreaseQuantity={increaseItemQuantity}
                onDecreaseQuantity={decreaseItemQuantity}
                getItemQuantity={getItemQuantity}
                selectedMenuType={selectedMenuType}
              />
            ) : (
              <>
                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 gap-4 tablet:gap-5 lg:gap-6 px-2 tablet:px-0">
                  {filteredItems.map((item, index) => (
                    <MenuItemCard 
                      key={item.id} 
                      item={item} 
                      index={index}
                      onAddToOrder={addItem}
                      onIncreaseQuantity={increaseItemQuantity}
                      onDecreaseQuantity={decreaseItemQuantity}
                      itemQuantity={getItemQuantity(item.id)}
                    />
                  ))}
                </div>

                {/* No items message */}
                {filteredItems.length === 0 && (
                  <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
                    <p className="text-muted-foreground text-base sm:text-lg">
                      No dishes available in this category yet
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Floating Favorites Button - only visible when items are in favorites */}
      {myOrder.totalItems > 0 && selectedCategory !== 'my-choice' && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <Button
            variant="hero"
            onClick={handleMyChoiceClick}
            className="h-14 w-14 rounded-full shadow-elegant hover:scale-110 transition-all duration-300 relative"
            size="default"
          >
            <Heart className="w-6 h-6 fill-current" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs font-bold border-2 border-white"
            >
              {myOrder.totalItems}
            </Badge>
          </Button>
        </div>
      )}
    </section>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  onAddToOrder: (menuItem: MenuItem) => void;
  onIncreaseQuantity: (menuItemId: string) => void;
  onDecreaseQuantity: (menuItemId: string) => void;
  itemQuantity: number;
}

const MenuItemCard = ({ item, index, onAddToOrder, onIncreaseQuantity, onDecreaseQuantity, itemQuantity }: MenuItemCardProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'sk' | 'en';
  
  return (
    <Card 
      className="group hover:shadow-elegant transition-all duration-300 bg-gradient-card border-glass-border hover:scale-105 overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <MenuItemOptimizedImage
        menuItem={item}
        currentLanguage={currentLanguage}
        index={index}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {item.name[currentLanguage]}
            </CardTitle>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">
              {formatPrice(item.price, currentLanguage)}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-muted-foreground mb-4">
          {item.description[currentLanguage]}
        </CardDescription>
        
        {/* Weight and Calories */}
        {(item.weight || item.calories) && (
          <div className="flex gap-4 mb-3 text-xs text-muted-foreground italic">
            {item.weight && (
              <span>weight: {item.weight}g</span>
            )}
            {item.calories && (
              <span>calories: {item.calories} kcal</span>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {item.isNew && (
            <Badge variant="destructive" className="bg-accent text-accent-foreground">
              {t('menu.badges.new')}
            </Badge>
          )}
          {item.isPopular && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              {t('menu.badges.popular')}
            </Badge>
          )}
          {item.isVegetarian && (
            <Badge variant="secondary" className="bg-success/20 text-success">
              {t('menu.badges.vegetarian')}
            </Badge>
          )}
          {item.isSpicy && (
            <Badge variant="secondary" className="bg-destructive/20 text-destructive">
              {t('menu.badges.spicy')}
            </Badge>
          )}
        </div>

        {/* Add to Order Buttons */}
        <div className="flex items-center justify-center mt-4">
          {itemQuantity === 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToOrder(item)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 transition-all duration-300 text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">{t('menu.actions.addToFavorites')}</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDecreaseQuantity(item.id)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 transition-all duration-300 text-destructive hover:text-destructive-foreground hover:bg-destructive px-4 py-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{t('menu.actions.removeFromFavorites')}</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface DrinksMenuProps {
  filteredItems: MenuItem[];
  selectedCategory: MenuCategory | 'all';
  onAddToOrder: (menuItem: MenuItem) => void;
  onIncreaseQuantity: (menuItemId: string) => void;
  onDecreaseQuantity: (menuItemId: string) => void;
  getItemQuantity: (menuItemId: string) => number;
}

const DrinksMenu = ({ filteredItems, selectedCategory, onAddToOrder, onIncreaseQuantity, onDecreaseQuantity, getItemQuantity }: DrinksMenuProps) => {
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

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 lg:py-16 px-4">
        <p className="text-muted-foreground text-base sm:text-lg">
          No drinks available in this category yet
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in px-2 sm:px-0">
      {categoriesToShow.map((category, categoryIndex) => (
        <div key={category} className="mb-8" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
          {selectedCategory === 'all' && (
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center">
              <span className="mr-2">{menuCategories[category]?.icon}</span>
              {t(`menu.categories.${category}`) || category}
            </h3>
          )}
          
          <div className="space-y-3">
            {itemsByCategory[category]?.map((item, index) => {
              const itemQuantity = getItemQuantity(item.id);
              
              return (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gradient-card border border-glass-border rounded-lg hover:shadow-elegant transition-all duration-300 hover:bg-accent/10"
                  style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.05)}s` }}
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
                          <span>volume: {item.weight}ml</span>
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
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 ml-4">
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(item.price, currentLanguage)}
                    </span>
                    
                    {/* Add to Favorites Button */}
                    {itemQuantity === 0 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAddToOrder(item)}
                        className="flex items-center gap-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground px-3 py-2"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="hidden sm:inline text-sm">{t('menu.actions.add')}</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDecreaseQuantity(item.id)}
                        className="flex items-center gap-2 transition-all duration-300 text-destructive hover:text-destructive-foreground hover:bg-destructive px-3 py-2"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        <span className="hidden sm:inline text-sm">{t('menu.actions.remove')}</span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

interface ListMenuProps {
  filteredItems: MenuItem[];
  selectedCategory: MenuCategory | 'all';
  onAddToOrder: (menuItem: MenuItem) => void;
  onIncreaseQuantity: (menuItemId: string) => void;
  onDecreaseQuantity: (menuItemId: string) => void;
  getItemQuantity: (menuItemId: string) => number;
  selectedMenuType: MenuType;
}

const ListMenu = ({ filteredItems, selectedCategory, onAddToOrder, onIncreaseQuantity, onDecreaseQuantity, getItemQuantity, selectedMenuType }: ListMenuProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'sk' | 'en';
  
  // Group ALL items by category (both list and card items)
  const allItemsByCategory = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<MenuCategory, MenuItem[]>);

  // If a specific category is selected, show only that category
  const categoriesToShow = selectedCategory === 'all' 
    ? (Object.keys(allItemsByCategory) as MenuCategory[]).sort((a, b) => {
        const orderA = menuCategories[a]?.order || 999;
        const orderB = menuCategories[b]?.order || 999;
        return orderA - orderB;
      })
    : allItemsByCategory[selectedCategory] ? [selectedCategory] : [];

  const getWeightLabel = (selectedMenuType: MenuType) => {
    return selectedMenuType === 'drinks' ? 'об\'єм' : 'вага';
  };

  const getWeightUnit = (selectedMenuType: MenuType) => {
    return selectedMenuType === 'drinks' ? 'мл' : 'г';
  };

  return (
    <div className="animate-fade-in px-2 sm:px-0">
      {categoriesToShow.map((category, categoryIndex) => {
        const categoryItems = allItemsByCategory[category] || [];
        const listItems = categoryItems.filter(item => item.displayAsList);
        const cardItems = categoryItems.filter(item => !item.displayAsList);
        
        return (
          <div key={category} className="mb-8" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
            {selectedCategory === 'all' && (
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center">
                <span className="mr-2">{menuCategories[category]?.icon}</span>
                {t(`menu.categories.${category}`) || category}
              </h3>
            )}
            
            {/* List Items for this category */}
            {listItems.length > 0 && (
              <div className="space-y-3 mb-6">
                {listItems.map((item, index) => {
                  const itemQuantity = getItemQuantity(item.id);
                  
                  return (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gradient-card border border-glass-border rounded-lg hover:shadow-elegant transition-all duration-300 hover:bg-accent/10"
                      style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.05)}s` }}
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
                              <span>{getWeightLabel(selectedMenuType)}: {item.weight}{getWeightUnit(selectedMenuType)}</span>
                            )}
                            {item.calories && (
                              <span>калорії: {item.calories} ккал</span>
                            )}
                          </div>
                        )}
                        
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                          {item.isNew && (
                            <Badge variant="destructive" className="bg-accent text-accent-foreground text-xs">
                              New
                            </Badge>
                          )}
                          {item.isPopular && (
                            <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                              Popular
                            </Badge>
                          )}
                          {item.isVegetarian && (
                            <Badge variant="secondary" className="bg-success/20 text-success text-xs">
                              🥬 Vegan
                            </Badge>
                          )}
                          {item.isSpicy && (
                            <Badge variant="secondary" className="bg-destructive/20 text-destructive text-xs">
                              🌶️ Spicy
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-4">
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(item.price, currentLanguage)}
                        </span>
                        
                        {/* Add to Favorites Button */}
                        {itemQuantity === 0 ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAddToOrder(item)}
                            className="flex items-center gap-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground px-3 py-2"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm">{t('menu.actions.add')}</span>
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDecreaseQuantity(item.id)}
                            className="flex items-center gap-2 transition-all duration-300 text-destructive hover:text-destructive-foreground hover:bg-destructive px-3 py-2"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                            <span className="hidden sm:inline text-sm">{t('menu.actions.remove')}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Card Items for this category */}
            {cardItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
                {cardItems.map((item, index) => (
                  <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    index={index}
                    onAddToOrder={onAddToOrder}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onDecreaseQuantity={onDecreaseQuantity}
                    itemQuantity={getItemQuantity(item.id)}
                  />
                ))}
              </div>
            )}
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