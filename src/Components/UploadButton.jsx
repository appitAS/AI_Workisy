import React, { useRef, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import axios from "axios";
import { showErrorToast } from "./ToastNotifier"; // import toasts
import useJobStore from "../store/jobStore";
import { useNavigate, useLocation } from "react-router-dom";
import endpoints from "../utils/endPoint";

export default function UploadButton() {
  const { onselectedModel, setJobs, setPrompt, setIsLoading, isLoading } =
    useJobStore();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    setJobs([]); // Clear previous jobs
    setPrompt(""); // Clear previous prompt

    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("model", "sonar");
    formData.append("resume", file);
    formData.append("userId", sessionStorage.getItem("job_session_id") || null);
    if (location.pathname !== "/jobs") {
      navigate("/jobs");
    }

    try {
      const response = await axios.post(
        endpoints.getJobFromResume.url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const jobs = response?.data?.data?.jobs;

      if (jobs && jobs.length > 0) {
        // showSuccessToast("Jobs fetched successfully!");
        setJobs(jobs);
        setPrompt(response?.data?.data?.prompt || "");
        sessionStorage.setItem('job_session_id', response?.data?.data?.userId) // Set the prompt from response
      } else {
        showErrorToast("No jobs found in your resume.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showErrorToast("Failed to upload resume. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 500, md: 620 },
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
      />

      <Button
        variant="outlined"
        startIcon={
          isLoading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <CloudUploadOutlinedIcon sx={{ color: "#7b2ff2", fontSize: 22 }} />
          )
        }
        onClick={() => fileInputRef.current.click()}
        disabled={isLoading}
        sx={{
          mt: 2,
          borderRadius: "30px",
          px: 3,
          py: 1.2,
          borderColor: "#7b2ff2",
          color: "#7b2ff2",
          fontWeight: 600,
          fontSize: 16,
          textTransform: "none",
          transition: "all 0.2s",
          "&:hover": {
            background: "#f7f0fe",
            borderColor: "#7b2ff2",
          },
        }}
      >
        {fileName || "Upload Your Resume"}
      </Button>
    </Box>
  );
}
