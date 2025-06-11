/**
 * Endpoint configuration file
 * Define your API endpoints and HTTP methods here.
 */

const API_BASE_URL = 'https://workisybackendnodejs.onrender.com/api';

const endpoints = {
    getJobsFromConversion: {
        url: `${API_BASE_URL}/jobs`,
        method: 'GET',
    },
    getJobFromResume: {
        url: `${API_BASE_URL}/jobs_from_resume`,
        method: 'POST',
    }
};

export default endpoints;