import { API_CONFIG } from "@/config/api";
import axios from "axios";

const resolveApiOrigin = () => {
  try {
    return new URL(API_CONFIG.BASE_URL).origin;
  } catch {
    return window.location.origin;
  }
};

const API_ORIGIN = resolveApiOrigin();
const UNAUTHORIZED_EVENT = "auth:unauthorized";
let isRedirectingToLogin = false;

export const refreshCsrfCookie = () =>
  axios.get(`${API_ORIGIN}/sanctum/csrf-cookie`, {
    withCredentials: true,
    withXSRFToken: true,
  });

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIME_OUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const status = err?.response?.status;

    if (status === 419 && !originalRequest?._retry) {
      originalRequest._retry = true;
      await refreshCsrfCookie();
      return api(originalRequest);
    }

    if (status === 401 && !isRedirectingToLogin) {
      const isLoginPage = window.location.pathname === "/login";

      if (!isLoginPage) {
        isRedirectingToLogin = true;
        window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
        window.location.replace("/login");
      }
    }

    return Promise.reject(err);
  }
);

export default api;
