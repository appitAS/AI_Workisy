import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  IconButton,
  Paper,
  styled,
  Stack,
  Menu,
  MenuItem,
  Typography,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  ArrowUpward as ArrowUpwardIcon,
  StopRounded as StopRoundedIcon,
  Tune as TuneIcon,
} from "@mui/icons-material";
import useJobStore from "../store/jobStore";
import endpoints from "../utils/endPoint";
import { showErrorToast, showNoJobsToast } from "./ToastNotifier";
import axios from "axios";

// Global cancel token
let cancelTokenSource = null;

const ChatInputContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  gap: theme.spacing(1),
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  border: "1px solid rgba(0, 113, 243, 0.16)",
  width: "100%",
  maxWidth: "900px",
  margin: "auto",
  flexWrap: "wrap",
  boxShadow:
    "rgba(0, 0, 0, 0.02) 0px 1px 3px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
}));

const StyledTextField = styled(TextField)({
  flex: 1,
  minWidth: "250px",
  "& .MuiOutlinedInput-root": {
    padding: "10px 14px",
    backgroundColor: "transparent",
    "& fieldset": { border: "none" },
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#6c757d",
    opacity: 1,
    fontSize: "0.95rem",
  },
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#f1f1f1",
  borderRadius: "8px",
  padding: 8,
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
}));

const SendButton = styled(IconButton)(({ theme, disabled }) => ({
  backgroundColor: disabled ? "#e0e0e0" : theme.palette.primary.main,
  color: disabled ? "#9e9e9e" : "#ffffff",
  padding: 10,
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: disabled
      ? "#e0e0e0"
      : theme.palette.primary.dark,
  },
}));

const ModelBadge = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: "0.65rem",
  fontWeight: 600,
  color: "#fff",
  backgroundColor: theme.palette.success.main,
}));

const allModels = [
  {
    label: "SNR",
    name: "sonar",
    comment: "Fast & efficient model",
    badge: "Default",
    badgeColor: "primary",
  },
  {
    label: "SNR-Pro",
    name: "sonar-pro",
    comment: "More accurate answers",
    badge: "Pro",
    badgeColor: "secondary",
  },
];

const ChatInput = () => {
  const [searchText, setSearchText] = useState("");
  const fileInputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const prevJobsRef = useRef([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    onselectedModel,
    setOnselectedModel,
    setJobs,
    setIsLoading,
    isLoading,
    setPrompt,
    setError,
    jobs,
  } = useJobStore();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSelectModel = (modelName) => {
    const selected = allModels.find((model) => model.name === modelName);
    if (selected) setOnselectedModel(selected);
    handleMenuClose();
  };

  const handleSearch = async () => {
    if (isLoading) {
      // Cancel current request and restore jobs
      cancelTokenSource?.cancel("Search stopped by user.");
      setIsLoading(false);
      setJobs(prevJobsRef.current); // Restore previous jobs
      return;
    }

    if (!searchText.trim()) return;

    setIsLoading(true);
    prevJobsRef.current = jobs; // Save previous jobs before clearing
    setJobs([]);
    setPrompt("");

    cancelTokenSource = axios.CancelToken.source();

    try {
      const storedUserId = sessionStorage.getItem("job_session_id");
      const response = await axios.post(
        endpoints.getJobsFromConversion.url,
        {
          model: onselectedModel.name,
          message: searchText,
          userId: storedUserId || null,
        },
        { cancelToken: cancelTokenSource.token }
      );

      const { userId: newUserId, jobs } = response.data?.data || {};
      if (newUserId && !storedUserId)
        sessionStorage.setItem("job_session_id", newUserId);

      setPrompt(searchText);

      if (Array.isArray(jobs) && jobs.length > 0) {
        setJobs(jobs);
      } else {
        setJobs([]);
        showNoJobsToast("No jobs found. Try another keyword.");
        setError({ status: 404, message: "No jobs found." });
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Search was cancelled.");
      } else {
        const errorMsg =
          err?.response?.data?.error || "Something went wrong.";
        showErrorToast(errorMsg);
        setError({ status: 500, message: errorMsg });
      }
    } finally {
      setIsLoading(false);
      setSearchText("");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || isLoading) return;

    setIsLoading(true);
    prevJobsRef.current = jobs;
    setJobs([]);
    setPrompt("");

    const formData = new FormData();
    formData.append("model", onselectedModel.name);
    formData.append("resume", file);
    formData.append(
      "userId",
      sessionStorage.getItem("job_session_id") || null
    );

    try {
      const response = await axios.post(endpoints.getJobFromResume.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { jobs, prompt } = response.data?.data || {};

      if (jobs && jobs.length > 0) {
        setJobs(jobs);
        setPrompt(prompt || `Jobs based on resume: ${file.name}`);
      } else {
        setJobs([]);
        showErrorToast("No matching jobs found for your resume.");
        setError({ status: 404, message: "No jobs found." });
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error || "Failed to upload resume.";
      showErrorToast(errorMsg);
      setError({ status: 500, message: errorMsg });
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && !e.shiftKey && !isMobile) {
        e.preventDefault();
        handleSearch();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [searchText, onselectedModel, isLoading, isMobile]);

  return (
    <ChatInputContainer elevation={0}>
      <StyledTextField
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Describe your ideal job..."
        variant="outlined"
        fullWidth
        multiline
        maxRows={4}
        disabled={isLoading}
      />
      <Stack direction="row" spacing={1} alignItems="center">
        <StyledIconButton onClick={handleMenuOpen} disabled={isLoading}>
          <TuneIcon />
        </StyledIconButton>
        <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
          {allModels.map((model) => (
            <MenuItem
              key={model.name}
              onClick={() => handleSelectModel(model.name)}
              selected={onselectedModel.name === model.name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Box>
                <Typography fontSize="0.85rem" fontWeight="500">
                  {model.label}
                </Typography>
                <Typography fontSize="0.7rem" color="text.secondary">
                  {model.comment}
                </Typography>
              </Box>
              <Chip
                label={model.badge}
                size="small"
                color={model.badgeColor}
                sx={{ fontSize: "0.65rem" }}
              />
            </MenuItem>
          ))}
        </Menu>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          disabled={isLoading}
        />
        <StyledIconButton
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
        >
          <AttachFileIcon />
        </StyledIconButton>

        <SendButton
          disabled={!searchText.trim() && !isLoading}
          onClick={handleSearch}
          aria-label="send"
        >
          {isLoading ? (
            <StopRoundedIcon fontSize="small" />
          ) : (
            <ArrowUpwardIcon />
          )}
        </SendButton>
      </Stack>
    </ChatInputContainer>
  );
};

export default ChatInput;
