import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { styled } from "@mui/material/styles";
import Loader from "./Loader";
import {
  showErrorToast,
  showNoJobsToast,
} from "./ToastNotifier";
import axios from "axios";
import useJobStore from "../store/jobStore";
import { useNavigate, useLocation } from "react-router-dom";

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
  const { onselectedModel, setJobs, setIsLoading, isLoading, setPrompt } = useJobStore()
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    // setLoading(true);
    setIsLoading(true);
     setJobs([]);
     setPrompt("");

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
      setPrompt(searchText);
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
      // setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") handleSearch();
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [searchText, onselectedModel]);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 10,
        boxShadow: "0 2px 12px 0 rgba(123,47,242,0.07)",
        background: "#fff",
        border: "3px solid #D2E8FF",
        px: 2,
        display: "flex",
        alignItems: "center",
        minHeight: 70,
        maxWidth: 1500,
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Looking Java Jobs in Delhi 7 years Experience 10 LPA"
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: 17,
            color: "#222",
            pl: 2,
            pr: 7,
          },
        }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ flex: 1, background: "transparent" }}
      />

      <ArrowButtonWrapper onClick={handleSearch} aria-label="search button">
        {isLoading && <Loader />}
        <ArrowUpwardIcon sx={{ color: "#fff", fontSize: 28, zIndex: 1 }} />
      </ArrowButtonWrapper>
    </Box>
  );
}
