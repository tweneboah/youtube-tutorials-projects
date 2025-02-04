import React from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px] relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#050b2c]" />
        <input
          type="text"
          name="search"
          placeholder="Search for jobs..."
          className="w-full pl-10 text-[#050b2c] pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ffa509]"
        />
      </div>
      <motion.button
        type="submit"
        className="bg-[#ffa509] text-[#050b2c] px-6 py-3 rounded-lg font-semibold hover:bg-[#e69408] transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search Jobs
      </motion.button>
    </form>
  );
};

export default SearchBar;
