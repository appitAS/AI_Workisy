import { useState } from "react";
import { useSEO } from "../utils/useSEO.jsx";

const FAQ = () => {
  // SEO Meta Tags for FAQ
  const seoComponent = useSEO({
    title: "FAQ",
    description: "Find answers to frequently asked questions about Workisy's AI-powered job search platform. Learn about job matching, resume security, platform features, and how to get the best results.",
    keywords: "FAQ, frequently asked questions, workisy help, job search questions, AI job matching help, resume upload questions, platform support",
    ogTitle: "FAQ - Workisy Help Center",
    ogDescription: "Get answers to common questions about our AI-powered job search platform, resume security, job matching accuracy, and platform features."
  });
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Workisy's AI-powered job matching work?",
      answer: "Workisy's intelligent AI analyzes your resume, skills, experience, and career preferences to match you with the most relevant opportunities from our database of 1.27 million+ jobs worldwide. Our advanced machine learning algorithms understand both job requirements and your unique profile, delivering highly personalized career recommendations."
    },
    {
      question: "Is my resume data secure and private?",
      answer: "Yes, absolutely. We use enterprise-grade security measures to protect your data. Your resume and personal information are encrypted and stored securely. We never share your data with third parties without your explicit consent."
    },
    {
      question: "How accurate are Workisy's job matches?",
      answer: "Workisy's AI achieves an impressive 90%+ accuracy rate in job matching. Our system continuously learns from user feedback, successful placements, and career progression data to improve match quality. The more you interact with our platform, the smarter our recommendations become."
    },
    {
      question: "Can I upload multiple resume formats?",
      answer: "Yes, we support PDF, DOC, and DOCX formats. Our system can parse various resume layouts and extract relevant information. We recommend PDF format for best results."
    },
    {
      question: "How often are new jobs added to Workisy?",
      answer: "New opportunities are added to Workisy daily from our extensive network of 5000+ global partner companies and job boards. Our AI-powered system crawls and indexes job postings in real-time across multiple countries and industries, ensuring you always have access to the freshest career opportunities worldwide."
    },
    {
      question: "Is there a cost to use Workisy?",
      answer: "Workisy's core job search and AI matching features are completely free for all users. We also offer Workisy Premium with advanced features like priority job matching, detailed career analytics, personalized career coaching, and exclusive access to premium job opportunities."
    },
    {
      question: "How do I improve my job match results on Workisy?",
      answer: "To optimize your Workisy experience: keep your profile updated with latest skills and experience, ensure your resume contains relevant industry keywords, set accurate location and salary preferences, and actively provide feedback on job recommendations. Our AI learns from every interaction to deliver increasingly personalized matches tailored to your career goals."
    },
    {
      question: "Can I set up job alerts?",
      answer: "Yes, you can set up custom job alerts based on location, salary, company type, and specific keywords. You'll receive notifications when new matching opportunities are found."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {seoComponent}
    <div className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-1 bg-purple-500 rounded-full transform rotate-12 opacity-60"></div>
      <div className="absolute top-32 right-20 w-24 h-1 bg-purple-500 rounded-full transform -rotate-45 opacity-60"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-purple-500 rounded-full transform rotate-45 opacity-60"></div>
      <div className="absolute bottom-32 right-10 w-28 h-1 bg-purple-500 rounded-full transform -rotate-12 opacity-60"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Workisy's AI-powered job matching platform
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-purple-600 transform transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6">
                  <div className="h-px bg-gradient-to-r from-purple-200 to-blue-200 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-purple-100 mb-6">
              Our AI-powered support team is here to help you find your perfect career match
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-300 transform hover:scale-105"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FAQ; 