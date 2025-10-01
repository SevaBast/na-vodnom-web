import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useMyOrder } from "@/context/MyOrderContext";
import { OrderItem } from "@/data/menuData";

interface MyOrderProps {
  onBackToMenu: () => void;
}

export const MyOrder = ({ onBackToMenu }: MyOrderProps) => {
  const { 
    myOrder, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    clearOrder 
  } = useMyOrder();

  if (myOrder.items.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <ShoppingCart className="mx-auto w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Your choice is empty
        </h3>
        <p className="text-muted-foreground mb-6">
          Add dishes from the menu by clicking the "Add to Choice" button
        </p>
        <Button 
          variant="glass" 
          onClick={onBackToMenu}
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
          <h3 className="text-2xl font-bold text-foreground">My Choice</h3>
          <p className="text-muted-foreground">
            {myOrder.totalItems} dishes for €{myOrder.totalPrice.toFixed(2)}
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
            onIncrease={() => increaseQuantity(orderItem.id)}
            onDecrease={() => decreaseQuantity(orderItem.id)}
          />
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-gradient-primary border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-primary-foreground">
            <div>
              <h4 className="text-lg font-semibold">Total Amount</h4>
              <p className="text-sm opacity-90">
                {myOrder.totalItems} dishes
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">€{myOrder.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  );
};

interface OrderItemCardProps {
  orderItem: OrderItem;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const OrderItemCard = ({ orderItem, onRemove, onIncrease, onDecrease }: OrderItemCardProps) => {
  const { menuItem, quantity } = orderItem;
  const itemTotal = (menuItem.price * quantity).toFixed(2);

  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Image */}
          <div className="relative overflow-hidden w-16 h-16 rounded-lg flex-shrink-0">
            <img 
              src={menuItem.image || '/placeholder.svg'}
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

            {/* Quantity Controls - Mobile responsive */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    onDecrease();
                    // Force blur on mobile to remove sticky states
                    (e.target as HTMLElement).blur();
                  }}
                  onTouchEnd={(e) => {
                    // Additional mobile fix
                    setTimeout(() => {
                      (e.target as HTMLElement).blur();
                    }, 50);
                  }}
                  className="w-8 h-8 p-0 flex items-center justify-center border-2"
                >
                  <Minus />
                </Button>
                <span className="w-8 text-center font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    onIncrease();
                    // Force blur on mobile to remove sticky states
                    (e.target as HTMLElement).blur();
                  }}
                  onTouchEnd={(e) => {
                    // Additional mobile fix
                    setTimeout(() => {
                      (e.target as HTMLElement).blur();
                    }, 50);
                  }}
                  className="w-8 h-8 p-0 flex items-center justify-center border-2"
                >
                  <Plus />
                </Button>
              </div>

              {/* Item Total & Remove */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground">
                  €{itemTotal}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    onRemove();
                    // Force blur on mobile to remove sticky states
                    (e.target as HTMLElement).blur();
                  }}
                  onTouchEnd={(e) => {
                    // Additional mobile fix
                    setTimeout(() => {
                      (e.target as HTMLElement).blur();
                    }, 50);
                  }}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground w-8 h-8 p-0 flex items-center justify-center"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};