"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Links from "./links";

const Navbar = () => {
  const [matricNumber, setMatricNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedMatricNumber = localStorage.getItem("matricNumber");
    if (storedMatricNumber) {
      setMatricNumber(storedMatricNumber);
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setLoading(true);
    // Clear all session data
    localStorage.removeItem("matricNumber");
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionExpiry");
    setTimeout(() => {
      router.push("/");
      setLoading(false);
    }, 500);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg
                className={`w-6 h-6 ${isScrolled ? "text-blue-600" : "text-white"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <span
              className={`text-xl font-bold ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              ProjectSpace
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <Links />
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            {matricNumber && (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span
                  className={`text-sm font-medium ${
                    isScrolled ? "text-gray-700" : "text-white/90"
                  }`}
                >
                  {matricNumber}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                isScrolled
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">
                {loading ? "..." : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
