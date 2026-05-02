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

export function createArchiveLocations(id, data) {
  const res = api.post(`/archives/${id}/physical-locations`, data);
  return res;
}

export function updateArchiveLocations(id, data) {
  const res = api.put(`/archives/${id}/physical-locations/`, data);
  return res;
}

export function deleteArchiveLocations(id) {
  const res = api.delete(`/archives/${id}/physical-locations/${id}`);
  return res;
}
