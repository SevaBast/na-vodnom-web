# 🚀 Повний гайд: Production деплоймент Na Vodnom через приватний GitHub репозиторій

## 📖 Зміст
1. [Підготовка Production білду](#крок-1-підготовка-production-білду)
2. [Створення приватного GitHub репозиторію](#крок-2-створення-приватного-github-репозиторію)
3. [Підготовка файлів для деплойменту](#крок-3-підготовка-файлів-для-деплойменту)
4. [Робота з Git через VS Code](#крок-4-робота-з-git-через-vs-code)
5. [Налаштування хостингу](#крок-5-налаштування-хостингу)
6. [Процес оновлення сайту](#крок-6-процес-оновлення-сайту)
7. [Автоматизація і корисні команди](#крок-7-автоматизація-і-корисні-команди)

---

## 📋 Крок 1: Підготовка Production білду

### 1.1 Перевірка поточного проекту
```bash
# Перейти в директорію проекту
cd d:\CODE\cursor\na_vodnom_web\navodnom_web

# Перевірити що все працює в development
npm run dev
```

### 1.2 Створення production білду
```bash
# Очистити попередній білд (якщо є)
Remove-Item dist -Recurse -Force -ErrorAction SilentlyContinue

# Створити новий production білд
npm run build

# Перевірити розмір і структуру білду
Get-ChildItem dist -Recurse | Measure-Object -Property Length -Sum
```

### 1.3 Структура згенерованого білду
Після `npm run build` у папці `dist/` буде:
```
dist/
├── index.html                    # Головна HTML сторінка
├── assets/
│   ├── index-[hash].css         # Стилі CSS (41.81 kB)
│   └── index-[hash].js          # JavaScript код (558.77 kB)
├── gallery_food1.jpg            # Зображення ресторану
├── logo-new-small-black.png     # Логотип (чорний)
├── logo-new-small.png           # Логотип (звичайний)
├── logo-new.svg                 # Логотип SVG
├── placeholder.svg              # Placeholder зображення
├── linkicon.png                 # Іконка для посилань
├── favicon.ico                  # Іконка сайту
├── robots.txt                   # SEO файл для пошукових роботів
├── sitemap.xml                  # Карта сайту для SEO
└── ai-training-data.txt         # Допоміжний файл
```

### 1.4 Перевірка production білду локально
```bash
# Запустити preview сервер
npm run preview

# Відкрити http://localhost:4173 в браузері
# Перевірити що все працює правильно
```

---

## 📋 Крок 2: Створення приватного GitHub репозиторію

### 2.1 Створення репозиторію на GitHub.com

1. **Увійти на GitHub.com**
   - Логін: ваш GitHub акаунт
   - Пароль: ваш пароль

2. **Створити новий репозиторій**
   - Натиснути зелену кнопку **"New"** або **"+"** → **"New repository"**

3. **Налаштування репозиторію:**
   ```
   Repository name: na-vodnom-production
   Description: Production build for Na Vodnom restaurant website
   Visibility: 🔒 Private (ОБОВ'ЯЗКОВО!)
   
   ❌ НЕ ставити галочки на:
   - Add a README file
   - Add .gitignore
   - Choose a license
   ```

4. **Натиснути "Create repository"**

5. **Скопіювати URL репозиторію:**
   ```
   https://github.com/YOUR_USERNAME/na-vodnom-production.git
   ```

### 2.2 Підготовка локального production репозиторію

```bash
# Створити нову папку для production
New-Item -ItemType Directory -Path "d:\CODE\cursor\na_vodnom_production" -Force
Set-Location "d:\CODE\cursor\na_vodnom_production"

# Ініціалізувати Git репозиторій
git init

# Встановити основну гілку як main
git branch -M main
```

---

## 📋 Крок 3: Підготовка файлів для деплойменту

### 3.1 Які файли ПОТРІБНО включити ✅

**ТІЛЬКИ ці файли з папки `dist/`:**
- `index.html` - головна сторінка
- `assets/` - всі файли CSS і JS
- `*.jpg`, `*.png`, `*.svg` - всі зображення
- `favicon.ico` - іконка сайту
- `robots.txt` - для SEO
- `sitemap.xml` - карта сайту
- `.htaccess` - для правильної роботи SPA (створимо окремо)

### 3.2 Які файли НЕ потрібно включати ❌

**НЕ включайте ці файли/папки:**
- `src/` - вихідний код
- `node_modules/` - залежності (важить сотні MB)
- `package.json` і `package-lock.json` - конфігурація
- `vite.config.ts` - конфігурація збірки
- `tsconfig*.json` - TypeScript конфігурація
- `.env*` - змінні оточення і секрети
- `public/` - вже включено в dist
- Будь-які development файли

### 3.3 Копіювання файлів production

```bash
# Перейти в папку production
Set-Location "d:\CODE\cursor\na_vodnom_production"

# Скопіювати весь вміст dist папки
Copy-Item "d:\CODE\cursor\na_vodnom_web\navodnom_web\dist\*" -Destination "." -Recurse -Force

# Створити .htaccess для правильної роботи React Router
@"
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    Header set Cache-Control "max-age=31536000, public"
</filesMatch>
"@ | Out-File -FilePath ".htaccess" -Encoding UTF8

# Створити .gitignore
@"
# Системні файли
.DS_Store
Thumbs.db
desktop.ini

# Логи
*.log

# Тимчасові файли
*.tmp
*.temp
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
```

### 3.4 Створення README для production репозиторію

```bash
# Створити README.md
@"
# Na Vodnom Restaurant - Production Build

🍽️ Production готовий сайт ресторану Na Vodnom

## 📁 Структура файлів
- `index.html` - головна сторінка
- `assets/` - CSS і JS файли
- Зображення і статичні файли
- `.htaccess` - конфігурація сервера

## 🚀 Деплоймент
Цей репозиторій містить готові файли для хостингу.
Просто завантажте на веб-сервер або підключіть до CDN.

## 🔄 Оновлення
Оновлення відбувається через git push з development проекту.

Останнє оновлення: $(Get-Date -Format 'yyyy-MM-dd HH:mm')
"@ | Out-File -FilePath "README.md" -Encoding UTF8
```

---

## 📋 Крок 4: Робота з Git через VS Code

### 4.1 Відкриття production проекту в VS Code

```bash
# Відкрити production папку в VS Code
code "d:\CODE\cursor\na_vodnom_production"
```

### 4.2 Налаштування Git через термінал VS Code

**Натиснути `Ctrl + Shift + `` (відкрити термінал у VS Code)**

```bash
# Перевірити що знаходимося в правильній папці
pwd

# Додати remote origin (ЗАМІНІТЬ YOUR_USERNAME на ваш GitHub username!)
git remote add origin https://github.com/YOUR_USERNAME/na-vodnom-production.git

# Перевірити remote
git remote -v
```

### 4.3 Перший commit через VS Code

#### Спосіб А: Через термінал VS Code
```bash
# Додати всі файли до staging area
git add .

# Перевірити статус
git status

# Створити commit
git commit -m "🚀 Initial production build

- Added production ready HTML/CSS/JS files
- Included all restaurant images and assets  
- Added .htaccess for SPA routing
- Added SEO files (robots.txt, sitemap.xml)"

# Завантажити на GitHub
git push -u origin main
```

#### Спосіб Б: Через GUI VS Code
1. **Натиснути `Ctrl + Shift + G`** (відкрити Source Control)
2. **У списку змін натиснути "+"** біля кожного файлу або **"+ Stage All Changes"**
3. **У полі Message написати:**
   ```
   🚀 Initial production build
   
   - Added production ready HTML/CSS/JS files
   - Included all restaurant images and assets
   - Added .htaccess for SPA routing  
   - Added SEO files (robots.txt, sitemap.xml)
   ```
4. **Натиснути `Ctrl + Enter`** або кнопку **"Commit"**
5. **Натиснути "Publish Branch"** або **"Push"**

### 4.4 Корисні Git команди у VS Code

```bash
# Перевірити статус репозиторію
git status

# Переглянути історію commits
git log --oneline

# Перевірити різницю перед commit
git diff

# Відмінити зміни в файлі
git checkout -- filename.html

# Створити нову гілку
git checkout -b feature-name

# Перемкнутися між гілками
git checkout main
git checkout feature-name

# Злити гілку
git merge feature-name

# Відправити зміни
git push

# Отримати останні зміни
git pull
```

### 4.5 Горячі клавіші VS Code для Git

| Клавіші | Дія |
|---------|-----|
| `Ctrl + Shift + G` | Відкрити Source Control панель |
| `Ctrl + Shift + P` → `Git: Commit` | Швидкий commit |
| `Ctrl + K Ctrl + C` | Commit зміни |
| `Ctrl + K Ctrl + P` | Push зміни |
| `Ctrl + K Ctrl + U` | Unstage файли |
| `Ctrl + K Ctrl + Z` | Stash зміни |

---

## 📋 Крок 5: Налаштування хостингу

### 5.1 Популярні хостинги з GitHub інтеграцією

#### 🟢 Netlify (Рекомендований)

**Переваги:**
- Безкоштовний для особистих проектів
- Автоматичний деплоймент при git push
- Безкоштовний SSL сертифікат
- CDN по всьому світу
- Підтримка власних доменів

**Налаштування:**
1. **Увійти на [netlify.com](https://netlify.com)**
2. **"New site from Git"**
3. **Вибрати "GitHub"**
4. **Авторизувати Netlify в GitHub**
5. **Вибрати репозиторій `na-vodnom-production`**
6. **Налаштування білду:**
   ```
   Branch to deploy: main
   Build command: (залишити пустим)
   Publish directory: . (крапка - корінь репозиторію)
   ```
7. **"Deploy site"**

#### 🟢 Vercel

**Переваги:**
- Безкоштовний для особистих проектів  
- Дуже швидкий CDN
- Автоматичний деплоймент
- Відмінна підтримка React/SPA

**Налаштування:**
1. **Увійти на [vercel.com](https://vercel.com)**
2. **"Import Project"**
3. **"Continue with GitHub"**
4. **Вибрати репозиторій**
5. **Налаштування:**
   ```
   Framework Preset: Other
   Build Command: (залишити пустим)
   Output Directory: . (крапка)
   Install Command: (залишити пустим)
   ```
6. **"Deploy"**

#### 🟡 GitHub Pages (Базовий)

**Переваги:**
- Повністю безкоштовний
- Інтегрований з GitHub

**Обмеження:**
- Тільки статичні сайти
- Повільніший ніж Netlify/Vercel

**Налаштування:**
1. **У GitHub репозиторії: Settings → Pages**
2. **Source: "Deploy from a branch"**
3. **Branch: "main" / "(root)"**
4. **Save**

### 5.2 Налаштування власного домену

#### Для Netlify:
1. **У Netlify Dashboard → Domain settings**
2. **"Add custom domain"**
3. **Ввести: `navodnom.sk`**
4. **У DNS провайдера додати записи:**
   ```
   CNAME www your-site-name.netlify.app
   A @ 104.198.14.52
   ```

#### DNS записи для власного домену:
```dns
# Основний домен
A navodnom.sk 104.198.14.52

# www піддомен
CNAME www.navodnom.sk your-site-name.netlify.app

# Додаткові записи (опціонально)
CNAME blog your-site-name.netlify.app
CNAME api your-api-domain.com
```

---

## 📋 Крок 6: Процес оновлення сайту

### 6.1 Коли потрібно оновити production сайт

```bash
# 1. Внести зміни в development проекті
Set-Location "d:\CODE\cursor\na_vodnom_web\navodnom_web"

# 2. Перевірити що все працює
npm run dev

# 3. Створити новий production білд  
npm run build

# 4. Перевірити production білд
npm run preview

# 5. Якщо все ОК - оновити production репозиторій
```

### 6.2 Автоматичне оновлення production

**Створити PowerShell скрипт `update-production.ps1`:**

```powershell
# update-production.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$CommitMessage
)

Write-Host "🔄 Updating Na Vodnom production..." -ForegroundColor Cyan

# Перейти до development проекту
Set-Location "d:\CODE\cursor\na_vodnom_web\navodnom_web"

# Створити білд
Write-Host "📦 Building production..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Очистити production папку
Write-Host "🧹 Cleaning production folder..." -ForegroundColor Yellow
Remove-Item "d:\CODE\cursor\na_vodnom_production\*" -Exclude ".git",".gitignore","README.md" -Recurse -Force

# Копіювати нові файли
Write-Host "📁 Copying new files..." -ForegroundColor Yellow
Copy-Item "dist\*" "d:\CODE\cursor\na_vodnom_production\" -Recurse -Force

# Оновити .htaccess
@"
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    Header set Cache-Control "max-age=31536000, public"
</filesMatch>
"@ | Out-File -FilePath "d:\CODE\cursor\na_vodnom_production\.htaccess" -Encoding UTF8

# Git операції
Set-Location "d:\CODE\cursor\na_vodnom_production"

Write-Host "📤 Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "🚀 $CommitMessage

Updated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

Write-Host "☁️ Pushing to GitHub..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Production updated successfully!" -ForegroundColor Green
    Write-Host "🌐 Site will be live in 1-2 minutes" -ForegroundColor Cyan
} else {
    Write-Host "❌ Push failed!" -ForegroundColor Red
}
```

**Використання скрипту:**
```powershell
# Зберегти скрипт як update-production.ps1
# Запускати коли потрібно оновити сайт:
.\update-production.ps1 "Updated menu prices and added new dishes"
```

### 6.3 Ручне оновлення через VS Code

```bash
# 1. У development проекті
cd d:\CODE\cursor\na_vodnom_web\navodnom_web
npm run build

# 2. Копіювати файли
Remove-Item d:\CODE\cursor\na_vodnom_production\* -Exclude .git,.gitignore,README.md -Recurse -Force
Copy-Item dist\* d:\CODE\cursor\na_vodnom_production\ -Recurse

# 3. У VS Code відкрити production папку
code d:\CODE\cursor\na_vodnom_production

# 4. Source Control (Ctrl+Shift+G)
# 5. Stage All Changes
# 6. Commit з описом змін
# 7. Push
```

---

## 📋 Крок 7: Автоматизація і корисні команди

### 7.1 VS Code Tasks для автоматизації

**Створити `.vscode/tasks.json` у development проекті:**

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build Production",
            "type": "shell",
            "command": "npm",
            "args": ["run", "build"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            },
            "problemMatcher": []
        },
        {
            "label": "Deploy to Production",
            "type": "shell",
            "command": "powershell",
            "args": [
                "-ExecutionPolicy", "Bypass",
                "-File", "${workspaceFolder}/scripts/update-production.ps1",
                "${input:commitMessage}"
            ],
            "group": "build",
            "dependsOn": "Build Production",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": true,
                "panel": "shared"
            }
        }
    ],
    "inputs": [
        {
            "id": "commitMessage",
            "description": "Commit message for production update",
            "default": "Production update",
            "type": "promptString"
        }
    ]
}
```

**Використання:**
- `Ctrl+Shift+P` → "Tasks: Run Task" → "Deploy to Production"

### 7.2 Корисні VS Code розширення для Git

```json
// Рекомендовані розширення для .vscode/extensions.json
{
    "recommendations": [
        "eamodio.gitlens",           // GitLens - детальна Git інтеграція
        "mhutchie.git-graph",        // Git Graph - візуалізація гілок
        "donjayamanne.githistory",   // Git History - історія файлів
        "huizhou.githd",             // Git Diff viewer
        "github.vscode-pull-request-github" // GitHub Pull Requests
    ]
}
```

### 7.3 Git алиаси для швидкої роботи

```bash
# Додати до git config корисні алиаси
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.pl pull
git config --global alias.ps push
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.uncommit "reset --soft HEAD~1"
```

### 7.4 Моніторинг деплойментів

**Webhook для Slack/Discord (опціонально):**
```bash
# Додати до production репозиторію GitHub Action
# .github/workflows/deploy-notification.yml
```

**Перевірка статусу сайту:**
```powershell
# Скрипт для перевірки що сайт працює
$response = Invoke-WebRequest -Uri "https://your-domain.com" -UseBasicParsing
if ($response.StatusCode -eq 200) {
    Write-Host "✅ Site is online!" -ForegroundColor Green
} else {
    Write-Host "❌ Site is down!" -ForegroundColor Red
}
```

---

## 🔒 Безпека і найкращі практики

### 🛡️ Що потрібно пам'ятати:

1. **Приватність репозиторію**
   - ✅ Завжди тримайте production репозиторій приватним
   - ❌ Ніколи не робіть його публічним

2. **Секрети і API ключі**
   - ❌ Ніколи не включайте `.env` файли
   - ❌ Не додавайте API ключі в код
   - ✅ Використовуйте змінні оточення хостингу

3. **Розміри файлів**
   - ✅ Стискайте зображення перед додаванням
   - ✅ Видаляйте непотрібні файли
   - ❌ Не додавайте файли більше 25MB

4. **SEO і продуктивність**
   - ✅ Включайте `robots.txt` і `sitemap.xml`
   - ✅ Налаштуйте кешування в `.htaccess`
   - ✅ Використовуйте CDN хостинги

---

## 🆘 Можливі проблеми і рішення

### Проблема: Git push не працює
```bash
# Рішення:
git remote -v  # перевірити remote URL
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main --force
```

### Проблема: Сайт не відкривається після деплойменту
```bash
# Перевірити:
1. Чи є index.html в корні репозиторію
2. Чи правильно налаштований хостинг
3. Чи працює DNS (для власного домену)
4. Чи є .htaccess файл
```

### Проблема: Білі сторінки в production
```bash
# Причини:
1. Неправильні шляхи до файлів
2. Відсутній .htaccess
3. Помилки в JavaScript коді

# Рішення:
1. Перевірити console в браузері (F12)
2. Додати .htaccess файл
3. Перевірити що всі файли в assets/ папці
```

---

## 📞 Підтримка

Якщо виникають проблеми:

1. **Перевірити логи хостингу** (Netlify/Vercel dashboard)
2. **Переглянути console браузера** (F12 → Console)
3. **Перевірити Network tab** (F12 → Network)
4. **Порівняти з localhost** (`npm run preview`)

---

## ✅ Чекліст для успішного деплойменту

- [ ] Production білд створено (`npm run build`)
- [ ] Файли скопійовано в production папку
- [ ] Приватний GitHub репозиторій створено
- [ ] .htaccess файл додано
- [ ] Перший commit зроблено
- [ ] Remote origin налаштовано
- [ ] Push на GitHub виконано
- [ ] Хостинг підключено до репозиторію
- [ ] Сайт відкривається і працює
- [ ] SSL сертифікат активний
- [ ] Власний домен налаштовано (якщо потрібно)

---

## 🎉 Готово!

Тепер ваш сайт Na Vodnom готовий до production і налаштований для автоматичних оновлень через `git push`! 

**Щоб оновити сайт в майбутньому:**
1. Внести зміни в development
2. Запустити `npm run build`
3. Скопіювати файли в production репозиторій
4. Зробити commit і push
5. Хостинг автоматично оновить сайт за 1-2 хвилини

**Автор:** GitHub Copilot  
**Дата створення:** $(Get-Date -Format 'yyyy-MM-dd')  
**Версія:** 1.0

---