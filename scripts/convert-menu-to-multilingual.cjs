const fs = require('fs');
const path = require('path');

// Read the current menuData.ts file
const menuDataPath = path.join(__dirname, '..', 'src', 'data', 'menuData.ts');
let content = fs.readFileSync(menuDataPath, 'utf8');

console.log('Converting menu items to multilingual structure...');

// Convert name: 'text' to name: { sk: 'text', en: 'needs translation' }
content = content.replace(/(\s+)name: '([^']+)',/g, (match, indent, name) => {
  return `${indent}name: {\n${indent}  sk: '${name}',\n${indent}  en: 'needs translation'\n${indent}},`;
});

// Convert description: 'text' to description: { sk: 'text', en: 'needs translation' }
content = content.replace(/(\s+)description: '([^']+)',/g, (match, indent, description) => {
  return `${indent}description: {\n${indent}  sk: '${description}',\n${indent}  en: 'needs translation'\n${indent}},`;
});

// Handle multiline descriptions (strings with escaped quotes)
content = content.replace(/(\s+)description: '([^']*(?:\\'[^']*)*)'/g, (match, indent, description) => {
  return `${indent}description: {\n${indent}  sk: '${description}',\n${indent}  en: 'needs translation'\n${indent}}`;
});

// Write the updated content back to the file
fs.writeFileSync(menuDataPath, content, 'utf8');

console.log('✅ Successfully converted menuData.ts to multilingual structure!');
console.log('📝 All English translations are set to "needs translation" - please update them manually.');