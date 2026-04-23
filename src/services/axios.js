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

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err?.response?.status === 419 && !originalRequest?._retry) {
      originalRequest._retry = true;
      await refreshCsrfCookie();
      return api(originalRequest);
    }

    return Promise.reject(err);
  }
);

export default api;