/**
 * Endpoint configuration file
 * Define your API endpoints and HTTP methods here.
 */

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

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
    url: `${API_BASE_URL}/auth/send_otp`,
    method: "POST",
  },
  authVerifyOtp: {
    url: `${API_BASE_URL}/auth/verify_otp`,
    method: "POST",
  },
  uploadResume: {
    url: `${API_BASE_URL}/upload/resume`,
    method: "POST",
  },
};

export default endpoints;
