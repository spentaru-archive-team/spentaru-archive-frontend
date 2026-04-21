import api from "./axios";

export function getArchiveLocations({ page = 1, all = false } = {}) {
  const res = api.get("/archive-locations", { params: { page, all } });
  return res;
}

export function getArchiveLocationById(id) {
  const res = api.get(`/archive-locations/${id}`);
  return res;
}

export function createArchiveLocations(data) {
  const res = api.post("/archive-locations", data);
  return res;
}

export function updateArchiveLocations(id, data) {
  const res = api.put(`/archive-locations/${id}`, data);
  return res;
}

export function deleteArchiveLocations(id) {
  const res = api.delete(`/archive-locations/${id}`);
  return res;
}
