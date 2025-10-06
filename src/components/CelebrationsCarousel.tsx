import { useState, useEffect } from 'react';
import { celebrationsGalleryImages, CelebrationImage } from '@/data/celebrationsGallery';

// Компонент оптимізованого зображення з lazy loading
const OptimizedImage = ({ 
  image, 
  loading, 
  className 
}: { 
  image: CelebrationImage; 
  loading: 'lazy' | 'eager'; 
  className: string; 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Placeholder поки завантажується */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img 
        src={image.url}
        alt={image.alt}
        className={`${className} transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export const CelebrationsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  
  const images = celebrationsGalleryImages;

  // Автоматичне прокручування кожні 3 секунди
  useEffect(() => {
    if (isAutoplayPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isAutoplayPaused]);

  // Відновлення автопрокрутки через 3 секунди після свайпу
  useEffect(() => {
    if (!isAutoplayPaused) return;
    
    const timer = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isAutoplayPaused]);

  // Свайп-навігація - спрощена версія без preventDefault
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: 0, y: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.x) return;
    
    const touch = e.targetTouches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) {
      return;
    }
    
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = Math.abs(touchStart.y - touchEnd.y);
    const isHorizontalSwipe = Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50; // Збільшили поріг
    
    if (isHorizontalSwipe) {
      setIsAutoplayPaused(true);
      
      if (deltaX > 0) { // Свайп вліво
        setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
      } else { // Свайп вправо
        setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in">
      {/* Carousel Container */}
      <div 
        className="celebrations-carousel relative aspect-[4/3] overflow-hidden rounded-xl border border-glass-border shadow-lg"
        style={{ 
          boxShadow: '0 8px 32px -8px hsl(30 67% 22% / 0.16), 0 4px 16px -4px hsl(30 67% 22% / 0.12)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <OptimizedImage
              image={image}
              loading={index === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            {/* Title Overlay */}
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold drop-shadow-lg">
                  {image.title}
                </h3>
              </div>
            )}
          </div>
        ))}

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 bg-white' 
                  : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
