import React from 'react'

const GlobalInfoSection = () => {
  return (
    <div className="py-16 px-4 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Social Media Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-2 tracking-wider">SOCIAL</h3>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Follow us for the latest updates</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {/* Facebook */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900">FACEBOOK</div>
                <div className="text-sm text-gray-600">Appit Solutions</div>
              </div>
            </div>

            {/* X (Twitter) */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900">X</div>
                <div className="text-sm text-gray-600">Appit Solutions</div>
              </div>
            </div>

            {/* YouTube */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900">YOUTUBE</div>
                <div className="text-sm text-gray-600">Appit Solutions</div>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900">INSTAGRAM</div>
                <div className="text-sm text-gray-600">Appit Solutions</div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900">LINKEDIN</div>
                <div className="text-sm text-gray-600">Appit Solutions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                ServiceNow AI Solutions
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Oracle AI Solutions
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Legal AI Assistance
              </a>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                AI-Driven Talent Acquisition
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                All-in-One CRM Solution
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Outlook AI Copilot
              </a>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                ECommerce Services
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Outlook AI Copilot
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                GenMind Consulting
              </a>
            </div>

            {/* Column 4 */}
            <div className="space-y-4">
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Smart Applicant Tracking System
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Cyber Security GRC Solutions
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Magento Open Source
              </a>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* India */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-6 rounded-sm overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src="/images/contact-images/india.png"
                alt="India Flag"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full flex flex-col" style={{ display: 'none' }}>
                <div className="h-1/3 w-full bg-orange-500"></div>
                <div className="h-1/3 w-full bg-white"></div>
                <div className="h-1/3 w-full bg-green-600"></div>
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">IND:</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                PSR Prime Towers, 704 C, 7th Floor, Adjacent to DLF Cyber City, Gachibowli, Hyderabad, Telangana, India-500032.
              </p>
            </div>
          </div>

          {/* UAE */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-6 rounded-sm overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src="/images/contact-images/uae.png"
                alt="UAE Flag"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">UAE:</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                IFZA Business Park, DDP Dubai Silicon Oasis, DDP, Building A1, Dubai, United Arab Emirates.
              </p>
            </div>
          </div>

          {/* USA */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-6 rounded-sm overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src="/images/contact-images/usa.png"
                alt="USA Flag"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">USA:</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                16192 Coastal Highway, Lewes, DE 19958, USA.
              </p>
            </div>
          </div>

          {/* Saudi Arabia */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-6 rounded-sm overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src="/images/contact-images/saudi.png"
                alt="Saudi Arabia Flag"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-gray-900 mb-1">SAUDI:</div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Futuro Tower, King Saud Rd, Office # 703, 7th floor, Riyadh 12624, Saudi Arabia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalInfoSection 