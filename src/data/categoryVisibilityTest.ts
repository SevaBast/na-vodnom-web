// 🎯 ТЕСТ СИСТЕМИ ВИДИМОСТІ КАТЕГОРІЙ

import { 
  setCategoryVisibility, 
  getVisibleCategories, 
  isCategoryVisible 
} from '@/data/menuData';

// ✅ ПОТОЧНИЙ СТАН:
console.log('🔍 Видимі категорії:', getVisibleCategories());
console.log('🥣 Bowls видимі:', isCategoryVisible('bowls')); // Має бути false

// 🎛️ УПРАВЛІННЯ ВИДИМІСТЮ:

// Приховати категорію Bowls (вже приховано)
setCategoryVisibility('bowls', false);

// Приховати Sauces
setCategoryVisibility('sauces', false);

// Показати Bowls знову
setCategoryVisibility('bowls', true);

// 📊 РЕЗУЛЬТАТ:
console.log('🆕 Оновлені видимі категорії:', getVisibleCategories());

// 🚀 ПРАКТИЧНІ ПРИКЛАДИ:

// 1. Приховати всі алкогольні категорії для дневного меню
export const hideDayTimeAlcohol = () => {
  setCategoryVisibility('alcoholic-drinks', false);
  setCategoryVisibility('vodka', false);
  setCategoryVisibility('gin', false);
  setCategoryVisibility('whiskey-bourbon', false);
  setCategoryVisibility('rum', false);
  setCategoryVisibility('tequila', false);
  setCategoryVisibility('liqueurs', false);
  setCategoryVisibility('cognac-brandy', false);
  setCategoryVisibility('roku-gin-cocktails', false);
  console.log('🌅 Алкогольні категорії приховані для дневного меню');
};

// 2. Показати всі алкогольні категорії для вечірнього меню
export const showEveningAlcohol = () => {
  setCategoryVisibility('alcoholic-drinks', true);
  setCategoryVisibility('vodka', true);
  setCategoryVisibility('gin', true);
  setCategoryVisibility('whiskey-bourbon', true);
  setCategoryVisibility('rum', true);
  setCategoryVisibility('tequila', true);
  setCategoryVisibility('liqueurs', true);
  setCategoryVisibility('cognac-brandy', true);
  setCategoryVisibility('roku-gin-cocktails', true);
  console.log('🌙 Алкогольні категорії показані для вечірнього меню');
};

// 3. Приховати категорії що закінчились
export const hideOutOfStock = () => {
  setCategoryVisibility('matcha', false);
  setCategoryVisibility('sauces', false);
  console.log('❌ Категорії що закінчились приховані');
};

// 4. Сезонне меню (приховати літні позиції взимку)
export const winterMenu = () => {
  setCategoryVisibility('homemade-lemonades', false);
  setCategoryVisibility('garden-bowls', false);
  console.log('❄️ Зимове меню активовано');
};

export const summerMenu = () => {
  setCategoryVisibility('homemade-lemonades', true);
  setCategoryVisibility('garden-bowls', true);
  console.log('☀️ Літнє меню активовано');
};