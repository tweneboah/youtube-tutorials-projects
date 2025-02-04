import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiUser, HiBookmark, HiCog, HiLogout } from "react-icons/hi";
import SavedJobsPage from "./SavedJobsPage";

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setError("Failed to log out");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: HiUser },
    { id: "saved", label: "Saved Jobs", icon: HiBookmark },
    { id: "settings", label: "Settings", icon: HiCog },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                {currentUser?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentUser?.email}
                </h2>
                <p className="text-sm text-gray-500">Member since 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } flex items-center px-1 py-4 border-b-2 font-medium text-sm`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "profile" && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">
                    Account Information
                  </h3>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">
                      Email: {currentUser?.email}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <HiLogout className="mr-2 h-5 w-5" />
                  Log Out
                </motion.button>
              </div>
            )}

            {activeTab === "saved" && <SavedJobsPage />}

            {activeTab === "settings" && (
              <div className="text-center py-8 text-gray-500">
                Settings coming soon...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
