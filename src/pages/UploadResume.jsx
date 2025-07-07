import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ResumeUploader from "../Components/ResumeUploader";
import JobCard from "../Components/AuthJobCard";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "../Components/useIsMobile";
import useJobStore from "../store/jobStore";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { showErrorToast } from "../Components/ToastNotifier";
import endpoints from "../utils/endPoint";
import axios from "axios";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import StyledInputLabel from "../Components/StyledComponents/StyledInputLabel";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const UploadResume = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const { resumeFile, setResumeFile } = useJobStore();

  const [isResumeUpload, setIsResumeUpload] = useState({
    file: null,
    fileName: "",
    status: false,
  });

  const userData = Cookies.get("user_data")
    ? JSON.parse(Cookies.get("user_data"))
    : "";

  const onSubmit = () => {
    if (state?.job?.job_url) window.open(state?.job?.job_url, "_blank");
    navigate("/jobs");
  };

  const uploadResume = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const endPoint = userData?.id
        ? `${endpoints.uploadResume.url}/${userData.id}`
        : endpoints.uploadResume.url;

      const { data } = await axios.post(endPoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResumeFile(data?.filePath);
      console.log(data, "Resume");
      if (userData?.id)
        Cookies.set(
          "user_data",
          JSON.stringify({ ...userData, resume_id: data?.resume_id })
        );
    } catch (error) {
      console.error(
        "Error uploading resume:",
        error.response?.data || error.message
      );
      showErrorToast("Resume upload failed. Please try again.");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size < 10 * 1024 * 1024) {
        setIsResumeUpload((prev) => ({
          ...prev,
          file: selected,
          fileName: selected.name,
        }));
        uploadResume(selected);
      } else showErrorToast("Resume File should be less than 10 MB");
    }
  };

  useEffect(() => {
    if (!userData.id || !state?.job) navigate("/");
  }, [navigate, state?.job, userData.id]);

  if (!userData.id) return null;

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
          <Grid item xs={12} md={5} sx={resumeFile ? {} : { flex: 1 }}>
            <ResumeUploader />
          </Grid>
        )}
        <Grid item xs={12} md={7} flex={1}>
          <>
            {isMobile && (
              <Stack mt={2} mb={2} sx={{ position: "relative" }}>
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  ref={fileInputRef}
                />
                <StyledInputLabel sx={{ marginBottom: "8px" }}>
                  Upload your resume
                </StyledInputLabel>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    // background: "#DFF0FF",
                    border: "1px solid #b3bac5",
                    borderRadius: "8px",
                    // boxShadow: "4px 4px 4px 4px rgba(10, 102, 194, 0.25)",
                    padding: "8px 34px 8px 8px",
                    gap: "8px",
                  }}
                >
                  <AttachFileRoundedIcon
                    sx={{
                      borderRight: "2px solid #b3bac5",
                      paddingRight: "4px",
                      width: "1.2em",
                    }}
                  />
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      overflowX: "auto",
                      display: "block",
                      maxWidth: "100%",
                    }}
                  >
                    {isResumeUpload.fileName
                      ? isResumeUpload.fileName
                      : "Choose the file"}
                  </Typography>
                </Stack>
                {isResumeUpload.file && (
                  <CloseRoundedIcon
                    sx={{ position: "absolute", right: "8px", top: "35px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResumeFile(null);
                      setIsResumeUpload((prev) => ({
                        ...prev,
                        file: null,
                        fileName: "",
                      }));
                    }}
                  />
                )}
              </Stack>
            )}
            <JobCard job={state?.job} />
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default UploadResume;
