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
} from "@mui/material";
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

export default function SocialLoginCard() {
  const navigate = useNavigate();
  const location = useLocation();

  const { resumeFile } = useJobStore();

  const [state, setState] = useState({ name: "", email: "" });
  const [otp, setOtp] = useState({ otp: "", status: false });
  const [isResendOOtpClickable, setIsResendOOtpClickable] = useState(false);

  const timerRef = useRef(0);
  const timerDisplayRef = useRef(null);
  const intervalRef = useRef(null);

  const isVerifyOtpDisabled = otp.status && otp.otp.length === 6;
  const isSubmitDisabled = !!state.name && !!state.email;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const uploadResume = async (user_data) => {
    try {
      const formData = new FormData();
      formData.append("user_id", user_data.id);
      formData.append("file", resumeFile);

      const response = await axios.post(endpoints.uploadResume.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Resume Uploaded Successfully", response.data);
    } catch (error) {
      console.error(
        "Error uploading resume:",
        error.response?.data || error.message
      );
      showErrorToast(error.response?.data || error.message);
    }
  };

  const setSession = (data) => {
    Cookies.set("user_data", JSON.stringify(data.user_data));
    Cookies.set("auth_token", data?.token?.value);
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post(endpoints.authSendOtp.url, {
        email: state.email,
        name: state.name,
      });

      const { data } = response;
      if (data.error) showErrorToast(data.message);
      else {
        showSuccessToast(data?.message);
        if (data?.isUserExist) {
          setSession(data);
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
      if (data.error) showErrorToast(data.message);
      else {
        showSuccessToast(data?.message);
        setSession(data);
        await uploadResume(data.user_data);
        window.open(location?.state?.job?.job_url, "_blank");

        navigate("/jobs", { replace: true });
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
    timerRef.current = 60;
    setIsResendOOtpClickable(false);

    if (timerDisplayRef.current) {
      timerDisplayRef.current.innerText = `Time: ${timerRef.current}`;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (timerRef.current > 0) {
        timerRef.current -= 1;

        if (timerDisplayRef.current) {
          timerDisplayRef.current.innerText = `Time: ${timerRef.current}`;
        }

        if (timerRef.current === 0) {
          setIsResendOOtpClickable(true);
          clearInterval(intervalRef.current);
        }
      }
    }, 1000);
  };

  const reSendOtp = () => {
    if (timerRef.current === 0) {
      sendOTP();
      setOtp((prev) => ({ ...prev, otp: "" }));
      startTimer();
    }
  };

  const handleSocialLogin = (provider) => {
    if (resumeFile)
      window.location.href = `http://localhost:3000/api/auth/${provider}?redirectUrl=${encodeURIComponent(
        location?.state?.job?.job_url
      )}&filePath=${resumeFile}`;
    else showErrorToast("Please upload your resume");
  };

  const onSubmit = () => {
    if (otp.status === false) sendOTP();
    else {
      if (resumeFile) verifyOTP();
      else showErrorToast("Please upload your resume");
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <Card
      sx={{
        // width: "586px",
        padding: "30px 90px 18px 90px !important",
        borderRadius: "24px",
        background: "#FFF",
        boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.10)",
      }}
    >
      <CardContent>
        {!otp.status ? (
          <>
            <Stack gap={2} mb={4}>
              <Stack gap={0.5}>
                <StyledInputLabel htmlFor="name">
                  Enter Your Name{" "}
                </StyledInputLabel>

                <StyledInput
                  id="name"
                  name="name"
                  placeholder="Enter Your Name "
                  value={state.name}
                  onChange={handleInputChange}
                />
                {/* {errors.email && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )} */}
              </Stack>
              <Stack gap={0.5}>
                <StyledInputLabel htmlFor="email">
                  Enter Your Emaiil{" "}
                </StyledInputLabel>
                <StyledInput
                  id="email"
                  name="email"
                  placeholder="Enter Your Email "
                  value={state.email}
                  onChange={handleInputChange}
                />
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

            <Stack
              sx={{
                borderRadius: "8px",
                border: "1px solid rgba(0, 0, 0, 0.16)",
                gap: 2,
                flexDirection: "row",
                alignItems: "center",
                padding: "8px 16px",
                marginBottom: "27px",
                margin: "0 auto",
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  border: "none",
                }}
                onClick={() => handleSocialLogin("google")}
              >
                <GoogleIcon sx={{ width: "32px", height: "32px" }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  border: "none",
                  pointerEvents: "none",
                }}
                onClick={() => handleSocialLogin("linkedin")}
              >
                <LinkedInIcon sx={{ width: "32px", height: "32px" }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  border: "none",
                  pointerEvents: "none",
                }}
                onClick={() => handleSocialLogin("twitter")}
              >
                <XIcon sx={{ width: "32px", height: "32px" }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  border: "none",
                  pointerEvents: "none",
                }}
                onClick={() => handleSocialLogin("facebook")}
              >
                <FacebookIcon sx={{ width: "32px", height: "32px" }} />
              </Button>
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
                    color: isResendOOtpClickable ? "#1A669C" : "#999",
                    cursor: isResendOOtpClickable ? "pointer" : "not-allowed",
                  }}
                  component="div"
                  onClick={() => {
                    if (isResendOOtpClickable) reSendOtp();
                  }}
                >
                  Re-send OTP
                </Typography>

                <Typography
                  sx={{ fontSize: "14px", maxWidth: "64px" }}
                  ref={timerDisplayRef}
                >
                  {`Time: ${timerRef.current}`}
                </Typography>
              </Stack>
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
}
