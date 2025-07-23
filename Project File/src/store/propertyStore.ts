import { create } from 'zustand';
import { Property, SearchFilters } from '../types';

interface PropertyState {
  properties: Property[];
  filteredProperties: Property[];
  searchFilters: SearchFilters;
  loading: boolean;
  selectedProperty: Property | null;
  fetchProperties: () => Promise<void>;
  searchProperties: (filters: SearchFilters) => void;
  getPropertyById: (id: string) => Property | undefined;
  setSelectedProperty: (property: Property | null) => void;
}

// Mock data
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Beautiful modern apartment in the heart of downtown with stunning city views and premium amenities.',
    price: 2800,
    location: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'apartment',
      furnished: true,
      petFriendly: true,
      parking: true
    },
    amenities: ['Gym', 'Pool', 'Concierge', 'Rooftop Deck', 'In-unit Laundry'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'
    ],
    landlord: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 987-6543'
    },
    availability: {
      available: true,
      availableFrom: '2024-02-01',
      leaseTerm: '12 months'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Cozy Studio in Brooklyn',
    description: 'Charming studio apartment in trendy Brooklyn neighborhood with exposed brick and high ceilings.',
    price: 1800,
    location: {
      address: '456 Brooklyn Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      coordinates: { lat: 40.6892, lng: -73.9442 }
    },
    details: {
      bedrooms: 0,
      bathrooms: 1,
      area: 600,
      type: 'studio',
      furnished: false,
      petFriendly: false,
      parking: false
    },
    amenities: ['Exposed Brick', 'High Ceilings', 'Natural Light'],
    images: [
      'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg'
    ],
    landlord: {
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890'
    },
    availability: {
      available: true,
      availableFrom: '2024-01-20',
      leaseTerm: '6-12 months'
    },
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    title: 'Luxury Penthouse Suite',
    description: 'Stunning penthouse with panoramic city views, private terrace, and luxury finishes throughout.',
    price: 5500,
    location: {
      address: '789 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10021',
      coordinates: { lat: 40.7736, lng: -73.9566 }
    },
    details: {
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      type: 'apartment',
      furnished: true,
      petFriendly: true,
      parking: true
    },
    amenities: ['Private Terrace', 'City Views', 'Doorman', 'Gym', 'Wine Cellar'],
    images: [
      'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg',
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg',
      'https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg'
    ],
    landlord: {
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+1 (555) 321-0987'
    },
    availability: {
      available: true,
      availableFrom: '2024-03-01',
      leaseTerm: '12+ months'
    },
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z'
  }
];

export const usePropertyStore = create<PropertyState>((set, get) => ({
  properties: [],
  filteredProperties: [],
  searchFilters: {},
  loading: false,
  selectedProperty: null,

  fetchProperties: async () => {
    set({ loading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ 
      properties: mockProperties, 
      filteredProperties: mockProperties,
      loading: false 
    });
  },

  searchProperties: (filters: SearchFilters) => {
    const { properties } = get();
    let filtered = [...properties];

    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.city.toLowerCase().includes(filters.location!.toLowerCase()) ||
        property.location.address.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice!);
    }

    if (filters.bedrooms !== undefined) {
      filtered = filtered.filter(property => property.details.bedrooms >= filters.bedrooms!);
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property => property.details.type === filters.propertyType);
    }

    if (filters.furnished !== undefined) {
      filtered = filtered.filter(property => property.details.furnished === filters.furnished);
    }

    if (filters.petFriendly !== undefined) {
      filtered = filtered.filter(property => property.details.petFriendly === filters.petFriendly);
    }

    if (filters.parking !== undefined) {
      filtered = filtered.filter(property => property.details.parking === filters.parking);
    }

    set({ filteredProperties: filtered, searchFilters: filters });
  },

  getPropertyById: (id: string) => {
    return get().properties.find(property => property.id === id);
  },

  setSelectedProperty: (property: Property | null) => {
    set({ selectedProperty: property });
  },
}));