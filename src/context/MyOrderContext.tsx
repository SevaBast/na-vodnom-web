import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MenuItem, OrderItem, MyOrder } from '@/data/menuData';

const STORAGE_KEY = 'restaurant-my-favorites';

interface MyOrderContextType {
  myOrder: MyOrder;
  addItem: (menuItem: MenuItem) => void;
  removeItem: (orderItemId: string) => void;
  decreaseQuantity: (orderItemId: string) => void;
  increaseQuantity: (orderItemId: string) => void;
  decreaseItemQuantity: (menuItemId: string) => void;
  increaseItemQuantity: (menuItemId: string) => void;
  clearOrder: () => void;
  isItemInOrder: (menuItemId: string) => boolean;
  getItemQuantity: (menuItemId: string) => number;
}

const MyOrderContext = createContext<MyOrderContextType | undefined>(undefined);

interface MyOrderProviderProps {
  children: ReactNode;
}

export const MyOrderProvider = ({ children }: MyOrderProviderProps) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Load favorites from localStorage on initialization
  useEffect(() => {
    const savedOrder = localStorage.getItem(STORAGE_KEY);
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        // Convert dates back from JSON
        const itemsWithDates = parsedOrder.map((item: OrderItem & { addedAt: string }) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setOrderItems(itemsWithDates);
      } catch (error) {
        console.error('Error loading favorites:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage when order changes
  const saveToStorage = useCallback((items: OrderItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, []);

  // Toggle dish in favorites
  const addItem = useCallback((menuItem: MenuItem) => {
    setOrderItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.menuItem.id === menuItem.id);
      
      let updatedItems: OrderItem[];
      
      if (existingItemIndex >= 0) {
        // If dish already exists in favorites, remove it
        updatedItems = prevItems.filter((_, index) => index !== existingItemIndex);
      } else {
        // Add new dish to favorites
        const newOrderItem: OrderItem = {
          id: `favorites-${menuItem.id}-${Date.now()}`,
          menuItem,
          quantity: 1, // Always 1 for favorites
          addedAt: new Date()
        };
        updatedItems = [...prevItems, newOrderItem];
      }
      
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Remove dish from favorites
  const removeItem = useCallback((orderItemId: string) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== orderItemId);
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Remove dish from favorites by menu item ID (used by UI toggle)
  const decreaseQuantity = useCallback((orderItemId: string) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== orderItemId);
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Toggle dish in favorites by menu item ID 
  const increaseQuantity = useCallback((menuItemId: string) => {
    // This function is kept for compatibility but doesn't increase quantity
    // Instead, it can be used to add to favorites if not present
    const menuItem = orderItems.find(item => item.menuItem.id === menuItemId)?.menuItem;
    if (menuItem) {
      addItem(menuItem);
    }
  }, [addItem, orderItems]);

  // Clear entire favorites list
  const clearOrder = useCallback(() => {
    setOrderItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Remove dish from favorites by menuItemId
  const decreaseItemQuantity = useCallback((menuItemId: string) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.menuItem.id !== menuItemId);
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Toggle dish in favorites by menuItemId (for compatibility)
  const increaseItemQuantity = useCallback((menuItemId: string) => {
    const menuItem = orderItems.find(item => item.menuItem.id === menuItemId)?.menuItem;
    if (menuItem) {
      addItem(menuItem);
    }
  }, [orderItems, addItem]);

  // Calculate total metrics for favorites
  const myOrder: MyOrder = {
    items: orderItems,
    totalItems: orderItems.length, // For favorites, count unique items, not quantities
    totalPrice: parseFloat(orderItems.reduce((sum, item) => sum + item.menuItem.price, 0).toFixed(2)) // Sum prices without quantity multiplier
  };

  // Check if dish is in favorites
  const isItemInOrder = useCallback((menuItemId: string) => {
    return orderItems.some(item => item.menuItem.id === menuItemId);
  }, [orderItems]);

  // Check if dish is in favorites (returns 1 if in favorites, 0 if not)
  const getItemQuantity = useCallback((menuItemId: string) => {
    return orderItems.some(item => item.menuItem.id === menuItemId) ? 1 : 0;
  }, [orderItems]);

  const value: MyOrderContextType = {
    myOrder,
    addItem,
    removeItem,
    decreaseQuantity,
    increaseQuantity,
    decreaseItemQuantity,
    increaseItemQuantity,
    clearOrder,
    isItemInOrder,
    getItemQuantity
  };

  return (
    <MyOrderContext.Provider value={value}>
      {children}
    </MyOrderContext.Provider>
  );
};

export const useMyOrder = () => {
  const context = useContext(MyOrderContext);
  if (context === undefined) {
    throw new Error('useMyOrder must be used within a MyOrderProvider');
  }
  return context;
};