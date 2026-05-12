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
      chat: "/chat/ask",
      ocr: "/ai/ocr/extract",
      pdf: "/ai/pdf/extract-native",
    }
  : {
      chat: "/api/chat/ask",
      ocr: "/api/ocr/extract",
      pdf: "/api/pdf/extract-native",
    };

const buildTraceId = (traceId) => {
  if (traceId && typeof traceId === "string" && traceId.trim()) {
    return traceId.trim();
  }

  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `trace-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export async function askAi(
  message,
  _context = null,
  useSearch = false,
  traceId = null,
) {
  const traceIdValue = buildTraceId(traceId);
  const response = await aiApi.post(
    endpoints.chat,
    {
      message,
      use_search: useSearch,
    },
    {
      headers: {
        "X-Trace-Id": traceIdValue,
      },
    },
  );

  const payload = response.data || {};
  const data = payload?.data;

  if (data && Object.prototype.hasOwnProperty.call(data, "answer")) {
    return data;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "answer")) {
    return payload;
  }

  return data || payload;
}

export async function extractOcr(file, traceId = null) {
  aiApi.defaults.headers["X-Trace-Id"] = traceId || crypto.randomUUID();
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
