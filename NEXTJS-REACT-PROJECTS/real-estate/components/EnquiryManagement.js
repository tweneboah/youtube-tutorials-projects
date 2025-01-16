"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { FaInbox, FaPaperPlane, FaClock, FaCheck, FaArchive, FaEnvelope, FaPhone, FaCalendarAlt, FaExclamationCircle, FaReply } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

// Valid status values - must match the model
const VALID_STATUSES = {
  PENDING: "pending",
  RESOLVED: "resolved",
  ARCHIVED: "archived",
  CANCELLED: "cancelled",
  REJECTED: "rejected",
  APPROVED: "approved",
};

export default function EnquiryManagement() {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState({ received: [], sent: [] });
  const [activeTab, setActiveTab] = useState("received");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnquiries();
    }
  }, [user]);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/enquiries/my-enquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      }
    } catch (error) {
      console.error("Failed to fetch enquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (enquiryId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/enquiries/${enquiryId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      // Refresh enquiries after successful update
      await fetchEnquiries();
    } catch (error) {
      console.error("Failed to update enquiry status:", error);
      // You could add a toast notification here
    }
  };

  // Status display helper
  const getStatusDisplay = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case VALID_STATUSES.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case VALID_STATUSES.CONTACTED:
        return "bg-blue-100 text-blue-800";
      case VALID_STATUSES.RESOLVED:
        return "bg-green-100 text-green-800";
      case VALID_STATUSES.ARCHIVED:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const displayEnquiries =
    activeTab === "received" ? enquiries.received : enquiries.sent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b2c] to-[#0a1854] py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-4xl font-bold text-white flex items-center">
              <FaInbox className="mr-3 text-[#ffa509]" /> 
              Enquiries Dashboard
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("received")}
                className={`px-6 py-3 rounded-xl flex items-center transition-all duration-300 ${
                  activeTab === "received"
                    ? "bg-[#ffa509] text-[#050b2c] shadow-lg transform scale-105 font-bold"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <FaInbox className="mr-2" />
                Received ({enquiries.received?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab("sent")}
                className={`px-6 py-3 rounded-xl flex items-center transition-all duration-300 ${
                  activeTab === "sent"
                    ? "bg-[#ffa509] text-[#050b2c] shadow-lg transform scale-105 font-bold"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <FaPaperPlane className="mr-2" />
                Sent ({enquiries.sent?.length || 0})
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {displayEnquiries?.length > 0 ? (
            displayEnquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transition-transform duration-300 hover:transform hover:scale-[1.01] border border-white/10"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-40 h-40 relative flex-shrink-0">
                    <Image
                      src={enquiry.property?.images?.[0] || "/placeholder.jpg"}
                      alt={enquiry.property?.title || "Property"}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex-grow w-full text-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <Link
                          href={`/properties/${enquiry.property?._id}`}
                          className="text-2xl font-bold text-[#ffa509] hover:text-[#ff9100] transition-colors duration-300"
                        >
                          {enquiry.property?.title}
                        </Link>
                        <p className="text-gray-300 flex items-center mt-2">
                          <FaCalendarAlt className="mr-2 text-[#ffa509]" />
                          {new Date(enquiry.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {activeTab === "received" && (
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusUpdate(enquiry._id, e.target.value)}
                          className="bg-[#050b2c] text-white border-2 border-[#ffa509] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ffa509]"
                        >
                          <option value={VALID_STATUSES.PENDING}>⏳ Pending</option>
                          <option value={VALID_STATUSES.CONTACTED}>📞 Contacted</option>
                          <option value={VALID_STATUSES.RESOLVED}>✅ Resolved</option>
                          <option value={VALID_STATUSES.ARCHIVED}>📁 Archived</option>
                        </select>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <p className="text-gray-300 flex items-center">
                          <FaEnvelope className="mr-2 text-[#ffa509]" />
                          <span className="font-semibold">From: </span>
                          <span className="ml-2">
                            {activeTab === "received" ? enquiry.sender?.name : user?.name}
                          </span>
                        </p>
                        <p className="text-gray-300 flex items-center">
                          <MdEmail className="mr-2 text-[#ffa509]" />
                          <span className="font-semibold">Email: </span>
                          <span className="ml-2">
                            {activeTab === "received" ? enquiry.sender?.email : user?.email}
                          </span>
                        </p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-gray-300 flex items-center">
                          <FaPhone className="mr-2 text-[#ffa509]" />
                          <span className="font-semibold">Phone: </span>
                          <span className="ml-2">{enquiry.phone || "N/A"}</span>
                        </p>
                        <div className="flex items-center">
                          <div className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${
                            enquiry.status === VALID_STATUSES.PENDING
                              ? "bg-yellow-500/20 text-yellow-300"
                              : enquiry.status === VALID_STATUSES.RESOLVED
                              ? "bg-green-500/20 text-green-300"
                              : enquiry.status === VALID_STATUSES.ARCHIVED
                              ? "bg-gray-500/20 text-gray-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}>
                            {enquiry.status === VALID_STATUSES.PENDING && <FaClock className="mr-2" />}
                            {enquiry.status === VALID_STATUSES.RESOLVED && <FaCheck className="mr-2" />}
                            {enquiry.status === VALID_STATUSES.ARCHIVED && <FaArchive className="mr-2" />}
                            {getStatusDisplay(enquiry.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#050b2c]/50 rounded-xl p-4">
                      <p className="text-gray-300 flex items-center mb-3">
                        <FaExclamationCircle className="mr-2 text-[#ffa509]" />
                        <span className="font-semibold">Message:</span>
                      </p>
                      <p className="text-gray-300 ml-6">{enquiry.message}</p>
                    </div>

                    {activeTab === "received" && (
                      <div className="mt-4 flex justify-end">
                        <Link
                          href={`mailto:${enquiry.sender?.email}`}
                          className="bg-[#ffa509] text-[#050b2c] px-4 py-2 rounded-xl font-bold hover:bg-[#ff9100] transition-colors flex items-center gap-2"
                        >
                          <FaReply />
                          Reply via Email
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white/10 backdrop-blur-lg rounded-2xl">
              <FaInbox className="mx-auto text-6xl text-[#ffa509] mb-4" />
              <p className="text-2xl text-white">No enquiries found</p>
              <p className="text-gray-300 mt-2">Your {activeTab} enquiries will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
