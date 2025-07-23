export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: 'apartment' | 'house' | 'condo' | 'studio';
    furnished: boolean;
    petFriendly: boolean;
    parking: boolean;
  };
  amenities: string[];
  images: string[];
  landlord: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  availability: {
    available: boolean;
    availableFrom: string;
    leaseTerm: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  preferences: {
    maxPrice: number;
    minBedrooms: number;
    preferredLocations: string[];
    petFriendly?: boolean;
    furnished?: boolean;
  };
  savedProperties: string[];
  createdAt: string;
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  furnished?: boolean;
  petFriendly?: boolean;
  parking?: boolean;
}