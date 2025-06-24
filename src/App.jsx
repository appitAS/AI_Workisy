import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar";
import Layout from "./pages/Layout";
import JobCards from "./pages/JobCards";
import UploadResume from "./pages/UploadResume";
import MainPage from "./pages/AuthMainPage";

const App = () => {
  return (
    <Router>
      {/* Global toast container */}
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/jobs" element={<JobCards />} />
        <Route path="/signup" element={<MainPage />} />
        <Route path="/upload-resume" element={<UploadResume />} />
      </Routes>
    </Router>
  );
};

export default App;
