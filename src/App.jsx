import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Layout from "./Components/Layout";
import JobCards from "./Components/JobCards";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <Router>
      {/* Global toast container */}
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/jobs" element={<JobCards />} />
      </Routes>
    </Router>
  );
}

export default App;
