export interface RestaurantInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    [key: string]: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    telegram?: string;
    tiktok?: string;
  };
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: 'food' | 'interior' | 'atmosphere' | 'staff';
}

export const restaurantInfo: RestaurantInfo = {
  name: 'Na Vodnom',
  description: 'Great cuisine, charcoal-grilled dishes, wood-fired pizza, modern bowls, and a children\'s corner.\nThe perfect place for foodies and families alike. 🍽🌿 \nEnjoy the best dishes and drinks in a cozy atmosphere.🤎',
  address: 'Cesta na Mojš 1375, 010 01 Žilina',
  phone: '+421 901 90 00 08',
  email: 'info@navodnom.com',
  workingHours: {
    'Monday': '8:00 - 20:00',
    'Tuesday': '8:00 - 22:00',
    'Wednesday': '8:00 - 22:00',
    'Thursday': '8:00 - 23:00',
    'Friday': '8:00 - 23:00',
    'Saturday': '9:00 - 23:00',
    'Sunday': '9:00 - 22:00'
  },
  coordinates: {
    lat: 49.214223,
    lng: 18.775513
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/na.vodnom',
    facebook: 'https://www.instagram.com/na.vodnom',
    telegram: 'https://www.instagram.com/na.vodnom',
    tiktok: 'https://www.instagram.com/na.vodnom'
  }
};

// Generated gallery images
export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/src/assets/food-signature-dish.jpg',
    alt: 'Restaurant signature dish',
    category: 'food'
  },
  {
    id: '2', 
    src: '/src/assets/restaurant-interior.jpg',
    alt: 'Restaurant hall interior',
    category: 'interior'
  },
  {
    id: '3',
    src: '/src/assets/desserts-coffee.jpg', 
    alt: 'Desserts and coffee',
    category: 'food'
  },
  {
    id: '4',
    src: '/src/assets/romantic-atmosphere.jpg',
    alt: 'Romantic atmosphere',
    category: 'atmosphere'
  },
  {
    id: '5',
    src: '/src/assets/fresh-salads.jpg',
    alt: 'Fresh salads and appetizers',
    category: 'food'
  },
  {
    id: '6',
    src: '/src/assets/bar-area.jpg',
    alt: 'Restaurant bar area',
    category: 'interior'
  }
];