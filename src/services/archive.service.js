import api from "./axios";

export function getArchives(page = 1) {
  const res = api.get("/archives", { params: { page } });
  return res;
}

export function getArchiveById(id) {
  const res = api.get(`/archives/${id}`);
  return res;
}

export function createArchives(data) {
  const res = api.post("/archives", data);
  return res;
}

export function updateArchives(id, data) {
  const res = api.put(`/archives/${id}`, data);
  return res;
}

export function deleteArchives(id) {
  const res = api.delete(`/archives/${id}`);
  return res;
}
