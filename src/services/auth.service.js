import api from "./axios";

export function login(data) {
  const res = api.post("/auth/login", data);
  return res;
}

export function logout() {
  const res = api.post("/auth/logout");
  return res;
}
