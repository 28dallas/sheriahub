import axios from "axios";

// Environment variables configuration (using Vite's import.meta.env)
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || "https://ussd-test-x27k.onrender.com/api";
const AFRICASTALKING_API_KEY = import.meta.env.REACT_APP_AFRICASTALKING_API_KEY;
const AFRICASTALKING_USERNAME = import.meta.env.REACT_APP_AFRICASTALKING_USERNAME || "sandbox";
const AFRICASTALKING_ENVIRONMENT = import.meta.env.REACT_APP_AFRICASTALKING_ENVIRONMENT || "sandbox";

// ✅ Base API instance for your backend
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Africa's Talking API instance
const AFRICASTALKING_API = axios.create({
  baseURL: AFRICASTALKING_ENVIRONMENT === "sandbox" 
    ? "https://api.sandbox.africastalking.com/version1" 
    : "https://api.africastalking.com/version1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
    "apiKey": AFRICASTALKING_API_KEY,
  },
});

// ✅ Fetch all cases
export const fetchCases = async () => {
  const res = await API.get("/cases");
  return res.data;
};

// ✅ Fetch all profiles
export const fetchProfiles = async () => {
  const res = await API.get("/profiles");
  return res.data;
};

// ✅ Fetch all mediations
export const fetchMediations = async () => {
  const res = await API.get("/mediations");
  return res.data;
};

// ✅ Create new case
export const createCase = async (caseData) => {
  const res = await API.post("/cases", caseData);
  return res.data;
};

// ✅ Create new profile/user registration
export const createProfile = async (profileData) => {
  const res = await API.post("/profiles", profileData);
  return res.data;
};

// ✅ User login
export const loginUser = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

// ✅ Update case status (e.g., Pending → Resolved)
export const updateCaseStatus = async (id, status) => {
  const res = await API.patch(`/cases/${id}/status`, { status });
  return res.data;
};

// ✅ Send USSD message via Africa's Talking
export const sendUSSDMessage = async (phoneNumber, message) => {
  if (!AFRICASTALKING_API_KEY) {
    throw new Error("Africa's Talking API key not configured");
  }

  const payload = new URLSearchParams({
    username: AFRICASTALKING_USERNAME,
    to: phoneNumber,
    message: message,
  });

  const res = await AFRICASTALKING_API.post("/messaging", payload);
  return res.data;
};

// ✅ Configuration getter functions
export const getConfig = () => ({
  apiBaseUrl: API_BASE_URL,
  africastalkingUsername: AFRICASTALKING_USERNAME,
  africastalkingEnvironment: AFRICASTALKING_ENVIRONMENT,
  ussdCode: process.env.REACT_APP_USSD_CODE || "*384*00#",
  appName: process.env.REACT_APP_APP_NAME || "ShariaLink Dashboard",
  supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || "support@sharialink.go.ke",
  supportPhone: process.env.REACT_APP_SUPPORT_PHONE || "+254 719 732842",
});

export default API;
