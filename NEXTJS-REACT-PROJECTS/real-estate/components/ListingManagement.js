"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PropertyCard from "./PropertyCard";

export default function ListingManagement() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/properties/my-listings", {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Failed to fetch listings");
      }

      console.log("Fetched listings:", data);
      setListings(data.properties || []);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      setError(
        error.message || "Failed to load listings. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (propertyId) => {
    if (!confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Failed to delete property");
      }

      // Remove the deleted property from the state
      setListings(listings.filter((prop) => prop._id !== propertyId));
    } catch (err) {
      console.error("Error deleting property:", err);
      alert(err.message);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading your listings...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {error}
        <button
          onClick={fetchListings}
          className="ml-4 text-blue-500 hover:text-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="text-center py-4">
        <p>You haven't created any listings yet.</p>
        <Link
          href="/properties/add"
          className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
        >
          Create Your First Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <div key={listing._id} className="relative">
          <PropertyCard property={listing} />
          <div className="absolute top-2 right-2 flex space-x-2">
            <Link
              href={`/properties/${listing._id}/edit`}
              className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
              title="Edit listing"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </Link>
            <button
              onClick={() => handleDelete(listing._id)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              title="Delete listing"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
