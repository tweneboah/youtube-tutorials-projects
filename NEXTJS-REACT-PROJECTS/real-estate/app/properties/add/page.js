'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaLock, FaSignInAlt, FaHome, FaUserPlus, FaBed, FaBath, FaRulerCombined, FaParking, FaCouch, FaMapMarkerAlt, FaMoneyBillWave, FaBuilding, FaUpload, FaTimes } from 'react-icons/fa';
import { MdTitle, MdDescription, MdLocationCity, MdHomeWork, MdRealEstateAgent } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';

export default function AddProperty() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    propertyType: 'House',
    features: {
      bedrooms: '',
      bathrooms: '',
      area: '',
      parking: false,
      furnished: false,
    },
    images: [],
    status: 'For Sale',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);

    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls(prevUrls => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prevUrls[index]);
      return prevUrls.filter((_, i) => i !== index);
    });
  };

  const uploadImages = async () => {
    try {
      const uploadedUrls = await Promise.all(
        selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);

          const res = await fetch('/api/upload', {
            method: 'POST',
            credentials: 'include',
            body: formData,
          });

          const data = await res.json();
          
          if (!res.ok) {
            throw new Error(data.error || 'Upload failed');
          }
          
          return data.url;
        })
      );

      console.log('Uploaded image URLs:', uploadedUrls);
      return uploadedUrls;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error(error.message || 'Error uploading images');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) {
        throw new Error('You must be logged in to create a property');
      }

      // First upload images if any are selected
      let imageUrls = formData.images;
      if (selectedFiles.length > 0) {
        try {
          imageUrls = await uploadImages();
        } catch (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
      }

      // Create property with image URLs
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          images: imageUrls,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create property');
      }

      console.log('Property created successfully:', data.property);

      // Clean up preview URLs
      previewUrls.forEach(url => URL.revokeObjectURL(url));

      router.push('/properties');
    } catch (error) {
      console.error('Error creating property:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const sampleProperties = {
    luxury: {
      title: 'Luxury Beachfront Villa',
      description: 'Beautiful beachfront villa with stunning ocean views. This modern property features high-end finishes, an infinity pool, and direct beach access. Perfect for those seeking a luxurious coastal lifestyle.',
      price: '1250000',
      location: 'Miami Beach, Florida',
      propertyType: 'House',
      features: {
        bedrooms: '4',
        bathrooms: '3.5',
        area: '3500',
        parking: true,
        furnished: true,
      },
      images: ['https://placehold.co/800x600/e2e8f0/1e293b.png?text=Luxury+Villa'],
      status: 'For Sale',
      address: {
        street: '123 Ocean Drive',
        city: 'Miami Beach',
        state: 'Florida',
        zipCode: '33139',
        country: 'United States',
      },
    },
    apartment: {
      title: 'Modern Downtown Apartment',
      description: 'Stylish urban apartment in the heart of downtown. Features modern amenities, open-concept living space, and spectacular city views. Walking distance to restaurants, shops, and public transit.',
      price: '450000',
      location: 'Downtown Chicago',
      propertyType: 'Apartment',
      features: {
        bedrooms: '2',
        bathrooms: '2',
        area: '1200',
        parking: true,
        furnished: false,
      },
      images: ['https://placehold.co/800x600/e2e8f0/1e293b.png?text=Modern+Apartment'],
      status: 'For Sale',
      address: {
        street: '456 City Center Ave',
        city: 'Chicago',
        state: 'Illinois',
        zipCode: '60601',
        country: 'United States',
      },
    },
    commercial: {
      title: 'Prime Retail Space',
      description: 'Prime commercial retail space in a high-traffic shopping district. Features large display windows, storage area, and modern utilities. Excellent opportunity for retail or restaurant business.',
      price: '850000',
      location: 'Seattle Business District',
      propertyType: 'Commercial',
      features: {
        bedrooms: '0',
        bathrooms: '2',
        area: '2500',
        parking: true,
        furnished: false,
      },
      images: ['https://placehold.co/800x600/e2e8f0/1e293b.png?text=Commercial+Space'],
      status: 'For Sale',
      address: {
        street: '789 Business Ave',
        city: 'Seattle',
        state: 'Washington',
        zipCode: '98101',
        country: 'United States',
      },
    },
  };

  const fillSampleData = (type) => {
    setFormData(sampleProperties[type]);
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-br from-[#050b2c] to-[#0a1854] flex items-center justify-center px-4 py-12">
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffa509]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffa509]/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-lg w-full backdrop-blur-lg bg-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
            {/* Icon and Title */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-[#ffa509]/20 p-4 rounded-xl">
                  <FaLock className="text-[#ffa509] w-12 h-12" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to List Your Property?
              </h1>
              <p className="text-gray-300 text-lg">
                Please login to start adding your property to our marketplace
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-[#ffa509] hover:bg-[#ff9100] text-[#050b2c] py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <FaSignInAlt className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Go to Login
              </button>
              
              <button
                onClick={() => router.push("/signup")}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <FaUserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Create an Account
              </button>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-[#ffa509]/20 p-2 rounded-lg">
                  <MdRealEstateAgent className="text-[#ffa509] w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Professional Listing</h3>
                  <p className="text-gray-300 text-sm">Showcase your property with high-quality listings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#ffa509]/20 p-2 rounded-lg">
                  <FaHome className="text-[#ffa509] w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Wide Reach</h3>
                  <p className="text-gray-300 text-sm">Connect with thousands of potential buyers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b2c] to-[#0a1854] py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <FaHome className="mr-3 text-[#ffa509]" />
            Add New Property
          </h1>
          <p className="text-gray-300">Fill in the details below to list your property</p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            type="button"
            onClick={() => fillSampleData('luxury')}
            className="px-6 py-3 bg-[#ffa509] text-[#050b2c] rounded-xl hover:bg-[#ff9100] transition-all duration-300 font-bold flex items-center gap-2"
          >
            <FaHome className="text-lg" />
            Fill Luxury Villa
          </button>
          <button
            type="button"
            onClick={() => fillSampleData('apartment')}
            className="px-6 py-3 bg-[#ffa509] text-[#050b2c] rounded-xl hover:bg-[#ff9100] transition-all duration-300 font-bold flex items-center gap-2"
          >
            <MdHomeWork className="text-lg" />
            Fill Apartment
          </button>
          <button
            type="button"
            onClick={() => fillSampleData('commercial')}
            className="px-6 py-3 bg-[#ffa509] text-[#050b2c] rounded-xl hover:bg-[#ff9100] transition-all duration-300 font-bold flex items-center gap-2"
          >
            <FaBuilding className="text-lg" />
            Fill Commercial
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {error && (
            <div className="bg-red-900/50 border-l-4 border-red-500 p-4 rounded-xl backdrop-blur-lg">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MdTitle className="mr-2 text-[#ffa509]" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <MdTitle className="mr-2 text-[#ffa509]" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors placeholder-gray-500"
                  placeholder="Enter property title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <MdDescription className="mr-2 text-[#ffa509]" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors placeholder-gray-500"
                  placeholder="Describe your property"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaMoneyBillWave className="mr-2 text-[#ffa509]" />
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors placeholder-gray-500"
                  placeholder="Enter price"
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaHome className="mr-2 text-[#ffa509]" />
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaBuilding className="mr-2 text-[#ffa509]" />
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaMoneyBillWave className="mr-2 text-[#ffa509]" />
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaHome className="mr-2 text-[#ffa509]" />
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaBed className="mr-2 text-[#ffa509]" />
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="features.bedrooms"
                  value={formData.features.bedrooms}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaBath className="mr-2 text-[#ffa509]" />
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="features.bathrooms"
                  value={formData.features.bathrooms}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaRulerCombined className="mr-2 text-[#ffa509]" />
                  Area (sqft)
                </label>
                <input
                  type="number"
                  name="features.area"
                  value={formData.features.area}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-white/5 rounded-xl p-4 border-2 border-[#ffa509]/20">
                <input
                  type="checkbox"
                  name="features.parking"
                  checked={formData.features.parking}
                  onChange={handleChange}
                  className="h-5 w-5 text-[#ffa509] focus:ring-[#ffa509] border-[#ffa509]/20 rounded"
                />
                <label className="ml-3 flex items-center text-gray-300">
                  <FaParking className="mr-2 text-[#ffa509]" />
                  Parking Available
                </label>
              </div>

              <div className="flex items-center bg-white/5 rounded-xl p-4 border-2 border-[#ffa509]/20">
                <input
                  type="checkbox"
                  name="features.furnished"
                  checked={formData.features.furnished}
                  onChange={handleChange}
                  className="h-5 w-5 text-[#ffa509] focus:ring-[#ffa509] border-[#ffa509]/20 rounded"
                />
                <label className="ml-3 flex items-center text-gray-300">
                  <FaCouch className="mr-2 text-[#ffa509]" />
                  Furnished
                </label>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-[#ffa509]" />
              Address
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-[#ffa509]" />
                  Street
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <MdLocationCity className="mr-2 text-[#ffa509]" />
                    City
                  </label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <MdLocationCity className="mr-2 text-[#ffa509]" />
                    State
                  </label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#ffa509]" />
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <BiWorld className="mr-2 text-[#ffa509]" />
                    Country
                  </label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl bg-white/5 border-2 border-[#ffa509]/20 text-white px-4 py-3 focus:outline-none focus:border-[#ffa509] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaUpload className="mr-2 text-[#ffa509]" />
              Property Images
            </h2>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#ffa509]/20 border-dashed rounded-xl bg-white/5">
              <div className="space-y-2 text-center">
                <FaUpload className="mx-auto h-12 w-12 text-[#ffa509]" />
                <div className="flex text-sm text-gray-300">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-xl bg-[#ffa509] px-4 py-2 text-[#050b2c] font-bold hover:bg-[#ff9100] transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-[#ffa509] focus-within:ring-offset-2"
                  >
                    <span>Select images</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={loading}
                    />
                  </label>
                  <p className="pl-3 pt-2">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            {/* Preview selected images */}
            {previewUrls.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={url}
                      alt={`Selected image ${index + 1}`}
                      width={200}
                      height={150}
                      className="object-cover rounded-xl border-2 border-[#ffa509]/20"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {loading && (
              <div className="mt-4 text-sm text-[#ffa509] flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading images...
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-[#ffa509] text-[#050b2c] rounded-xl font-bold hover:bg-[#ff9100] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaHome className="text-lg" />
              {loading ? 'Creating Property...' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
