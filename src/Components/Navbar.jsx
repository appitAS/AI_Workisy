import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar, Modal, Box } from "@mui/material";
import useIsMobile from "./useIsMobile";
import useJobStore from "../store/jobStore";
import SocialLoginCard from "./AuthSection";

// Custom Globe SVG Icon as a React component
function GlobeIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15 15H22.5V16.5H15V15ZM15 18H19.5V19.5H15V18Z"
        fill="currentColor"
      />
      <path
        d="M22.5 12.75V12C22.498 9.82186 21.818 7.69836 20.5545 5.92418C19.2909 4.15001 17.5064 2.81315 15.4486 2.09914C13.3908 1.38512 11.1618 1.32935 9.07086 1.93958C6.97995 2.5498 5.13083 3.79575 3.78011 5.50452C2.4294 7.21329 1.64409 9.30013 1.53315 11.4754C1.42221 13.6508 1.99116 15.8067 3.16103 17.644C4.33089 19.4813 6.04367 20.9089 8.06166 21.7287C10.0797 22.5484 12.3028 22.7197 14.4225 22.2188L14.0775 20.7593C13.3967 20.92 12.6995 21.0008 12 21C11.8575 21 11.7188 20.9858 11.5778 20.9797C9.95021 18.5401 9.06186 15.6824 9.01953 12.75H22.5ZM20.9693 11.25H16.4813C16.3974 8.48662 15.686 5.77853 14.4008 3.33075C16.1728 3.82305 17.7519 4.84558 18.9262 6.26112C20.1004 7.67666 20.8128 9.41749 20.9693 11.25ZM12.4223 3.02025C14.0499 5.45986 14.9382 8.31762 14.9805 11.25H9.01953C9.06186 8.31762 9.95021 5.45986 11.5778 3.02025C11.7188 3.015 11.8575 3 12 3C12.1425 3 12.2813 3.01425 12.4223 3.02025ZM9.59928 3.33075C8.3141 5.77853 7.60265 8.48662 7.51878 11.25H3.03153C3.18786 9.41768 3.90083 7.67699 5.07477 6.26147C6.24872 4.84595 7.82749 3.82331 9.59928 3.33075ZM9.59928 20.6693C7.82749 20.1767 6.24872 19.1541 5.07477 17.7385C3.90083 16.323 3.18786 14.5823 3.03153 12.75H7.51878C7.60265 15.5134 8.3141 18.2215 9.59928 20.6693Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { setResumeFile } = useJobStore();

  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [anchorElLogin, setAnchorElLogin] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  // User data
  const userData = Cookies.get("user_data")
    ? JSON.parse(Cookies.get("user_data"))
    : "";
  const auth_token = Cookies.get("auth_token");
  const randomColor = Cookies.get("profile_bg");

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setResumeFile(null);
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    navigate("/");
  };

  const navItems = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="w-full bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200/50 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-1"
              onClick={() => navigate("/")}
            >
              <img
                src="/workisy logo-01.png"
                alt="Workisy Logo"
                className="h-10 w-auto object-contain drop-shadow-lg"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 group"
                >
                  <GlobeIcon className="w-4 h-4" />
                  <span>Services</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      servicesMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 group-hover:w-full"></span>
                  <span className="absolute inset-0 rounded-lg bg-blue-50 scale-0 transition-transform duration-300 group-hover:scale-100 opacity-0 group-hover:opacity-100 -z-10"></span>
                </button>

                {/* Services Dropdown Menu */}
                {servicesMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 transform transition-all duration-300 scale-100 opacity-100 animate-slideDown">
                    <div className="px-4 py-2">
                      <button
                        onClick={() => {
                          navigate("/jobs");
                          setServicesMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:translate-x-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                          <span className="font-medium">
                            AI Resume Matching
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          navigate("/upload-resume");
                          setServicesMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:translate-x-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                          <span className="font-medium">Resume Upload</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Regular Navigation Items */}
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="relative text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 group-hover:w-full"></span>
                  <span className="absolute inset-0 rounded-lg bg-blue-50 scale-0 transition-transform duration-300 group-hover:scale-100 opacity-0 group-hover:opacity-100 -z-10"></span>
                </button>
              ))}
            </div>

            {/* Right side with Auth */}
            <div className="flex items-center space-x-3">
              {/* Auth Section - Visible on both desktop and mobile */}
              {auth_token ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-white"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <Avatar
                      className="w-8 h-8 transition-transform duration-300 hover:rotate-12"
                      style={{
                        backgroundColor: !userData?.profile_img?.trim()
                          ? randomColor
                          : "transparent",
                        border: "1px solid #e0e0e0",
                      }}
                      src={userData?.profile_img}
                    >
                      {(!userData.profile_img ||
                        userData.profile_img.trim() === "") &&
                      userData.name
                        ? userData.name.charAt(0).toUpperCase()
                        : null}
                    </Avatar>
                  </button>

                  {/* User Dropdown Menu with Animation */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 z-50 transform transition-all duration-300 scale-100 opacity-100 animate-slideDown">
                      <div className="px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center space-x-4">
                          <Avatar
                            className="w-14 h-14 ring-4 ring-blue-100"
                            style={{
                              backgroundColor: !userData?.profile_img?.trim()
                                ? randomColor
                                : "transparent",
                            }}
                            src={userData?.profile_img}
                          >
                            {(!userData.profile_img ||
                              userData.profile_img.trim() === "") &&
                            userData.name
                              ? userData.name.charAt(0).toUpperCase()
                              : null}
                          </Avatar>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">
                              {userData.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {userData.email}
                            </p>
                            <div className="flex items-center mt-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                              <span className="text-xs text-green-600 font-medium">
                                Online
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-6 py-4 text-red-600 hover:bg-red-50 transition-all duration-300 hover:translate-x-2"
                      >
                        <svg
                          className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12"
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
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAnchorElLogin(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-semibold">Login / Sign Up</span>
                </button>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 relative group"
                >
                  <div className="w-6 h-6 relative">
                    <span
                      className={`absolute top-0 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                        isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
                      }`}
                    ></span>
                    <span
                      className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                        isMobileMenuOpen ? "opacity-0" : ""
                      }`}
                    ></span>
                    <span
                      className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                        isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                      }`}
                    ></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu with Awesome Animations */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
            <div className="px-6 py-8 space-y-4">
              {/* Mobile Services Section */}
              <div className="mb-4">
                <button
                  onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                  className="flex items-center justify-between w-full px-6 py-4 text-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/80 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center space-x-3">
                    <GlobeIcon className="w-5 h-5" />
                    <span>Services</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      servicesMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Mobile Services Dropdown */}
                {servicesMenuOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    <button
                      onClick={() => {
                        navigate("/jobs");
                        setIsMobileMenuOpen(false);
                        setServicesMenuOpen(false);
                      }}
                      className="block w-full text-left px-6 py-3 text-base text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:translate-x-2"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>AI Resume Matching</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/upload-resume");
                        setIsMobileMenuOpen(false);
                        setServicesMenuOpen(false);
                      }}
                      className="block w-full text-left px-6 py-3 text-base text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:translate-x-2"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>Resume Upload</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Navigation Items */}
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-6 py-4 text-lg font-semibold text-gray-700 hover:text-blue-600 hover:bg-white/80 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 shadow-lg hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMobileMenuOpen
                      ? "slideInLeft 0.5s ease-out forwards"
                      : "",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    <span>{item.name}</span>
                  </div>
                </button>
              ))}

              {/* Mobile User Info (if logged in) */}
              {auth_token && (
                <div className="border-t border-gray-200/50 pt-6 mt-6">
                  <div className="flex items-center space-x-4 px-6 py-4 bg-white/60 rounded-2xl shadow-lg backdrop-blur-sm">
                    <Avatar
                      className="w-12 h-12 ring-4 ring-blue-100"
                      style={{
                        backgroundColor: !userData?.profile_img?.trim()
                          ? randomColor
                          : "transparent",
                      }}
                      src={userData?.profile_img}
                    >
                      {(!userData.profile_img ||
                        userData.profile_img.trim() === "") &&
                      userData.name
                        ? userData.name.charAt(0).toUpperCase()
                        : null}
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900">{userData.name}</p>
                      <p className="text-sm text-gray-600">{userData.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center px-6 py-4 mt-4 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-3"
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
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal with Animation */}
      <Modal
        open={anchorElLogin}
        onClose={() => setAnchorElLogin(false)}
        className="flex items-center justify-center p-4"
      >
        <Box
          className="w-full max-w-md mx-4 transform transition-all duration-300 scale-100"
          sx={{
            animation: anchorElLogin ? "modalSlideIn 0.3s ease-out" : "",
          }}
        >
          <SocialLoginCard
            maxWidth={560}
            isLogIn
            setAnchorElLogin={setAnchorElLogin}
          />
        </Box>
      </Modal>

      {/* Click outside handler */}
      {(isUserMenuOpen || servicesMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false);
            setServicesMenuOpen(false);
          }}
        />
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
