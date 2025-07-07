import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Layout from "./pages/Layout";
import JobCards from "./pages/JobCards";
import UploadResume from "./pages/UploadResume";
import MainPage from "./pages/AuthMainPage";
import ContactUs from "./Components/ContactUs";
import FAQ from "./Components/FAQ";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./Components/AboutUs";

import { pdfjs } from "react-pdf";
import OAuthSuccess from "./pages/OAuthSuccess";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        {/* Global toast container */}
        <ToastContainer />

        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/jobs" element={<JobCards />} />
              <Route path="/signup" element={<MainPage />} />
              <Route path="/upload-resume" element={<UploadResume />} />
              <Route path="/signup-sucess" element={<OAuthSuccess />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
