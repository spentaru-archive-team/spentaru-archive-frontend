export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_API_URL,
  TIME_OUT: 30000,
};

export const buildApiUrl = (path = "") => {
  const baseUrl = (API_CONFIG.BASE_URL || "/api/v1").replace(/\/+$/, "");
  const relativePath = String(path).replace(/^\/+/, "");

  return `${baseUrl}/${relativePath}`;
};
