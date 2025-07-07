import { Box, Button, Stack, Typography } from "@mui/material";
import JobCard from "../Components/AuthJobCard";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../Components/useIsMobile";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import useJobStore from "../store/jobStore";

const OAuthSuccess = () => {
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const hasOpened = useRef(false);
  const { setJobs } = useJobStore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = new URLSearchParams(location.search);

  const onSubmit = () => {
    const jobUrl = params.get("jobUrl");
    if (jobUrl && !hasOpened.current) {
      hasOpened.current = true;
      window.open(jobUrl, "_blank");
      localStorage.removeItem("jobs");
      localStorage.removeItem("selected_job");
      navigate("/jobs");
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#F44336",
      "#E91E63",
      "#9C27B0",
      "#3F51B5",
      "#2196F3",
      "#03A9F4",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const token = params.get("token");
    const userData = params.get("user");
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    const selectedJob = JSON.parse(localStorage.getItem("selected_job"));

    console.log(params, jobs, "oauth");

    // if (!userData?.id || !token) navigate("/");

    if (jobs) {
      console.log(jobs);
      setJob(selectedJob);
      setJobs(jobs);
    }

    if (token && userData) {
      document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=None; Secure`;
      document.cookie = `user_data=${encodeURIComponent(
        userData
      )}; path=/; max-age=86400; SameSite=None; Secure`;

      if (!userData?.user_data?.profile_img)
        Cookies.set("profile_bg", getRandomColor());
    }
  }, []);

  // if (!params.get("token") || !params.get("user")) return null;

  return (
    <Box
      sx={
        isMobile
          ? { p: 4, marginTop: "5rem" }
          : {
              p: 4,
              maxWidth: "calc(100vw - 250px)",
              margin: "5rem auto 0 auto",
            }
      }
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        mb={1}
        fontSize={isMobile ? "20px" : "inital"}
      >
        SignUp Successfull
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        mb={4}
        fontSize={isMobile ? "14px" : "inital"}
      >
        Kindly click the apply button we can directly take you to the JobPage
      </Typography>
      <Stack
        gap={2}
        justifyContent="center"
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "605px",
        }}
      >
        <JobCard job={job} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: "24px",
            background: "#0066B3",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            textTransform: "capitalize",
            padding: "10px",
            marginTop: "16px",

            "&.Mui-disabled": {
              opacity: 0.5,
              background: "#1976d2",
              color: "#FFF",
              cursor: "not-allowed",
            },
          }}
          onClick={onSubmit}
        >
          Apply
        </Button>
      </Stack>
    </Box>
  );
};

export default OAuthSuccess;
