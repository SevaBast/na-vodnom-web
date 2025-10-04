import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Heart } from "lucide-react";
import { useMyOrder } from "@/context/MyOrderContext";
import { OrderItem } from "@/data/menuData";

interface MyOrderProps {
  onBackToMenu: () => void;
}

export const MyOrder = ({ onBackToMenu }: MyOrderProps) => {
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
          Your favorites is empty
        </h3>
        <p className="text-muted-foreground mb-6">
          Add dishes from the menu by clicking the "Add to Favorites" button
        </p>
        <Button 
          variant="hero" 
          size="lg"
          onClick={onBackToMenu}
          className="px-8 py-4 text-lg font-semibold"
        >
          View Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">My Favorites</h3>
          <p className="text-muted-foreground">
            {myOrder.totalItems} favorite dishes
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearOrder}
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
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
  const { menuItem } = orderItem;

  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Image */}
          <div className="relative overflow-hidden w-16 h-16 rounded-lg flex-shrink-0">
            <img 
              src={menuItem.image || './placeholder.svg'}
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">
              {menuItem.name}
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
                {menuItem.description}
              </p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mb-3">
              {menuItem.isNew && (
                <Badge variant="destructive" className="text-xs">
                  New
                </Badge>
              )}
              {menuItem.isPopular && (
                <Badge variant="default" className="text-xs">
                  Popular
                </Badge>
              )}
              {menuItem.isVegetarian && (
                <Badge variant="secondary" className="text-xs">
                  🥬
                </Badge>
              )}
              {menuItem.isSpicy && (
                <Badge variant="secondary" className="text-xs">
                  🌶️
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
                Remove from Favorites
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};