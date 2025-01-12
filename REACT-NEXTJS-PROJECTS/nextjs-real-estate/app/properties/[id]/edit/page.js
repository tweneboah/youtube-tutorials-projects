"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaHome, FaMoneyBillWave, FaMapMarkerAlt, FaBuilding, FaImage, FaAddressCard } from 'react-icons/fa';
import { MdTitle, MdDescription } from 'react-icons/md';

export default function EditProperty({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const propertyId = unwrappedParams.id;

  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    images: [],
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      router.push("/login");
      return;
    }
    if (propertyId) {
      fetchProperty();
    }
  }, [user, propertyId]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : null;
  };

  const fetchProperty = async () => {
    try {
      const headers = getAuthHeaders();
      if (!headers) {
        router.push("/login");
        return;
      }

      const response = await fetch(`/api/properties/${propertyId}`, {
        headers,
        credentials: "include",
      });

      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch property");
      }

      // Check if the user is the owner
      const propertyOwnerId = data.property.owner._id || data.property.owner;
      const isOwner =
        typeof propertyOwnerId === "string"
          ? propertyOwnerId === user?.id
          : propertyOwnerId.toString() === user?.id;

      if (!isOwner) {
        setError("You do not have permission to edit this property");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
        return;
      }

      // Set the form data
      setFormData({
        title: data.property.title,
        description: data.property.description,
        price: data.property.price,
        location: data.property.location,
        propertyType: data.property.propertyType,
        images: data.property.images || [],
        address: {
          street: data.property.address?.street || "",
          city: data.property.address?.city || "",
          state: data.property.address?.state || "",
          zipCode: data.property.address?.zipCode || "",
          country: data.property.address?.country || "",
        },
      });

      // Set preview URLs for existing images
      setPreviewUrls(data.property.images || []);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("Not authenticated")) {
        localStorage.removeItem("token");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const headers = getAuthHeaders();
      if (!headers) {
        router.push("/login");
        return;
      }

      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update property");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      if (err.message.includes("Not authenticated")) {
        localStorage.removeItem("token");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);

    // Upload images
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      setError("Error uploading images: " + error.message);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    // Revoke the preview URL to prevent memory leaks
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div className="text-center py-4">Loading property details...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b2c] to-[#0a1854] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-white/10 rounded-xl p-8 shadow-xl mb-8">
          <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <FaHome className="text-[#ffa509]" />
            Edit Property
          </h1>

          {error && (
            <div className="bg-red-500/20 backdrop-blur-lg border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="backdrop-blur-lg bg-white/5 rounded-lg p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-[#ffa509] mb-4">Basic Information</h2>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                  <MdTitle className="text-[#ffa509]" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                  placeholder="Enter property title"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                  <MdDescription className="text-[#ffa509]" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                  placeholder="Describe the property"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                  <FaMoneyBillWave className="text-[#ffa509]" />
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                  <FaMapMarkerAlt className="text-[#ffa509]" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                  <FaBuilding className="text-[#ffa509]" />
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                >
                  <option value="">Select a type</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>

            {/* Images Section */}
            <div className="backdrop-blur-lg bg-white/5 rounded-lg p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-[#ffa509] flex items-center gap-2 mb-4">
                <FaImage />
                Property Images
              </h2>

              <div className="mt-2">
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-[#ffa509] transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <FaImage className="mx-auto h-12 w-12 text-[#ffa509]" />
                    <div className="flex text-sm text-gray-200">
                      <label className="relative cursor-pointer hover:text-[#ffa509] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#ffa509]">
                        <span>Upload files</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address Section */}
            <div className="backdrop-blur-lg bg-white/5 rounded-lg p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-[#ffa509] flex items-center gap-2 mb-4">
                <FaAddressCard />
                Address Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                    placeholder="State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                    placeholder="ZIP Code"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-200 mb-2">Country</label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 focus:border-[#ffa509] focus:ring-[#ffa509] text-white placeholder-gray-400"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#ffa509] text-white hover:bg-[#ff9100] transition-colors duration-200"
              >
                Update Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
