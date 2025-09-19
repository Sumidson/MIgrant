"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar';
import { 
  MapPin,
  Navigation,
  Phone,
  Clock,
  Star,
  Syringe,
  Building,
  Search,
  Filter,
  Route,
  AlertCircle,
  CheckCircle,
  Loader,
  Calendar,
  Shield,
  Heart
} from 'lucide-react';

interface HealthCenter {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  availableVaccines: string[];
  services: string[];
  workingHours: string;
  rating: number;
  reviews: number;
  type: 'Government Hospital' | 'Private Hospital' | 'Primary Health Center' | 'Community Health Center';
  image: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

export default function FindNearestCentersPage() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearestCenters, setNearestCenters] = useState<(HealthCenter & { distance: number })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const healthCenters: HealthCenter[] = [
    {
      id: 'kochi-general',
      name: 'Kochi General Hospital',
      address: 'Marine Drive, Ernakulam, Kochi - 682031',
      latitude: 9.959718,
      longitude: 76.273442,
      phone: '+91 484 2668171',
      email: 'info@kochigeneral.gov.in',
      availableVaccines: ['COVID-19', 'Influenza', 'Hepatitis B', 'Tetanus', 'Typhoid'],
      services: ['Vaccination', 'General Consultation', 'Emergency Care', 'Pharmacy'],
      workingHours: '24/7',
      rating: 4.8,
      reviews: 2847,
      type: 'Government Hospital',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'trivandrum-medical',
      name: 'Thiruvananthapuram Medical Center',
      address: 'Medical College Road, Thiruvananthapuram - 695011',
      latitude: 8.509418,
      longitude: 76.949582,
      phone: '+91 471 2448212',
      email: 'contact@trvmedical.org',
      availableVaccines: ['COVID-19', 'Influenza', 'Typhoid', 'Hepatitis A', 'Japanese Encephalitis'],
      services: ['Vaccination', 'Specialist Consultation', 'Laboratory Services', 'Radiology'],
      workingHours: '8:00 AM - 8:00 PM',
      rating: 4.6,
      reviews: 1923,
      type: 'Private Hospital',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'alappuzha-district',
      name: 'Alappuzha District Hospital',
      address: 'CSMH Road, Alappuzha - 688013',
      latitude: 9.489983,
      longitude: 76.337983,
      phone: '+91 477 2251056',
      email: 'admin@alappuzhahealth.gov.in',
      availableVaccines: ['COVID-19', 'Tetanus', 'Hepatitis B', 'Polio'],
      services: ['Vaccination', 'Maternity Care', 'Pediatrics', 'General Medicine'],
      workingHours: '7:00 AM - 9:00 PM',
      rating: 4.4,
      reviews: 1456,
      type: 'Government Hospital',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'kozhikode-health',
      name: 'Kozhikode Health Clinic',
      address: 'Mavoor Road, Kozhikode - 673004',
      latitude: 11.258753,
      longitude: 75.780411,
      phone: '+91 495 2721201',
      email: 'info@kozhikodehealth.com',
      availableVaccines: ['COVID-19', 'Influenza', 'Typhoid', 'Tetanus', 'Hepatitis A'],
      services: ['Vaccination', 'Health Checkups', 'Diagnostics', 'Consultation'],
      workingHours: '9:00 AM - 6:00 PM',
      rating: 4.7,
      reviews: 987,
      type: 'Private Hospital',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'thrissur-phc',
      name: 'Thrissur Primary Health Center',
      address: 'Round Road, Thrissur - 680001',
      latitude: 10.527212,
      longitude: 76.214143,
      phone: '+91 487 2320456',
      email: 'thrissurphc@kerala.gov.in',
      availableVaccines: ['COVID-19', 'Hepatitis B', 'Tetanus', 'DPT'],
      services: ['Vaccination', 'Basic Health Services', 'Maternal Care', 'Child Health'],
      workingHours: '8:00 AM - 5:00 PM',
      rating: 4.2,
      reviews: 634,
      type: 'Primary Health Center',
      image: '/api/placeholder/400/200'
    },
    {
      id: 'kannur-community',
      name: 'Kannur Community Health Center',
      address: 'Civil Station Road, Kannur - 670002',
      latitude: 11.868271,
      longitude: 75.354691,
      phone: '+91 497 2706789',
      email: 'kannurchc@health.kerala.gov.in',
      availableVaccines: ['COVID-19', 'Influenza', 'Hepatitis B', 'Typhoid'],
      services: ['Vaccination', 'Community Health', 'Preventive Care', 'Health Education'],
      workingHours: '8:00 AM - 6:00 PM',
      rating: 4.3,
      reviews: 789,
      type: 'Community Health Center',
      image: '/api/placeholder/400/200'
    }
  ];

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location. Please enable location services.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  useEffect(() => {
    if (userLocation) {
      const centersWithDistance = healthCenters.map(center => ({
        ...center,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          center.latitude,
          center.longitude
        )
      }));

      centersWithDistance.sort((a, b) => a.distance - b.distance);
      setNearestCenters(centersWithDistance);
    }
  }, [userLocation]);

  const filteredCenters = nearestCenters.filter(center => {
    const matchesFilter = selectedFilter === 'all' || center.type === selectedFilter;
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          center.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Government Hospital': return 'bg-blue-100 text-blue-800';
      case 'Private Hospital': return 'bg-slate-100 text-slate-800';
      case 'Primary Health Center': return 'bg-emerald-100 text-emerald-800';
      case 'Community Health Center': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 font-['Inter',system-ui,sans-serif]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-6 lg:px-8 py-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl shadow-md mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Find Nearest Health Centers</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Locate vaccination and healthcare centers near your location across Kerala
            </p>
          </motion.div>

          {/* Location Access Section */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-md border border-slate-200 p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Get Your Location</h2>
              <p className="text-slate-600 mb-6">
                Allow location access to find the nearest healthcare centers based on your current position
              </p>
              
              {!userLocation && !loading && (
                <motion.button
                  onClick={getCurrentLocation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  Use My Current Location
                </motion.button>
              )}

              {loading && (
                <div className="flex items-center justify-center">
                  <Loader className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                  <span className="text-slate-600">Getting your location...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center text-rose-700">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>{error}</span>
                </div>
              )}

              {userLocation && (
                <div className="flex items-center justify-center text-emerald-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Location found! Showing nearest centers below.</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Search and Filter Section */}
          {userLocation && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search centers by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                  >
                    <option value="all">All Centers</option>
                    <option value="Government Hospital">Government Hospitals</option>
                    <option value="Private Hospital">Private Hospitals</option>
                    <option value="Primary Health Center">Primary Health Centers</option>
                    <option value="Community Health Center">Community Health Centers</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Centers List */}
          {userLocation && (
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Nearest Health Centers ({filteredCenters.length})
                </h2>
                <p className="text-slate-600">Sorted by distance from your location</p>
              </div>

              <div className="space-y-6">
                {filteredCenters.map((center, index) => (
                  <motion.div
                    key={center.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center border border-slate-200">
                            <Building className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{center.name}</h3>
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(center.type)}`}>
                                {center.type}
                              </span>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-amber-500 mr-1" />
                                <span className="font-medium text-slate-800">{center.rating}</span>
                                <span className="text-slate-600 text-sm ml-1">({center.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {center.distance.toFixed(1)} km
                          </div>
                          <div className="text-sm text-slate-600">away</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <MapPin className="w-5 h-5 text-slate-600 mr-3 mt-0.5" />
                            <div>
                              <p className="font-medium text-slate-800">Address</p>
                              <p className="text-slate-600">{center.address}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 text-slate-600 mr-3" />
                            <div>
                              <p className="font-medium text-slate-800">Phone</p>
                              <p className="text-slate-600">{center.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-slate-600 mr-3" />
                            <div>
                              <p className="font-medium text-slate-800">Working Hours</p>
                              <p className="text-slate-600">{center.workingHours}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <Syringe className="w-5 h-5 text-emerald-600 mr-2" />
                              <p className="font-medium text-slate-800">Available Vaccines</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {center.availableVaccines.map((vaccine) => (
                                <span key={vaccine} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                                  {vaccine}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center mb-2">
                              <Heart className="w-5 h-5 text-slate-600 mr-2" />
                              <p className="font-medium text-slate-800">Services</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {center.services.map((service) => (
                                <span key={service} className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-xs font-medium border border-slate-300">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-slate-200">
                        <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm">
                          <Route className="w-4 h-4 mr-2" />
                          Get Directions
                        </button>
                        <button className="flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold shadow-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </button>
                        <button className="flex items-center justify-center px-6 py-3 border border-blue-300 text-blue-700 rounded-xl hover:bg-blue-50 transition-colors font-semibold">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredCenters.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Centers Found</h3>
                  <p className="text-slate-600">Try adjusting your search terms or filter options.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Default State - No Location */}
          {!userLocation && !loading && (
            <motion.div variants={itemVariants} className="text-center py-16">
              <MapPin className="w-24 h-24 text-blue-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to Find Centers?</h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Click &ldquo;Use My Current Location&rdquo; above to discover healthcare centers near you,
                sorted by distance and equipped with the services you need.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-200">
                    <Navigation className="w-6 h-6 text-blue-700" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">Find Nearby</h4>
                  <p className="text-sm text-slate-600">Get centers sorted by distance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                    <Syringe className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">Check Services</h4>
                  <p className="text-sm text-slate-600">View available vaccines & services</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-200">
                    <Calendar className="w-6 h-6 text-slate-700" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">Book Directly</h4>
                  <p className="text-sm text-slate-600">Schedule appointments easily</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}