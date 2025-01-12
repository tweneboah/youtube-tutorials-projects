"use client";

import { useState } from "react";
import DashboardTabs from "@/components/DashboardTabs";
import ListingManagement from "@/components/ListingManagement";
import EnquiryManagement from "@/components/EnquiryManagement";
import { BiBuildingHouse } from "react-icons/bi";
import { FaHome, FaEnvelope } from "react-icons/fa";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#050b2c] to-[#1a237e] text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#ffa509] p-3 rounded-xl">
              <BiBuildingHouse className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>

          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-[#050b2c] to-[#1a237e] text-white p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <FaHome className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium opacity-90">
                    Your Listings
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#ffa509] to-[#ff9100] text-white p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <FaEnvelope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium opacity-90">
                    New Enquiries
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "listings" ? (
              <ListingManagement />
            ) : (
              <EnquiryManagement />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
