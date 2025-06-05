


import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import SearchBar from "./SearchBar";

// Microsoft Logo SVG
const MicrosoftLogo = () => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    <svg width="22" height="22" style={{ marginRight: 7 }}>
      <rect width="9" height="9" x="1" y="1" fill="#F25022" />
      <rect width="9" height="9" x="12" y="1" fill="#7FBA00" />
      <rect width="9" height="9" x="1" y="12" fill="#00A4EF" />
      <rect width="9" height="9" x="12" y="12" fill="#FFB900" />
    </svg>
    <Typography variant="subtitle1" sx={{ color: "#757575", fontWeight: 500 }}>
      Microsoft
    </Typography>
  </Box>
);

const jobCardsData = [
  {
    title: "Sr UI/UX Designer And Developer",
    salary: "₹8,00,000 – 12,00,000 Lpa",
    tags: ["FULL TIME", "REMOTE", "2yr+ Exp"],
    description:
      "We are looking for a talented UI/UX Designer to create intuitive and visually appealing digital experiences...",
    skills: [
      "UI Design",
      "UX Research",
      "Wireframing & Prototyping",
      "Information Architecture",
      "Usability Testing",
      "User Persona Mapping",
      "Data Analysis",
    ],
    location: "Hyderabad",
    education: "Any Graduate",
  },
  {
    title: "Frontend React Developer",
    salary: "₹6,00,000 – 10,00,000 Lpa",
    tags: ["FULL TIME", "HYBRID", "3yr+ Exp"],
    description:
      "Looking for a React developer with solid skills in frontend libraries and clean coding practices...",
    skills: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "REST APIs",
      "Redux",
      "Responsive Design",
    ],
    location: "Bangalore",
    education: "B.Tech / B.E",
  },
  {
    title: "Product Designer",
    salary: "₹10,00,000 – 15,00,000 Lpa",
    tags: ["FULL TIME", "ONSITE", "4yr+ Exp"],
    description:
      "Creative product designer needed to build innovative and accessible interfaces for web and mobile apps...",
    skills: [
      "Figma",
      "Design Thinking",
      "User Research",
      "Prototyping",
      "Visual Design",
      "Interaction Design",
    ],
    location: "Pune",
    education: "Any Graduate",
  },
];

const JobCard = ({jobs}) => {
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
        flexWrap="wrap"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        {jobCardsData.map((job, index) => (
          <Card
            key={index}
            sx={{
              width: 360,
              borderRadius: 5,
              border: "4px  solid #D2E8FF",
              background: "#fff",
              boxShadow: "none",
              position: "relative",
              mb: 4,
              paddingBottom: "60px", 
            }}
          >
            <CardContent sx={{ px: 3, pt: 2.5, pb: 1 }}>
              <MicrosoftLogo />

              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 0.5, color: "#222" }}
              >
                {job.title}
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
              <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
                {job.tags.map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    size="small"
                    sx={{
                      background: "#E6F0FA",
                      color: "#1976d2",
                      fontWeight: 600,
                      fontSize: 13,
                      borderRadius: 2,
                    }}
                  />
                ))}
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
                {job.description}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 0.5, color: "#222" }}
              >
                Skills
              </Typography>
              <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mb: 2 }}>
                {job.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: "#D2E8FF",
                      color: "#1976d2",
                      fontWeight: 500,
                      mb: 0.5,
                      borderRadius: 2,
                      fontSize: 13,
                    }}
                  />
                ))}
              </Stack>

             
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
                      sx={{ color: "#222", fontWeight: 600, lineHeight: 1 }}
                    >
                      {job.location}
                    </Typography>
                  </Box>
                </Stack>

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
                      sx={{ color: "#222", fontWeight: 600, lineHeight: 1 }}
                    >
                      {job.education}
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
                View Jobs
              </Button>
            </Box>
          </Card>
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
        <SearchBar search={search} setSearch={setSearch} loading={loading} onSearch={handleSearch} />
      </Box>
    </Box>
  </Box>
);
}
export default JobCard;