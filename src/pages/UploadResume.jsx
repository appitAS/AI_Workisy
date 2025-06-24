import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import ResumeUploader from "../Components/ResumeUploader";
import JobCard from "../Components/AuthJobCard";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "../Components/useIsMobile";
import useJobStore from "../store/jobStore";

const UploadResume = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { resumeFile } = useJobStore();

  const onSubmit = () => {
    if (state?.job?.job_url) window.open(state?.job?.job_url, "_blank");
    navigate("/");
  };
  return (
    <Box
      sx={
        isMobile
          ? { p: 4 }
          : {
              p: 4,
              maxWidth: "calc(100vw - 250px)",
              margin: "0 auto",
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
          <Grid item xs={12} md={5} sx={resumeFile ? {} : { flex: 1 }}>
            <ResumeUploader />
          </Grid>
        )}
        <Grid item xs={12} md={7} flex={1}>
          <>
            <JobCard job={state.job} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!resumeFile}
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
              Confirm Apply
            </Button>
          </>
        </Grid>
      </Stack>
    </Box>
  );
};

export default UploadResume;
