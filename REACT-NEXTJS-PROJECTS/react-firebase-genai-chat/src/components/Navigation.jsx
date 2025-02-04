import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { logoutUser } from "../utils/auth";
import { useState, useEffect, useRef } from "react";

function Navigation() {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg
                 transition-colors duration-200 font-medium text-sm
                 hover:bg-blue-50 dark:hover:bg-gray-800"
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              AI Chat
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            {user ? (
              <>
                <NavLink to="/chat">Chat</NavLink>
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 ml-2 px-4 py-2 rounded-lg
                             text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400
                             hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=random`}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium">{user.email}</span>
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-1 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg">
                      <div className="px-4 py-2 border-b border-gray-200/50 dark:border-gray-700/50">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={logoutUser}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                                 transition-colors duration-200 font-medium flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                         text-white px-6 py-2 rounded-lg font-medium text-sm
                         transition-all duration-200 shadow-md hover:shadow-lg
                         transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400
                       p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-200/50 dark:border-gray-700/50 py-2">
            <div className="space-y-1 px-2">
              <NavLink to="/">Home</NavLink>
              {user ? (
                <>
                  <NavLink to="/chat">Chat</NavLink>
                  <div className="px-4 py-2 border-t border-gray-200/50 dark:border-gray-700/50 mt-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=random`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                               rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                           text-white px-4 py-2 rounded-lg font-medium text-sm
                           transition-all duration-200 shadow-md hover:shadow-lg
                           transform hover:-translate-y-0.5 mx-2"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
