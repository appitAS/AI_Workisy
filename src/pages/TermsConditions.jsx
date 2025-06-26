import { useSEO } from "../utils/useSEO.jsx";

const TermsConditions = () => {
  // SEO Meta Tags for Terms and Conditions
  const seoComponent = useSEO({
    title: "Terms and Conditions",
    description: "Read Workisy's Terms and Conditions to understand your rights and responsibilities when using our AI-powered job search platform. Learn about our service terms, user responsibilities, and policies.",
    keywords: "terms and conditions, terms of service, workisy terms, user agreement, service terms, job platform terms, legal terms",
    ogTitle: "Terms and Conditions - Workisy Service Agreement",
    ogDescription: "Workisy's Terms and Conditions: Understand your rights and responsibilities when using our AI-powered job matching platform."
  });

  return (
    <>
      {seoComponent}
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using Workisy ("the Service"), you accept and agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Workisy is an AI-powered job search platform that connects job seekers with potential employers. 
                We provide resume analysis, job matching, and career guidance services.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>AI-powered job matching based on your resume and preferences</li>
                <li>Resume optimization and analysis tools</li>
                <li>Job search and application tracking</li>
                <li>Career guidance and consultation services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of Workisy, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and truthful information in your profile and resume</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the service in compliance with all applicable laws and regulations</li>
                <li>Not share your account with others</li>
                <li>Not use the service for any illegal or unauthorized purposes</li>
                <li>Respect the intellectual property rights of others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. We collect and process your personal data in accordance with our Privacy Policy. 
                By using our service, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
                <p className="text-blue-800">
                  <strong>Note:</strong> We use enterprise-grade security measures to protect your data and never share 
                  your personal information with third parties without your explicit consent.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content, features, and functionality of Workisy, including but not limited to text, graphics, logos, 
                button icons, images, audio clips, and software, are owned by Workisy and are protected by copyright, 
                trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain ownership of your resume and personal data uploaded to our platform. However, by using our service, 
                you grant us a limited license to process and analyze your data to provide our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment and Billing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Workisy offers both free and premium services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Free Services:</strong> Basic job search and matching features</li>
                <li><strong>Premium Services:</strong> Advanced features including priority matching, detailed analytics, and career coaching</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Premium services are billed according to the pricing plan you select. All fees are non-refundable except as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Workisy provides its services "as is" without any warranties, express or implied. We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>The service will be uninterrupted or error-free</li>
                <li>Job matches will result in employment offers</li>
                <li>All job postings are accurate or current</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                In no event shall Workisy be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Account Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may terminate your account at any time by contacting our support team. We reserve the right to 
                terminate or suspend accounts that violate these terms or engage in prohibited activities.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upon termination, your access to the service will cease, but these terms will continue to apply to 
                your prior use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting 
                on our website. Your continued use of the service after any changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700"><strong>Email:</strong> legal@workisy.com</p>
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

export default TermsConditions; 