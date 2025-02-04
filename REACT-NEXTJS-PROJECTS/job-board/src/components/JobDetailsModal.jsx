import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiX,
  HiLocationMarker,
  HiCurrencyPound,
  HiBriefcase,
  HiExternalLink,
} from "react-icons/hi";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

const JobDetailsModal = ({ job, onClose, isSaved, onSave }) => {
  const formatSalary = (min, max) => {
    if (!min && !max) return "Salary not specified";
    if (!max) return `£${min.toLocaleString()}+`;
    if (!min) return `Up to £${max.toLocaleString()}`;
    return `£${min.toLocaleString()} - £${max.toLocaleString()}`;
  };

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modal = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal-backdrop"
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border-2 border-[#050b2c]/10"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#050b2c] to-[#0a1854] p-6 relative">
            <motion.button
              type="button"
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HiX className="w-6 h-6" />
            </motion.button>
            <h2 className="text-2xl font-bold text-white pr-8">{job.title}</h2>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Company and Location Info */}
            <div className="bg-[#050b2c]/5 rounded-xl p-4 mb-6 border border-[#050b2c]/10">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                  <HiBriefcase className="w-5 h-5 text-[#ffa509]" />
                  <span className="text-[#050b2c] font-medium">
                    {job.company.display_name}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                  <HiLocationMarker className="w-5 h-5 text-[#ffa509]" />
                  <span className="text-[#050b2c] font-medium">
                    {job.location.display_name}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                  <HiCurrencyPound className="w-5 h-5 text-[#ffa509]" />
                  <span className="text-[#050b2c] font-medium">
                    {formatSalary(job.salary_min, job.salary_max)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-blue max-w-none">
              <h3 className="text-xl font-semibold mb-4 text-[#050b2c]">
                Job Description
              </h3>
              <div className="text-gray-600 whitespace-pre-line bg-white p-4 rounded-xl border border-[#050b2c]/10">
                {job.description}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-[#050b2c]/10 bg-[#050b2c]/5">
            <div className="flex gap-4 justify-end">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg flex items-center gap-2 bg-[#050b2c] text-white hover:bg-[#0a1854] transition-colors"
                onClick={onSave}
              >
                {isSaved ? (
                  <>
                    <BsBookmarkHeartFill className="w-5 h-5 text-[#ffa509]" />
                    Saved
                  </>
                ) : (
                  <>
                    <BsBookmarkHeart className="w-5 h-5" />
                    Save Job
                  </>
                )}
              </motion.button>
              <motion.a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-[#ffa509] text-[#050b2c] rounded-lg flex items-center gap-2 hover:bg-[#e69408] transition-colors font-medium"
              >
                Apply Now
                <HiExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobDetailsModal;
