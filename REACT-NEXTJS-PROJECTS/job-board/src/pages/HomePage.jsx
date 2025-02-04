import React from "react";
import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin, FiDollarSign } from "react-icons/fi";
import {
  HiOutlineAdjustments,
  HiShieldCheck,
  HiLightningBolt,
  HiSparkles,
  HiBell,
  HiChartBar,
  HiStar,
  HiArrowRight,
} from "react-icons/hi";
import SearchBar from "../components/SearchBar";
import FilterSection from "../components/FilterSection";
import JobList from "../components/JobList";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Verified Jobs",
    description: "All jobs are verified and from trusted employers",
    icon: <HiShieldCheck className="w-8 h-8" />,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Quick Apply",
    description: "Apply to multiple jobs with just a few clicks",
    icon: <HiLightningBolt className="w-8 h-8" />,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Smart Matching",
    description: "AI-powered job recommendations tailored to your profile",
    icon: <HiSparkles className="w-8 h-8" />,
    color: "bg-green-500",
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "Real-Time Alerts",
    description: "Get notified instantly about new matching opportunities",
    icon: <HiBell className="w-8 h-8" />,
    color: "bg-orange-500",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    title: "Career Insights",
    description: "Access salary data and industry trends",
    icon: <HiChartBar className="w-8 h-8" />,
    color: "bg-red-500",
    gradient: "from-red-500 to-red-600",
  },
  {
    title: "Company Reviews",
    description: "Make informed decisions with authentic employee reviews",
    icon: <HiStar className="w-8 h-8" />,
    color: "bg-yellow-500",
    gradient: "from-yellow-500 to-yellow-600",
  },
];

const HomePage = ({ jobs, loading, error, onSearch, onFilterChange }) => {
  const stats = [
    { icon: FiBriefcase, label: "Active Jobs", value: "10,000+" },
    { icon: FiMapPin, label: "Locations", value: "30+" },
    { icon: FiDollarSign, label: "Salary Range", value: "£20k-£200k" },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Hero Section */}
      <div className="bg-[#050b2c] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#ffa509] to-white bg-clip-text text-transparent">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Search through thousands of job opportunities
          </p>

          {/* Search Section */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-6 shadow-md text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#ffa509]" />
              <h3 className="text-2xl font-bold text-[#050b2c]">
                {stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <HiOutlineAdjustments className="w-6 h-6 text-[#050b2c] mr-2" />
            <h2 className="text-xl font-semibold text-[#050b2c]">Filters</h2>
          </div>
          <FilterSection onFilterChange={onFilterChange} />
        </div>

        {/* Jobs Section */}
        <JobList jobs={jobs} loading={loading} error={error} />
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#ffffff] to-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              className="text-4xl font-bold text-[#050b2c] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose JobHub
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Discover the features that make us the preferred choice for job
              seekers
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[#ffa509] text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050b2c] to-[#050b2c] opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" />
                  <h3 className="text-xl font-semibold text-[#050b2c] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#ffa509] to-[#050b2c] opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl blur-xl"
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-[#050b2c] bg-[#ffa509] hover:bg-[#e69408] transition-colors duration-300"
            >
              Get Started Now
              <HiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
