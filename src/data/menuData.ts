export interface MenuItem {
  id: string;
  name: {
      sk: string;
      en: string;
  };
  description: {
      sk: string;
      en: string;
  };
  price: number | string | {
      sk: string;
      en: string;
  };
  image?: string;
  loading?: 'lazy' | 'eager'; // Для оптимізації завантаження зображень
  category: MenuCategory;
  menuType?: MenuType;
  tags?: string[];
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  weight?: number; // grams
  calories?: number; // calories
  displayAsList?: boolean; // відображати як список без фото
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  addedAt: Date;
}

export interface MyOrder {
  items: OrderItem[];
  totalItems: number;
}

export type MenuType = 'main' | 'breakfast' | 'kids' | 'drinks' | 'celebrations';

export type MenuCategory = 
  | 'appetizers' 
  | 'soups' 
  | 'main-dishes' 
  | 'side-dishes'
  | 'garden-bowls'
  | 'pizza'
  | 'desserts' 
  | 'sauces'
  | 'something-for-beer'
  | 'my-choice'
  // Breakfast menu categories
  | 'special-breakfast'
  | 'breakfast-side-dishes'
  | 'classic'
  | 'toasts'
  | 'bowls'
  // Kids menu category
  | 'all-kids-menu'
  // Drinks categories
  | 'alcoholic-drinks'
  | 'vodka'
  | 'gin'
  | 'distillates'
  | 'tequila'
  | 'rum'
  | 'whiskey-bourbon'
  | 'liqueurs'
  | 'cognac-brandy'
  | 'non-alcoholic-drinks'
  | 'non-alcoholic-beverages'
  | 'coffee'
  | 'specialty-coffee'
  | 'matcha'
  | 'teas'
  | 'homemade-lemonades'
  | 'roku-gin-cocktails'
  | 'beer-on-tap'
  // Celebrations and Events categories
  | 'cold-buffet'
  | 'hot-buffet'
  | 'candy-bar'
  | 'vianoce-2025'
  | 'grilovacka';


export const menuCategories: Record<MenuCategory, { name: string; icon: string; order: number }> = {
  'appetizers': { name: 'Appetizers', icon: '🥗', order: 1 },
  'soups': { name: 'Soups', icon: '🍲', order: 2 },
  'main-dishes': { name: 'Main Dishes', icon: '🍽️', order: 3 },
  'garden-bowls': { name: 'Garden Bowls', icon: '🥙', order: 4 },
  'pizza': { name: 'Pizza', icon: '🍕', order: 5 },
  'side-dishes': { name: 'Side Dishes', icon: '🍟', order: 6 },
  'sauces': { name: 'Sauces', icon: '🫙', order: 7 },
  'desserts': { name: 'Desserts', icon: '🧁', order: 8 },
  'something-for-beer': { name: 'Something for Beer', icon: '🍺', order: 9 },
  'my-choice': { name: 'My Favorites', icon: '❤️', order: 999 },
  // Breakfast menu categories
  'special-breakfast': { name: 'Special Breakfast', icon: '🌟', order: 1 },
  'classic': { name: 'Classic', icon: '🍳', order: 2 },
  'toasts': { name: 'Toasts', icon: '🍞', order: 3 },
  'bowls': { name: 'Bowls', icon: '🥣', order: 4 },
  'breakfast-side-dishes': { name: 'Breakfast Side Dishes', icon: '🥓', order: 5 },
  // Kids menu category
  'all-kids-menu': { name: 'All Kids Menu', icon: '🧸', order: 1 },
  // Drinks categories
  'alcoholic-drinks': { name: 'Alcoholic Drinks', icon: '🍷', order: 1 },
  'roku-gin-cocktails': { name: 'Roku Gin Cocktails', icon: '🍸', order: 2 },
  'vodka': { name: 'Vodka', icon: '🍸', order: 3 },
  'gin': { name: 'Gin', icon: '🍸', order: 4 },
  'distillates': { name: 'Distillates', icon: '🥃', order: 5 },
  'tequila': { name: 'Tequila', icon: '🥃', order: 6 },
  'rum': { name: 'Rum', icon: '🥃', order: 7 },
  'whiskey-bourbon': { name: 'Whiskey & Bourbon', icon: '🥃', order: 8 },
  'liqueurs': { name: 'Liqueurs', icon: '🍶', order: 9 },
  'cognac-brandy': { name: 'Cognac & Brandy', icon: '🥃', order: 10 },
  'beer-on-tap': { name: 'Beer (on tap)', icon: '🍺', order: 11 },
  'coffee': { name: 'Coffee', icon: '☕', order: 12 },
  'specialty-coffee': { name: 'Specialty Coffee', icon: '☕', order: 13 },
  'matcha': { name: 'Matcha', icon: '🍵', order: 14 },
  'teas': { name: 'Teas', icon: '🍵', order: 15 },
  'homemade-lemonades': { name: 'Homemade Lemonades', icon: '🍋', order: 16 },
  'non-alcoholic-beverages': { name: 'Non-Alcoholic Beverages', icon: '🥤', order: 17 },
  'non-alcoholic-drinks': { name: 'Non-Alcoholic Drinks', icon: '🧃', order: 18 },
  // Celebrations and Events categories
  'cold-buffet': { name: 'Cold Buffet', icon: '🥗', order: 19 },
  'hot-buffet': { name: 'Hot Buffet', icon: '🍲', order: 20 },
  'candy-bar': { name: 'Candy Bar', icon: '🍭', order: 21 },
  'vianoce-2025': { name: 'Christmas 2025', icon: '🎄', order: 22 },
  'grilovacka': { name: 'BBQ Party', icon: '🔥', order: 23 },
};

export const menuTypes: Record<MenuType, { name: string; icon: string }> = {
  'main': { name: 'Main Menu', icon: '🍽️' },
  'breakfast': { name: 'Breakfast Menu', icon: '☀️' },
  'kids': { name: 'Kids Menu', icon: '🧸' },
  'drinks': { name: 'Drinks', icon: '🍹' },
  'celebrations': { name: 'Celebrations and Events', icon: '🎉' },
};

export const menuItems: MenuItem[] = [
  // Main Menu - Appetizers
  {
    id: 'appetizers-1',
    name: {
      sk: 'Grilovaná Feta',
      en: 'needs translation'
    },
    description: {
      sk: 'paprikovo-paradajková omačka, grilované paradajky, petržlenová vňať, vypražené kapary (7,11*)',
      en: 'needs translation'
    },
    price: 7.50,
    image: './dishtest.jpg',
    category: 'appetizers',
    menuType: 'main',
    isPopular: true,
    tags: ['popular'],
    weight: 180,
    calories: 303
  },
  {
    id: 'appetizers-2',
    name: {
      sk: 'Domáci Hummus',
      en: 'needs translation'
    },
    description: {
      sk: 'cícer, grilovaný bakalažan, tahini (sezamová pasta), olej s pepper flakes, sezamové semiačka (5,10,11*)',
      en: 'needs translation'
    },
    price: 6.50,
    image: './placeholder.svg',
    category: 'appetizers',
    menuType: 'main',
    isVegetarian: true,
    tags: ['vegetarian', 'premium'],
    weight: 200,
    calories: 420
  },
  {
    id: 'appetizers-3',
    name: {
      sk: 'Pučené Baby Zemiaky',
      en: 'needs translation'
    },
    description: {
      sk: 'perlová cibuľka, petržlenová vňať, koriander, jalapeños, queso omačka (6*)',
      en: 'needs translation'
    },
    price: 6.50,
    image: './placeholder.svg',
    category: 'appetizers',
    menuType: 'main',
    isVegetarian: true,
    isPopular: true,
    isSpicy: true,
    tags: ['popular'],
    weight: 180,
    calories: 246
  },  
  {
    id: 'appetizers-4',
    name: {
      sk: 'Vyprážaný Falafel',
      en: 'needs translation'
    },
    description: {
      sk: 'mix šalátov, paprika, cesnak, limetkový jogurt, bagel semiačka (7,10,11*)',
      en: 'needs translation'
    },
    price: 6.90,
    image: './placeholder.svg',
    category: 'appetizers',
    menuType: 'main',
    isPopular: true,
    tags: ['popular'],
    weight: 180,
    calories: 392
  }, 
  
  // Main Menu - Soups
  {
    id: 'soups-1',
    name: {
      sk: 'Silný Kurací Vývar',
      en: 'needs translation'
    },
    description: {
      sk: 'zelenina, kuracie mäso, bylinkové halušky (1,3,9*)',
      en: 'needs translation'
    },
    price: 3.90,
    image: './placeholder.svg',
    category: 'soups',
    menuType: 'main',
    weight: 300,
    calories: 325
  },
  {
    id: 'soups-2',
    name: {
      sk: 'Polievka Dňa',
      en: 'needs translation'
    },
    description: {
      sk: 'Vynikajuca polievka pripravená podľa dennej ponuky šéfkuchára',
      en: 'needs translation'
    },
    price: 4.50,
    image: './placeholder.svg',
    category: 'soups',
    menuType: 'main',
    isPopular: true,
    weight: 300,
  },

  // Main Menu - Main Dishes
  {
    id: 'main-dishes-1',
    name: {
      sk: 'Lemon Mustard Chicken',
      en: 'needs translation'
    },
    description: {
      sk: 'marinované kuracie supreme grilované na drevenom uhlí s horčicovo-medovou omačkou (10,11*)',
      en: 'needs translation'
    },
    price: 10.90,
    image: './placeholder.svg',
    category: 'main-dishes',
    menuType: 'main',
    isPopular: true,
    tags: ['meat', 'grill'],
    weight: 320,
    calories: 595
  },
  {
    id: 'main-dishes-2',
    name: {
      sk: 'Rib Eye',
      en: 'needs translation'
    },
    description: {
      sk: 'servirovaný s chimichurri omačkou (10,11*)',
      en: 'needs translation'
    },
    price: 21.90,
    image: './placeholder.svg',
    category: 'main-dishes',
    menuType: 'main',
    isSpicy: true,
    tags: ['healthy'],
    weight: 300,
    calories: 805
  },
  {
    id: 'main-dishes-3',
    name: {
      sk: 'UPRAVIT - Steak',
      en: 'needs translation'
    },
    description: {
      sk: 'pre viac informacií a dostupných steakoch kontaktujte našu obsluhu',
      en: 'needs translation'
    },
    price: 0,
    image: './placeholder.svg',
    category: 'main-dishes',
    menuType: 'main',
    tags: ['healthy'],
    weight: 300,
    calories: 805
  },
  {
    id: 'main-dishes-4',
    name: {
      sk: 'Hot Halloumi Syr',
      en: 'needs translation'
    },
    description: {
      sk: 'marinovný v pikantno-medovej omačke (7,10,11*)',
      en: 'needs translation'
    },
    price: 10.90,
    image: './placeholder.svg',
    category: 'main-dishes',
    menuType: 'main',
    isSpicy: true,
    tags: ['healthy'],
    weight: 320,
    calories: 795
  },
  {
    id: 'main-dishes-5',
    name: {
      sk: 'Ryba (podľa dennej ponuky)',
      en: 'needs translation'
    },
    description: {
      sk: 'servirované s bearnaise omáčkou (4,10,11*)',
      en: 'needs translation'
    },
    price: 12.90,
    image: './placeholder.svg',
    category: 'main-dishes',
    menuType: 'main',
    isSpicy: true,
    tags: ['healthy'],
    weight: 280,
    calories: 615
  },
  {
    id: 'main-dishes-6',
    name: {
      sk: 'Krevety',
      en: 'needs translation'
    },
    description: {
      sk: 'servirované s aioli omáčkou (2,10,11*)',
      en: 'needs translation'
    },
    price: 12.90,
    image: './placeholder.svg',
    category: 'main-dishes',
    menuType: 'main',
    isSpicy: true,
    tags: ['healthy'],
    weight: 280,
    calories: 535
  },
  {
    id: 'main-dishes-7',
    name: {
      sk: 'Bylinkové Tofu',
      en: 'needs translation'
    },
    description: {
      sk: 'marinované tofu s bylinkami (6,10,11*)',
      en: 'needs translation'
    },
    price: 9.90,
    image: './placeholder.svg',
    category: 'main-dishes',
    menuType: 'main',
    isVegetarian: true,
    tags: ['healthy'],
    weight: 320,
    calories: 435
  },

  // Main Menu - Side Dishes
  {
    id: 'side-dishes-1',
    name: {
      sk: 'diva ryža',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 4.20,
    image: './placeholder.svg',
    category: 'side-dishes',
    menuType: 'main',
    weight: 125,
    calories: 322,
    displayAsList: true
  },
  {
    id: 'side-dishes-2',
    name: {
      sk: 'pučené baby zemiaky, hĺuzovková majonéza',
      en: 'needs translation'
    },
    description: {
      sk: '(3*)',
      en: 'needs translation'
    },
    price: 3.90,
    image: './placeholder.svg',
    category: 'side-dishes',
    menuType: 'main',
    weight: 180,
    calories: 300,
    displayAsList: true
  },
  {
    id: 'side-dishes-3',
    name: {
      sk: 'grilované avokádo, pico de gallo, chipotie majonéza',
      en: 'needs translation'
    },
    description: {
      sk: '(3,9*)',
      en: 'needs translation'
    },
    price: 5.50,
    image: './placeholder.svg',
    category: 'side-dishes',
    menuType: 'main',
    weight: 230,
    calories: 410,
    displayAsList: true
  },
  {
    id: 'side-dishes-4',
    name: {
      sk: 'grilovaná sezónna zelenina',
      en: 'needs translation'
    },
    description: {
      sk: '(9*)',
      en: 'needs translation'
    },
    price: 4.50,
    image: './placeholder.svg',
    category: 'side-dishes',
    menuType: 'main',
    weight: 200,
    calories: 100,
    displayAsList: true
  },
  {
    id: 'side-dishes-5',
    name: {
      sk: 'domáci hummus, chilli olej, sezam, petržlenová vňať',
      en: 'needs translation'
    },
    description: {
      sk: '(10,11*)',
      en: 'needs translation'
    },
    price: 4.50,
    image: './placeholder.svg',
    category: 'side-dishes',
    menuType: 'main',
    weight: 150,
    calories: 180,
    displayAsList: true
  },
  {
    id: 'side-dishes-6',
    name: {
      sk: 'grilované batatové zemiaky, achiote strúhanka',
      en: 'needs translation'
    },
    description: {
      sk: '(1*)',
      en: 'needs translation'
    },
    price: 4.50,
    image: './placeholder.svg',
    category: 'side-dishes',
    menuType: 'main',
    weight: 180,
    calories: 240,
    displayAsList: true
  },

  // Main Menu - Garden Bowls
  {
    id: 'garden-bowls-1',
    name: {
      sk: 'Mediterranean Delight',
      en: 'needs translation'
    },
    description: {
      sk: 'quinoa, baby špenát, halloumi syr, hokkaido, perlová cibuľka, grilovaná paprika, nakladaná červená cibuľa, granatové jablko, sezamové semiačka, limetkový jogurt (7,11*)',
      en: 'needs translation'
    },
    price: 12.50,
    image: './placeholder.svg',
    category: 'garden-bowls',
    menuType: 'main',
    weight: 496,
    calories: 577
  },
  {
    id: 'garden-bowls-2',
    name: {
      sk: 'Green Earth',
      en: 'needs translation'
    },
    description: {
      sk: 'hnedá ryža, poľníček, rukola, tofu, falafel, hummus, nakladaná červená cibuľa, granatové jablko, sezamové semiačka, limetkový jogurt (7,11*)',
      en: 'needs translation'
    },
    price: 13.50,
    image: './placeholder.svg',
    category: 'garden-bowls',
    menuType: 'main',
    isVegetarian: true,
    weight: 497,
    calories: 702
  },
  {
    id: 'garden-bowls-3',
    name: {
      sk: 'Goddess Fuel',
      en: 'needs translation'
    },
    description: {
      sk: 'bulgur, baby špenát, rukola, kuracie mäso, batátové zemiaky, grilovaná cuketa, cherry paradajky, bagel seeds, bazalkovo-limetková omáčka (Green Goddess) (1,7,3*)',
      en: 'needs translation'
    },
    price: 14.50,
    image: './placeholder.svg',
    category: 'garden-bowls',
    menuType: 'main',
    weight: 481,
    calories: 387
  },

  // Main Menu - Pizza
  {
    id: 'pizza-1',
    name: {
      sk: 'Pizza Bread',
      en: 'needs translation'
    },
    description: {
      sk: 'cesto, olivový olej, cesnak, čerstvé oregano (1,7*)',
      en: 'needs translation'
    },
    price: 5.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 300,
    calories: 400
  },
  {
    id: 'pizza-2',
    name: {
      sk: 'Margherita',
      en: 'needs translation'
    },
    description: {
      sk: 'San Marzano paradajkový základ, mozzarella fior di latte, čerstvá bazalka, extra panenský olivový olej (1,7*)',
      en: 'needs translation'
    },
    price: 8.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 405,
    calories: 1010
  },
  {
    id: 'pizza-3',
    name: {
      sk: 'Salami',
      en: 'needs translation'
    },
    description: {
      sk: 'San Marzano paradajkový základ, mozzarella fior di latte, pikantná saláma (napr. humenský sčipák), chili papričky (1,7*)',
      en: 'needs translation'
    },
    price: 9.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 465,
    calories: 1172
  },
  {
    id: 'pizza-4',
    name: {
      sk: 'Prosciutto E Funghi',
      en: 'needs translation'
    },
    description: {
      sk: 'San Marzano paradajkový základ, mozzarella fior di latte, šunka, šampiňóny (1,7*)',
      en: 'needs translation'
    },
    price: 9.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 460,
    calories: 1005
  },
  {
    id: 'pizza-5',
    name: {
      sk: 'Quattro Stagioni',
      en: 'needs translation'
    },
    description: {
      sk: 'San Marzano paradajkový základ, mozzarella fior di latte, šunka, šampiňóny, artičoky, čierne olivy (1,7*)',
      en: 'needs translation'
    },
    price: 10.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 490,
    calories: 1061
  },
  {
    id: 'pizza-6',
    name: {
      sk: 'Vegetariana',
      en: 'needs translation'
    },
    description: {
      sk: 'San Marzano paradajkový základ, mozzarella fior di latte, nakladané antipasty (cuketa, baklažán, paprika, cherry paradajky) (1,7*)',
      en: 'needs translation'
    },
    price: 10.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    isVegetarian: true, 
    weight: 460,
    calories: 948
  },
  {
    id: 'pizza-7',
    name: {
      sk: 'Tonno E Cipolla',
      en: 'needs translation'
    },
    description: {
      sk: 'San Marzano paradajkový základ, mozzarella fior di latte, tuniak, červená cibuľa (1,4,7*)',
      en: 'needs translation'
    },
    price: 11.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 460,
    calories: 1062
  },
  {
    id: 'pizza-8',
    name: {
      sk: 'Quattro Formaggi',
      en: 'needs translation'
    },
    description: {
      sk: 'San Marzano paradajkový základ, mozzarella fior di latte, niva, parmezán, provola (1,7*)',
      en: 'needs translation'
    },
    price: 12.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 460,
    calories: 1210
  },
  {
    id: 'pizza-9',
    name: {
      sk: 'Napoli',
      en: 'needs translation'
    },
    description: {
      sk: 'San Marzano paradajkový základ, mozzarella fior di latte, ančovičky, kapary, čerstvé oregano (1,4,7*)',
      en: 'needs translation'
    },
    price: 12.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 455,
    calories: 988
  },
  {
    id: 'pizza-10',
    name: {
      sk: 'Carmel',
      en: 'needs translation'
    },
    description: {
      sk: 'paradajkový základ, mozzarella fior di latte, šunka, niva, kukurica (1,7*)',
      en: 'needs translation'
    },
    price: 10.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 480,
    calories: 1135
  },
  {
    id: 'pizza-11',
    name: {
      sk: 'Chamon',
      en: 'needs translation'
    },
    description: {
      sk: 'paradajkový základ, mozzarella fior di latte, jamón serrano, rukola, parmezán (1,7*)',
      en: 'needs translation'
    },
    price: 13.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 470,
    calories: 1128
  },
  {
    id: 'pizza-12',
    name: {
      sk: 'Chorizo',
      en: 'needs translation'
    },
    description: {
      sk: 'paradajkový základ, mozzarella fior di latte, chorizo, jalapeños, ricotta, petržlenová vňať (1,7*)',
      en: 'needs translation'
    },
    price: 13.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 470,
    calories: 1196
  },
  {
    id: 'pizza-13',
    name: {
      sk: 'Naturalis',
      en: 'needs translation'
    },
    description: {
      sk: 'paradajkový základ, mozzarella fior di latte, naturálne dusená šunka (1,7*)',
      en: 'needs translation'
    },
    price: 14.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 470,
    calories: 1205
  },
  {
    id: 'pizza-14',
    name: {
      sk: 'Pancetta',
      en: 'needs translation'
    },
    description: {
      sk: 'paradajkový základ, mozzarella fior di latte, pancetta, nakladaná červená cibuľa, hľuzovková majonéza (1,3,7*)',
      en: 'needs translation'
    },
    price: 14.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 470,
    calories: 1325
  },

  // Main Menu - Desserts
  {
    id: 'desserts-1',
    name: {
      sk: 'Creme Catalana',
      en: 'needs translation'
    },
    description: {
      sk: 'citrusová kóra, karamelová krusta (3,7*)',
      en: 'needs translation'
    },
    price: 5.50,
    image: './placeholder.svg',
    category: 'desserts',
    menuType: 'main',
    isPopular: true,
    weight: 150,
    calories: 264
  },

  // Main Menu - Sauces
  {
    id: 'sauces-1',
    name: {
      sk: 'demi glace',
      en: 'needs translation'
    },
    description: {
      sk: '(9*)',
      en: 'needs translation'
    },
    price: 3.50,
    image: './placeholder.svg',
    category: 'sauces',
    menuType: 'main',
    weight: 30,
    calories: 40,
    displayAsList: true
  },
  {
    id: 'sauces-2',
    name: {
      sk: 'chippotle mayo',
      en: 'needs translation'
    },
    description: {
      sk: '(3,7*)',
      en: 'needs translation'
    },
    price: 2.90,
    image: './placeholder.svg',
    category: 'sauces',
    menuType: 'main',
    weight: 30,
    calories: 120,
    displayAsList: true
  },
  {
    id: 'sauces-3',
    name: {
      sk: 'hľuzovková mayo',
      en: 'needs translation'
    },
    description: {
      sk: '(3*)',
      en: 'needs translation'
    },
    price: 2.90,
    image: './placeholder.svg',
    category: 'sauces',
    menuType: 'main',
    weight: 30,
    calories: 150,
    displayAsList: true
  },
  {
    id: 'sauces-4',
    name: {
      sk: 'vegan queso',
      en: 'needs translation'
    },
    description: {
      sk: '(6*)',
      en: 'needs translation'
    },
    price: 2.50,
    image: './placeholder.svg',
    category: 'sauces',
    menuType: 'main',
    isVegetarian: true,
    weight: 30,
    calories: 70,
    displayAsList: true
  },
  {
    id: 'sauces-5',
    name: {
      sk: 'paint based aioli',
      en: 'needs translation'
    },
    description: {
      sk: '(6*)',
      en: 'needs translation'
    },
    price: 2.20,
    image: './placeholder.svg',
    category: 'sauces',
    menuType: 'main',
    weight: 30,
    calories: 110,
    displayAsList: true
  },

  // Main Menu - Something for Beer
  {
    id: 'something-for-beer-1',
    name: {
      sk: 'chlebík domáci kvaskový',
      en: 'needs translation'
    },
    description: {
      sk: '(1*)',
      en: 'needs translation'
    },
    price: 2.50,
    image: './placeholder.svg',
    category: 'something-for-beer',
    menuType: 'main',
    displayAsList: true,
    weight: 50,
    calories: 120
  },
  {
    id: 'something-for-beer-2',
    name: {
      sk: 'zeleninka mix',
      en: 'needs translation'
    },
    description: {
      sk: '(1,9*)',
      en: 'needs translation'
    },
    price: 2.90,
    image: './placeholder.svg',
    category: 'something-for-beer',
    menuType: 'main',
    displayAsList: true,
    weight: 100,
    calories: 40
  },
   {
    id: 'something-for-beer-3',
    name: {
      sk: 'degustačný tanier syrov a údenín, domáci chlebík',
      en: 'needs translation'
    },
    description: {
      sk: '(1,7*)',
      en: 'needs translation'
    },
    price: 14.50,
    image: './placeholder.svg',
    category: 'something-for-beer',
    menuType: 'main',
    displayAsList: true,
    weight: 250,
    calories: 770
  },
   {
    id: 'something-for-beer-4',
    name: {
      sk: 'tatarák, hrianky',
      en: 'needs translation'
    },
    description: {
      sk: 'z dôvodu obsahu surového mäsa nie je vhodné pre deti a tehotné ženy (1,3,10*)',
      en: 'needs translation'
    },
    price: 14.50,
    image: './placeholder.svg',
    category: 'something-for-beer',
    menuType: 'main',
    displayAsList: true,
    weight: 200,
    calories: 400
  },

  // Breakfast Menu - Special Breakfast
  {
    id: 'special-breakfast-1',
    name: {
      sk: 'Benedikt Toast',
      en: 'needs translation'
    },
    description: {
      sk: 'kváskový chlieb, pošírované vajce, šunka Naturalis, holandská omačka (1,3,7*)',
      en: 'needs translation'
    },
    price: 8.90,
    image: './placeholder.svg',
    category: 'special-breakfast',
    menuType: 'breakfast',
    isPopular: true,
    weight: 250,
    calories: 1
  },
  {
    id: 'special-breakfast-2',
    name: {
      sk: 'Turecké Vajcia',
      en: 'needs translation'
    },
    description: {
      sk: 'jogurt, cesnak, chilli olej, pošírované vajcia, chlieb, kôpor, šalát (1,3,7*)',
      en: 'needs translation'
    },
    price: 8.50,
    image: './placeholder.svg',
    category: 'special-breakfast',
    menuType: 'breakfast',
    tags: ['healthy', 'salmon'],
    weight: 300,
    calories: 1
  },
  {
    id: 'special-breakfast-3',
    name: {
      sk: 'OG French Toast',
      en: 'needs translation'
    },
    description: {
      sk: 'brioška, javorový sirup, šľahačka, ovocie, práškový cukor (1,3,7*)',
      en: 'needs translation'
    },
    price: 7.90,
    image: './placeholder.svg',
    category: 'special-breakfast',
    menuType: 'breakfast',
    tags: ['healthy', 'salmon'],
    weight: 280,
    calories: 1
  },
  {
    id: 'special-breakfast-4',
    name: {
      sk: 'Proteínové Lievance',
      en: 'needs translation'
    },
    description: {
      sk: 'banán, proteín, arašidové maslo, tvaroh, kokos, ovocie (1,3,5,6,7,8*)',
      en: 'needs translation'
    },
    price: 8.50,
    image: './placeholder.svg',
    category: 'special-breakfast',
    menuType: 'breakfast',
    tags: ['healthy', 'salmon'],
    weight: 320,
    calories: 1
  },
  {
    id: 'special-breakfast-5',
    name: {
      sk: 'Cviklový Hummus',
      en: 'needs translation'
    },
    description: {
      sk: 'cvikla, nakladaný karfiol, šalátový mix, chlieb alebo zelenina (1,11,12*)',
      en: 'needs translation'
    },
    price: 7.50,
    image: './placeholder.svg',
    category: 'special-breakfast',
    menuType: 'breakfast',
    tags: ['healthy', 'salmon'],
    weight: 310,
    calories: 1
  },

  // Breakfast Menu - Breakfast Side Dishes
  {
    id: 'breakfast-side-dishes-1',
    name: {
      sk: 'pošírované vajce',
      en: 'needs translation'
    },
    description: {
      sk: '(3*)',
      en: 'needs translation'
    },
    price: 1.50,
    image: './placeholder.svg',
    category: 'breakfast-side-dishes',
    menuType: 'breakfast',
    weight: 60,
    calories: 1,
    displayAsList: true
  },
  {
    id: 'breakfast-side-dishes-2',
    name: {
      sk: 'volské oko',
      en: 'needs translation'
    },
    description: {
      sk: '(3*)',
      en: 'needs translation'
    },
    price: 1.20,
    image: './placeholder.svg',
    category: 'breakfast-side-dishes',
    menuType: 'breakfast',
    weight: 60,
    calories: 1,
    displayAsList: true
  },
  {
    id: 'breakfast-side-dishes-3',
    name: {
      sk: 'šunka',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 1.80,
    image: './placeholder.svg',
    category: 'breakfast-side-dishes',
    menuType: 'breakfast',
    weight: 40,
    calories: 1,
    displayAsList: true
  },
  {
    id: 'breakfast-side-dishes-4',
    name: {
      sk: 'slanina',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2,
    image: './placeholder.svg',
    category: 'breakfast-side-dishes',
    menuType: 'breakfast',
    weight: 40,
    calories: 1,
    displayAsList: true
  },
  {
    id: 'breakfast-side-dishes-5',
    name: {
      sk: 'grilovaná zelenina',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.50,
    image: './placeholder.svg',
    category: 'breakfast-side-dishes',
    menuType: 'breakfast',
    weight: 80,
    calories: 1,
    displayAsList: true
  },
  {
    id: 'breakfast-side-dishes-6',
    name: {
      sk: 'ovocie',
      en: 'needs translation'
    },
    description: {
      sk: '(3*)',
      en: 'needs translation'
    },
    price: 2.50,
    image: './placeholder.svg',
    category: 'breakfast-side-dishes',
    menuType: 'breakfast',
    weight: 60,
    calories: 1,
    displayAsList: true
  },
  {
    id: 'breakfast-side-dishes-7',
    name: {
      sk: 'granola',
      en: 'needs translation'
    },
    description: {
      sk: '(1,8*)',
      en: 'needs translation'
    },
    price: 1.50,
    image: './placeholder.svg',
    category: 'breakfast-side-dishes',
    menuType: 'breakfast',
    weight: 40,
    calories: 1,
    displayAsList: true
  },

  // Breakfast Menu - Classic
  {
    id: 'classic-1',
    name: {
      sk: 'Miešané Vajíčka',
      en: 'needs translation'
    },
    description: {
      sk: '(3,7*)',
      en: 'needs translation'
    },
    price: 5.50,
    image: './placeholder.svg',
    category: 'classic',
    menuType: 'breakfast',
    isPopular: true,
    weight: 200,
    calories: 1
  },
  {
    id: 'classic-2',
    name: {
      sk: 'Volské Oko',
      en: 'needs translation'
    },
    description: {
      sk: '(3*)',
      en: 'needs translation'
    },
    price: 4.90,
    image: './placeholder.svg',
    category: 'classic',
    menuType: 'breakfast',
    weight: 150,
    calories: 1
  },
  {
    id: 'classic-3',
    name: {
      sk: 'Omeleta',
      en: 'needs translation'
    },
    description: {
      sk: '(3*)',
      en: 'needs translation'
    },
    price: 5.50,
    image: './placeholder.svg',
    category: 'classic',
    menuType: 'breakfast',
    weight: 200,
    calories: 1
  },

  // Breakfast Menu - Toasts
  {
    id: 'toasts-1',
    name: {
      sk: 'Losos & Avokádo',
      en: 'needs translation'
    },
    description: {
      sk: 'kváskový chlieb, guacamole, údený losos, nakladaná cibuľa (1,4*)',
      en: 'needs translation'
    },
    price: 8.90,
    image: './placeholder.svg',
    category: 'toasts',
    menuType: 'breakfast',
    weight: 220,
    calories: 1
  },
  {
    id: 'toasts-2',
    name: {
      sk: 'Feta & Špenát',
      en: 'needs translation'
    },
    description: {
      sk: 'nátierka z pečenej papriky, špenát, sušené paradajky, feta, chlieb (1,7*)',
      en: 'needs translation'
    },
    price: 7.90,
    image: './placeholder.svg',
    category: 'toasts',
    menuType: 'breakfast',
    weight: 230,
    calories: 1
  },
  {
    id: 'toasts-3',
    name: {
      sk: 'Turbo Chlebík',
      en: 'needs translation'
    },
    description: {
      sk: 'chlieb vo vajíčku, chipotle mayo, šunka Naturalis, cheddar, rukola (1,3,7,10*)',
      en: 'needs translation'
    },
    price: 8.90,
    image: './placeholder.svg',
    category: 'toasts',
    menuType: 'breakfast',
    weight: 280,
    calories: 1
  },

  // Breakfast Menu - Bowls
  {
    id: 'bowls-1',
    name: {
      sk: 'Acaí Bowl',
      en: 'needs translation'
    },
    description: {
      sk: 'mrazené ovocie, jogurt, banán, drobné ovocie, granola (1,7,8*)',
      en: 'needs translation'
    },
    price: 7.90,
    image: './placeholder.svg',
    category: 'bowls',
    menuType: 'breakfast',
    isNew: true,
    weight: 350,
    calories: 1
  },
  {
    id: 'bowls-2',
    name: {
      sk: 'Matcha Bowl',
      en: 'needs translation'
    },
    description: {
      sk: 'banán, mango, avokádo, hráškové mlieko, matcha, chia, grepový džem, limetka (8*)',
      en: 'needs translation'
    },
    price: 8.90,
    image: './placeholder.svg',
    category: 'bowls',
    menuType: 'breakfast',
    weight: 400,
    calories: 1
  },
  {
    id: 'bowls-3',
    name: {
      sk: 'Domáci Termix',
      en: 'needs translation'
    },
    description: {
      sk: 'granola, čerstvé ovocie (1,7*)',
      en: 'needs translation'
    },
    price: 5.80,
    image: './placeholder.svg',
    category: 'bowls',
    menuType: 'breakfast',
    weight: 250,
    calories: 1
  },

  // Kids Menu - All Kids Menu
  {
    id: 'all-kids-menu-1',
    name: {
      sk: 'Kuracie Mäsko s Baby Zemiakmi',
      en: 'needs translation'
    },
    description: {
      sk: 'jemné kuracie prsia, podávané s baby zemiakmi a čerstvou zeleninovou oblohou (1,7*)',
      en: 'needs translation'
    },
    price: 7.90,
    image: './placeholder.svg',
    category: 'all-kids-menu',
    menuType: 'kids',
    weight: 250,
    calories: 1
  },
  {
    id: 'all-kids-menu-2',
    name: {
      sk: 'Detská Mini Pizza',
      en: 'needs translation'
    },
    description: {
      sk: 'chrumkavá pizza s paradajkovou omáčkou, mozzarella syrom, šunkou a sladkou kukuricou (1,3,7*)',
      en: 'needs translation'
    },
    price: 6.50,
    image: './placeholder.svg',
    category: 'all-kids-menu',
    menuType: 'kids',
    weight: 300,
    calories: 1
  },
  {
    id: 'all-kids-menu-3',
    name: {
      sk: 'Ryžové Rizoto s Kuracím Mäsom a Brokolicou',
      en: 'needs translation'
    },
    description: {
      sk: 'divá ryža s kúskami kuracieho mäsa, brokolicou a maslom (1,7*)',
      en: 'needs translation'
    },
    price: 7.20,
    image: './placeholder.svg',
    category: 'all-kids-menu',
    menuType: 'kids',
    weight: 250,
    calories: 1
  },

  // Drinks Menu - Alcoholic Drinks
  {
    id: 'alcoholic-drinks-1',
    name: {
      sk: 'Mojito',
      en: 'needs translation'
    },
    description: {
      sk: 'rum Barceló 5cl, limetka, mäta, trstinový cukor, sóda',
      en: 'needs translation'
    },
    price: 6.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-2',
    name: {
      sk: 'Caipirinha',
      en: 'needs translation'
    },
    description: {
      sk: 'Pitú 5cl, limetka, trstinový cukor',
      en: 'needs translation'
    },
    price: 6.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-3',
    name: {
      sk: 'Cuba Libre',
      en: 'needs translation'
    },
    description: {
      sk: 'rum Abuelo 7 Años 5cl, Coca-Cola, limetka',
      en: 'needs translation'
    },
    price: 6.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-4',
    name: {
      sk: 'Mai Tai',
      en: 'needs translation'
    },
    description: {
      sk: 'rum Mount Gay Black Barrel 2cl, Abuelo 7 3cl, Cointreau 2cl, Amaretto 1cl, pomarančový fresh, ananás, limeta',
      en: 'needs translation'
    },
    price: 8.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Hemingway Daiquiri',
      en: 'needs translation'
    },
    description: {
      sk: 'rum Barceló 4cl, Marashino 1cl, grep, limeta, simple sirup',
      en: 'needs translation'
    },
    price: 6.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Frozen Mango Margarita',
      en: 'needs translation'
    },
    description: {
      sk: 'Sierra Antiquo Plata 5cl, Cointreau 2cl, mango, limeta',
      en: 'needs translation'
    },
    price: 6.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Long Island',
      en: 'needs translation'
    },
    description: {
      sk: 'vodka Expedition 2cl, gin Roku 2cl, rum Barceló 2cl, Tequila Sierra Antiguo Plata 2cl, Cointreau 2cl, pomarančový fresh, limeta, Coca-Cola',
      en: 'needs translation'
    },
    price: 8.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Moscow Mule',
      en: 'needs translation'
    },
    description: {
      sk: 'vodka Expedition 5cl, domáca zázvorovka, limeta, simple sirup, sóda',
      en: 'needs translation'
    },
    price: 6.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Porn Star Martini',
      en: 'needs translation'
    },
    description: {
      sk: 'vodka Expedition 5cl, marakuja, vanilka, prosečko',
      en: 'needs translation'
    },
    price: 7.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Skinny B*tch',
      en: 'needs translation'
    },
    description: {
      sk: 'vodka Expedition 4cl, limeta, sóda',
      en: 'needs translation'
    },
    price: 5.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Cosmopolitan',
      en: 'needs translation'
    },
    description: {
      sk: 'vodka Expedition 4cl, Cointreau 2cl, limetka, brusnicový džús',
      en: 'needs translation'
    },
    price: 6.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Bloody Mary',
      en: 'needs translation'
    },
    description: {
      sk: 'vodka Amundsen Expedition 5cl, tajná receptúra',
      en: 'needs translation'
    },
    price: 8.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Old Fashioned',
      en: 'needs translation'
    },
    description: {
      sk: 'rum Barceló Porto Cask 6cl, cukor, bitter',
      en: 'needs translation'
    },
    price: 8.50,
    category: 'alcoholic-drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Mimosa 0,2L',
      en: 'needs translation'
    },
    description: {
      sk: 'prosečko, pomarančový fresh',
      en: 'needs translation'
    },
    price: 4.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Hugo 0,25L',
      en: 'needs translation'
    },
    description: {
      sk: 'prosečko, bazový sirup, mäta, sóda',
      en: 'needs translation'
    },
    price: 4.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: {
      sk: 'Aperol spritz 0,25L',
      en: 'needs translation'
    },
    description: {
      sk: 'prosečko, Aperol 5cl, sóda',
      en: 'needs translation'
    },
    price: 5.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },

  // Vodka
  {
    id: 'vodka-1',
    name: {
      sk: 'Amundsen Expedition',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 3.20,
    category: 'vodka',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'vodka-2',
    name: {
      sk: 'Absolut Elyx',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 5.50,
    category: 'vodka',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'vodka-3',
    name: {
      sk: 'Belvedere',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 5.90,
    category: 'vodka',
    menuType: 'drinks',
    displayAsList: true
  },

  // Gin
  {
    id: 'gin-1',
    name: {
      sk: 'Larios (12, rosé)',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 2.90,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'gin-2',
    name: {
      sk: 'Roku',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 4.50,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'gin-3',
    name: {
      sk: 'The Botanist',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 4.90,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'gin-4',
    name: {
      sk: 'Tanqueray (liehovina)',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 4.60,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'gin-5',
    name: {
      sk: 'Hendrick\'s',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 4.50,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },

    // Distillates
  {
    id: 'distillates-1',
    name: {
      sk: 'Koniferum (liehovina)',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 2.50,
    category: 'distillates',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'distillates-2',
    name: {
      sk: 'Domovina',
      en: 'needs translation'
    },
    description: {
      sk: '4cl (slivovica, hruškovica, marhuľovica)',
      en: 'needs translation'
    },
    price: 4.50,
    category: 'distillates',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'distillates-3',
    name: {
      sk: 'Jelšovská marhuľovica, hruškovica',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 8.50,
    category: 'distillates',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'distillates-4',
    name: {
      sk: 'Jelšovský bozk, Divá čerešňa',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 13.90,
    category: 'distillates',
    menuType: 'drinks',
    displayAsList: true,
  },

  // Tequila
  {
    id: 'tequila-1',
    name: {
      sk: 'Sierra Antiguo',
      en: 'needs translation'
    },
    description: {
      sk: '4cl (Añejo, Plata)',
      en: 'needs translation'
    },
    price: 4.20,
    category: 'tequila',
    menuType: 'drinks',
    displayAsList: true
  },

  // Rum
  {
    id: 'rum-1',
    name: {
      sk: 'Legendario Elixir',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 3.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-2',
    name: {
      sk: 'Barceló Imperial',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 4.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-3',
    name: {
      sk: 'Abuelo Añejo 7 Años',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 4.90,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-4',
    name: {
      sk: 'El General',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 5.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-5',
    name: {
      sk: 'Bumu Rum Original',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 5.60,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-6',
    name: {
      sk: 'Abuelo Añejo 12 Años',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 6.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-7',
    name: {
      sk: 'Mount Gray Black Barrel',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 6.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-8',
    name: {
      sk: 'Don Papa',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 6.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-9',
    name: {
      sk: 'Barceló Porto Cask',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 7.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-10',
    name: {
      sk: 'Zacapa 23 Solero',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 7.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-11',
    name: {
      sk: 'A.H.Riise Non Plus Ultra',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 11.90,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },

  // Whiskey & Bourbon
  {
    id: 'whiskey-bourbon-1',
    name: {
      sk: 'Jameson',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 3.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-2',
    name: {
      sk: 'Jack Daniel\'s',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 3.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-3',
    name: {
      sk: 'Gentleman Jack',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 4.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-4',
    name: {
      sk: 'Maker\'s Mark',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 5.10,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-5',
    name: {
      sk: 'Glenmorangie 10 Y.O.',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 5.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-6',
    name: {
      sk: 'Laphroaig 10 Y.O.',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 7.90,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-7',
    name: {
      sk: 'The Classic Laddie',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 8.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-8',
    name: {
      sk: 'Port Charlotte 10 Y.O.',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 10.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },

  // Liqueurs
  {
    id: 'liqueurs-1',
    name: {
      sk: 'Jägermeister',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 2.90,
    category: 'liqueurs',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'liqueurs-2',
    name: {
      sk: 'Becherovka',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 2.90,
    category: 'liqueurs',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'liqueurs-3',
    name: {
      sk: 'Fernet Stock',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 2.90,
    category: 'liqueurs',
    menuType: 'drinks',
    displayAsList: true
  },

  // Cognac & Brandy
  {
    id: 'cognac-brandy-1',
    name: {
      sk: 'Rémy Martin VSOP',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 6.90,
    category: 'cognac-brandy',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'cognac-brandy-2',
    name: {
      sk: 'Rémy Martin XO',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 18.90,
    category: 'cognac-brandy',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'cognac-brandy-3',
    name: {
      sk: 'Metaxa 12*',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 5.90,
    category: 'cognac-brandy',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'cognac-brandy-4',
    name: {
      sk: 'Metaxa Private Reserve',
      en: 'needs translation'
    },
    description: {
      sk: '4cl',
      en: 'needs translation'
    },
    price: 11.90,
    category: 'cognac-brandy',
    menuType: 'drinks',
    displayAsList: true
  },

  // Non-Alcoholic Beverages
  {
    id: 'non-alcoholic-beverages-1',
    name: {
      sk: 'Fresh 0.1l',
      en: 'needs translation'
    },
    description: {
      sk: 'pomaranč, grep',
      en: 'needs translation'
    },
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-2',
    name: {
      sk: 'Rajec 0,33l',
      en: 'needs translation'
    },
    description: {
      sk: 'nesýtená, jemne sýtená, sýtená',
      en: 'needs translation'
    },
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-3',
    name: {
      sk: 'Targa tonic 0,25l',
      en: 'needs translation'
    },
    description: {
      sk: 'classic, ginger ale, rose',
      en: 'needs translation'
    },
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-4',
    name: {
      sk: 'Tanga Orange 0,25l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-5',
    name: {
      sk: 'Curiosa 0,25l',
      en: 'needs translation'
    },
    description: {
      sk: 'pomaranč, jablko, jahoda, multivitamín',
      en: 'needs translation'
    },
    price: 2.50,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-6',
    name: {
      sk: 'Royal Crown 0,25l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-7',
    name: {
      sk: 'Vinea 0,25l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-8',
    name: {
      sk: 'Romerquelle 0,33l',
      en: 'needs translation'
    },
    description: {
      sk: 'lemongrass',
      en: 'needs translation'
    },
    price: 2.50,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-9',
    name: {
      sk: 'Coca-Cola 0,2l',
      en: 'needs translation'
    },
    description: {
      sk: 'original, zero',
      en: 'needs translation'
    },
    price: 2.50,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-10',
    name: {
      sk: 'Birell nealko 0,5l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 1.90,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },

  // Non-Alcoholic Drinks
  {
    id: 'non-alcoholic-drinks-1',
    name: {
      sk: 'Basil Smash',
      en: 'needs translation'
    },
    description: {
      sk: 'Opius Amaro, citrón, bazalka, simple sirup',
      en: 'needs translation'
    },
    price: 5.90,
    category: 'non-alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'non-alcoholic-drinks-2',
    name: {
      sk: 'Espresso Martino',
      en: 'needs translation'
    },
    description: {
      sk: 'Opius Nigredo, espresso, simple sirup',
      en: 'needs translation'
    },
    price: 5.90,
    category: 'non-alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'non-alcoholic-drinks-3',
    name: {
      sk: 'Best Collins',
      en: 'needs translation'
    },
    description: {
      sk: 'Opius Albedo, malinové pyré, citrón, sóda',
      en: 'needs translation'
    },
    price: 5.90,
    category: 'non-alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'non-alcoholic-drinks-4',
    name: {
      sk: 'Virgin Mojito',
      en: 'needs translation'
    },
    description: {
      sk: 'mäta, limetka, trstinový cukor, sóda',
      en: 'needs translation'
    },
    price: 5.50,
    category: 'non-alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  

  // Coffee
  {
    id: 'coffee-1',
    name: {
      sk: 'Ristretto',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 2.10,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-2',
    name: {
      sk: 'Espresso',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 2.10,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-3',
    name: {
      sk: 'Espresso Lungo',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 2.10,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-4',
    name: {
      sk: 'Doppio',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 3.40,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-5',
    name: {
      sk: 'Americano',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 3.40,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-6',
    name: {
      sk: 'Espresso Macchiato',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 2.40,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-7',
    name: {
      sk: 'Cappuccino',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 2.60,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-8',
    name: {
      sk: 'Caffé Latte',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 2.60,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-9',
    name: {
      sk: 'Flat White',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 3.60,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-10',
    name: {
      sk: 'Bezkofeínová',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 3.60,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-11',
    name: {
      sk: 'Mlieko',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 0.30,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-12',
    name: {
      sk: 'Rastlinné mlieko (mandľové, ovsené, sójové)',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 0.50,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },

  // Specialty Coffee
  {
    id: 'specialty-coffee-1',
    name: {
      sk: 'Espresso Tonic',
      en: 'needs translation'
    },
    description: {
      sk: 'pripravené z 8,5g kávy',
      en: 'needs translation'
    },
    price: 3.50,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'specialty-coffee-2',
    name: {
      sk: 'Cold Brew',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 3.30,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'specialty-coffee-3',
    name: {
      sk: 'Chai Latte',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 3.90,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'specialty-coffee-4',
    name: {
      sk: 'Ľadové Cappuccino',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 3.90,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'specialty-coffee-5',
    name: {
      sk: 'Prichuťové podľa ponuky',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 0.40,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },

  // Matcha
  {
    id: 'matcha-1',
    name: {
      sk: 'Strawberry Matcha',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 4.50,
    category: 'matcha',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'matcha-2',
    name: {
      sk: 'Orange Matcha',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 4.20,
    category: 'matcha',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'matcha-3',
    name: {
      sk: 'Matcha Latte',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 3.90,
    category: 'matcha',
    menuType: 'drinks',
    displayAsList: true
  },

  // Teas
  {
    id: 'teas-1',
    name: {
      sk: 'Z čerstvej mäty alebo zázvoru',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 3.90,
    category: 'teas',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'teas-2',
    name: {
      sk: 'Sypaný podľa ponuky',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 3.30,
    category: 'teas',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'teas-3',
    name: {
      sk: 'Med 7g',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 0.40,
    category: 'teas',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'teas-4',
    name: {
      sk: 'Citrón',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 0.20,
    category: 'teas',
    menuType: 'drinks',
    displayAsList: true
  },

  // Homemade Lemonades
  {
    id: 'homemade-lemonades-1',
    name: {
      sk: 'Podľa ponuky 0.4L',
      en: 'needs translation'
    },
    description: {
      sk: 'Jahodová, Mangová, Malinová s tymiánom, Zázvorová s mätou, Bazová s limetkou espumou, Uhorková, Ľadový čaj',
      en: 'needs translation'
    },
    price: 3.90,
    category: 'homemade-lemonades',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'homemade-lemonades-2',
    name: {
      sk: 'Podľa ponuky 1L',
      en: 'needs translation'
    },
    description: {
      sk: 'Jahodová, Mangová, Malinová s tymiánom, Zázvorová s mätou, Bazová s limetkou espumou, Uhorková, Ľadový čaj',
      en: 'needs translation'
    },
    price: 7.90,
    category: 'homemade-lemonades',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'homemade-lemonades-3',
    name: {
      sk: 'Citronáda 0.4L',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.50,
    category: 'homemade-lemonades',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'homemade-lemonades-4',
    name: {
      sk: 'Citronáda 1L',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 4.50,
    category: 'homemade-lemonades',
    menuType: 'drinks',
    displayAsList: true
  },

  // Roku Gin Cocktails
  {
    id: 'roku-gin-cocktails-1',
    name: {
      sk: 'Gimlet',
      en: 'needs translation'
    },
    description: {
      sk: '(gin 5cl, limetka, limetkovo-krémová espuma)',
      en: 'needs translation'
    },
    price: 6.50,
    category: 'roku-gin-cocktails',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'roku-gin-cocktails-2',
    name: {
      sk: 'G&T',
      en: 'needs translation'
    },
    description: {
      sk: 'gin 4cl, limeta, tonic',
      en: 'needs translation'
    },
    price: 5.90,
    category: 'roku-gin-cocktails',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'roku-gin-cocktails-3',
    name: {
      sk: 'Negroni',
      en: 'needs translation'
    },
    description: {
      sk: 'gin 3cl, Campari 3cl, Martini Rubino 3cl',
      en: 'needs translation'
    },
    price: 7.50,
    category: 'roku-gin-cocktails',
    menuType: 'drinks',
    displayAsList: true
  },

  // Beer (on tap)
  {
    id: 'beer-on-tap-1',
    name: {
      sk: 'Birell pomelp-grep nealko 0,3l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 1.90,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-2',
    name: {
      sk: 'Birell pomelp-grep nealko 0,5l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.40,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-3',
    name: {
      sk: 'Pilsner Urquell 12 0,3l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.30,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-4',
    name: {
      sk: 'Pilsner Urquell 12 0,5l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.90,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-5',
    name: {
      sk: 'Radegast 10 0,3l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-6',
    name: {
      sk: 'Radegast 10 0,5l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.60,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-7',
    name: {
      sk: 'Kofola 0,3l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 1.80,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-8',
    name: {
      sk: 'Kofola 0,5l',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.50,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-9',
    name: {
      sk: 'Pohár bublín 1dcl',
      en: 'needs translation'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: 2.30,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },

  // ====== CELEBRATIONS AND EVENTS MENU ======

  // Cold Buffet
  {
    id: 'cold-buffet-1',
    name: {
      sk: 'Obložený Chlebík',
      en: 'Open-Faced Sandwich'
    },
    description: {
      sk: '',
      en: ''
    },
    price: '',
    category: 'cold-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 50
  },
  {
    id: 'cold-buffet-2',
    name: {
      sk: 'Plnený croissant',
      en: 'Filled Croissant'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'cold-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 170
  },
  {
    id: 'cold-buffet-3',
    name: {
      sk: 'Nátierky a pomazánky',
      en: 'Spreads and Dips'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'cold-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 70
  },
  {
    id: 'cold-buffet-4',
    name: {
      sk: 'Plnený wrap',
      en: 'Filled Wrap'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'cold-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 180
  },
  {
    id: 'cold-buffet-5',
    name: {
      sk: 'Chrmkavé toasty',
      en: 'Crispy Toasts'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'cold-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 140
  },
  {
    id: 'cold-buffet-6',
    name: {
      sk: 'Špíziky',
      en: 'Mini Skewers'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'cold-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 40
  },
  {
    id: 'cold-buffet-7',
    name: {
      sk: 'Mini hamburgerík',
      en: 'Mini Hamburger'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: "",
    category: 'cold-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 80
  },
  {
    id: 'cold-buffet-8',
    name: {
      sk: 'Obložená misa',
      en: 'Assorted Platter'
    },
    description: {
      sk: '',
      en: 'needs translation'
    },
    price: "",
    category: 'cold-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 1000
  },

  // Hot Buffet
  {
    id: 'hot-buffet-1',
    name: {
      sk: 'Polievky 0,33l',
      en: 'Soups 0.33l'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'hot-buffet',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'hot-buffet-2',
    name: {
      sk: 'Hlavné Jedlo: 150-200g/porcia',
      en: 'Main Dishes: 150–200g/portion'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'hot-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 200
  },
  {
    id: 'hot-buffet-3',
    name: {
      sk: 'Prilohy: 180g/porcia',
      en: 'Side Dishes: 180g/portion'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'hot-buffet',
    menuType: 'celebrations',
    displayAsList: true,
    weight: 180
  },
  {
    id: 'hot-buffet-4',
    name: {
      sk: 'Šalátové misy',
      en: 'Mixed Salad Bowls'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'hot-buffet',
    menuType: 'celebrations',
    displayAsList: true,
  },

  // Candy Bar
  {
    id: 'candy-bar-1',
    name: {
      sk: 'Tartalerky',
      en: 'Tartlets'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,  
  },
  {
    id: 'candy-bar-2',
    name: {
      sk: 'Profiterollky',
      en: 'Profiteroles'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'candy-bar-3',
    name: {
      sk: 'Veterníček',
      en: 'Mini Cream Puffs'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'candy-bar-4',
    name: {
      sk: 'Brownies',
      en: 'Brownies'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'candy-bar-5',
    name: {
      sk: 'Košíčky krémové',
      en: 'Cream Cups'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'candy-bar-6',
    name: {
      sk: 'Makrónky',
      en: 'Macarons'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'candy-bar-7',
    name: {
      sk: 'Kocky',
      en: 'Cubes'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
   {
    id: 'candy-bar-7',
    name: {
      sk: 'Poháriky',
      en: 'Cups'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
   {
    id: 'candy-bar-7',
    name: {
      sk: 'Cupcakes',
      en: 'Cupcakes'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
   {
    id: 'candy-bar-7',
    name: {
      sk: 'Cupcakes sú plnené čokoládou + krém',
      en: 'Chocolate-filled cupcakes with cream'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
   {
    id: 'candy-bar-7',
    name: {
      sk: 'Mini Pavlovky',
      en: 'Mini Pavlovas'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
   {
    id: 'candy-bar-7',
    name: {
      sk: 'Choux au Craquelin / francúzsky veterník',
      en: 'Choux au Craquelin / French Cream Puff'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },
   {
    id: 'candy-bar-7',
    name: {
      sk: 'Truffle pralinka',
      en: 'Truffle Praline'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'candy-bar',
    menuType: 'celebrations',
    displayAsList: true,
  },

  // Vianoce 2025 category items
  {
    id: 'vianoce-2025-1',
    name: {
      sk: 'Polievka',
      en: 'Christmas Soup'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'vianoce-2025',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'vianoce-2025-2',
    name: {
      sk: 'Hlavné jedlá',
      en: 'Main Dishes'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'vianoce-2025',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'vianoce-2025-2',
    name: {
      sk: 'Prílohy',
      en: 'Side Dishes'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'vianoce-2025',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'vianoce-2025-2',
    name: {
      sk: 'Šaláty',
      en: 'Salads'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'vianoce-2025',
    menuType: 'celebrations',
    displayAsList: true,
  },

  // Grilovačka category items
  {
    id: 'grilovacka-1',
    name: {
      sk: 'Grilovačka od 40 hostí',
      en: 'Grill Party from 40 guests'
    },
    description: {
      sk: 'Cena prenájmu grilu "ofyr" grilovanie na dreve 250 eur. Cena grillmajster 25 eur/hodina (2 osoby). Porcia 450 g - 500 g (Cena porcie na osobu 35 eur)',
      en: 'Rental price for the "ofyr" grill for wood grilling is 250 euros. Grill master fee is 25 euros/hour (2 people). Portion 450 g - 500 g (Price per person 35 euros)'
    },
    price: "",
    category: 'grilovacka',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'grilovacka-2',
    name: {
      sk: 'Mäso a syr',
      en: 'Meat and Cheese'
    },
    description: {
      sk: '',
      en: ''
    },
    price: "",
    category: 'grilovacka',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'grilovacka-3',
    name: {
      sk: 'Šaláty',
      en: 'Salads'
    },
    description: {
      sk: '',
      en: ''
    },
    price: {
      sk: '',
      en: ''
    },
    category: 'grilovacka',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'grilovacka-3',
    name: {
      sk: 'Prílohy',
      en: 'Side Dishes'
    },
    description: {
      sk: '',
      en: ''
    },
    price: {
      sk: '',
      en: ''
    },
    category: 'grilovacka',
    menuType: 'celebrations',
    displayAsList: true,
  },
  {
    id: 'grilovacka-3',
    name: {
      sk: 'Omáčky a prísady',
      en: 'Sauces and condiments'
    },
    description: {
      sk: 'Možnosť vybrať 5 druhov',
      en: '5 types to choose from'
    },
    price: {
      sk: '',
      en: ''
    },
    category: 'grilovacka',
    menuType: 'celebrations',
    displayAsList: true,
  },
];
