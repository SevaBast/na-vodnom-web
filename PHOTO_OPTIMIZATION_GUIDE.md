# 📸 Гайд з оптимізації фото для сайту Na Vodnom

## 🎯 Ціль: Додати 100 фото без втрати продуктивності

### 📊 Поточна ситуація:
- **Поточне фото:** 396 kB
- **100 фото × 396 kB = ~40 MB**
- **Критично для продуктивності!**

## 🛠️ Рішення 1: Оптимізація + Lazy Loading

### 1.1 Оптимізація фото

**Цільові розміри:**
- **Thumbnail (preview):** 200×150px, ~20-30 kB
- **Medium (gallery):** 800×600px, ~80-120 kB  
- **Large (lightbox):** 1200×900px, ~150-250 kB

**Інструменти для оптимізації:**

#### PowerShell скрипт для масової обробки:
```powershell
# optimize-images.ps1
param(
    [string]$InputFolder = "d:\photos\original",
    [string]$OutputFolder = "d:\photos\optimized"
)

# Створити папки
New-Item -ItemType Directory -Path "$OutputFolder\thumbnails" -Force
New-Item -ItemType Directory -Path "$OutputFolder\medium" -Force  
New-Item -ItemType Directory -Path "$OutputFolder\large" -Force

# Для кожного фото
Get-ChildItem "$InputFolder\*.jpg" | ForEach-Object {
    $name = $_.BaseName
    
    # Використовувати ImageMagick (потрібно встановити)
    & magick $_.FullName -resize 200x150^ -gravity center -extent 200x150 -quality 85 "$OutputFolder\thumbnails\$name.jpg"
    & magick $_.FullName -resize 800x600^ -gravity center -extent 800x600 -quality 90 "$OutputFolder\medium\$name.jpg"  
    & magick $_.FullName -resize 1200x900 -quality 85 "$OutputFolder\large\$name.jpg"
    
    Write-Host "Processed: $name"
}
```

#### Альтернатива: Online інструменти
- **TinyPNG.com** - автоматичне стиснення
- **Squoosh.app** - Google інструмент
- **ImageOptim** - для macOS
- **GIMP** - безкоштовний редактор

### 1.2 Структура файлів після оптимізації

```
public/
├── gallery/
│   ├── thumbnails/          # 200×150, ~25 kB кожне
│   │   ├── food_001.jpg
│   │   ├── food_002.jpg
│   │   └── ... (100 файлів = ~2.5 MB)
│   ├── medium/              # 800×600, ~100 kB кожне  
│   │   ├── food_001.jpg
│   │   ├── food_002.jpg
│   │   └── ... (100 файлів = ~10 MB)
│   └── large/               # 1200×900, ~200 kB кожне
│       ├── food_001.jpg
│       ├── food_002.jpg
│       └── ... (100 файлів = ~20 MB)
```

### 1.3 Lazy Loading компонент

```typescript
// src/components/OptimizedGallery.tsx
import { useState, useEffect, useRef } from 'react';

interface GalleryImage {
  id: string;
  name: string;
  alt: string;
  category: string;
}

const OptimizedImage = ({ 
  image, 
  size = 'medium' 
}: { 
  image: GalleryImage; 
  size: 'thumbnail' | 'medium' | 'large';
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getSrc = () => {
    if (!isInView) return '';
    return `/gallery/${size}/${image.name}.jpg`;
  };

  return (
    <div ref={imgRef} className="relative overflow-hidden rounded-lg">
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {isInView && (
        <img
          src={getSrc()}
          alt={image.alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
};
```

## 🛠️ Рішення 2: CDN + External Storage (Найкраще для 100+ фото)

### 2.1 Cloudinary інтеграція

```typescript
// src/utils/imageOptimizer.ts
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'webp' | 'avif';
  } = {}
) => {
  const { width = 800, height = 600, quality = 85, format = 'webp' } = options;
  
  return `${CLOUDINARY_BASE_URL}/w_${width},h_${height},c_fill,q_${quality},f_${format}/${publicId}`;
};

// Використання:
// <img src={getOptimizedImageUrl('food_001', { width: 400, height: 300 })} />
```

### 2.2 Переваги CDN:
✅ **Автоматична оптимізація** - стиснення на льоту  
✅ **Швидке завантаження** - сервери по всьому світу  
✅ **Не збільшує білд** - фото зберігаються окремо  
✅ **Адаптивні зображення** - різні розміри для різних пристроїв  
✅ **WebP/AVIF підтримка** - сучасні формати  

## 🛠️ Рішення 3: Прогресивне завантаження

### 3.1 Категорізація по важливості

```typescript
// src/data/galleryData.ts
export const galleryImages = [
  // Пріоритетні фото (завантажуються першими)
  {
    id: 'hero-1',
    priority: 'high',
    category: 'signature-dishes',
    sizes: {
      thumbnail: '/gallery/priority/hero-1-thumb.jpg',
      medium: '/gallery/priority/hero-1-med.jpg', 
      large: '/gallery/priority/hero-1-large.jpg'
    }
  },
  
  // Звичайні фото (lazy loading)
  {
    id: 'food-001',
    priority: 'normal', 
    category: 'food',
    sizes: {
      thumbnail: '/gallery/thumbnails/food-001.jpg',
      medium: '/gallery/medium/food-001.jpg',
      large: '/gallery/large/food-001.jpg'
    }
  }
  // ... інші 98 фото
];
```

## 📊 Порівняння рішень

| Рішення | Розмір білду | Швидкість | Складність | Вартість |
|---------|--------------|-----------|------------|----------|
| **Всі фото в public/** | ~40 MB | 🐌 Дуже повільно | 🟢 Просто | 💰 Дорого |
| **Оптимізація + Lazy** | ~15 MB | 🟡 Помірно | 🟡 Середньо | 💰 Помірно |
| **CDN (Cloudinary)** | ~600 kB | 🚀 Швидко | 🟡 Середньо | 💰💰 Платно |
| **Hybrid (CDN + Local)** | ~5 MB | 🚀 Швидко | 🔴 Складно | 💰 Помірно |

## 🎯 Рекомендації

### 🏆 **Для вашого ресторану рекомендую Рішення 1:**

1. **Оптимізувати всі фото:**
   - Thumbnail: 200×150, ~25 kB
   - Medium: 800×600, ~100 kB
   - Large: 1200×900, ~200 kB

2. **Використати lazy loading**

3. **Показувати спочатку 12-20 кращих фото**

4. **Додати кнопку "Завантажити більше"**

### 📈 **Результат:**
- **Початкове завантаження:** ~3-5 MB (замість 40 MB)
- **Швидкість:** 2-4 секунди на 4G
- **UX:** Миттєва перша взаємодія
- **SEO:** Кращі показники через швидкість

## 🛠️ Готовий план впровадження

1. **Оптимізувати фото** (зменшити до ~100 kB кожне)
2. **Створити компонент lazy loading**
3. **Розділити на категорії** по важливості  
4. **Додати прогресивне завантаження**
5. **Протестувати на мобільних пристроях**

Хочете, щоб я допоміг реалізувати один з цих підходів?

---