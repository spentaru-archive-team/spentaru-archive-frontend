import api from "./axios";

export function getDashboardData() {
  const res = api.get("/dashboard");
  return res;
}

export function getArchivesRetentionReady() {
  const res = api.get("/archives/retention/ready");
  return res;
}

export function getEventPendingUploads() {
  const res = api.get("/events/pending-uploads");
  return res;
}

export function getTeacherPendingUploads() {
  const res = api.get("/dashboard/teachers-without-archives", {
    params: { all: true },
  });
  return res;
}