import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMyOrder } from "@/context/MyOrderContext";
import { OrderItem, MenuItem } from "@/data/menuData";

// Компонент оптимізованого зображення для замовлення з lazy loading
const OrderItemOptimizedImage = ({ 
  menuItem, 
  currentLanguage 
}: { 
  menuItem: MenuItem; 
  currentLanguage: 'sk' | 'en';
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden w-16 h-16 rounded-lg flex-shrink-0">
      {/* Placeholder поки завантажується */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center">
          <div className="w-4 h-4 border border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img 
        src={menuItem.image || './placeholder.svg'}
        alt={menuItem.name[currentLanguage]}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

interface MyOrderProps {
  onBackToMenu: () => void;
}

export const MyOrder = ({ onBackToMenu }: MyOrderProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'sk' | 'en';
  
  const { 
    myOrder, 
    removeItem, 
    clearOrder 
  } = useMyOrder();

  if (myOrder.items.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <Heart className="mx-auto w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t('myOrder.empty.title')}
        </h3>
        <p className="text-muted-foreground mb-6">
          {t('myOrder.empty.description')}
        </p>
        <Button 
          variant="hero" 
          size="lg"
          onClick={onBackToMenu}
          className="px-8 py-4 text-lg font-semibold"
        >
          {t('myOrder.empty.viewMenu')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{t('myOrder.title')}</h3>
          <p className="text-muted-foreground">
            {t('myOrder.itemCount', { count: myOrder.totalItems })}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearOrder}
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {t('myOrder.clearAll')}
        </Button>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        {myOrder.items.map((orderItem) => (
          <OrderItemCard
            key={orderItem.id}
            orderItem={orderItem}
            onRemove={() => removeItem(orderItem.id)}
          />
        ))}
      </div>

    </div>
  );
};

interface OrderItemCardProps {
  orderItem: OrderItem;
  onRemove: () => void;
}

const OrderItemCard = ({ orderItem, onRemove }: OrderItemCardProps) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'sk' | 'en';
  const { menuItem } = orderItem;

  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Image */}
          <OrderItemOptimizedImage
            menuItem={menuItem}
            currentLanguage={currentLanguage}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">
              {menuItem.name[currentLanguage]}
            </h4>

            <div className="flex items-center gap-2 mt-1 mb-3">
              <span className="text-sm font-medium text-primary">
                €{menuItem.price}
              </span>

              {/* Weight and Calories */}
              {(menuItem.weight || menuItem.calories) && (
                <div className="flex gap-2 text-xs text-muted-foreground">
                  {menuItem.weight && (
                    <span>{menuItem.weight}g</span>
                  )}
                  {menuItem.calories && (
                    <span>{menuItem.calories} kcal</span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {menuItem.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {menuItem.description[currentLanguage]}
              </p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mb-3">
              {menuItem.isNew && (
                <Badge variant="destructive" className="bg-accent text-accent-foreground text-xs">
                  {t('menu.badges.new')}
                </Badge>
              )}
              {menuItem.isPopular && (
                <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                  {t('menu.badges.popular')}
                </Badge>
              )}
              {menuItem.isVegetarian && (
                <Badge variant="secondary" className="bg-success/20 text-success text-xs">
                  {t('menu.badges.vegetarian')}
                </Badge>
              )}
              {menuItem.isSpicy && (
                <Badge variant="secondary" className="bg-destructive/20 text-destructive text-xs">
                  {t('menu.badges.spicy')}
                </Badge>
              )}
            </div>

            {/* Remove Button */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {t('myOrder.removeFromFavorites')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};