import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { showErrorToast, showNoJobsToast } from "./ToastNotifier";
import axios from "axios";
import useJobStore from "../store/jobStore";
import { useNavigate, useLocation } from "react-router-dom";
import ChatInput from "./ChatInput";

const ArrowButtonWrapper = styled("div")({
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  width: 50,
  height: 50,
  borderRadius: "50%",
  background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px 0 rgba(123,47,242,0.10)",
  cursor: "pointer",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-50%) scale(1.1)",
  },
});

export default function JobCardSearchBar() {
  const [searchText, setSearchText] = useState("");
  const { onselectedModel, setJobs, setIsLoading, isLoading } = useJobStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsLoading(true);
    setJobs([]);

    if (location.pathname !== "/jobs") {
      navigate("/jobs");
    }

    try {
      const storedUserId = sessionStorage.getItem("job_session_id");

      const response = await axios.post(
        "https://workisybackendnodejs.onrender.com/api/jobs",
        {
          model: onselectedModel.name,
          message: searchText,
          userId: storedUserId || null,
        }
      );

      const { userId: newUserId, jobs } = response.data?.data || {};

      if (newUserId && !storedUserId) {
        sessionStorage.setItem("job_session_id", newUserId);
      }

      if (Array.isArray(jobs) && jobs.length > 0) {
        setJobs(jobs);
        // showSuccessToast("Jobs fetched successfully.");
      } else {
        setJobs([]);
        showNoJobsToast("No jobs found. Try another keyword.");
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.error || "Something went wrong. Please try again.";
      showErrorToast(errorMsg);
    } finally {
      setIsLoading(false);
      setSearchText(""); // Clear search text after search
    }
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") handleSearch();
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [searchText, onselectedModel]);

  return <ChatInput />;
}
