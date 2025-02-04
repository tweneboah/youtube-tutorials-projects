import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import JobDetailsModal from "./JobDetailsModal";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  HiLocationMarker,
  HiCurrencyPound,
  HiBriefcase,
  HiClock,
  HiCalendar,
  HiOfficeBuilding,
  HiExternalLink,
  HiLockClosed,
} from "react-icons/hi";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";

const JobCard = ({ job }) => {
  const {
    id,
    title,
    description,
    redirect_url,
    company = {},
    location = {},
    salary_min,
    salary_max,
    created,
    contract_time,
  } = job || {};

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatSalary = (min, max) => {
    if (!min && !max) return "Salary not specified";
    if (!max) return `£${min.toLocaleString()}+`;
    if (!min) return `Up to £${max.toLocaleString()}`;
    return `£${min.toLocaleString()} - £${max.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified";

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Date not specified";
      }

      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date not specified";
    }
  };

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!currentUser || !id) return;
      const savedJobRef = doc(db, "savedJobs", `${currentUser.uid}_${id}`);
      const savedJobDoc = await getDoc(savedJobRef);
      setIsSaved(savedJobDoc.exists());
    };
    checkIfSaved();
  }, [currentUser, id]);

  const handleSaveJob = async () => {
    if (!currentUser) {
      toast(
        (t) => (
          <div className="flex items-center justify-between gap-4 min-w-[320px]">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <HiLockClosed className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  Authentication required
                </h4>
                <p className="text-sm text-gray-600">
                  Sign in to save jobs to your profile
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/login");
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Sign in
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.dismiss(t.id)}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Maybe later
              </motion.button>
            </div>
          </div>
        ),
        {
          duration: 6000,
          position: "bottom-center",
          style: {
            background: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #E5E7EB",
            maxWidth: "none",
          },
        }
      );
      return;
    }

    setLoading(true);
    try {
      const savedJobRef = doc(db, "savedJobs", `${currentUser.uid}_${id}`);

      if (isSaved) {
        await deleteDoc(savedJobRef);
        setIsSaved(false);
        toast.success("Job removed from saved jobs", {
          icon: "🗑️",
          position: "bottom-center",
        });
      } else {
        await setDoc(savedJobRef, {
          userId: currentUser.uid,
          jobId: id,
          title,
          company: company.display_name,
          location: location.display_name,
          salary_min,
          salary_max,
          description,
          redirect_url,
          created,
          contract_time,
          savedAt: new Date().toISOString(),
        });
        setIsSaved(true);
        toast.success("Job saved successfully", {
          icon: "💼",
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!job) return null;

  return (
    <>
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#050b2c]/10 hover:border-[#ffa509] transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#050b2c] to-[#0a1854] p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-white line-clamp-2 flex-1 pr-4">
              {title || "No Title"}
            </h3>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${
                isSaved ? "text-[#ffa509]" : "text-white"
              } hover:text-[#ffa509] transition-colors duration-200`}
              onClick={handleSaveJob}
              disabled={loading}
            >
              {isSaved ? (
                <BsBookmarkHeartFill className="w-6 h-6" />
              ) : (
                <BsBookmarkHeart className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Company Info */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-[#ffa509]/10 rounded-lg flex items-center justify-center mr-3">
              <HiOfficeBuilding className="w-6 h-6 text-[#ffa509]" />
            </div>
            <div>
              <p className="font-medium text-[#050b2c]">
                {company.display_name || "Company not specified"}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <HiLocationMarker className="w-4 h-4 mr-1 text-[#ffa509]" />
                <span>{location.display_name || "Location not specified"}</span>
              </div>
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-600 bg-[#050b2c]/5 p-2 rounded-lg">
              <HiCurrencyPound className="w-5 h-5 mr-2 text-[#ffa509]" />
              <span className="text-sm">
                {formatSalary(salary_min, salary_max)}
              </span>
            </div>
            <div className="flex items-center text-gray-600 bg-[#050b2c]/5 p-2 rounded-lg">
              <HiClock className="w-5 h-5 mr-2 text-[#ffa509]" />
              <span className="text-sm capitalize">
                {contract_time || "Not specified"}
              </span>
            </div>
            <div className="flex items-center text-gray-600 bg-[#050b2c]/5 p-2 rounded-lg">
              <HiBriefcase className="w-5 h-5 mr-2 text-[#ffa509]" />
              <span className="text-sm">Full Time</span>
            </div>
            <div className="flex items-center text-gray-600 bg-[#050b2c]/5 p-2 rounded-lg">
              <HiCalendar className="w-5 h-5 mr-2 text-[#ffa509]" />
              <span className="text-sm">
                {created ? formatDate(created) : "Date not specified"}
              </span>
            </div>
          </div>

          {/* Description Preview */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {description || "No description available"}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="flex-1 py-2 px-4 bg-[#050b2c] hover:bg-[#0a1854] text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <IoEyeOutline className="w-5 h-5" />
              View Details
            </motion.button>
            <motion.a
              href={redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 bg-[#ffa509] hover:bg-[#e69408] text-[#050b2c] rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiExternalLink className="w-5 h-5" />
              Apply Now
            </motion.a>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <JobDetailsModal
          job={job}
          onClose={() => setShowModal(false)}
          isSaved={isSaved}
          onSave={handleSaveJob}
        />
      )}
    </>
  );
};

export default JobCard;
