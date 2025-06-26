"use client"

import { useState } from "react"
import { showSuccessToast, showErrorToast } from "./ToastNotifier"
import { useSEO } from "../utils/useSEO.jsx"
import GlobalInfoSection from "./GlobalInfoSection.jsx"

const ContactUs = () => {
  // SEO Meta Tags
  const seoComponent = useSEO({
    title: "Contact Us",
    description: "Get in touch with Workisy's expert team. We're here to help you with AI-powered job matching, career guidance, and job search support. Contact us today for personalized assistance!",
    keywords: "contact workisy, customer support, AI job search, job platform support, career guidance, job matching help, resume assistance",
    ogTitle: "Contact Workisy - Get Expert Job Search Support",
    ogDescription: "Connect with Workisy's team for AI-powered job matching, career guidance, and personalized job search assistance. We're here to help you find your dream job."
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      showSuccessToast("Thank you for your message! We'll be in touch shortly.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    } catch (error) {
      showErrorToast("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.message

  return (
    <>
      {seoComponent}
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative py-32 overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/banner/contact.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wider">CONTACT US</h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-cyan-100 font-light">Connect with Workisy's AI-Powered Job Matching Platform</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 px-4 bg-gray-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-1 bg-purple-500 rounded-full transform rotate-12 opacity-60"></div>
        <div className="absolute top-32 right-20 w-24 h-1 bg-purple-500 rounded-full transform -rotate-45 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-purple-500 rounded-full transform rotate-45 opacity-60"></div>
        <div className="absolute bottom-32 right-10 w-28 h-1 bg-purple-500 rounded-full transform -rotate-12 opacity-60"></div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Start Your <span className="text-purple-600">Dream Career</span> Journey With Workisy
            </h2>
            <p className="text-lg text-gray-600">Let's Connect! Get Personalized Career Guidance From Our AI Experts!</p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:items-stretch">
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-between animate-slide-in-left bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Your Career Success Is Our Mission</h3>
              <div className="space-y-6 text-gray-600 leading-relaxed flex-1">
                <p className="text-lg">
                  At Workisy, we're revolutionizing the job search experience through cutting-edge AI technology that connects talented professionals with their ideal career opportunities.
                </p>
                <p className="text-lg">
                  Our intelligent platform provides direct access to <span className="font-semibold text-purple-600">1.27 million+ jobs worldwide</span>, using advanced algorithms to analyze your skills, experience, and career aspirations to deliver perfectly matched job recommendations.
                </p>
                <p className="text-lg">
                  Whether you're a recent graduate entering the job market, an experienced professional seeking career advancement, or someone planning a complete career transition, Workisy's AI-powered matching system ensures you discover opportunities that align with your goals.
                </p>
                <p className="text-lg">
                  Ready to transform your career journey? Let's connect and discover how Workisy can accelerate your path to professional success with smarter, faster, and more effective job matching.
                </p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="flex flex-col animate-slide-in-right">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex-1 flex flex-col transform hover:scale-105 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ready to find your dream job? Fill in the form and our career experts will be in touch shortly!
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                  {/* Name Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200"
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
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Your Name"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:bg-gray-100 focus:bg-white transform focus:scale-105"
                      required
                    />
                  </div>

                  {/* Email and Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter Your Mobile Number"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:bg-gray-100 focus:bg-white transform focus:scale-105"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Your Mail ID"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:bg-gray-100 focus:bg-white transform focus:scale-105"
                        required
                      />
                    </div>
                  </div>

                  {/* Company Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter Your Company Name"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:bg-gray-100 focus:bg-white transform focus:scale-105"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="relative group flex-1">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message................"
                      className="w-full h-full min-h-[100px] pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 resize-none hover:bg-gray-100 focus:bg-white transform focus:scale-105"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform ${
                      isFormValid && !isSubmitting
                        ? "bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : (
                      "SUBMIT"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out 0.2s both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.4s both;
        }
      `}</style>

      {/* Let's Talk Section */}
      <div className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-1 bg-purple-500 rounded-full transform rotate-12 opacity-60"></div>
        <div className="absolute top-32 right-20 w-24 h-1 bg-blue-500 rounded-full transform -rotate-45 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-purple-500 rounded-full transform rotate-45 opacity-60"></div>
        <div className="absolute bottom-32 right-10 w-28 h-1 bg-blue-500 rounded-full transform -rotate-12 opacity-60"></div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Let's Talk About</h2>
          <h3 className="text-5xl font-bold text-purple-600 mb-16">Your Next Career Move</h3>

          <div className="flex justify-center">
            <button 
              className="group flex items-center justify-center gap-4 px-12 py-6 bg-white border-3 border-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 text-xl font-semibold min-w-[200px] text-purple-600"
              onClick={() => window.location.href = 'mailto:support@workisy.com'}
            >
              <span className="underline">Email Us</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Global Locations Section */}
      <div id="global-locations" className="py-20 px-4 bg-gray-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-1 bg-purple-500 rounded-full transform rotate-12 opacity-60"></div>
        <div className="absolute top-32 right-20 w-24 h-1 bg-purple-500 rounded-full transform -rotate-45 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-purple-500 rounded-full transform rotate-45 opacity-60"></div>
        <div className="absolute bottom-32 right-10 w-28 h-1 bg-purple-500 rounded-full transform -rotate-12 opacity-60"></div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Global Career Support</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Worldwide AI-Powered Job Matching & Career Acceleration. Connect with Workisy's global network to access our intelligent job search platform featuring 1.27 million+ opportunities. Our AI-driven career experts are ready to match you with your perfect job across multiple countries and industries.
            </p>
          </div>

          {/* Location Cards - Modern Design */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* USA Location */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-3xl p-6 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-8 rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
                    <img 
                      src="/images/contact-images/usa.png" 
                      alt="USA Flag"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div className="w-full h-full bg-blue-500 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="w-6 h-3 bg-white rounded-sm flex">
                      <div className="w-2 h-3 bg-blue-500"></div>
                      <div className="w-2 h-3 bg-white"></div>
                      <div className="w-2 h-3 bg-blue-500"></div>
                    </div>
                  </div>
                  </div>
                  <span className="font-bold text-xl">USA</span>
                </div>
                <p className="text-white/90 leading-relaxed">
                  16192 Coastal Highway, Lewes, DE 19958, USA.
                </p>
                <div className="mt-4 text-sm text-white/70">
                  <p>🌟 400,000+ US jobs via AI matching</p>
                  <p>📧 careers-us@workisy.com</p>
                </div>
              </div>
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            </div>

            {/* Saudi Arabia Location */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-3xl p-6 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-8 rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
                    <img 
                      src="/images/contact-images/saudi.png" 
                      alt="Saudi Arabia Flag"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-white text-xs">🇸🇦</div>
                    </div>
                  </div>
                  <span className="font-bold text-xl">SAUDI</span>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Futuro Tower, King Saud Rd, Office # 703, 7th floor, Riyadh 12624, Saudi Arabia.
                </p>
                <div className="mt-4 text-sm text-white/70">
                  <p>🌟 200,000+ Middle East jobs via AI matching</p>
                  <p>📧 careers-saudi@workisy.com</p>
                </div>
              </div>
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            </div>

            {/* UAE Location */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-3xl p-6 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-8 rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
                    <img 
                      src="/images/contact-images/uae.png" 
                      alt="UAE Flag"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-white text-xs">🇦🇪</div>
                    </div>
                  </div>
                  <span className="font-bold text-xl">UAE</span>
                </div>
                <p className="text-white/90 leading-relaxed">
                  IFZA Business Park, DDP Dubai Silicon Oasis, DDP, Building A1, Dubai, United Arab Emirates.
                </p>
                <div className="mt-4 text-sm text-white/70">
                  <p>🌟 300,000+ UAE & GCC jobs via AI matching</p>
                  <p>📧 careers-uae@workisy.com</p>
                </div>
              </div>
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            </div>
          </div>

          {/* World Map Section - Using world-map2.png */}
          <div className="relative">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <img 
                src="/images/contact-images/world-map2.png" 
                alt="APPIT Software Global Locations World Map"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-full min-h-[500px] flex items-center justify-center text-gray-500" style={{ display: 'none' }}>
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xl font-medium">Global Presence Map</p>
                  <p className="text-sm">Interactive world map showing our locations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Info Section */}
      {/* <GlobalInfoSection /> */}
    </div>
    </>
  )
}

export default ContactUs
