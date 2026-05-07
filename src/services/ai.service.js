import axios from "axios";
import { API_CONFIG } from "@/config/api";
import { refreshCsrfCookie } from "./axios";

const AI_SERVICE_BASE_URL = (
  import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:5000"
).trim();
const useLaravelGateway =
  String(import.meta.env.VITE_USE_LARAVEL_AI_GATEWAY || "false") === "true";
const AI_TIMEOUT_MS = Number(import.meta.env.VITE_AI_TIMEOUT_MS || 30000);

const aiApi = axios.create({
  baseURL: useLaravelGateway ? API_CONFIG.BASE_URL : AI_SERVICE_BASE_URL,
  timeout: AI_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
  ...(useLaravelGateway
    ? {
        withCredentials: true,
        withXSRFToken: true,
      }
    : {}),
});

if (useLaravelGateway) {
  aiApi.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (err?.response?.status === 419 && !originalRequest?._retry) {
        originalRequest._retry = true;
        await refreshCsrfCookie();
        return aiApi(originalRequest);
      }

      return Promise.reject(err);
    },
  );
}

const endpoints = useLaravelGateway
  ? {
      chat: "v1/ai/chat/ask",
      ocr: "v1/ai/ocr/extract",
      pdf: "v1/ai/pdf/extract-native",
    }
  : {
      chat: "/api/chat/ask",
      ocr: "/api/ocr/extract",
      pdf: "/api/pdf/extract-native",
    };

export async function askAi(message, context = null, useSearch = false) {
  const response = await aiApi.post(endpoints.chat, {
    message,
    context,
    use_search: useSearch,
  });

  return response.data?.data || {};
}

export async function extractOcr(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await aiApi.post(endpoints.ocr, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data || {};
}

export async function extractOcrBase64(imageBase64) {
  if (useLaravelGateway) {
    throw new Error("extractOcrBase64 requires VITE_AI_SERVICE_URL.");
  }

  const response = await aiApi.post(endpoints.ocr, {
    image: imageBase64,
  });

  return response.data?.data || {};
}

export async function extractPdfNative(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await aiApi.post(endpoints.pdf, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data || {};
}
