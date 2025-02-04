import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import JobCard from "../components/JobCard";
import { motion } from "framer-motion";
import { HiBookmark, HiOutlineLogin } from "react-icons/hi";
import { Link } from "react-router-dom";

const SavedJobsPage = () => {
  const { currentUser } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!currentUser) {
        setSavedJobs([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "savedJobs"),
          where("userId", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const jobs = querySnapshot.docs.map((doc) => ({
          id: doc.id.split("_")[1],
          ...doc.data(),
        }));

        setSavedJobs(jobs);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        setError("Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <HiOutlineLogin className="mx-auto h-16 w-16 text-blue-500" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Sign in to view saved jobs
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Keep track of your favorite job opportunities
          </p>
          <Link
            to="/login"
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <HiBookmark className="h-12 w-12 text-blue-500" />
          </motion.div>
          <p className="mt-4 text-lg font-medium text-gray-600">
            Loading saved jobs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Saved Jobs</h2>
            <p className="mt-1 text-sm text-gray-500">
              {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>

        {savedJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <HiBookmark className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No saved jobs yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start saving jobs you're interested in
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobsPage;
