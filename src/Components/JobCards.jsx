import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import SearchBar from "./SearchBar";

// Microsoft Logo SVG
const CompanyLogoOrAvatar = ({ logo, company }) => (
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

const JobCard = ({ jobs }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) return;
    setLoading(true);
    console.log("Searching:", search);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") handleSearch();
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [search]);

  return (
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
      <Box sx={{ px: { xs: 2, sm: 33 }, pt: 4 }}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            fontWeight: 500,
            color: "black",
            fontSize: "18px",
            gap: "8px",
          }}
        >
          <AutoAwesomeIcon
            sx={{ marginBottom: "1rem", color: "#7b2ff2", fontSize: 18 }}
          />
          Based on your search : UI/UX designer role with 3LPA and above, these
          results are present
        </Typography>
      </Box>

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
          {jobs.map((job, index) => (
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
                <Typography
                  variant="body2"
                  sx={{ color: "#666", mb: 1.5, lineHeight: 1.5 }}
                >
                  {job.job_description}
                </Typography>

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
                  sx={{ mb: 2 ,rowGap:0.3}}
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
                        mt: 2,
                        mb: 2,
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
                  <Stack direction="row" alignItems="flex-start" gap={1}>
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
                        sx={{ color: "#222", fontWeight: 500, lineHeight: 1 }}
                      >
                        {job.education_qualification}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="flex-start" gap={1}>
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
                        sx={{ color: "#222", fontWeight: 500, lineHeight: 1 }}
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
                  href={job.job_url}
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

      {/* Search Bar Fixed Bottom */}
      {/* <Box
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
          <SearchBar
            search={search}
            setSearch={setSearch}
            loading={loading}
            onSearch={handleSearch}
          />
        </Box>
      </Box> */}
    </Box>
  );
};

export default JobCard;
