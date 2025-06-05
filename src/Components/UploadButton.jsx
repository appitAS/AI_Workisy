import React, { useRef, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "./ToastNotifier"; // import toasts

export default function UploadButton({ setJobs }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const formData = new FormData();
    formData.append("model", "sonar");
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://jobsearchagent.onrender.com/jobs_from_resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const jobs = response.data.jobs;
      console.log("resume respone=>>",jobs)
      if (jobs && jobs.length > 0) {
        showSuccessToast("Jobs fetched successfully!");
        setJobs(jobs);
      } else {
        showErrorToast("No jobs found in your resume.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showErrorToast("Failed to upload resume. Try again.");
    } finally {
      setLoading(false);
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
          loading ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            <CloudUploadOutlinedIcon sx={{ color: "#7b2ff2", fontSize: 22 }} />
          )
        }
        onClick={() => fileInputRef.current.click()}
        disabled={loading}
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
