'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { BiBuildingHouse } from 'react-icons/bi';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#050b2c] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <Link href="/" className="flex items-center group">
              <BiBuildingHouse className="h-8 w-8 text-[#ffa509] group-hover:scale-110 transition-transform" />
              <span className="ml-2 text-xl font-bold text-white">Real Estate</span>
            </Link>
            <div className="hidden md:flex md:items-center md:ml-10 space-x-4">
              <Link 
                href="/properties" 
                className="text-gray-300 hover:text-[#ffa509] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Properties
              </Link>
              {user && (
                <>
                  <Link 
                    href="/properties/add" 
                    className="text-gray-300 hover:text-[#ffa509] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    List Property
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-300 hover:text-[#ffa509] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-300">
                  <FaUserCircle className="h-5 w-5 text-[#ffa509] mr-2" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-[#ffa509] text-[#050b2c] px-4 py-2 rounded-lg hover:bg-[#ff9100] transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-[#ffa509] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#ffa509] text-[#050b2c] px-4 py-2 rounded-lg hover:bg-[#ff9100] transition-colors text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-[#ffa509] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ffa509] p-2"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#050b2c] border-t border-gray-700">
          <Link
            href="/properties"
            className="text-gray-300 hover:text-[#ffa509] block px-3 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Properties
          </Link>
          {user && (
            <>
              <Link
                href="/properties/add"
                className="text-gray-300 hover:text-[#ffa509] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                List Property
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-[#ffa509] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </>
          )}
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center px-3 py-2 text-gray-300">
                <FaUserCircle className="h-5 w-5 text-[#ffa509] mr-2" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left bg-[#ffa509] text-[#050b2c] px-4 py-2 rounded-lg hover:bg-[#ff9100] transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                className="text-gray-300 hover:text-[#ffa509] block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#ffa509] text-[#050b2c] block px-4 py-2 rounded-lg hover:bg-[#ff9100] transition-colors text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
