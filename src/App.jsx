import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import JobCards from "./Components/JobCards";
import { ToastContainer } from "react-toastify";
import MainPage from "./Components/AuthMainPage";
function App() {
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
}

export default App;
