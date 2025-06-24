import { useSEO } from "../utils/useSEO.jsx";

const PrivacyPolicy = () => {
  // SEO Meta Tags for Privacy Policy
  const seoComponent = useSEO({
    title: "Privacy Policy",
    description: "Learn about Workisy's commitment to protecting your privacy and personal data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information on our AI-powered job platform.",
    keywords: "privacy policy, data protection, personal information, workisy privacy, data security, GDPR compliance, job platform privacy",
    ogTitle: "Privacy Policy - Workisy Data Protection",
    ogDescription: "Workisy's Privacy Policy: Learn how we protect your personal data and respect your privacy on our AI-powered job matching platform."
  });

  return (
    <>
      {seoComponent}
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Workisy, we respect your privacy and are committed to protecting your personal data. This Privacy Policy 
                explains how we collect, use, and safeguard your information when you use our AI-powered job search platform.
              </p>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 my-4">
                <p className="text-green-800">
                  <strong>Our Commitment:</strong> We never sell your personal information to third parties and use 
                  enterprise-grade security to protect your data.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Name, email address, phone number</li>
                <li>Resume and career information</li>
                <li>Job preferences and career goals</li>
                <li>Education and work experience</li>
                <li>Skills and certifications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Analysis Data</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Resume parsing and analysis results</li>
                <li>Job matching preferences and feedback</li>
                <li>Platform interaction patterns</li>
                <li>Search queries and job application data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your information to provide and improve our services:
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Core Services</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>AI-powered job matching and recommendations</li>
                  <li>Resume analysis and optimization suggestions</li>
                  <li>Career guidance and consultation services</li>
                  <li>Job application tracking and management</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Platform Improvement</h3>
                <ul className="list-disc pl-6 text-purple-800 space-y-2">
                  <li>Improving our AI algorithms and matching accuracy</li>
                  <li>Personalizing your user experience</li>
                  <li>Analyzing usage patterns to enhance features</li>
                  <li>Conducting research and development</li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Communication</h3>
                <ul className="list-disc pl-6 text-orange-800 space-y-2">
                  <li>Sending job alerts and notifications</li>
                  <li>Providing customer support</li>
                  <li>Sharing platform updates and news</li>
                  <li>Marketing communications (with your consent)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement comprehensive security measures to protect your personal information:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-3">Technical Safeguards</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• End-to-end encryption</li>
                    <li>• Secure data transmission (SSL/TLS)</li>
                    <li>• Regular security audits</li>
                    <li>• Multi-factor authentication</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Operational Security</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Access controls and monitoring</li>
                    <li>• Employee security training</li>
                    <li>• Incident response procedures</li>
                    <li>• Regular backup systems</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal data:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Access and Portability</h3>
                    <p className="text-gray-700 text-sm">Request a copy of your personal data in a structured format</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Correction and Updates</h3>
                    <p className="text-gray-700 text-sm">Update or correct inaccurate personal information</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Deletion</h3>
                    <p className="text-gray-700 text-sm">Request deletion of your personal data</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Opt-out</h3>
                    <p className="text-gray-700 text-sm">Unsubscribe from marketing communications</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700"><strong>Data Protection Officer:</strong> privacy@workisy.com</p>
                <p className="text-gray-700"><strong>General Inquiries:</strong> support@workisy.com</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Business District, Tech City, TC 12345</p>
                <p className="text-gray-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </section>

          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy; 