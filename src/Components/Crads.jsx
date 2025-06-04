import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import SearchBar from "./SearchBar";

const JobCard = ({ jobs }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) return;
    setLoading(true);
    console.log("Searching:", search);
    setTimeout(() => setLoading(false), 3000);
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
          Based on your search, these results are present
        </Typography>
      </Box>

      {/* Job cards */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          p: { xs: 2, sm: 4 },
          mt: 0.5,
        }}
      >
        {jobs && jobs.length > 0 ? (
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="flex-start"
            sx={{
              width: "100%",
              gap: 3, // Horizontal + vertical gap
              px: { xs: 2, sm: 20 },
            }}
          >
            {jobs.map((job, index) => (
              <Card
                key={index}
                sx={{
                  width: { xs: "100%", sm: "calc(33.33% - 24px)" }, // 3 per row with gap
                  borderRadius: 5,
                  border: "4px solid #D2E8FF",
                  background: "#fff",
                  boxShadow: "none",
                  position: "relative",
                  paddingBottom: "60px",
                }}
              >
                <CardContent sx={{ px: 3, pt: 2.5, pb: 1 }}>
                  {job.company_name}

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 0.5, color: "#222" }}
                  >
                    {job.job_title}
                  </Typography>

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

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 2 }}
                  >
                    <Stack direction="row" alignItems="flex-start" gap={1}>
                      <LocationOnIcon
                        sx={{ color: "#1976d2", fontSize: 20, mt: "2px" }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "#888", fontWeight: 500 }}
                        >
                          Job Location
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#222", fontWeight: 600 }}
                        >
                          {job.job_location}
                        </Typography>
                      </Box>
                    </Stack>

                    {job.education && (
                      <Stack direction="row" alignItems="flex-start" gap={1}>
                        <SchoolIcon
                          sx={{ color: "#1976d2", fontSize: 20, mt: "2px" }}
                        />
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: "#888", fontWeight: 500 }}
                          >
                            Education
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#222", fontWeight: 600 }}
                          >
                            {job.education}
                          </Typography>
                        </Box>
                      </Stack>
                    )}
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
                  <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: "#1976d2",
                        borderRadius: 5,
                        fontWeight: 600,
                        fontSize: 18,
                        textTransform: "none",
                        boxShadow: "none",
                        py: 0.2,
                        "&:hover": {
                          backgroundColor: "#1976d2",
                          color: "white",
                        },
                      }}
                    >
                      View Job
                    </Button>
                  </a>
                </Box>
              </Card>
            ))}
          </Stack>
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 10, color: "#888", fontWeight: 500 }}
          >
            No job data found.
          </Typography>
        )}
      </Box>

      {/* Search Bar */}
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
          <SearchBar
            search={search}
            setSearch={setSearch}
            loading={loading}
            onSearch={handleSearch}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JobCard;
