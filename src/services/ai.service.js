import api from "./axios";

export async function askAi(message, context = null, useSearch = false) {
  const response = await api.post("/ai/chat/ask", {
    message,
    context,
    use_search: useSearch,
  });

  return response.data?.data || {};
}

export async function extractOcr(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/ai/ocr/extract", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data || {};
}

export async function extractPdfNative(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/ai/pdf/extract-native", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data || {};
}
