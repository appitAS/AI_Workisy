import { useEffect, useRef, useState } from "react";
import OTPInput from "react-otp-input";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  Stack,
  Box,
  Typography,
  styled,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import StyledInputLabel from "./StyledComponents/StyledInputLabel";
import StyledInput from "./StyledComponents/StyledInput";
import GoogleIcon from "../assets/GoogleIcon";
import XIcon from "../assets/XIcon";
import { showErrorToast, showSuccessToast } from "./ToastNotifier";
import { useLocation, useNavigate } from "react-router-dom";
import endpoints from "../utils/endPoint";
import FacebookIcon from "../assets/FacebookIcon";
import LinkedInIcon from "../assets/LinkedInIcon";
import useJobStore from "../store/jobStore";
import useIsMobile from "./useIsMobile";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SocialLoginCard = ({ maxWidth, isLogIn, setAnchorElLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const { resumeFile, setResumeFile } = useJobStore();

  const [state, setState] = useState({ name: "", email: "" });
  const [otp, setOtp] = useState({ otp: "", status: false });
  const [isResumeUpload, setIsResumeUpload] = useState({
    file: null,
    fileName: "",
    status: false,
  });
  const timerRef = useRef(0);
  const timerDisplayRef = useRef(null);
  const intervalRef = useRef(null);
  const fileInputRef = useRef();

  const isVerifyOtpDisabled = otp.status && otp.otp.length === 6;
  const isSubmitDisabled = !!state.email;
  const OAuthButtonStyle = isMobile
    ? {
        border: "none",
        padding: "4px",
        minWidth: "max-content !important",

        borderRadius: "24px",
        boxShadow: "1px 3px 4px 4px rgba(0, 0, 0, 0.25)",
        margin: "0 auto",
        textTransform: "capitalize",
      }
    : {
        // border: "none",
        border: "1px solid rgba(0, 0, 0, 0.16)",
        borderRadius: "24px",
        boxShadow: "1px 3px 4px 4px rgba(0, 0, 0, 0.25)",
        maxWidth: 300,
        margin: "0 auto",
        textTransform: "capitalize",
      };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const uploadResume = async (selected) => {
    try {
      const formData = new FormData();
      formData.append("file", selected);

      const response = await axios.post(endpoints.uploadResume.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Resume Uploaded Successfully", response.data);
      setResumeFile(response.data.filePath);
      showSuccessToast("Resume Uploaded Successfully");
    } catch (error) {
      console.error(
        "Error uploading resume:",
        error.response?.data || error.message
      );
      showErrorToast(error.response?.data || error.message);
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#F44336",
      "#E91E63",
      "#9C27B0",
      "#3F51B5",
      "#2196F3",
      "#03A9F4",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const setSession = (data) => {
    Cookies.set("user_data", JSON.stringify(data.user_data));
    Cookies.set("auth_token", data?.token?.value);
    if (!data?.user_data?.profile_img)
      Cookies.set("profile_bg", getRandomColor());
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post(endpoints.authSendOtp.url, {
        email: state.email,
        // name: state.name,
      });

      const { data } = response;
      if (data.error) showErrorToast(data.message);
      else {
        showSuccessToast(data?.message);
        if (data?.isUserExist) {
          setSession(data);
          if (location?.state?.job?.job_url)
            setTimeout(
              () => window.open(location?.state?.job?.job_url, "_blank"),
              2000
            );
          navigate("/jobs", { replace: true });
        } else {
          setOtp((prev) => ({ ...prev, status: true }));
          startTimer();
        }
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );

      showErrorToast(error.response?.data || error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post(endpoints.authVerifyOtp.url, {
        name: state.name,
        email: state.email,
        otp: otp.otp,
        resumePath: resumeFile,
      });

      const { data } = response;
      console.log("OTP Verified Successfully", data);
      if (setAnchorElLogin) setAnchorElLogin(false);
      if (data.error) showErrorToast(data.message);
      else {
        showSuccessToast(data?.message);
        setSession(data);
        setResumeFile(null);
        if (location?.state?.job?.job_url) {
          window.open(location?.state?.job?.job_url, "_blank");
          navigate("/jobs", { replace: true });
        } else navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response?.data || error.message
      );
      showErrorToast(error?.response?.data?.message || error?.message);
    }
  };

  const startTimer = () => {
    timerRef.current = 300;

    if (timerDisplayRef.current) {
      timerDisplayRef.current.innerText = `OTP expired in : ${timerRef.current}`;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (timerRef.current > 0) {
        timerRef.current -= 1;

        if (timerDisplayRef.current) {
          timerDisplayRef.current.innerText = `OTP expired in: ${timerRef.current}`;
        }

        if (timerRef.current === 0) {
          clearInterval(intervalRef.current);
        }
      }
    }, 1000);
  };

  const reSendOtp = () => {
    sendOTP();
    setOtp((prev) => ({ ...prev, otp: "" }));
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(16),
      border: "1px solid #dadde9",
    },
  }));

  const handleSocialLogin = (provider) => {
    // if (resumeFile)
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/auth/${provider}?redirectUrl=${encodeURIComponent(
      location?.state?.job?.job_url
    )}&filePath=${resumeFile}`;
    // else {
    //   setIsResumeUpload((prev) => ({ ...prev, status: true }));

    //   showErrorToast("Please upload your resume");
    // }
  };

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size < 10 * 1024 * 1024) {
        setIsResumeUpload((prev) => ({
          ...prev,
          file: selected,
          fileName: selected.name,
        }));
        await uploadResume(selected);
      } else showErrorToast("Resume File should be less than 10 MB");
    }
  };

  const onSubmit = () => {
    if (otp.status === false) sendOTP();
    else verifyOTP();

    // else {
    //   if (resumeFile) verifyOTP();
    //   else {
    //     setIsResumeUpload((prev) => ({ ...prev, status: true }));
    //     showErrorToast("Please upload your resume");
    //   }
    // }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const setPadding = () => {
    if (isLogIn) return "24px";
    return isMobile ? "6px !important" : "30px 90px 18px 90px !important";
  };

  return (
    <Card
      sx={{
        // width: "586px",
        padding: setPadding(),
        borderRadius: "24px",
        background: "#FFF",
        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.10)",
        marginBottom: "32px",
        maxWidth: { maxWidth },
      }}
    >
      <CardContent>
        {!otp.status ? (
          <>
            <Stack gap={2} mb={4}>
              <Stack gap={0.5}>
                {/* <StyledInputLabel htmlFor="name">
                  Enter Your Name{" "}
                </StyledInputLabel>

                <StyledInput
                  id="name"
                  name="name"
                  placeholder="Enter Your Name "
                  value={state.name}
                  onChange={handleInputChange}
                /> */}
                {/* {errors.email && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )} */}
              </Stack>
              <Stack gap={0.5}>
                <StyledInputLabel htmlFor="email">
                  Enter Your Emaiil{" "}
                </StyledInputLabel>

                {isLogIn || resumeFile ? (
                  <StyledInput
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={state.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <HtmlTooltip
                    title="Upload your resume first!"
                    placement="top-end"
                  >
                    <StyledInput
                      id="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={state.email}
                      disabled
                    />
                  </HtmlTooltip>
                )}
              </Stack>
            </Stack>
            <Box mb={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isSubmitDisabled}
                sx={{
                  borderRadius: "24px",
                  background: "#0066B3",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  textTransform: "capitalize",
                  padding: "10px",

                  "&.Mui-disabled": {
                    opacity: 0.5,
                    background: "#1976d2",
                    color: "#FFF",
                    cursor: "not-allowed",
                  },
                }}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Box>
            <Stack alignItems="center" mb={2}>
              <Typography> ---------- Or ----------</Typography>
            </Stack>

            {isMobile && isResumeUpload.status && (
              <Stack mt={2} mb={2} sx={{ position: "relative" }}>
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  ref={fileInputRef}
                />
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
                    sx={{ position: "absolute", right: "8px", top: "9px" }}
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

            <Stack
              sx={{
                borderRadius: "8px",
                // border: "1px solid rgba(0, 0, 0, 0.16)",
                gap: isMobile ? 0.5 : 2,
                flexDirection: "row",
                alignItems: "center",
                padding: isMobile ? "4px" : "8px 16px",
                marginBottom: "27px",
                margin: "0 auto",
              }}
            >
              {isLogIn || resumeFile ? (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={OAuthButtonStyle}
                  onClick={() => handleSocialLogin("google")}
                >
                  <GoogleIcon
                    sx={{ width: "32px", height: "32px", marginRight: 1 }}
                  />{" "}
                  SignUp with Google
                </Button>
              ) : (
                <HtmlTooltip
                  title="upload your resume first!"
                  placement="top-end"
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ ...OAuthButtonStyle, cursor: "default" }}
                    disbled
                  >
                    <GoogleIcon
                      sx={{ width: "32px", height: "32px", marginRight: 1 }}
                    />{" "}
                    SignUp with Google
                  </Button>
                </HtmlTooltip>
              )}

              {/* <Button
                variant="outlined"
                fullWidth
                sx={OAuthButtonStyle}
                onClick={() => handleSocialLogin("linkedin")}
              >
                <LinkedInIcon sx={{ width: "32px", height: "32px" }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={OAuthButtonStyle}
                onClick={() => handleSocialLogin("twitter")}
              >
                <XIcon sx={{ width: "32px", height: "32px" }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={OAuthButtonStyle}
                onClick={() => handleSocialLogin("facebook")}
              >
                <FacebookIcon sx={{ width: "32px", height: "32px" }} />
              </Button> */}
            </Stack>
          </>
        ) : (
          <>
            <Stack>
              <StyledInputLabel>Enter your OTP</StyledInputLabel>
              <OTPInput
                value={otp.otp}
                onChange={(value) =>
                  setOtp((prev) => ({ ...prev, otp: value }))
                }
                numInputs={6}
                renderSeparator={<></>}
                renderInput={(props) => <input {...props} />}
                containerStyle="otpinputcontainer"
                inputStyle="otpinput"
                inputType="number"
              />
              <Stack justifyContent="space-between" flexDirection="row" mt={1}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#1A669C",
                    cursor: "pointer",
                  }}
                  component="div"
                  onClick={() => reSendOtp()}
                >
                  Re-send OTP
                </Typography>

                <Typography
                  sx={{ fontSize: "14px", maxWidth: "128px" }}
                  ref={timerDisplayRef}
                >
                  {`OTP expired in : ${timerRef.current}`}
                </Typography>
              </Stack>
              {isMobile && isResumeUpload.status && (
                <Stack mt={4} sx={{ position: "relative" }}>
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    ref={fileInputRef}
                  />
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
                      sx={{ position: "absolute", right: "8px", top: "9px" }}
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
            </Stack>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isVerifyOtpDisabled}
                sx={{
                  borderRadius: "24px",
                  background: "#0066B3",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  textTransform: "capitalize",
                  padding: "10px",

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
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialLoginCard;
