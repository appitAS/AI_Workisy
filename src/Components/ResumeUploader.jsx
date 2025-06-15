import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { showErrorToast } from "./ToastNotifier";
import useJobStore from "../store/jobStore";
import FileRenderer from "./FileRenderer";

export default function ResumeUploader() {
  const { resumeFile, setResumeFile } = useJobStore();

  console.log(resumeFile, "resme");

  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    processFile(selected);
  };

  const processFile = (file) => {
    if (file && file.size < 1024 * 1024) {
      setResumeFile(file);
      setPreview(URL.createObjectURL(file));
    } else showErrorToast("Resume File should be less than 1 MB");
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
      processFile(droppedFile);
      e.dataTransfer.clearData();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleResetFile = () => {
    setResumeFile(null);
    setPreview(null);
  };

  // useEffect(() => {
  //   if (resumeFile) processFile(resumeFile);
  // }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#e8f0fe",
        padding: "32px 48px 48px 48px",
        borderRadius: 3,
        position: "relative",
      }}
    >
      <input
        type="file"
        hidden
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
      />
      {resumeFile && (
        <IconButton
          sx={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "4px",
            background: "#FFF",
            color: "#fa0202",
            boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.10)",
          }}
          onClick={handleResetFile}
        >
          <CloseRoundedIcon />
        </IconButton>
      )}

      <Box mt={2} display="flex" justifyContent="center" alignItems="center">
        {resumeFile ? (
          <FileRenderer file={resumeFile} />
        ) : (
          <Stack
            alignItems="center"
            spacing={1}
            sx={{
              borderRadius: "16px",
              border: dragOver
                ? "2px dashed #1976d2"
                : "1px dashed rgba(0, 0, 0, 0.24)",
              background: dragOver ? "#e3f2fd" : "#FFF",
              padding: "70px",
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
            <Typography>Maximum Size: 1 MB</Typography>
          </Stack>
        )}
      </Box>
    </Paper>
  );
}
