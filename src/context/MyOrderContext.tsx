import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { MenuItem, OrderItem, MyOrder } from '@/data/menuData';

const STORAGE_KEY = 'restaurant-my-order';

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

  // Load order from localStorage on initialization
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
        console.error('Error loading order:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage when order changes
  const saveToStorage = useCallback((items: OrderItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }, []);

  // Add dish to order
  const addItem = useCallback((menuItem: MenuItem) => {
    setOrderItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.menuItem.id === menuItem.id);
      
      let updatedItems: OrderItem[];
      
      if (existingItemIndex >= 0) {
        // If dish already exists, increase quantity
        updatedItems = prevItems.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new dish
        const newOrderItem: OrderItem = {
          id: `order-${menuItem.id}-${Date.now()}`,
          menuItem,
          quantity: 1,
          addedAt: new Date()
        };
        updatedItems = [...prevItems, newOrderItem];
      }
      
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Remove dish from order
  const removeItem = useCallback((orderItemId: string) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== orderItemId);
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Decrease dish quantity
  const decreaseQuantity = useCallback((orderItemId: string) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === orderItemId) {
          const newQuantity = item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter((item): item is OrderItem => item !== null);
      
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Increase dish quantity
  const increaseQuantity = useCallback((orderItemId: string) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === orderItemId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Clear entire order
  const clearOrder = useCallback(() => {
    setOrderItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Decrease dish quantity by menuItemId
  const decreaseItemQuantity = useCallback((menuItemId: string) => {
    setOrderItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.menuItem.id === menuItemId) {
          const newQuantity = item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter((item): item is OrderItem => item !== null);
      
      saveToStorage(updatedItems);
      return updatedItems;
    });
  }, [saveToStorage]);

  // Increase dish quantity by menuItemId (alternative to addItem)
  const increaseItemQuantity = useCallback((menuItemId: string) => {
    const menuItem = orderItems.find(item => item.menuItem.id === menuItemId)?.menuItem;
    if (menuItem) {
      addItem(menuItem);
    }
  }, [orderItems, addItem]);

  // Calculate total metrics
  const myOrder: MyOrder = {
    items: orderItems,
    totalItems: orderItems.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: parseFloat(orderItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0).toFixed(2))
  };

  // Check if dish is in order
  const isItemInOrder = useCallback((menuItemId: string) => {
    return orderItems.some(item => item.menuItem.id === menuItemId);
  }, [orderItems]);

  // Get quantity of specific dish
  const getItemQuantity = useCallback((menuItemId: string) => {
    const orderItem = orderItems.find(item => item.menuItem.id === menuItemId);
    return orderItem?.quantity || 0;
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