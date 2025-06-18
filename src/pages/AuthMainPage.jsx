import { Box, Grid, Stack, Typography } from "@mui/material";
import ResumeUploader from "../Components/ResumeUploader";
import AuthSection from "../Components/AuthSection";
import JobCard from "../Components/AuthJobCard";
import { useLocation } from "react-router-dom";
import useIsMobile from "../Components/useIsMobile";

const MainPage = () => {
  const { state } = useLocation();
  const isMobile = useIsMobile();

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
        After Apply we will Redirect to the Next Page
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        mb={4}
        fontSize={isMobile ? "14px" : "inital"}
      >
        Kindly Upload your Resume As that which we can directly take you to the
        JobPage
      </Typography>
      <Stack flexDirection="row" gap={4} justifyContent="center">
        {!isMobile && (
          <Grid item xs={12} md={5}>
            <ResumeUploader />
          </Grid>
        )}
        <Grid item xs={12} md={7}>
          <>
            <AuthSection />
            {!isMobile && state?.job && <JobCard job={state.job} />}
          </>
        </Grid>
      </Stack>
    </Box>
  );
};

export default MainPage;
