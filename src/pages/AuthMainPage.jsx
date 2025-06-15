import { Box, Grid, Stack, Typography } from "@mui/material";
import ResumeUploader from "../components/ResumeUploader";
import AuthSection from "../components/AuthSection";
import JobCard from "../components/AuthJobCard";
import { useLocation } from "react-router-dom";

export default function MainPage() {
  const { state } = useLocation();
  return (
    <Box sx={{ p: 4, marginTop: "5rem" }}>
      <Typography variant="h4" fontWeight="bold" align="center" mb={1}>
        After Apply we will Redirect to the Next Page
      </Typography>
      <Typography variant="subtitle1" align="center" mb={4}>
        Kindly Upload your Resume As that which we can directly take you to the
        JobPage
      </Typography>
      <Stack flexDirection="row" gap={4} justifyContent="center">
        <Grid item xs={12} md={5} flex={1}>
          <ResumeUploader />
        </Grid>
        <Grid item xs={12} md={7} flex={1}>
          <Box>
            <AuthSection />
            {state?.job && (
              <Box mt={4}>
                <JobCard job={state.job} />
              </Box>
            )}
          </Box>
        </Grid>
      </Stack>
    </Box>
  );
}
