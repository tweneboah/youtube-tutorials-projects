"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Alert from "@/components/ui/Alert";
import Slider from "react-slick";
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser } from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";

// Import slick carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function PropertyDetailsClient({ initialProperty }) {
  const router = useRouter();
  const { user } = useAuth();
  const [property, setProperty] = useState(initialProperty);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showFullscreenSlider, setShowFullscreenSlider] = useState(false);

  const isOwner = user && property.owner && user._id === (typeof property.owner === "string" ? property.owner : property.owner._id);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      setDeleteLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(`/api/properties/${property._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token"); // Clear invalid token
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Failed to delete property");
      }

      // Success - redirect to properties page
      router.refresh(); // Refresh the current route
      router.push("/properties");
    } catch (error) {
      console.error("Error deleting property:", error);
      setError(error.message || "Error deleting property");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEnquiry = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    try {
      setSending(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          propertyId: property._id,
          recipientId: property.owner._id,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Failed to send enquiry");
      }

      setMessage("");
      setEnquirySent(true);
    } catch (error) {
      console.error("Error sending enquiry:", error);
      setError(error.message || "Error sending enquiry");
    } finally {
      setSending(false);
    }
  };

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert type="error" message="Property not found" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError("")}
            className="mb-4"
          />
        )}

        {/* Property Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#050b2c] mb-4">{property.title}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-[#ffa509]" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
              <div className="relative cursor-pointer" onClick={() => setShowFullscreenSlider(true)}>
                <Slider {...sliderSettings} className="property-slider">
                  {property.images?.map((image, index) => (
                    <div key={index} className="relative aspect-[16/9]">
                      <Image
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-[20px] shadow-lg p-6 space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <FaBed className="text-[#ffa509] text-2xl mb-2" />
                  <span className="text-2xl font-bold text-[#050b2c]">{property.features.bedrooms}</span>
                  <span className="text-gray-600">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <FaBath className="text-[#ffa509] text-2xl mb-2" />
                  <span className="text-2xl font-bold text-[#050b2c]">{property.features.bathrooms}</span>
                  <span className="text-gray-600">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <FaRuler className="text-[#ffa509] text-2xl mb-2" />
                  <span className="text-2xl font-bold text-[#050b2c]">{property.features.area}</span>
                  <span className="text-gray-600">Sq Ft</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BiBuildingHouse className="text-[#ffa509]" />
                  <span className="font-medium">Type:</span>
                  <span>{property.propertyType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#ffa509]">
                    ${property.price?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-xl font-bold text-[#050b2c] mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex gap-4">
                <Link
                  href={`/properties/${property._id}/edit`}
                  className="flex-1 bg-[#050b2c] text-white px-6 py-3 rounded-xl text-center font-medium hover:bg-[#0a1854] transition-colors"
                >
                  Edit Property
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {deleteLoading ? <LoadingSpinner /> : "Delete Property"}
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] shadow-lg p-6 sticky top-8">
              {/* Owner Info */}
              {property.owner && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-[#050b2c] mb-4">Property Owner</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaUser className="text-[#ffa509]" />
                      <span>{property.owner.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-[#ffa509]" />
                      <span>{property.owner.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-[#ffa509]" />
                      <span>{property.owner.email}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Enquiry Form */}
              {!isOwner && (
                <div>
                  <h3 className="text-xl font-bold text-[#050b2c] mb-4">Send Enquiry</h3>
                  {!user ? (
                    <div className="text-center py-6">
                      <p className="text-gray-600 mb-4">Please sign in to send enquiries to the property owner</p>
                      <Link 
                        href="/login" 
                        className="inline-block bg-gradient-to-r from-[#050b2c] to-[#0a1854] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                      >
                        Sign In
                      </Link>
                    </div>
                  ) : enquirySent ? (
                    <div className="bg-green-50 text-green-800 rounded-xl p-4">
                      Your enquiry has been sent successfully!
                    </div>
                  ) : (
                    <form onSubmit={handleEnquiry} className="space-y-4">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message..."
                        rows="4"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ffa509] focus:ring-2 focus:ring-[#ffa509]/20 outline-none transition-colors resize-none"
                        required
                      />
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-gradient-to-r from-[#050b2c] to-[#0a1854] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                      >
                        {sending ? <LoadingSpinner /> : "Send Message"}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Carousel Modal */}
      {showFullscreenSlider && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowFullscreenSlider(false)}
            className="absolute top-6 right-6 text-white/90 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-5xl">
            <Slider {...sliderSettings} className="full-screen-slider">
              {property.images?.map((image, index) => (
                <div key={index} className="relative h-[75vh]">
                  <Image
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
}
