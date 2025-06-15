import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./pages/Layout";
import JobCards from "./pages/JobCards";
import { ToastContainer } from "react-toastify";
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
      </Routes>
    </Router>
  );
};

export default App;
