import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  Button,
  Avatar,
  styled,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import Cookies from "js-cookie";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import JobCardSearchBar from "../Components/JobCardSercBar";
import useJobStore from "../store/jobStore";
import BackButton from "../Components/BackButton";
import JobCardSkeleton from "../Components/JobCardSkeleton";
import NotFound from "../Components/NotFound";
import { useEffect, useRef } from "react";

export const CompanyLogoOrAvatar = ({ logo, company }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    {logo ? (
      <Box sx={{ mr: 1 }}>{logo}</Box>
    ) : (
      <Avatar
        sx={{
          width: 44,
          height: 44,
          mr: 1,
          background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
          fontWeight: 700,
          fontSize: 28,
        }}
      >
        {company?.[0]?.toUpperCase() || "?"}
      </Avatar>
    )}
    <Typography variant="subtitle1" sx={{ color: "#757575", fontWeight: 500 }}>
      {company}
    </Typography>
  </Box>
);

const JobCard = () => {
  const { jobs, isLoading, prompt, error } = useJobStore();

  const location = useLocation();
  const navigate = useNavigate();
  const hasOpened = useRef(false);

  const userData = Cookies.get("user_data")
    ? JSON.parse(Cookies.get("user_data"))
    : "";

  const getValidUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const isUserLoggedIn = () => {
    return !!Cookies.get("user_data");
  };

  const handleViewJob = (job) => {
    if (isUserLoggedIn()) {
      if (!userData?.resume_id)
        navigate("/upload-resume", {
          state: { job: { ...job, job_url: getValidUrl(job.job_url) } },
        });
      else window.open(getValidUrl(job.job_url), "_blank");
    } else {
      navigate("/signup", {
        state: { job: { ...job, job_url: getValidUrl(job.job_url) } },
      });
    }
  };

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);

  //   const jobUrl = params.get("jobUrl");
  //   if (jobUrl && !hasOpened.current) {
  //     hasOpened.current = true;
  //     window.open(jobUrl, "_blank");
  //     navigate("/jobs");
  //   }
  // }, []);

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

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 270,
      fontSize: theme.typography.pxToRem(16),
      border: "1px solid #dadde9",
      Padding: "8px",
    },
  }));

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const token = params.get("token");
    const userData = params.get("user");

    // ✅ Set cookies in browser
    if (token && userData) {
      document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=None; Secure`;
      document.cookie = `user_data=${encodeURIComponent(
        userData
      )}; path=/; max-age=86400; SameSite=None; Secure`;

      if (!userData?.user_data?.profile_img)
        Cookies.set("profile_bg", getRandomColor());
    }

    // ✅ Handle jobUrl redirection
    const jobUrl = params.get("jobUrl");
    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
    if (jobUrl && urlPattern.test(jobUrl) && !hasOpened.current) {
      hasOpened.current = true;
      window.open(jobUrl, "_blank");
      navigate("/jobs");
    }
  }, []);
  return (
    <>
      {!isLoading && error ? (
        <NotFound />
      ) : (
        <Box
          sx={{
            marginTop: "3rem",
            display: "flex",
            flexDirection: "column",
            pb: { xs: 10, sm: 10 },
            background: "#fff",
          }}
        >
          {/* Top message */}
          <BackButton />

          {!isLoading && !!prompt && (
            <Box sx={{ px: { xs: 2, sm: 33 }, pt: 4 }}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  fontWeight: 500,
                  color: "black",
                  fontSize: "18px",
                  gap: "8px",
                }}
              >
                <AutoAwesomeIcon
                  sx={{ marginBottom: "1rem", color: "#7b2ff2", fontSize: 18 }}
                />
                Based on your search : {prompt} ,here’s a concise overview of
                the current job landscape
              </Typography>
            </Box>
          )}

          {/* Cards Grid */}
          <Box sx={{ p: { xs: 2, sm: 4 }, mt: 0.5 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "24px",
              }}
            >
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))
                : jobs.map((job, index) => (
                    <Card
                      key={index}
                      sx={{
                        flexBasis: {
                          xs: "100%",
                          sm: "calc(50% - 24px)",
                          md: "calc(33.33% - 24px)",
                        },
                        maxWidth: 350,
                        p: 2,
                        borderRadius: "18px 18px 25px 25px",
                        background: "#fff",
                        position: "relative",
                        boxShadow: `
                  #D2E8FF 0px 20px 0px 0px inset,
                  #D2E8FF 10px 0px 0px 0px inset,
                  #D2E8FF -10px 0px 0px 0px inset,
                  #D2E8FF 0px -70px 0px 0px inset
                `,
                      }}
                    >
                      <CardContent sx={{ px: 3, pt: 2.5, pb: 10 }}>
                        <CompanyLogoOrAvatar
                          logo={job.logo}
                          company={job.company_name}
                        />

                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 0.5, color: "#222" }}
                        >
                          {job.job_title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 500,
                            color: "#4b4b4b",
                            mb: 1.5,
                            fontSize: 17,
                            letterSpacing: 0.1,
                          }}
                        >
                          {job.salary}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mb: 2 }}
                          flexWrap="wrap"
                        >
                          <Chip
                            label={job.job_type}
                            size="small"
                            sx={{
                              background: "#E6F0FA",
                              color: "#1976d2",
                              fontWeight: 600,
                              fontSize: 13,
                              borderRadius: 2,
                            }}
                          />
                        </Stack>

                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700, mb: 0.5, color: "#222" }}
                        >
                          Job Description
                        </Typography>
                        <HtmlTooltip
                          title={job.job_description}
                          placement="top"
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666",
                              mb: 1.5,
                              lineHeight: 1.5,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              wordBreak: "break-word",
                            }}
                          >
                            {job.job_description}
                          </Typography>
                        </HtmlTooltip>

                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700, mb: 0.5, color: "#222" }}
                        >
                          Skills
                        </Typography>
                        <Stack
                          direction="row"
                          flexWrap="wrap"
                          spacing={1}
                          sx={{
                            mb: 2,
                            rowGap: 0.3,
                            maxHeight: "6.5rem",
                            overflow: "hidden",
                          }}
                        >
                          {job.skills?.map((skill, idx) => (
                            <Chip
                              key={idx}
                              label={skill}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderColor: "#D2E8FF",
                                color: "#1976d2",
                                fontWeight: 500,
                                mt: 0.5,
                                mb: 0.5,
                                borderRadius: 3,
                                fontSize: 13,
                              }}
                            />
                          ))}
                        </Stack>

                        <Stack
                          direction="column"
                          spacing={2}
                          justifyContent="space-between"
                          alignItems="flex-start"
                          sx={{ mb: 1 }}
                        >
                          <Stack
                            direction="row"
                            alignItems="flex-start"
                            gap={1}
                          >
                            <SchoolIcon
                              sx={{ color: "#1976d2", fontSize: 20, mt: "1px" }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ color: "#222", fontWeight: 600 }}
                              >
                                Education
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "#222",
                                  fontWeight: 500,
                                  lineHeight: 1,
                                }}
                              >
                                {job.education_qualification}
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack
                            direction="row"
                            alignItems="flex-start"
                            gap={1}
                          >
                            <LocationOnIcon
                              sx={{ color: "#1976d2", fontSize: 20, mt: "2px" }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ color: "#222", fontWeight: 600 }}
                              >
                                Job Location
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "#222",
                                  fontWeight: 500,
                                  lineHeight: 1,
                                }}
                              >
                                {job.job_location}
                              </Typography>
                            </Box>
                          </Stack>
                        </Stack>
                      </CardContent>

                      <Box
                        sx={{
                          py: 0.5,
                          px: 0.5,
                          position: "absolute",
                          bottom: 16,
                          left: 16,
                          right: 16,
                        }}
                      >
                        <Button
                          onClick={() => handleViewJob(job)}
                          variant="contained"
                          fullWidth
                          sx={{
                            color: "white",
                            borderRadius: 5,
                            fontWeight: 600,
                            fontSize: 16,
                            textTransform: "none",
                            boxShadow: "none",
                            py: 0.5,
                            "&:hover": {
                              backgroundColor: "#1976d2",
                              color: "white",
                            },
                          }}
                        >
                          View Jobs
                        </Button>
                      </Box>
                    </Card>
                  ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* Search Bar Fixed Bottom */}
      <Box
        sx={{
          width: "100vw",
          position: "fixed",
          bgcolor: "#fff",
          zIndex: 1000,
          bottom: 0,
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: 500, md: 900 },
            margin: "0 auto",
            p: 2,
          }}
        >
          <JobCardSearchBar />
        </Box>
      </Box>
    </>
  );
};

export default JobCard;
