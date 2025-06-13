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
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StyledInputLabel from "./StyledComponents/StyledInputLabel";
import StyledInput from "./StyledComponents/StyledInput";
import GoogleIcon from "../assets/GoogleIcon";
import XIcon from "../assets/XIcon";
import { showErrorToast, showSuccessToast } from "./ToastNotifier";
import { useLocation, useNavigate } from "react-router-dom";
import endpoints from "../utils/endPoint";

export default function SocialLoginCard({ resumeFile }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState({ name: "", email: "" });
  const [otp, setOtp] = useState({ otp: "", status: false });
  const [isResendOOtpClickable, setIsResendOOtpClickable] = useState(false);

  const timerRef = useRef(0);
  const timerDisplayRef = useRef(null);
  const intervalRef = useRef(null);

  const isVerifyOtpDisabled = otp.status && otp.otp.length === 6;
  const isSubmitDisabled = !!state.name && !!state.email;

  const handleChange = (e) => {
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
      showErrorToast("Resume upload failed. Please try again.");
    }
  };

  const sendOTP = async () => {
    try {
      const response = await axios.post(endpoints.authSendOtp.url, {
        email: state.email,
        name: state.name,
      });

      const { data } = response;
      console.log("OTP Sent Successfully", data);
      if (data.error) showErrorToast(data.message);
      else {
        showSuccessToast(data?.message);
        setOtp((prev) => ({ ...prev, status: true }));
      }
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );

      showErrorToast("Failed to send OTP. Please try again.");
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await axios.post(endpoints.authVerifyOtp.url, {
        name: state.name,
        email: state.email,
        otp: otp.otp,
      });

      const { data } = response;
      console.log("OTP Verified Successfully", data);
      if (data.error) showErrorToast(data.message);
      else {
        showSuccessToast(data?.message);
        Cookies.set("user_data", JSON.stringify(data.user_data));

        await uploadResume(data.user_data);
        window.open(location.state.jobUrl, "_blank");

        navigate("/jobs", { replace: true });
      }
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response?.data || error.message
      );
      showErrorToast("Invalid OTP. Please try again.");
    }
  };

  const startTimer = () => {
    timerRef.current = 300;
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
      startTimer();
    }
  };

  const onSubmit = () => {
    if (otp.status === false) {
      setOtp((prev) => ({ ...prev, send: true }));
      sendOTP();
      startTimer();
    } else {
      verifyOTP();
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  console.log(location);

  return (
    <Card
      sx={{
        width: "586px",
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              >
                <GoogleIcon sx={{ width: "32px", height: "32px" }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  border: "none",
                }}
              >
                <LinkedInIcon sx={{ width: "32px", height: "32px" }} />
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  border: "none",
                }}
              >
                <XIcon sx={{ width: "32px", height: "32px" }} />
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
