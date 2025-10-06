const fs = require('fs');
const path = require('path');

// Read the current menuData.ts file
const menuDataPath = path.join(__dirname, '..', 'src', 'data', 'menuData.ts');
let content = fs.readFileSync(menuDataPath, 'utf8');

console.log('Fixing all menuCategories and menuTypes...');

// Define replacements for all categories
const categoryReplacements = [
  // Main categories
  { 
    from: `  'soups': { name: {\n   sk: 'Soups',\n   en: 'needs translation'\n }, icon: '🍲', order: 2 },`,
    to: `  'soups': { name: 'Soups', icon: '🍲', order: 2 },`
  },
  {
    from: `  'main-dishes': { name: {\n   sk: 'Main Dishes',\n   en: 'needs translation'\n }, icon: '🍽️', order: 3 },`,
    to: `  'main-dishes': { name: 'Main Dishes', icon: '🍽️', order: 3 },`
  },
  {
    from: `  'garden-bowls': { name: {\n   sk: 'Garden Bowls',\n   en: 'needs translation'\n }, icon: '🥙', order: 4 },`,
    to: `  'garden-bowls': { name: 'Garden Bowls', icon: '🥙', order: 4 },`
  },
  {
    from: `  'pizza': { name: {\n   sk: 'Pizza',\n   en: 'needs translation'\n }, icon: '🍕', order: 5 },`,
    to: `  'pizza': { name: 'Pizza', icon: '🍕', order: 5 },`
  },
  {
    from: `  'side-dishes': { name: {\n   sk: 'Side Dishes',\n   en: 'needs translation'\n }, icon: '🍟', order: 6 },`,
    to: `  'side-dishes': { name: 'Side Dishes', icon: '🍟', order: 6 },`
  },
  {
    from: `  'sauces': { name: {\n   sk: 'Sauces',\n   en: 'needs translation'\n }, icon: '🫙', order: 7 },`,
    to: `  'sauces': { name: 'Sauces', icon: '🫙', order: 7 },`
  },
  {
    from: `  'desserts': { name: {\n   sk: 'Desserts',\n   en: 'needs translation'\n }, icon: '🧁', order: 8 },`,
    to: `  'desserts': { name: 'Desserts', icon: '🧁', order: 8 },`
  },
  {
    from: `  'something-for-beer': { name: {\n   sk: 'Something for Beer',\n   en: 'needs translation'\n }, icon: '🍺', order: 9 },`,
    to: `  'something-for-beer': { name: 'Something for Beer', icon: '🍺', order: 9 },`
  },
  {
    from: `  'my-choice': { name: {\n   sk: 'My Favorites',\n   en: 'needs translation'\n }, icon: '❤️', order: 999 },`,
    to: `  'my-choice': { name: 'My Choice', icon: '❤️', order: 999 },`
  }
];

// Apply all replacements
categoryReplacements.forEach(replacement => {
  content = content.replace(replacement.from, replacement.to);
});

// Use regex for remaining ones that follow the pattern
content = content.replace(/(\s+)'([^']+)':\s*{\s*name:\s*{\s*sk:\s*'([^']+)',\s*en:\s*'[^']*'\s*},\s*(icon:\s*'[^']*',\s*order:\s*\d+)\s*}/g, 
  (match, indent, key, name, rest) => {
    return `${indent}'${key}': { name: '${name}', ${rest} }`;
  });

// Fix menuTypes as well
content = content.replace(/'(\w+)':\s*{\s*name:\s*{\s*sk:\s*'([^']+)',\s*en:\s*'[^']*'\s*},\s*(icon:\s*'[^']*')\s*}/g,
  (match, key, name, rest) => {
    return `'${key}': { name: '${name}', ${rest} }`;
  });

// Write the updated content back to the file
fs.writeFileSync(menuDataPath, content, 'utf8');

console.log('✅ Fixed all menuCategories and menuTypes!');
console.log('📝 Menu items multilingual structure preserved.');