import { Box, Grid, Typography } from "@mui/material";
import ResumeUploader from "./ResumeUploader";
import AuthSection from "./AuthSection";
import JobCard from "./AuthJobCard";
import { useState } from "react";
export default function MainPage() {
  const [resumeFile, setResumeFile] = useState(null);
  return (
    <Box sx={{ bgcolor: "#fafbff", p: 4, marginTop: "5rem" }}>
      <Typography variant="h4" fontWeight="bold" align="center" mb={1}>
        After Apply we will Redirect to the Next Page
      </Typography>
      <Typography variant="subtitle1" align="center" mb={4}>
        Kindly Upload your Resume As that which we can directly take you to the
        JobPage
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <ResumeUploader setResumeFile={setResumeFile} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box>
            <AuthSection resumeFile={resumeFile} />
            <Box mt={4}>
              <JobCard />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
