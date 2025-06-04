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

// const jobCardsData = [
//   {
//     title: "Sr UI/UX Designer And Developer",
//     salary: "₹8,00,000 – 12,00,000 Lpa",
//     tags: ["FULL TIME", "REMOTE", "2yr+ Exp"],
//     description:
//       "We are looking for a talented UI/UX Designer to create intuitive and visually appealing digital experiences...",
//     skills: [
//       "UI Design",
//       "UX Research",
//       "Wireframing & Prototyping",
//       "Information Architecture",
//       "Usability Testing",
//       "User Persona Mapping",
//       "Data Analysis",
//     ],
//     location: "Hyderabad",
//     education: "Any Graduate",
//   },
//   {
//     title: "Frontend React Developer",
//     salary: "₹6,00,000 – 10,00,000 Lpa",
//     tags: ["FULL TIME", "HYBRID", "3yr+ Exp"],
//     description:
//       "Looking for a React developer with solid skills in frontend libraries and clean coding practices...",
//     skills: [
//       "React.js",
//       "JavaScript",
//       "HTML5",
//       "CSS3",
//       "REST APIs",
//       "Redux",
//       "Responsive Design",
//     ],
//     location: "Bangalore",
//     education: "B.Tech / B.E",
//   },
//   {
//     title: "Product Designer",
//     salary: "₹10,00,000 – 15,00,000 Lpa",
//     tags: ["FULL TIME", "ONSITE", "4yr+ Exp"],
//     description:
//       "Creative product designer needed to build innovative and accessible interfaces for web and mobile apps...",
//     skills: [
//       "Figma",
//       "Design Thinking",
//       "User Research",
//       "Prototyping",
//       "Visual Design",
//       "Interaction Design",
//     ],
//     location: "Pune",
//     education: "Any Graduate",
//   },
// ];

const JobCard = ({ jobs }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) return;
    setLoading(true);
    console.log("Searching:", search);
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulated delay
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
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        pb: { xs: 10, sm: 10 }, // Padding bottom for search bar space
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

      {/* Cards */}
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
        <Stack
          direction="row"
          spacing={3}
          gap={4}
          flexWrap="wrap"
          justifyContent="center"
          sx={{ width: "100%" }}
        >
          {(jobs || []).map((job, index) => (
            <Box
              key={index}
              sx={{
                background: "#E6F0FA",
                borderRadius: 6,
                padding: "1.2rem 0.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: 400,
                mx: "auto",
                mb: 4,
              }}
            >
              <Card
                elevation={0}
                sx={{
                  background: "#fff",
                  borderRadius: 5,
                  p: 3,
                  mb: 2,
                  boxShadow: "none",
                  minHeight: { xs: 340, sm: 420 },
                }}
              >
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
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "#4b4b4b",
                    mb: 1.5,
                    letterSpacing: 0.1,
                  }}
                >
                  {job.salary}
                </Typography>
                {job.job_type && (
                  <Chip
                    key={job.job_type}
                    label={job.job_type}
                    size="medium"
                    sx={{
                      background: "#fff",
                      color: "#1976d2",
                      fontWeight: 600,
                      fontSize: 14,
                      borderRadius: 3,
                      p: 1.2,
                      boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.5)",
                      mr: 1,
                      mb: 1,
                    }}
                  />
                )}
                <Stack direction="row" gap={0.5} sx={{ mb: 2 }} flexWrap="wrap">
                  {(job.tags || []).map((label) => (
                    <Chip
                      key={label}
                      label={label}
                      size="medium"
                      sx={{
                        background: "#fff",
                        color: "#1976d2",
                        fontWeight: 600,
                        fontSize: 14,
                        borderRadius: 3,
                        p: 1.2,
                        boxShadow: "0 1px 6px 0 rgba(0, 0, 0, 0.5)",
                        mr: 1,
                        mb: 1,
                      }}
                    />
                  ))}
                </Stack>
                <Typography
                  variant="subtitle1"
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
                  variant="subtitle1"
                  sx={{ fontWeight: 700, mb: 0.5, color: "#222" }}
                >
                  Skills
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                  {(job.skills || []).map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="medium"
                      variant="outlined"
                      sx={{
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        fontWeight: 500,
                        borderRadius: 3,
                        fontSize: 15,
                        p: 1,
                        background: "#fff",
                      }}
                    />
                  ))}
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="start"
                  gap={6}
                  alignItems="flex-start"
                  sx={{ mb: 2 }}
                >
                  <Stack direction="row" alignItems="flex-start" gap={1}>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 500, fontSize: 15 }}
                      >
                        Job Location
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#222",
                          fontWeight: 600,
                          lineHeight: 1,
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                          textAlign: "center",
                        }}
                      >
                        <LocationOnIcon
                          sx={{ color: "#1976d2", fontSize: 22, mt: "2px" }}
                        />
                        {job.job_location}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 500,
                          fontSize: 15,
                          textAlign: "center",
                        }}
                      >
                        Education
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#222",
                          fontWeight: 600,
                          lineHeight: 1,
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                          textAlign: "center",
                        }}
                      >
                        <SchoolIcon
                          sx={{ color: "#1976d2", fontSize: 22, mt: "2px" }}
                        />
                        {job.education_qualification}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Card>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: "#1976d2",
                  color: "#fff",
                  borderRadius: 5,
                  fontWeight: 700,
                  fontSize: 18,
                  textTransform: "none",
                  boxShadow: "none",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                View Details
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>

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
