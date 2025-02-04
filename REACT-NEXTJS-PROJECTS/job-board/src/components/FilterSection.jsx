import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign, FiBriefcase } from "react-icons/fi";

const FilterSection = ({ onFilterChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#050b2c]" />
        <select
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ffa509] appearance-none bg-white text-[#050b2c]"
          onChange={(e) => onFilterChange("location", e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="london">London</option>
          <option value="manchester">Manchester</option>
          <option value="birmingham">Birmingham</option>
        </select>
      </div>

      <div className="relative">
        <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#050b2c]" />
        <select
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ffa509] appearance-none bg-white text-[#050b2c]"
          onChange={(e) => onFilterChange("salary", e.target.value)}
        >
          <option value="">All Salaries</option>
          <option value="30000">£30,000+</option>
          <option value="40000">£40,000+</option>
          <option value="50000">£50,000+</option>
          <option value="60000">£60,000+</option>
        </select>
      </div>

      <div className="relative">
        <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#050b2c]" />
        <select
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ffa509] appearance-none bg-white text-[#050b2c]"
          onChange={(e) => onFilterChange("jobType", e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="full_time">Full Time</option>
          <option value="part_time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
