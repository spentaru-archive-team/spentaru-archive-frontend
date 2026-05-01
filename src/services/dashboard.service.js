import api from "./axios";

export function getDashboardData() {
  const res = api.get("/dashboard");
  return res;
}

export function getArchivesWithoutLocation() {
  const res = api.get("/archives/without-location");
  return res;
}