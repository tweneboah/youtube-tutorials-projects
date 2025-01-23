"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-[#E2F69E]/95 backdrop-blur-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-900">
          RZ
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-indigo-900 hover:text-indigo-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/about"
            className="text-gray-700 hover:text-indigo-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/portfolio"
            className="text-gray-700 hover:text-indigo-900 transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/services"
            className="text-gray-700 hover:text-indigo-900 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/testimonials"
            className="text-gray-700 hover:text-indigo-900 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/contact"
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:hidden absolute top-full left-0 right-0 bg-[#E2F69E] shadow-lg flex-col items-center py-4 space-y-4`}
        >
          <Link
            href="/about"
            className="text-gray-700 hover:text-indigo-900 transition-colors"
          >
            About
          </Link>
          <Link
            href="/portfolio"
            className="text-gray-700 hover:text-indigo-900 transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/services"
            className="text-gray-700 hover:text-indigo-900 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/testimonials"
            className="text-gray-700 hover:text-indigo-900 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/contact"
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
