import { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { showErrorToast } from "./ToastNotifier";
import useJobStore from "../store/jobStore";
import FileRenderer from "./FileRenderer";
import axios from "axios";
import endpoints from "../utils/endPoint";
import Cookies from "js-cookie";

export default function ResumeUploader() {
  const { resumeFile, setResumeFile } = useJobStore();

  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const userData = Cookies.get("user_data")
    ? JSON.parse(Cookies.get("user_data"))
    : "";

  const uploadResume = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const endPoint = userData?.id
        ? `${endpoints.uploadResume.url}/${userData.id}`
        : endpoints.uploadResume.url;

      const { data } = await axios.post(endPoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResumeFile(data?.filePath);
      console.log(data, "Resume");
      if (userData?.id)
        Cookies.set(
          "user_data",
          JSON.stringify({ ...userData, resume_id: data?.resume_id })
        );
    } catch (error) {
      console.error(
        "Error uploading resume:",
        error.response?.data || error.message
      );
      showErrorToast("Resume upload failed. Please try again.");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size < 10 * 1024 * 1024) {
        uploadResume(selected);
      } else showErrorToast("Resume File should be less than 10 MB");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      uploadResume(droppedFile);
      e.dataTransfer.clearData();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#e8f0fe",
        padding: "16px",
        borderRadius: 3,
        position: "relative",
        // eslint-disable-next-line no-extra-boolean-cast
        height: !!resumeFile ? "100%" : "auto",
        overflow: "auto",
      }}
    >
      {resumeFile && (
        <IconButton
          sx={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "4px",
            background: "#FFF",
            color: "#fa0202",
            zIndex: 1,
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.10)",
          }}
          onClick={() => setResumeFile(null)}
        >
          <CloseRoundedIcon />
        </IconButton>
      )}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        // eslint-disable-next-line no-extra-boolean-cast
        sx={!!resumeFile ? { height: "100%" } : {}}
      >
        {resumeFile ? (
          <FileRenderer file={resumeFile} key={resumeFile} />
        ) : (
          <>
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              ref={fileInputRef}
            />
            <Stack
              alignItems="center"
              spacing={1}
              sx={{
                borderRadius: "16px",
                border: dragOver
                  ? "2px dashed #1976d2"
                  : "1px dashed rgba(0, 0, 0, 0.24)",
                background: dragOver ? "#e3f2fd" : "#FFF",
                padding: "48px 70px",
                textAlign: "center",
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <BackupRoundedIcon sx={{ color: "#0066B3", fontSize: 60 }} />
              <Typography variant="h6">Drag & Drop your resume here</Typography>
              <Typography>Supported formats: PDF, DOC, DOCX</Typography>
              <Typography>OR</Typography>
              <Button
                sx={{
                  mb: 2,
                  borderRadius: "24px",
                  border: "1px solid  #0066B3",
                  textTransform: "capitalize",
                  color: "#FFF",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "120%",
                  background: "#0066B3",
                  maxWidth: "300px",
                  padding: "8px 16px",
                }}
                variant="outlined"
                onClick={handleButtonClick}
                fullWidth
              >
                Browse
              </Button>
              <Typography>Maximum Size: 10 MB</Typography>
            </Stack>
          </>
        )}
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}
