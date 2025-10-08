# 🎛️ Налаштування дефолтних підкатегорій меню

## 📖 Опис функціональності

Ця функціональність дозволяє **власноручно задавати** яка підкатегорія буде відкриватися по замовчуванню для кожного типу меню.

## 🔧 Як налаштувати

### Місце налаштування
Файл: `src/components/MenuSection.tsx`  
Рядки: ~58-65

### Код для редагування:
```typescript
// Manual default categories for each menu type
const defaultCategories: Record<MenuType, MenuCategory> = {
  'main': 'appetizers',           // Головне меню - починається з Предjedlá
  'breakfast': 'special-breakfast', // Сніданки - починається з спеціальних сніданків
  'kids': 'all-kids-menu',        // Дитяче меню - починається з всього дитячого меню
  'drinks': 'alcoholic-drinks',   // Напої - починається з Алкогольних напоїв
  'celebrations': 'cold-buffet'   // Celebrations (включає cold-buffet) - починається з Студеного буфету
};
```

## 📋 Доступні MenuType та їх категорії

### 🍽️ **'main'** - Головне меню
Доступні категорії:
- `'appetizers'` - Предjedlá 🥗
- `'soups'` - Polievky 🍲  
- `'main-dishes'` - Hlavné jedlá 🍽️
- `'side-dishes'` - Prílohy 🍟
- `'garden-bowls'` - Garden Bowls 🥙
- `'pizza'` - Pizza 🍕
- `'desserts'` - Dezerty 🧁
- `'sauces'` - Omáčky 🫙
- `'something-for-beer'` - Niečo k pívečku 🍺

### 🌅 **'breakfast'** - Snídenky
Doступні категорії:
- `'special-breakfast'` - Špeciálne raňajky
- `'breakfast-side-dishes'` - Prílohy k raňajkám
- `'classic'` - Klasické
- `'toasts'` - Toasty
- `'bowls'` - Bowls

### 👶 **'kids'** - Dítjache меню
Doступні категорії:
- `'all-kids-menu'` - Celé detské menu

### 🍹 **'drinks'** - Napoje
Doступні категорії:
- `'alcoholic-drinks'` - Alkoholické nápoje 🍷
- `'vodka'` - Vodka
- `'gin'` - Gin
- `'distillates'` - Destiláty
- `'tequila'` - Tequila
- `'rum'` - Rum
- `'whiskey-bourbon'` - Whiskey & Bourbon
- `'liqueurs'` - Likéry
- `'cognac-brandy'` - Cognac & Brandy
- `'non-alcoholic-drinks'` - Nealkoholické nápoje 🧃
- `'non-alcoholic-beverages'` - Nealkoholické nápoje
- `'coffee'` - Káva ☕
- `'specialty-coffee'` - Špeciálna káva
- `'matcha'` - Matcha 🍵
- `'teas'` - Čaje
- `'homemade-lemonades'` - Domáce limonády
- `'roku-gin-cocktails'` - Roku Gin Cocktails
- `'beer-on-tap'` - Pivo z čapu 🍺

### 🎉 **'celebrations'** - Oslavy a udalosti
Doступні категорії:
- `'cold-buffet'` - Študený bufet 🥗
- `'hot-buffet'` - Teplý bufet
- `'candy-bar'` - Candy Bar
- `'vianoce-2025'` - Vianoce 2025
- `'grilovacka'` - Grilovačka

## 🎯 Приклады змін

### Приклад 1: Змінити дефолт для головного меню
```typescript
'main': 'pizza',  // Тепер головне меню відкривається на Pizza замість Предjedlá
```

### Приклад 2: Змінити дефолт для напоїв
```typescript
'drinks': 'coffee',  // Тепер меню напоїв відкривається на Káva замість Alkoholické nápoje
```

### Приклад 3: Змінити дефолт для celebrations
```typescript
'celebrations': 'hot-buffet',  // Тепер celebrations відкривається на Teplý bufet замість Študený bufet
```

## ⚡ Як працює система

1. **При перемиканні між типами меню** (Main → Drinks → тощо) автоматично відкривається задана підкатегорія
2. **При першому завантаженні сайту** відкривається дефолтна підкатегорія для 'main'
3. **Якщо задана категорія не існує** - система автоматично вибере першу доступну
4. **Fallback** - якщо нічого не знайдено, відкривається 'appetizers'

## 🛡️ Безпека

- Система **автоматично перевіряє** чи існує задана категорія для даного menuType
- Якщо категорія не існує - **автоматично обирає резервну**
- **TypeScript** перевіряє правильність назв категорій при компіляції

## 🔄 Оновлення після змін

Після внесення змін в `defaultCategories`:
1. Зберегти файл
2. Перезавантажити сайт
3. Нові дефолти будуть активні

---

**📝 Примітка**: Ця функціональність дозволяє оптимізувати UX - наприклад, можна відкривати найпопулярніші категорії по замовчуванню.
