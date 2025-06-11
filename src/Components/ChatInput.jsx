import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Search as SearchIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import useJobStore from "../store/jobStore";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import axios from "axios";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import endpoints from "../utils/endPoint";
import { showNoJobsToast } from "./ToastNotifier";
const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "800px", // Wider like DeepSeek
  margin: "0 auto",
  backgroundColor: "#f5f5f5",
  borderRadius: "24px",
  padding: "4px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
}));

const SearchInput = styled(TextField)({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: "16px 14px", // Taller input
  },
});

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#4c4c4c",
  margin: "0 4px",
  "&:hover": {
    backgroundColor: "#E0E4ED",
  },
}));

const allModels = [
  { label: "SNR", name: "sonar", comment: "Perplexity's fast model" },
  {
    label: "SNR-Pro",
    name: "sonar-pro",
    comment: "Anthropic's advanced model",
    badge: "new",
    badgeColor: "primary",
  },
];

const DeepThinkButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#4c4c4c",
  borderRadius: "24px",
  padding: "8px 16px",
  fontSize: "10px",
  fontWeight: 500,
  textTransform: "none",
  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  borderColor: "rgba(0, 0, 0, 0.12)",
  "&:hover": {
    backgroundColor: "#E0E4ED",
    boxShadow: "0 2px 4px rgba(0,0,0,0.16)",
  },
}));

const ChatInput = () => {
  const [searchText, setSearchText] = useState("");
  const {
    onselectedModel,
    setJobs,
    setIsLoading,
    isLoading,
    setPrompt,
    setOnselectedModel,
    setError
  } = useJobStore();

  const navigate = useNavigate();
  const location = useLocation();
  const handleSelectModel = (modelName) => {
    console.log("Selected model:", modelName);
    const selectedModel = allModels.find((model) => model.name === modelName);
    if (selectedModel) {
      setOnselectedModel(selectedModel);
    }
  };
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
      console.log("correct seach")
      const storedUserId = sessionStorage.getItem("job_session_id");

      const response = await axios.post(
        endpoints.getJobsFromConversion.url,
        {
          model: onselectedModel.name,
          message: searchText,
          userId: storedUserId || null,
        }
      );

      const { userId: newUserId, jobs } = response.data?.data || {};

      console.log(".......data",   jobs)
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
        setError({status: 404, message: "No jobs found."});
      }
    } catch (err) {
      const errorMsg =
        err?.response?.data?.error || "Something went wrong. Please try again.";
      showErrorToast(errorMsg);
    } finally {
      // setLoading(false);
      setIsLoading(false);
      setSearchText(""); // Clear search text after search
    }
  };

  //for the attachmment
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
      consolelog("Response data:", jobs);
      if (jobs && jobs.length > 0) {
        // showSuccessToast("Jobs fetched successfully!");
        setJobs(jobs);
        setPrompt(response?.data?.data?.prompt || ""); // Set the prompt from response
      } else {
        showErrorToast("No jobs found in your resume.");
        setError({status: 404, message: "No jobs found in your resume."});
      }
    } catch (error) {
      console.error("Upload failed:", error);
      showErrorToast("Failed to upload resume. Try again.");
    } finally {
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
    <SearchContainer
      style={{
        zIndex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "10px",
        display: "flex",
        overflow: "hidden",
        backgroundColor: "rgb(243 244 246)",
        boxShadow: "0px 0px 0px .5px #dce0e9",
        borderRadius: "24px",
      }}
    >
      {/* Left side - Attachment button */}

      {/* Model selector */}

      {/* Main search input */}
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Looking Java Jobs in Delhi 7 years Experience 10 LPA"
        variant="outlined"
        fullWidth
        style={{
          height: "200px", // Taller input like DeepSeek
        }}
      />

      {/* Right side actions */}
      <div
        style={{
          width: "calc(100% - 2px)",
          paddingLeft: "2px",
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: "4px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "7px",
          }}
        >
          {allModels.map((model) => (
            <DeepThinkButton
              key={model.name}
              onClick={() => handleSelectModel(model.name)}
              style={{
                backgroundColor:
                  onselectedModel.name === model.name ? "#D2E8FF" : "#fff",
                color: onselectedModel.name === model.name ? "#000" : "#4c4c4c",
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              {model.label}
            </DeepThinkButton>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <LargeActionButton
          startIcon={<SearchIcon />}
        >
          Search
        </LargeActionButton> */}
         <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
            />
          <ActionButton  onClick={() => fileInputRef.current.click()}>
           
            <AttachFileIcon />
          </ActionButton>
          <ActionButton
            disabled={!searchText}
            onClick={handleSearch}
            aria-label="search button"
            style={{
              backgroundColor: !searchText ? "#BDBDBD" : "#1976D2",
              color: "#fff",
              cursor: !searchText ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? <StopRoundedIcon /> : <ArrowUpwardIcon />}
          </ActionButton>
        </Box>
      </div>
    </SearchContainer>
  );
};

export default ChatInput;
