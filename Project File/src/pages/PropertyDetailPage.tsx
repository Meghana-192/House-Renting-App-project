import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Phone, 
  Mail, 
  Heart,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';
import { usePropertyStore } from '../store/propertyStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById, fetchProperties } = usePropertyStore();
  const { user, updateUser } = useAuthStore();
  
  const property = id ? getPropertyById(id) : null;

  useEffect(() => {
    if (!property) {
      fetchProperties();
    }
  }, [property, fetchProperties]);

  const handleSaveProperty = () => {
    if (!user || !property) return;
    
    const savedProperties = user.savedProperties || [];
    const isAlreadySaved = savedProperties.includes(property.id);
    
    const updatedSavedProperties = isAlreadySaved
      ? savedProperties.filter(id => id !== property.id)
      : [...savedProperties, property.id];
    
    updateUser({ savedProperties: updatedSavedProperties });
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Property not found</p>
          <Link to="/search" className="text-blue-600 hover:underline mt-2 block">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = user?.savedProperties?.includes(property.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/search" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl"
                />
                <div className="grid grid-cols-2 gap-4">
                  {property.images.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-32 md:h-38 object-cover rounded-xl"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Property Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>
                      {property.location.address}, {property.location.city}, {property.location.state}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${property.price.toLocaleString()}/month
                  </div>
                  <button
                    onClick={handleSaveProperty}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isSaved
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                    <span>{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bed className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-semibold">{property.details.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-semibold">{property.details.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-semibold">{property.details.area}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <div className="font-semibold">{property.availability.leaseTerm}</div>
                  <div className="text-sm text-gray-600">Lease Term</div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  {property.details.furnished ? (
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <span>Furnished</span>
                </div>
                <div className="flex items-center">
                  {property.details.petFriendly ? (
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <span>Pet Friendly</span>
                </div>
                <div className="flex items-center">
                  {property.details.parking ? (
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 mr-2" />
                  )}
                  <span>Parking</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Landlord</h3>
              
              <div className="mb-6">
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {property.landlord.name}
                </div>
                <div className="space-y-3">
                  <a
                    href={`tel:${property.landlord.phone}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-3" />
                    {property.landlord.phone}
                  </a>
                  <a
                    href={`mailto:${property.landlord.email}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-3" />
                    {property.landlord.email}
                  </a>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
                <div className="text-gray-600">
                  <div className="flex justify-between mb-1">
                    <span>Available from:</span>
                    <span>{new Date(property.availability.availableFrom).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lease term:</span>
                    <span>{property.availability.leaseTerm}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contact Landlord
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};