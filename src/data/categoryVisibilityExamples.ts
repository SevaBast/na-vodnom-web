// Приклад використання системи видимості категорій

import { 
  getVisibleCategories, 
  isCategoryVisible, 
  setCategoryVisibility,
  menuCategories,
  type MenuCategory 
} from './menuData';

// 🎯 Основні функції для управління видимістю:

// 1. Отримати всі видимі категорії (відсортовані за order)
const visibleCategories = getVisibleCategories();
console.log('Видимі категорії:', visibleCategories);

// 2. Перевірити чи категорія видима
const isAppetizersVisible = isCategoryVisible('appetizers');
console.log('Appetizers видимі:', isAppetizersVisible);

// 3. Приховати категорію
setCategoryVisibility('sauces', false);
console.log('Sauces тепер прихована');

// 4. Показати категорію
setCategoryVisibility('sauces', true);
console.log('Sauces тепер видима');

// 🔧 Приклади практичного використання:

// Приховати всі алкогольні напої одночасно
const alcoholicCategories: MenuCategory[] = [
  'alcoholic-drinks',
  'vodka', 
  'gin',
  'distillates',
  'tequila',
  'rum',
  'whiskey-bourbon',
  'liqueurs',
  'cognac-brandy',
  'roku-gin-cocktails'
];

// Функція для приховання алкогольних напоїв
export const hideAlcoholicDrinks = () => {
  alcoholicCategories.forEach(category => {
    setCategoryVisibility(category, false);
  });
};

// Функція для показу алкогольних напоїв
export const showAlcoholicDrinks = () => {
  alcoholicCategories.forEach(category => {
    setCategoryVisibility(category, true);
  });
};

// Приховати категорії що не в наявності
export const hideOutOfStockCategories = (outOfStockCategories: MenuCategory[]) => {
  outOfStockCategories.forEach(category => {
    setCategoryVisibility(category, false);
  });
};

// Показати лише основні категорії
export const showOnlyMainCategories = () => {
  const mainCategories: MenuCategory[] = [
    'appetizers',
    'soups', 
    'main-dishes',
    'pizza',
    'desserts'
  ];
  
  // Приховати всі
  Object.keys(menuCategories).forEach(category => {
    setCategoryVisibility(category as MenuCategory, false);
  });
  
  // Показати лише основні
  mainCategories.forEach(category => {
    setCategoryVisibility(category, true);
  });
};

// 📊 Фільтрація меню за видимими категоріями:
export const getVisibleMenuItems = (menuItems: any[]) => {
  const visibleCats = getVisibleCategories();
  return menuItems.filter(item => visibleCats.includes(item.category));
};