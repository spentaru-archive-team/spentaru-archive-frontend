import api from "./axios";

export function getArchiveLocations({ page = 1, all = false, query } = {}) {
  const params = { page, all };

  if (query) {
    params.q = query;
  }

  const res = api.get("/archives/physical-locations", { params });
  return res;
}

export function getArchiveLocationById(id) {
  const res = api.get(`/archives/physical-locations/${id}`);
  return res;
}

export function createArchiveLocations(data) {
  const res = api.post("/archives/physical-locations", data);
  return res;
}

export function updateArchiveLocations(id, data) {
  const res = api.put(`/archives/physical-locations/${id}`, data);
  return res;
}

export function deleteArchiveLocations(id) {
  const res = api.delete(`/archives/physical-locations/${id}`);
  return res;
}
