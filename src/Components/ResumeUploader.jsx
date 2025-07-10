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
  Tooltip,
} from "@mui/material";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { showErrorToast } from "./ToastNotifier";
import useJobStore from "../store/jobStore";
// import FileRenderer from "./FileRenderer";
import axios from "axios";
import endpoints from "../utils/endPoint";
import Cookies from "js-cookie";

const ResumeUploader = () => {
  const { resumeFile, setResumeFile } = useJobStore();

  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(100);
  const fileInputRef = useRef();

  const userData = Cookies.get("user_data")
    ? JSON.parse(Cookies.get("user_data"))
    : "";

  const uploadResume = async (file) => {
    try {
      setLoading(true);
      setUploadProgress(0);
      const formData = new FormData();
      formData.append("file", file);

      const endPoint = userData?.id
        ? `${endpoints.uploadResume.url}/${userData.id}`
        : endpoints.uploadResume.url;

      const { data } = await axios.post(endPoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percent);
          setUploadProgress(percent);
        },
      });

      setResumeFile(data?.filePath);
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
      setTimeout(() => setLoading(false), 500);
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

  const RenderFilePreview = () => {
    const fileName = resumeFile
      ? resumeFile.split("/").pop().split("-").slice(2).join("-")
      : "uploaded_file";

    const fileExt = fileName.split(".").pop().toLowerCase();

    const isPdf = fileExt === "pdf";

    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          mt: 2,
          p: 2,
          border: "1px solid #ccc",
          background: "#FFF",
          borderRadius: "12px",
          position: "relative",
          overflow: "auto",
        }}
      >
        {isPdf ? (
          <PictureAsPdfIcon sx={{ color: "#d32f2f", fontSize: 32 }} />
        ) : (
          <DescriptionIcon sx={{ color: "#1976d2", fontSize: 32 }} />
        )}

        <Stack sx={{ flex: 1 }}>
          <Tooltip title={fileName}>
            <Typography variant="body1" fontWeight={600} noWrap maxWidth={390}>
              {fileName}
            </Typography>
          </Tooltip>
          <Box
            sx={{
              height: "6px",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              mt: 1,
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${uploadProgress}%`,
                backgroundColor: "#0066B3",
                borderRadius: "4px",
                transition: "width 0.3s ease-in-out",
              }}
            />
          </Box>
        </Stack>

        <IconButton
          onClick={() => {
            setResumeFile(null);
            setUploadProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = null;
          }}
        >
          <CloseRoundedIcon color="error" />
        </IconButton>
      </Stack>
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#e8f0fe",
        padding: "16px",
        borderRadius: 3,
        position: "relative",
        height: "auto",
        overflow: "auto",
        width: "560px",
        marginLeft: "auto",
      }}
    >
      {/* {resumeFile && (
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
      )} */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Box sx={{ width: "100%" }}>
          {/* {resumeFile ? (
          <FileRenderer file={resumeFile} key={resumeFile} />
        ) : (
          <> */}
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
              pointerEvents: resumeFile ? "none" : "auto",
              opacity: resumeFile ? 0.5 : 1,
            }}
            onDragOver={(e) => !resumeFile && handleDragOver(e)}
            onDragLeave={(e) => !resumeFile && handleDragLeave(e)}
            onDrop={(e) => !resumeFile && handleDrop(e)}
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
                background: "#0066B3",
                maxWidth: "300px",
                padding: "8px 16px",
              }}
              variant="outlined"
              onClick={handleButtonClick}
              disabled={!!resumeFile}
              fullWidth
            >
              Browse
            </Button>
            <Typography>Maximum Size: 10 MB</Typography>
          </Stack>

          {resumeFile && <RenderFilePreview />}
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default ResumeUploader;
