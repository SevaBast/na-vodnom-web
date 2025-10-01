import { useState } from "react";
import { MenuCategory, MenuItem, MenuType, menuCategories, menuItems, menuTypes } from "@/data/menuData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { useMyOrder } from "@/context/MyOrderContext";
import { MyOrder } from "./MyOrder";

export const MenuSection = () => {
  const [selectedMenuType, setSelectedMenuType] = useState<MenuType>('main');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const { myOrder, addItem, getItemQuantity, decreaseItemQuantity, increaseItemQuantity } = useMyOrder();

  // Function to handle My Choice navigation with smooth scroll
  const handleMyChoiceClick = () => {
    setSelectedCategory('my-choice');
    
    // Add a small delay to ensure the component renders first
    setTimeout(() => {
      const menuSection = document.querySelector('#menu');
      if (menuSection) {
        menuSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  // Filter items by menu type and category
  const filteredByMenuType = menuItems.filter(item => 
    item.menuType === selectedMenuType
  );

  const filteredItems = selectedCategory === 'all' 
    ? filteredByMenuType 
    : selectedCategory === 'my-choice'
    ? [] // For "My Choice" category don't show regular menu
    : filteredByMenuType.filter(item => item.category === selectedCategory);

  // Get available categories for current menu type
  const availableCategories = Array.from(
    new Set(filteredByMenuType.map(item => item.category))
  ).filter(category => category !== 'my-choice');

  return (
    <section id="menu" className="pt-0 pb-10 sm:pb-16 lg:pb-20 bg-background -mt-8">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-10 sm:pt-16 lg:pt-20">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Our <span className="text-primary">Menu</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover unique flavors of our cuisine - from traditional dishes to modern European culinary
          </p>
        </div>

        {/* Menu Type Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-8 animate-fade-in-up">
          {Object.entries(menuTypes).map(([key, menuType]) => (
            <Button
              key={key}
              variant={selectedMenuType === key ? 'hero' : 'outline'}
              onClick={() => {
                setSelectedMenuType(key as MenuType);
                setSelectedCategory('all'); // Reset category when changing menu type
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
              size="default"
            >
              <span className="mr-2">{menuType.icon}</span>
              <span className="hidden xs:inline sm:inline">{menuType.name}</span>
              <span className="xs:hidden sm:hidden">{menuType.name.split(' ')[0]}</span>
            </Button>
          ))}
          
          {/* My Choice Button */}
          <Button
            variant={selectedCategory === 'my-choice' ? 'hero' : 'outline'}
            onClick={handleMyChoiceClick}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 relative"
            size="default"
          >
            <span className="mr-2">{menuCategories['my-choice'].icon}</span>
            <span className="hidden xs:inline sm:inline">{menuCategories['my-choice'].name}</span>
            <span className="xs:hidden sm:hidden">My</span>
            {myOrder.totalItems > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {myOrder.totalItems}
              </Badge>
            )}
          </Button>
        </div>

        {/* Category Filter - Hidden when My Choice is selected */}
        {selectedCategory !== 'my-choice' && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 animate-slide-in">
            {selectedMenuType !== 'kids' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className={`${
                  selectedCategory === 'all' 
                    ? 'bg-gradient-primary text-primary-foreground hover:shadow-elegant hover:scale-105 font-semibold' 
                    : 'bg-white/20 backdrop-blur-md border border-white/30 text-foreground/80 hover:bg-white/10 hover:text-primary'
                } transition-[background-color,color,transform,box-shadow] duration-300 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg`}
              >
                <span className="mr-1">🍽️</span>
                <span className="hidden xs:inline">All {menuTypes[selectedMenuType].name.toLowerCase()}</span>
                <span className="xs:hidden">All</span>
              </button>
            )}
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
                  } transition-[background-color,color,transform,box-shadow] duration-300 text-xs sm:text-sm px-2 sm:px-4 py-2 rounded-full shadow-lg`}
                >
                  <span className="mr-1">{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content based on selected category */}
        {selectedCategory === 'my-choice' ? (
          <MyOrder onBackToMenu={() => setSelectedCategory('all')} />
        ) : selectedMenuType === 'drinks' ? (
          <DrinksMenu 
            filteredItems={filteredByMenuType}
            selectedCategory={selectedCategory}
            onAddToOrder={addItem}
            onIncreaseQuantity={increaseItemQuantity}
            onDecreaseQuantity={decreaseItemQuantity}
            getItemQuantity={getItemQuantity}
          />
        ) : (
          <>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in px-2 sm:px-0">
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
          </>
        )}
      </div>

      {/* Floating My Choice Button - only visible when items are selected */}
      {myOrder.totalItems > 0 && selectedCategory !== 'my-choice' && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <Button
            variant="hero"
            onClick={handleMyChoiceClick}
            className="h-14 w-14 rounded-full shadow-elegant hover:scale-110 transition-all duration-300 relative"
            size="default"
          >
            <span className="text-2xl">{menuCategories['my-choice'].icon}</span>
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
  return (
    <Card 
      className="group hover:shadow-elegant transition-all duration-300 bg-gradient-card border-glass-border hover:scale-105 overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={item.image || './placeholder.svg'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {item.name}
            </CardTitle>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">
              €{item.price}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-muted-foreground mb-4">
          {item.description}
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
              New
            </Badge>
          )}
          {item.isPopular && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Popular
            </Badge>
          )}
          {item.isVegetarian && (
            <Badge variant="secondary" className="bg-success/20 text-success">
              🥬 Vegetarian
            </Badge>
          )}
          {item.isSpicy && (
            <Badge variant="secondary" className="bg-destructive/20 text-destructive">
              🌶️ Spicy
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
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add to Choice</span>
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDecreaseQuantity(item.id)}
                className="h-9 w-9 sm:h-8 sm:w-8 p-0 transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-base sm:text-sm font-medium min-w-[2.5rem] sm:min-w-[2rem] text-center">
                {itemQuantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onIncreaseQuantity(item.id)}
                className="h-9 w-9 sm:h-8 sm:w-8 p-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
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
              {menuCategories[category]?.name || category}
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
                      {item.name}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
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
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 ml-4">
                    <span className="text-xl font-bold text-primary">
                      €{item.price}
                    </span>
                    
                    {/* Add to Order Buttons */}
                    {itemQuantity === 0 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAddToOrder(item)}
                        className="flex items-center gap-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground px-3 py-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline text-sm">Add</span>
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDecreaseQuantity(item.id)}
                          className="h-8 w-8 p-0 transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-medium min-w-[1.5rem] text-center">
                          {itemQuantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onIncreaseQuantity(item.id)}
                          className="h-8 w-8 p-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
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
                {menuCategories[category]?.name || category}
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
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.description}
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
                          €{item.price}
                        </span>
                        
                        {/* Add to Order Buttons */}
                        {itemQuantity === 0 ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAddToOrder(item)}
                            className="flex items-center gap-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground px-3 py-2"
                          >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline text-sm">Add</span>
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDecreaseQuantity(item.id)}
                              className="h-8 w-8 p-0 transition-all duration-300 hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium min-w-[1.5rem] text-center">
                              {itemQuantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onIncreaseQuantity(item.id)}
                              className="h-8 w-8 p-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
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