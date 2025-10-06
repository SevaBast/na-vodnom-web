import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to format price consistently with language support
export function formatPrice(
  price: number | string | { sk: string; en: string }, 
  language: 'sk' | 'en' = 'sk'
): string {
  if (typeof price === 'number') {
    // If it's a number, format with € symbol
    return `€${price}`;
  }
  
  if (typeof price === 'string') {
    // If it's a string, return as is (backward compatibility)
    return price;
  }
  
  // If it's an object with translations, return appropriate language
  return price[language];
}
