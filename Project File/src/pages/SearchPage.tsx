import React, { useEffect, useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { SearchFilters } from '../components/SearchFilters';
import { usePropertyStore } from '../store/propertyStore';
import { useAuthStore } from '../store/authStore';
import { SearchFilters as SearchFiltersType } from '../types';
import { Loader2 } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { 
    filteredProperties, 
    loading, 
    searchFilters, 
    fetchProperties, 
    searchProperties 
  } = usePropertyStore();
  
  const { user, updateUser } = useAuthStore();
  const [filters, setFilters] = useState<SearchFiltersType>({});

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleSearch = () => {
    searchProperties(filters);
  };

  const handleSaveProperty = (propertyId: string) => {
    if (!user) return;
    
    const savedProperties = user.savedProperties || [];
    const isAlreadySaved = savedProperties.includes(propertyId);
    
    const updatedSavedProperties = isAlreadySaved
      ? savedProperties.filter(id => id !== propertyId)
      : [...savedProperties, propertyId];
    
    updateUser({ savedProperties: updatedSavedProperties });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Home
          </h1>
          <p className="text-gray-600">
            Discover {filteredProperties.length} available properties
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-8">
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
          />
        </div>

        {/* Results */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No properties found matching your criteria.
            </p>
            <p className="text-gray-500 mt-2">
              Try adjusting your search filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSave={handleSaveProperty}
                isSaved={user?.savedProperties?.includes(property.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};