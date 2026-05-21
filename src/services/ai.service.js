import api from "./axios";

const endpoints = {
  chat: "/chat/ask",
  ocr: "/ai/ocr/extract",
  ocrBase64: "/ai/ocr/extract-base64",
  pdf: "/ai/pdf/extract-native",
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
  // _context = null,
  useSearch = false,
  traceId = null,
) {
  const traceIdValue = buildTraceId(traceId);
  const response = await api.post(
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
  const traceIdValue = buildTraceId(traceId);
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(endpoints.ocr, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Trace-Id": traceIdValue,
    },
  });

  return response.data?.data || {};
}

export async function extractOcrBase64(imageBase64, traceId = null) {
  const traceIdValue = buildTraceId(traceId);
  const response = await api.post(
    endpoints.ocrBase64,
    {
      image: imageBase64,
    },
    {
      headers: {
        "X-Trace-Id": traceIdValue,
      },
    },
  );

  return response.data?.data || {};
}

export async function extractPdfNative(file, traceId = null) {
  const traceIdValue = buildTraceId(traceId);
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(endpoints.pdf, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Trace-Id": traceIdValue,
    },
  });

  return response.data?.data || {};
}
