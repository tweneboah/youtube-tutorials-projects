import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiBookmark,
  HiUser,
  HiLogout,
  HiLogin,
  HiUserAdd,
  HiMenu,
  HiX,
  HiBriefcase,
} from "react-icons/hi";

const Navigation = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = currentUser
    ? [
        { to: "/", label: "Home", icon: HiHome },
        { to: "/saved-jobs", label: "Saved Jobs", icon: HiBookmark },
        { to: "/profile", label: "Profile", icon: HiUser },
      ]
    : [
        { to: "/", label: "Home", icon: HiHome },
        { to: "/login", label: "Login", icon: HiLogin },
        { to: "/register", label: "Register", icon: HiUserAdd },
      ];

  return (
    <nav className="bg-[#050b2c] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <HiBriefcase className="h-8 w-8 text-[#ffa509]" />
              <span className="ml-2 text-xl font-bold text-white">JobHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2
                    ${
                      isActivePath(link.to)
                        ? "bg-[#ffa509] text-[#050b2c]"
                        : "text-gray-200 hover:bg-[#0a1854] hover:text-white"
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              {currentUser && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:bg-[#0a1854] hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <HiLogout className="w-5 h-5" />
                  Logout
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-200 hover:bg-[#0a1854] hover:text-white transition-colors duration-200"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a1854]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 flex items-center gap-2
                    ${
                      isActivePath(link.to)
                        ? "bg-[#ffa509] text-[#050b2c]"
                        : "text-gray-200 hover:bg-[#050b2c] hover:text-white"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              {currentUser && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-[#050b2c] hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <HiLogout className="w-5 h-5" />
                  Logout
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
