export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
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
  quantity: number;
  addedAt: Date;
}

export interface MyOrder {
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
}

export type MenuType = 'main' | 'breakfast' | 'kids' | 'drinks';

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
  | 'beer-on-tap';


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
  'my-choice': { name: 'My Choice', icon: '🛒', order: 999 },
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
};

export const menuTypes: Record<MenuType, { name: string; icon: string }> = {
  'main': { name: 'Main Menu', icon: '🍽️' },
  'breakfast': { name: 'Breakfast Menu', icon: '☀️' },
  'kids': { name: 'Kids Menu', icon: '🧸' },
  'drinks': { name: 'Drinks', icon: '🍹' },
};

export const menuItems: MenuItem[] = [
  // Main Menu - Appetizers
  {
    id: 'appetizers-1',
    name: 'Grilovaná Feta',
    description: 'paprikovo-paradajková omačka, grilované paradajky, petržlenová vňať, vypražené kapary (7,11*)',
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
    name: 'Domáci Hummus',
    description: 'cícer, grilovaný bakalažan, tahini (sezamová pasta), olej s pepper flakes, sezamové semiačka (5,10,11*)',
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
    name: 'Pučené Baby Zemiaky',
    description: 'perlová cibuľka, petržlenová vňať, koriander, jalapeños, queso omačka (6*)',
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
    name: 'Vyprážaný Falafel',
    description: 'mix šalátov, paprika, cesnak, limetkový jogurt, bagel semiačka (7,10,11*)',
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
    name: 'Silný Kurací Vývar',
    description: 'zelenina, kuracie mäso, bylinkové halušky (1,3,9*)',
    price: 3.90,
    image: './placeholder.svg',
    category: 'soups',
    menuType: 'main',
    weight: 300,
    calories: 325
  },
  {
    id: 'soups-2',
    name: 'Polievka Dňa',
    description: 'Vynikajuca polievka pripravená podľa dennej ponuky šéfkuchára',
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
    name: 'Lemon Mustard Chicken',
    description: 'marinované kuracie supreme grilované na drevenom uhlí s horčicovo-medovou omačkou (10,11*)',
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
    name: 'Rib Eye',
    description: 'servirovaný s chimichurri omačkou (10,11*)',
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
    name: 'UPRAVIT - Steak',
    description: 'pre viac informacií a dostupných steakoch kontaktujte našu obsluhu',
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
    name: 'Hot Halloumi Syr',
    description: 'marinovný v pikantno-medovej omačke (7,10,11*)',
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
    name: 'Ryba (podľa dennej ponuky)',
    description: 'servirované s bearnaise omáčkou (4,10,11*)',
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
    name: 'Krevety',
    description: 'servirované s aioli omáčkou (2,10,11*)',
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
    name: 'Bylinkové Tofu',
    description: 'marinované tofu s bylinkami (6,10,11*)',
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
    name: 'diva ryža',
    description: '',
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
    name: 'pučené baby zemiaky, hĺuzovková majonéza',
    description: '(3*)',
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
    name: 'grilované avokádo, pico de gallo, chipotie majonéza',
    description: '(3,9*)',
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
    name: 'grilovaná sezónna zelenina',
    description: '(9*)',
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
    name: 'domáci hummus, chilli olej, sezam, petržlenová vňať',
    description: '(10,11*)',
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
    name: 'grilované batatové zemiaky, achiote strúhanka',
    description: '(1*)',
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
    name: 'Mediterranean Delight',
    description: 'quinoa, baby špenát, halloumi syr, hokkaido, perlová cibuľka, grilovaná paprika, nakladaná červená cibuľa, granatové jablko, sezamové semiačka, limetkový jogurt (7,11*)',
    price: 12.50,
    image: './placeholder.svg',
    category: 'garden-bowls',
    menuType: 'main',
    weight: 496,
    calories: 577
  },
  {
    id: 'garden-bowls-2',
    name: 'Green Earth',
    description: 'hnedá ryža, poľníček, rukola, tofu, falafel, hummus, nakladaná červená cibuľa, granatové jablko, sezamové semiačka, limetkový jogurt (7,11*)',
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
    name: 'Goddess Fuel',
    description: 'bulgur, baby špenát, rukola, kuracie mäso, batátové zemiaky, grilovaná cuketa, cherry paradajky, bagel seeds, bazalkovo-limetková omáčka (Green Goddess) (1,7,3*)',
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
    name: 'Pizza Bread',
    description: 'cesto, olivový olej, cesnak, čerstvé oregano (1,7*)',
    price: 5.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 300,
    calories: 400
  },
  {
    id: 'pizza-2',
    name: 'Margherita',
    description: 'San Marzano paradajkový základ, mozzarella fior di latte, čerstvá bazalka, extra panenský olivový olej (1,7*)',
    price: 8.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 405,
    calories: 1010
  },
  {
    id: 'pizza-3',
    name: 'Salami',
    description: 'San Marzano paradajkový základ, mozzarella fior di latte, pikantná saláma (napr. humenský sčipák), chili papričky (1,7*)',
    price: 9.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 465,
    calories: 1172
  },
  {
    id: 'pizza-4',
    name: 'Prosciutto E Funghi',
    description: 'San Marzano paradajkový základ, mozzarella fior di latte, šunka, šampiňóny (1,7*)',
    price: 9.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 460,
    calories: 1005
  },
  {
    id: 'pizza-5',
    name: 'Quattro Stagioni',
    description: 'San Marzano paradajkový základ, mozzarella fior di latte, šunka, šampiňóny, artičoky, čierne olivy (1,7*)',
    price: 10.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 490,
    calories: 1061
  },
  {
    id: 'pizza-6',
    name: 'Vegetariana',
    description: 'San Marzano paradajkový základ, mozzarella fior di latte, nakladané antipasty (cuketa, baklažán, paprika, cherry paradajky) (1,7*)',
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
    name: 'Tonno E Cipolla',
    description: 'San Marzano paradajkový základ, mozzarella fior di latte, tuniak, červená cibuľa (1,4,7*)',
    price: 11.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 460,
    calories: 1062
  },
  {
    id: 'pizza-8',
    name: 'Quattro Formaggi',
    description: 'San Marzano paradajkový základ, mozzarella fior di latte, niva, parmezán, provola (1,7*)',
    price: 12.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 460,
    calories: 1210
  },
  {
    id: 'pizza-9',
    name: 'Napoli',
    description: 'San Marzano paradajkový základ, mozzarella fior di latte, ančovičky, kapary, čerstvé oregano (1,4,7*)',
    price: 12.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 455,
    calories: 988
  },
  {
    id: 'pizza-10',
    name: 'Carmel',
    description: 'paradajkový základ, mozzarella fior di latte, šunka, niva, kukurica (1,7*)',
    price: 10.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 480,
    calories: 1135
  },
  {
    id: 'pizza-11',
    name: 'Chamon',
    description: 'paradajkový základ, mozzarella fior di latte, jamón serrano, rukola, parmezán (1,7*)',
    price: 13.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 470,
    calories: 1128
  },
  {
    id: 'pizza-12',
    name: 'Chorizo',
    description: 'paradajkový základ, mozzarella fior di latte, chorizo, jalapeños, ricotta, petržlenová vňať (1,7*)',
    price: 13.90,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 470,
    calories: 1196
  },
  {
    id: 'pizza-13',
    name: 'Naturalis',
    description: 'paradajkový základ, mozzarella fior di latte, naturálne dusená šunka (1,7*)',
    price: 14.50,
    image: './placeholder.svg',
    category: 'pizza',
    menuType: 'main',
    weight: 470,
    calories: 1205
  },
  {
    id: 'pizza-14',
    name: 'Pancetta',
    description: 'paradajkový základ, mozzarella fior di latte, pancetta, nakladaná červená cibuľa, hľuzovková majonéza (1,3,7*)',
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
    name: 'Creme Catalana',
    description: 'citrusová kóra, karamelová krusta (3,7*)',
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
    name: 'demi glace',
    description: '(9*)',
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
    name: 'chippotle mayo',
    description: '(3,7*)',
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
    name: 'hľuzovková mayo',
    description: '(3*)',
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
    name: 'vegan queso',
    description: '(6*)',
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
    name: 'paint based aioli',
    description: '(6*)',
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
    name: 'chlebík domáci kvaskový',
    description: '(1*)',
    price: 2.50,
    image: './placeholder.svg',
    category: 'something-for-beer',
    menuType: 'main',
    weight: 50,
    calories: 120
  },
  {
    id: 'something-for-beer-2',
    name: 'zeleninka mix',
    description: '(1,9*)',
    price: 2.90,
    image: './placeholder.svg',
    category: 'something-for-beer',
    menuType: 'main',
    weight: 100,
    calories: 40
  },
   {
    id: 'something-for-beer-3',
    name: 'degustačný tanier syrov a údenín, domáci chlebík',
    description: '(1,7*)',
    price: 14.50,
    image: './placeholder.svg',
    category: 'something-for-beer',
    menuType: 'main',
    weight: 250,
    calories: 770
  },
   {
    id: 'something-for-beer-4',
    name: 'tatarák, hrianky',
    description: 'z dôvodu obsahu surového mäsa nie je vhodné pre deti a tehotné ženy (1,3,10*)',
    price: 14.50,
    image: './placeholder.svg',
    category: 'something-for-beer',
    menuType: 'main',
    weight: 200,
    calories: 400
  },

  // Breakfast Menu - Special Breakfast
  {
    id: 'special-breakfast-1',
    name: 'Benedikt Toast',
    description: 'kváskový chlieb, pošírované vajce, šunka Naturalis, holandská omačka (1,3,7*)',
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
    name: 'Turecké Vajcia',
    description: 'jogurt, cesnak, chilli olej, pošírované vajcia, chlieb, kôpor, šalát (1,3,7*)',
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
    name: 'OG French Toast',
    description: 'brioška, javorový sirup, šľahačka, ovocie, práškový cukor (1,3,7*)',
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
    name: 'Proteínové Lievance',
    description: 'banán, proteín, arašidové maslo, tvaroh, kokos, ovocie (1,3,5,6,7,8*)',
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
    name: 'Cviklový Hummus',
    description: 'cvikla, nakladaný karfiol, šalátový mix, chlieb alebo zelenina (1,11,12*)',
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
    name: 'pošírované vajce',
    description: '(3*)',
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
    name: 'volské oko',
    description: '(3*)',
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
    name: 'šunka',
    description: '',
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
    name: 'slanina',
    description: '',
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
    name: 'grilovaná zelenina',
    description: '',
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
    name: 'ovocie',
    description: '(3*)',
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
    name: 'granola',
    description: '(1,8*)',
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
    name: 'Miešané Vajíčka',
    description: '(3,7*)',
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
    name: 'Volské Oko',
    description: '(3*)',
    price: 4.90,
    image: './placeholder.svg',
    category: 'classic',
    menuType: 'breakfast',
    weight: 150,
    calories: 1
  },
  {
    id: 'classic-3',
    name: 'Omeleta',
    description: '(3*)',
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
    name: 'Losos & Avokádo',
    description: 'kváskový chlieb, guacamole, údený losos, nakladaná cibuľa (1,4*)',
    price: 8.90,
    image: './placeholder.svg',
    category: 'toasts',
    menuType: 'breakfast',
    weight: 220,
    calories: 1
  },
  {
    id: 'toasts-2',
    name: 'Feta & Špenát',
    description: 'nátierka z pečenej papriky, špenát, sušené paradajky, feta, chlieb (1,7*)',
    price: 7.90,
    image: './placeholder.svg',
    category: 'toasts',
    menuType: 'breakfast',
    weight: 230,
    calories: 1
  },
  {
    id: 'toasts-3',
    name: 'Turbo Chlebík',
    description: 'chlieb vo vajíčku, chipotle mayo, šunka Naturalis, cheddar, rukola (1,3,7,10*)',
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
    name: 'Acaí Bowl',
    description: 'mrazené ovocie, jogurt, banán, drobné ovocie, granola (1,7,8*)',
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
    name: 'Matcha Bowl',
    description: 'banán, mango, avokádo, hráškové mlieko, matcha, chia, grepový džem, limetka (8*)',
    price: 8.90,
    image: './placeholder.svg',
    category: 'bowls',
    menuType: 'breakfast',
    weight: 400,
    calories: 1
  },
  {
    id: 'bowls-3',
    name: 'Domáci Termix',
    description: 'granola, čerstvé ovocie (1,7*)',
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
    name: 'Kuracie Mäsko s Baby Zemiakmi',
    description: 'jemné kuracie prsia, podávané s baby zemiakmi a čerstvou zeleninovou oblohou (1,7*)',
    price: 7.90,
    image: './placeholder.svg',
    category: 'all-kids-menu',
    menuType: 'kids',
    weight: 250,
    calories: 1
  },
  {
    id: 'all-kids-menu-2',
    name: 'Detská Mini Pizza',
    description: 'chrumkavá pizza s paradajkovou omáčkou, mozzarella syrom, šunkou a sladkou kukuricou (1,3,7*)',
    price: 6.50,
    image: './placeholder.svg',
    category: 'all-kids-menu',
    menuType: 'kids',
    weight: 300,
    calories: 1
  },
  {
    id: 'all-kids-menu-3',
    name: 'Ryžové Rizoto s Kuracím Mäsom a Brokolicou',
    description: 'divá ryža s kúskami kuracieho mäsa, brokolicou a maslom (1,7*)',
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
    name: 'Mojito',
    description: 'rum Barceló 5cl, limetka, mäta, trstinový cukor, sóda',
    price: 6.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-2',
    name: 'Caipirinha',
    description: 'Pitú 5cl, limetka, trstinový cukor',
    price: 6.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-3',
    name: 'Cuba Libre',
    description: 'rum Abuelo 7 Años 5cl, Coca-Cola, limetka',
    price: 6.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-4',
    name: 'Mai Tai',
    description: 'rum Mount Gay Black Barrel 2cl, Abuelo 7 3cl, Cointreau 2cl, Amaretto 1cl, pomarančový fresh, ananás, limeta',
    price: 8.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Hemingway Daiquiri',
    description: 'rum Barceló 4cl, Marashino 1cl, grep, limeta, simple sirup',
    price: 6.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Frozen Mango Margarita',
    description: 'Sierra Antiquo Plata 5cl, Cointreau 2cl, mango, limeta',
    price: 6.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Long Island',
    description: 'vodka Expedition 2cl, gin Roku 2cl, rum Barceló 2cl, Tequila Sierra Antiguo Plata 2cl, Cointreau 2cl, pomarančový fresh, limeta, Coca-Cola',
    price: 8.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Moscow Mule',
    description: 'vodka Expedition 5cl, domáca zázvorovka, limeta, simple sirup, sóda',
    price: 6.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Porn Star Martini',
    description: 'vodka Expedition 5cl, marakuja, vanilka, prosečko',
    price: 7.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Skinny B*tch',
    description: 'vodka Expedition 4cl, limeta, sóda',
    price: 5.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Cosmopolitan',
    description: 'vodka Expedition 4cl, Cointreau 2cl, limetka, brusnicový džús',
    price: 6.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Bloody Mary',
    description: 'vodka Amundsen Expedition 5cl, tajná receptúra',
    price: 8.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Old Fashioned',
    description: 'rum Barceló Porto Cask 6cl, cukor, bitter',
    price: 8.50,
    category: 'alcoholic-drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Mimosa 0,2L',
    description: 'prosečko, pomarančový fresh',
    price: 4.50,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Hugo 0,25L',
    description: 'prosečko, bazový sirup, mäta, sóda',
    price: 4.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'alcoholic-drinks-5',
    name: 'Aperol spritz 0,25L',
    description: 'prosečko, Aperol 5cl, sóda',
    price: 5.90,
    category: 'alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },

  // Vodka
  {
    id: 'vodka-1',
    name: 'Amundsen Expedition',
    description: '4cl',
    price: 3.20,
    category: 'vodka',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'vodka-2',
    name: 'Absolut Elyx',
    description: '4cl',
    price: 5.50,
    category: 'vodka',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'vodka-3',
    name: 'Belvedere',
    description: '4cl',
    price: 5.90,
    category: 'vodka',
    menuType: 'drinks',
    displayAsList: true
  },

  // Gin
  {
    id: 'gin-1',
    name: 'Larios (12, rosé)',
    description: '4cl',
    price: 2.90,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'gin-2',
    name: 'Roku',
    description: '4cl',
    price: 4.50,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'gin-3',
    name: 'The Botanist',
    description: '4cl',
    price: 4.90,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'gin-4',
    name: 'Tanqueray (liehovina)',
    description: '4cl',
    price: 4.60,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'gin-5',
    name: 'Hendrick\'s',
    description: '4cl',
    price: 4.50,
    category: 'gin',
    menuType: 'drinks',
    displayAsList: true
  },

    // Distillates
  {
    id: 'distillates-1',
    name: 'Koniferum (liehovina)',
    description: '4cl',
    price: 2.50,
    category: 'distillates',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'distillates-2',
    name: 'Domovina',
    description: '4cl (slivovica, hruškovica, marhuľovica)',
    price: 4.50,
    category: 'distillates',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'distillates-3',
    name: 'Jelšovská marhuľovica, hruškovica',
    description: '4cl',
    price: 8.50,
    category: 'distillates',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'distillates-4',
    name: 'Jelšovský bozk, Divá čerešňa',
    description: '4cl',
    price: 13.90,
    category: 'distillates',
    menuType: 'drinks',
    displayAsList: true,
  },

  // Tequila
  {
    id: 'tequila-1',
    name: 'Sierra Antiguo',
    description: '4cl (Añejo, Plata)',
    price: 4.20,
    category: 'tequila',
    menuType: 'drinks',
    displayAsList: true
  },

  // Rum
  {
    id: 'rum-1',
    name: 'Legendario Elixir',
    description: '4cl',
    price: 3.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-2',
    name: 'Barceló Imperial',
    description: '4cl',
    price: 4.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-3',
    name: 'Abuelo Añejo 7 Años',
    description: '4cl',
    price: 4.90,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-4',
    name: 'El General',
    description: '4cl',
    price: 5.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-5',
    name: 'Bumu Rum Original',
    description: '4cl',
    price: 5.60,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-6',
    name: 'Abuelo Añejo 12 Años',
    description: '4cl',
    price: 6.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-7',
    name: 'Mount Gray Black Barrel',
    description: '4cl',
    price: 6.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-8',
    name: 'Don Papa',
    description: '4cl',
    price: 6.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-9',
    name: 'Barceló Porto Cask',
    description: '4cl',
    price: 7.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-10',
    name: 'Zacapa 23 Solero',
    description: '4cl',
    price: 7.50,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'rum-11',
    name: 'A.H.Riise Non Plus Ultra',
    description: '4cl',
    price: 11.90,
    category: 'rum',
    menuType: 'drinks',
    displayAsList: true
  },

  // Whiskey & Bourbon
  {
    id: 'whiskey-bourbon-1',
    name: 'Jameson',
    description: '4cl',
    price: 3.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-2',
    name: 'Jack Daniel\'s',
    description: '4cl',
    price: 3.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-3',
    name: 'Gentleman Jack',
    description: '4cl',
    price: 4.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-4',
    name: 'Maker\'s Mark',
    description: '4cl',
    price: 5.10,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-5',
    name: 'Glenmorangie 10 Y.O.',
    description: '4cl',
    price: 5.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-6',
    name: 'Laphroaig 10 Y.O.',
    description: '4cl',
    price: 7.90,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-7',
    name: 'The Classic Laddie',
    description: '4cl',
    price: 8.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'whiskey-bourbon-8',
    name: 'Port Charlotte 10 Y.O.',
    description: '4cl',
    price: 10.50,
    category: 'whiskey-bourbon',
    menuType: 'drinks',
    displayAsList: true
  },

  // Liqueurs
  {
    id: 'liqueurs-1',
    name: 'Jägermeister',
    description: '4cl',
    price: 2.90,
    category: 'liqueurs',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'liqueurs-2',
    name: 'Becherovka',
    description: '4cl',
    price: 2.90,
    category: 'liqueurs',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'liqueurs-3',
    name: 'Fernet Stock',
    description: '4cl',
    price: 2.90,
    category: 'liqueurs',
    menuType: 'drinks',
    displayAsList: true
  },

  // Cognac & Brandy
  {
    id: 'cognac-brandy-1',
    name: 'Rémy Martin VSOP',
    description: '4cl',
    price: 6.90,
    category: 'cognac-brandy',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'cognac-brandy-2',
    name: 'Rémy Martin XO',
    description: '4cl',
    price: 18.90,
    category: 'cognac-brandy',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'cognac-brandy-3',
    name: 'Metaxa 12*',
    description: '4cl',
    price: 5.90,
    category: 'cognac-brandy',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'cognac-brandy-4',
    name: 'Metaxa Private Reserve',
    description: '4cl',
    price: 11.90,
    category: 'cognac-brandy',
    menuType: 'drinks',
    displayAsList: true
  },

  // Non-Alcoholic Beverages
  {
    id: 'non-alcoholic-beverages-1',
    name: 'Fresh 0.1l',
    description: 'pomaranč, grep',
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-2',
    name: 'Rajec 0,33l',
    description: 'nesýtená, jemne sýtená, sýtená',
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-3',
    name: 'Targa tonic 0,25l',
    description: 'classic, ginger ale, rose',
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-4',
    name: 'Tanga Orange 0,25l',
    description: '',
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-5',
    name: 'Curiosa 0,25l',
    description: 'pomaranč, jablko, jahoda, multivitamín',
    price: 2.50,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-6',
    name: 'Royal Crown 0,25l',
    description: '',
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-7',
    name: 'Vinea 0,25l',
    description: '',
    price: 2.30,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-8',
    name: 'Romerquelle 0,33l',
    description: 'lemongrass',
    price: 2.50,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-9',
    name: 'Coca-Cola 0,2l',
    description: 'original, zero',
    price: 2.50,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'non-alcoholic-beverages-10',
    name: 'Birell nealko 0,5l',
    description: '',
    price: 1.90,
    category: 'non-alcoholic-beverages',
    menuType: 'drinks',
    displayAsList: true
  },

  // Non-Alcoholic Drinks
  {
    id: 'non-alcoholic-drinks-1',
    name: 'Basil Smash',
    description: 'Opius Amaro, citrón, bazalka, simple sirup',
    price: 5.90,
    category: 'non-alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'non-alcoholic-drinks-2',
    name: 'Espresso Martino',
    description: 'Opius Nigredo, espresso, simple sirup',
    price: 5.90,
    category: 'non-alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'non-alcoholic-drinks-3',
    name: 'Best Collins',
    description: 'Opius Albedo, malinové pyré, citrón, sóda',
    price: 5.90,
    category: 'non-alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'non-alcoholic-drinks-4',
    name: 'Virgin Mojito',
    description: 'mäta, limetka, trstinový cukor, sóda',
    price: 5.50,
    category: 'non-alcoholic-drinks',
    menuType: 'drinks',
    displayAsList: true,
  },
  

  // Coffee
  {
    id: 'coffee-1',
    name: 'Ristretto',
    description: 'pripravené z 8,5g kávy',
    price: 2.10,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-2',
    name: 'Espresso',
    description: 'pripravené z 8,5g kávy',
    price: 2.10,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-3',
    name: 'Espresso Lungo',
    description: 'pripravené z 8,5g kávy',
    price: 2.10,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-4',
    name: 'Doppio',
    description: 'pripravené z 8,5g kávy',
    price: 3.40,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-5',
    name: 'Americano',
    description: 'pripravené z 8,5g kávy',
    price: 3.40,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-6',
    name: 'Espresso Macchiato',
    description: 'pripravené z 8,5g kávy',
    price: 2.40,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-7',
    name: 'Cappuccino',
    description: 'pripravené z 8,5g kávy',
    price: 2.60,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-8',
    name: 'Caffé Latte',
    description: 'pripravené z 8,5g kávy',
    price: 2.60,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-9',
    name: 'Flat White',
    description: 'pripravené z 8,5g kávy',
    price: 3.60,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-10',
    name: 'Bezkofeínová',
    description: 'pripravené z 8,5g kávy',
    price: 3.60,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-11',
    name: 'Mlieko',
    description: 'pripravené z 8,5g kávy',
    price: 0.30,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },
  {
    id: 'coffee-12',
    name: 'Rastlinné mlieko (mandľové, ovsené, sójové)',
    description: 'pripravené z 8,5g kávy',
    price: 0.50,
    category: 'coffee',
    menuType: 'drinks',
    displayAsList: true,
  },

  // Specialty Coffee
  {
    id: 'specialty-coffee-1',
    name: 'Espresso Tonic',
    description: 'pripravené z 8,5g kávy',
    price: 3.50,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'specialty-coffee-2',
    name: 'Cold Brew',
    description: '',
    price: 3.30,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'specialty-coffee-3',
    name: 'Chai Latte',
    description: '',
    price: 3.90,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'specialty-coffee-4',
    name: 'Ľadové Cappuccino',
    description: '',
    price: 3.90,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'specialty-coffee-5',
    name: 'Prichuťové podľa ponuky',
    description: '',
    price: 0.40,
    category: 'specialty-coffee',
    menuType: 'drinks',
    displayAsList: true
  },

  // Matcha
  {
    id: 'matcha-1',
    name: 'Strawberry Matcha',
    description: '',
    price: 4.50,
    category: 'matcha',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'matcha-2',
    name: 'Orange Matcha',
    description: '',
    price: 4.20,
    category: 'matcha',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'matcha-3',
    name: 'Matcha Latte',
    description: '',
    price: 3.90,
    category: 'matcha',
    menuType: 'drinks',
    displayAsList: true
  },

  // Teas
  {
    id: 'teas-1',
    name: 'Z čerstvej mäty alebo zázvoru',
    description: '',
    price: 3.90,
    category: 'teas',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'teas-2',
    name: 'Sypaný podľa ponuky',
    description: '',
    price: 3.30,
    category: 'teas',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'teas-3',
    name: 'Med 7g',
    description: '',
    price: 0.40,
    category: 'teas',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'teas-4',
    name: 'Citrón',
    description: '',
    price: 0.20,
    category: 'teas',
    menuType: 'drinks',
    displayAsList: true
  },

  // Homemade Lemonades
  {
    id: 'homemade-lemonades-1',
    name: 'Podľa ponuky 0.4L',
    description: 'Jahodová, Mangová, Malinová s tymiánom, Zázvorová s mätou, Bazová s limetkou espumou, Uhorková, Ľadový čaj',
    price: 3.90,
    category: 'homemade-lemonades',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'homemade-lemonades-2',
    name: 'Podľa ponuky 1L',
    description: 'Jahodová, Mangová, Malinová s tymiánom, Zázvorová s mätou, Bazová s limetkou espumou, Uhorková, Ľadový čaj',
    price: 7.90,
    category: 'homemade-lemonades',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'homemade-lemonades-3',
    name: 'Citronáda 0.4L',
    description: '',
    price: 2.50,
    category: 'homemade-lemonades',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'homemade-lemonades-4',
    name: 'Citronáda 1L',
    description: '',
    price: 4.50,
    category: 'homemade-lemonades',
    menuType: 'drinks',
    displayAsList: true
  },

  // Roku Gin Cocktails
  {
    id: 'roku-gin-cocktails-1',
    name: 'Gimlet',
    description: '(gin 5cl, limetka, limetkovo-krémová espuma)',
    price: 6.50,
    category: 'roku-gin-cocktails',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'roku-gin-cocktails-2',
    name: 'G&T',
    description: 'gin 4cl, limeta, tonic',
    price: 5.90,
    category: 'roku-gin-cocktails',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'roku-gin-cocktails-3',
    name: 'Negroni',
    description: 'gin 3cl, Campari 3cl, Martini Rubino 3cl',
    price: 7.50,
    category: 'roku-gin-cocktails',
    menuType: 'drinks',
    displayAsList: true
  },

  // Beer (on tap)
  {
    id: 'beer-on-tap-1',
    name: 'Birell pomelp-grep nealko 0,3l',
    description: '',
    price: 1.90,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-2',
    name: 'Birell pomelp-grep nealko 0,5l',
    description: '',
    price: 2.40,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-3',
    name: 'Pilsner Urquell 12 0,3l',
    description: '',
    price: 2.30,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-4',
    name: 'Pilsner Urquell 12 0,5l',
    description: '',
    price: 2.90,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-5',
    name: 'Radegast 10 0,3l',
    description: '',
    price: 2,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-6',
    name: 'Radegast 10 0,5l',
    description: '',
    price: 2.60,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-7',
    name: 'Kofola 0,3l',
    description: '',
    price: 1.80,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-8',
    name: 'Kofola 0,5l',
    description: '',
    price: 2.50,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  },
  {
    id: 'beer-on-tap-9',
    name: 'Pohár bublín 1dcl',
    description: '',
    price: 2.30,
    category: 'beer-on-tap',
    menuType: 'drinks',
    displayAsList: true
  }
];
