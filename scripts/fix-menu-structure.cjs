const fs = require('fs');
const path = require('path');

// Read the current menuData.ts file
const menuDataPath = path.join(__dirname, '..', 'src', 'data', 'menuData.ts');
let content = fs.readFileSync(menuDataPath, 'utf8');

console.log('Fixing menuCategories and menuTypes to use simple string names...');

// Fix menuCategories - revert complex name structure to simple strings
content = content.replace(/(\w+):\s*{\s*name:\s*{\s*sk:\s*'([^']+)',\s*en:\s*'[^']*'\s*},\s*(icon:\s*'[^']*',\s*order:\s*\d+)\s*}/g, 
  (match, key, name, rest) => {
    return `${key}: { name: '${name}', ${rest} }`;
  });

// Fix menuTypes - revert complex name structure to simple strings  
content = content.replace(/'(\w+)':\s*{\s*name:\s*{\s*sk:\s*'([^']+)',\s*en:\s*'[^']*'\s*},\s*(icon:\s*'[^']*')\s*}/g,
  (match, key, name, rest) => {
    return `'${key}': { name: '${name}', ${rest} }`;
  });

// Fix items with escaped quotes that weren't handled properly
content = content.replace(/(\s+)name: '([^']*\\'[^']*)',/g, (match, indent, name) => {
  return `${indent}name: {\n${indent}  sk: '${name}',\n${indent}  en: 'needs translation'\n${indent}},`;
});

content = content.replace(/(\s+)description: '([^']*\\'[^']*)',/g, (match, indent, description) => {
  return `${indent}description: {\n${indent}  sk: '${description}',\n${indent}  en: 'needs translation'\n${indent}},`;
});

// Write the updated content back to the file
fs.writeFileSync(menuDataPath, content, 'utf8');

console.log('✅ Fixed menuCategories and menuTypes!');
console.log('📝 Menu items with multilingual structure preserved.');