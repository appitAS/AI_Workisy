/**
 * Endpoint configuration file
 * Define your API endpoints and HTTP methods here.
 */

const API_BASE_URL = "https://aiworkisyapi.workisy.com/api";
const API_BASE_URL_ = "http://localhost:3000/api";

const endpoints = {
  getJobsFromConversion: {
    url: `${API_BASE_URL}/jobs`,
    method: "POST",
  },
  getJobFromResume: {
    url: `${API_BASE_URL}/jobs_from_resume`,
    method: "POST",
  },
  authSendOtp: {
    url: `${API_BASE_URL_}/auth/send_otp`,
    method: "POST",
  },
  authVerifyOtp: {
    url: `${API_BASE_URL_}/auth/verify_otp`,
    method: "POST",
  },
  uploadResume: {
    url: `${API_BASE_URL_}/upload/resume`,
    method: "POST",
  },
};

export default endpoints;
