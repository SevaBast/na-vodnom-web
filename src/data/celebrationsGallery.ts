// Celebrations and Events Gallery Images
// Додавайте нові зображення в цей масив для відображення в карусельній галереї

export interface CelebrationImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  loading?: 'lazy' | 'eager';
}

export const celebrationsGalleryImages: CelebrationImage[] = [
  {
    id: 'celebration-1',
    url: './gallery_food1.jpg',
    alt: 'Celebration Event 1',
    title: 'Bar Area for Events',
    loading: 'eager' // Перше зображення завантажується негайно
  },
  {
    id: 'celebration-2',
    url: './gallery_food1.jpg',
    alt: 'Celebration Event 2',
    title: 'Romantic Atmosphere',
  },
  {
    id: 'celebration-3',
    url: './gallery_food1.jpg',
    alt: 'Celebration Event 3',
    title: 'Restaurant Interior',
  }
];

// Gallery Categories Images for Our Gallery section carousel
// Додавайте нові зображення в цей об'єкт для відображення в каруселі категорій галереї

export interface GalleryCarouselImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  loading?: 'lazy' | 'eager';
}

export const galleryCategoriesImages: Record<string, GalleryCarouselImage[]> = {
  food: [
    {
      id: 'food-1',
      url: './gallery_food1.jpg',
      alt: 'Restaurant signature dish',
      title: 'Our Signature Dishes',
      loading: 'eager'
    },
    {
      id: 'food-2',
      url: './gallery_food1.jpg',
      alt: 'Fresh Salads',
      title: 'Fresh & Healthy Salads',
    },
    {
      id: 'food-3',
      url: './gallery_food1.jpg',
      alt: 'Desserts & Coffee',
      title: 'Desserts & Coffee',
    },
    {
      id: 'food-4',
      url: './gallery_food1.jpg',
      alt: 'Desserts & Coffee',
      title: 'Desserts & Coffee',
    }
    
  ],
  interior: [
    {
      id: 'interior-1',
      url: './gallery_food1.jpg',
      alt: 'Restaurant Interior',
      title: 'Elegant Restaurant Interior',
      loading: 'eager'
    },
    {
      id: 'interior-2',
      url: './gallery_food1.jpg',
      alt: 'Bar Area',
      title: 'Modern Bar Area',
    }
  ],
  atmosphere: [
    {
      id: 'atmosphere-1',
      url: './gallery_food1.jpg',
      alt: 'Romantic Atmosphere',
      title: 'Romantic Evening Atmosphere',
    }
  ],
  staff: [
    {
      id: 'staff-1',
      url: './gallery_food1.jpg',
      alt: 'Professional Staff Member 1',
      title: 'Our Professional Team',
    },
    {
      id: 'staff-2',
      url: './gallery_food1.jpg',
      alt: 'Professional Staff Member 2',
      title: 'Experienced Service',
    },
    {
      id: 'staff-3',
      url: './gallery_food1.jpg',
      alt: 'Professional Staff Member 3',
      title: 'Dedicated Professionals',
    }
  ]
};
