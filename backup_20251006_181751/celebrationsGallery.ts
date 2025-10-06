// Celebrations and Events Gallery Images
// Додавайте нові зображення в цей масив для відображення в карусельній галереї

export interface CelebrationImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
}

export const celebrationsGalleryImages: CelebrationImage[] = [
  {
    id: 'celebration-1',
    url: './bar-area.jpg',
    alt: 'Celebration Event 1',
    title: 'Bar Area for Events'
  },
  {
    id: 'celebration-2',
    url: './romantic-atmosphere.jpg',
    alt: 'Celebration Event 2',
    title: 'Romantic Atmosphere'
  },
  {
    id: 'celebration-3',
    url: './restaurant-interior.jpg',
    alt: 'Celebration Event 3',
    title: 'Restaurant Interior'
  }
];

// Gallery Categories Images for Our Gallery section carousel
// Додавайте нові зображення в цей об'єкт для відображення в каруселі категорій галереї

export interface GalleryCarouselImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
}

export const galleryCategoriesImages: Record<string, GalleryCarouselImage[]> = {
  food: [
    {
      id: 'food-1',
      url: './food-signature-dish.jpg',
      alt: 'Signature Dish',
      title: 'Our Signature Dishes'
    },
    {
      id: 'food-2',
      url: './fresh-salads.jpg',
      alt: 'Fresh Salads',
      title: 'Fresh & Healthy Salads'
    },
    {
      id: 'food-3',
      url: './desserts-coffee.jpg',
      alt: 'Desserts & Coffee',
      title: 'Desserts & Coffee'
    },
    {
      id: 'food-4',
      url: './piano.jpg',
      alt: 'Desserts & Coffee',
      title: 'Desserts & Coffee'
    }
    
  ],
  interior: [
    {
      id: 'interior-1',
      url: './restaurant-interior.jpg',
      alt: 'Restaurant Interior',
      title: 'Elegant Restaurant Interior'
    },
    {
      id: 'interior-2',
      url: './bar-area.jpg',
      alt: 'Bar Area',
      title: 'Modern Bar Area'
    }
  ],
  atmosphere: [
    {
      id: 'atmosphere-1',
      url: './romantic-atmosphere.jpg',
      alt: 'Romantic Atmosphere',
      title: 'Romantic Evening Atmosphere'
    }
  ],
  staff: [
    {
      id: 'staff-1',
      url: './placeholder.svg',
      alt: 'Professional Staff Member 1',
      title: 'Our Professional Team'
    },
    {
      id: 'staff-2',
      url: './placeholder.svg',
      alt: 'Professional Staff Member 2',
      title: 'Experienced Service'
    },
    {
      id: 'staff-3',
      url: './placeholder.svg',
      alt: 'Professional Staff Member 3',
      title: 'Dedicated Professionals'
    }
  ]
};
