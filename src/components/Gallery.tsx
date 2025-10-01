import { useState } from "react";
import { galleryImages, GalleryImage } from "@/data/restaurantData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Map image paths to public images
const imageMap: Record<string, string> = {
  '/src/assets/food-signature-dish.jpg': '/na-vodnom-web/food-signature-dish.jpg',
  '/src/assets/restaurant-interior.jpg': '/na-vodnom-web/restaurant-interior.jpg',
  '/src/assets/desserts-coffee.jpg': '/na-vodnom-web/desserts-coffee.jpg',
  '/src/assets/romantic-atmosphere.jpg': '/na-vodnom-web/romantic-atmosphere.jpg',
  '/src/assets/fresh-salads.jpg': '/na-vodnom-web/fresh-salads.jpg',
  '/src/assets/bar-area.jpg': '/na-vodnom-web/bar-area.jpg',
};

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const categories = [
    { key: 'all', name: 'All', icon: '🖼️' },
    { key: 'food', name: 'Food', icon: '🍽️' },
    { key: 'interior', name: 'Interior', icon: '🏛️' },
    { key: 'atmosphere', name: 'Atmosphere', icon: '✨' },
    { key: 'staff', name: 'Staff', icon: '👥' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the atmosphere of our restaurant through photos of our dishes, interior and unforgettable moments
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-in">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? 'hero' : 'glass'}
              onClick={() => {
                setSelectedCategory(category.key);
                setSelectedImageIndex(0);
              }}
              className="transition-all duration-300"
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredImages.map((image, index) => (
            <GalleryImageCard 
              key={image.id} 
              image={image} 
              index={index}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>

        {/* No images message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No images in this category yet
            </p>
          </div>
        )}

        {/* Image Modal */}
        {filteredImages.length > 0 && (
          <ImageModal 
            images={filteredImages}
            currentIndex={selectedImageIndex}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </div>
    </section>
  );
};

interface GalleryImageCardProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

const GalleryImageCard = ({ image, index, onClick }: GalleryImageCardProps) => {
  const actualImageSrc = imageMap[image.src] || image.src;
  
  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-gradient-card border border-glass-border cursor-pointer hover:scale-105 hover:shadow-elegant transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={actualImageSrc} 
          alt={image.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
        <div className="p-4 w-full bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white font-medium">{image.alt}</p>
          {image.category && (
            <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-white/30">
              {image.category}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

interface ImageModalProps {
  images: GalleryImage[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal = ({ images, currentIndex, onNext, onPrev }: ImageModalProps) => {
  const currentImage = images[currentIndex];
  const actualImageSrc = imageMap[currentImage?.src] || currentImage?.src;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hidden">Open Modal</button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full bg-black/90 border-none p-0">
        <div className="relative">
          {/* Main Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={actualImageSrc} 
              alt={currentImage?.alt}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Navigation */}
          {images.length > 1 && (
            <>
              <Button
                variant="glass"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-white/20"
                onClick={onPrev}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="glass"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-white/20"
                onClick={onNext}
              >
                <ChevronRight />
              </Button>
            </>
          )}
          
          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-lg font-semibold">{currentImage?.alt}</h3>
            <p className="text-white/80 text-sm mt-1">
              {currentIndex + 1} з {images.length}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};