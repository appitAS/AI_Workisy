import React, { useEffect, useState } from "react";
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
import StopRoundedIcon from '@mui/icons-material/StopRounded';
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

const ModelSelect = styled(Select)(({ theme }) => ({
  minWidth: "160px",
  marginRight: "8px",
  "& .MuiSelect-select": {
    padding: "10px 14px",
    backgroundColor: "#fff",
    borderRadius: "16px !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#4c4c4c",
  margin: "0 4px",
  "&:hover": {
    backgroundColor: "#E0E4ED",
  },
}));

const LargeActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#4c4c4c",
  borderRadius: "16px",
  padding: "8px 16px",
  margin: "0 4px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#E0E4ED",
  },
}));

const ChatInput = () => {
  const [searchText, setSearchText] = useState("");
  const { onselectedModel, setJobs, setIsLoading, isLoading, setPrompt } =
    useJobStore();

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

  const [model, setModel] = React.useState("sonar");

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
          height: "300px", // Taller input like DeepSeek
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
        <ModelSelect
          value={model}
          onChange={(e) => setModel(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="sonar">sonar</MenuItem>
          <MenuItem value="sonar pro">sonar pro</MenuItem>
        </ModelSelect>
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
          <ActionButton>
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
            {isLoading ? <StopRoundedIcon /> : <ArrowUpwardIcon /> }
         
          </ActionButton>
        </Box>
      </div>
    </SearchContainer>
  );
};

export default ChatInput;
