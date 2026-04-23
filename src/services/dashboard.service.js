import api from "./axios";

export function getDashboardData() {
  const res = api.get("/dashboard");
  return res;
}