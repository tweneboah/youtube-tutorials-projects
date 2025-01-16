"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function PropertyManagement() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProperties();
    }
  }, [user]);

  const fetchUserProperties = async () => {
    try {
      const response = await fetch("/api/properties/my-listings");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch properties");
      }

      setProperties(data.properties);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId) => {
    if (!confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete property");
      }

      // Remove the deleted property from the state
      setProperties(properties.filter((prop) => prop._id !== propertyId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading your properties...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Properties</h2>
        <Link
          href="/properties/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-center py-4">
          You haven't listed any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              {property.images && property.images[0] && (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <p className="text-green-600 font-bold mb-4">
                  ${property.price.toLocaleString()}
                </p>

                <div className="flex justify-between items-center">
                  <Link
                    href={`/properties/${property._id}/edit`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
