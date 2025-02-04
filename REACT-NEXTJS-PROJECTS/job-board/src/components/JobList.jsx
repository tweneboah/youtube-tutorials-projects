import React from "react";
import JobCard from "./JobCard";
import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { MdOutlineSearchOff } from "react-icons/md";

const JobList = ({ jobs, loading, error }) => {
  console.log("Jobs received:", jobs);
  console.log("Loading:", loading);
  console.log("Error:", error);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-red-50 rounded-xl p-6">
        <BiError className="w-20 h-20 text-red-500" />
        <p className="mt-6 text-xl font-medium text-gray-800">
          Oops! Something went wrong
        </p>
        <p className="mt-2 text-red-500 text-center max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-gray-50 rounded-xl">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaBriefcase className="w-16 h-16 text-blue-500" />
        </motion.div>
        <p className="mt-6 text-xl font-medium text-gray-700">
          Finding amazing opportunities...
        </p>
        <p className="mt-2 text-gray-500">This won't take long</p>
      </div>
    );
  }

  // Make sure we have jobs data
  if (!jobs || !Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-gray-50 rounded-xl">
        <MdOutlineSearchOff className="w-20 h-20 text-gray-400" />
        <p className="mt-6 text-xl font-medium text-gray-700">No jobs found</p>
        <p className="mt-2 text-gray-500">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {jobs.map((job, index) => (
          <motion.div
            key={job.id || index}
            variants={itemVariants}
            transition={{ duration: 0.3 }}
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default JobList;
