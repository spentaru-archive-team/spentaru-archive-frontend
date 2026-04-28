import api, { refreshCsrfCookie } from "./axios";

export function login(data) {
  return api.post("/auth/login", data);
}

export function me() {
  return api.get("/auth/me");
}

export function logout() {
  return api.post("/auth/logout");
}

export function csrf() {
  return refreshCsrfCookie();
}

export function updateProfile(data) {
  return api.put("/users/me", data);
}