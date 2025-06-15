import { Box, Grid, Typography } from "@mui/material";
import ResumeUploader from "../components/ResumeUploader";
import AuthSection from "../components/AuthSection";
import JobCard from "../components/AuthJobCard";

export default function MainPage() {
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
          <ResumeUploader />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box>
            <AuthSection />
            <Box mt={4}>
              <JobCard />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
