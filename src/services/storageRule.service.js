import api from "./axios";

export function getArchiveStorageRules({ page = 1, all = false } = {}) {
  const res = api.get("/archive-storage-rules", {
    params: { page, all },
  });
  return res;
}

export function getArchiveStorageRuleById(id) {
  const res = api.get(`/archive-storage-rules/${id}`);
  return res;
}

export function createArchiveStorageRules(data) {
  const res = api.post("/archive-storage-rules", data);
  return res;
}

export function updateArchiveStorageRules(id, data) {
  const res = api.patch(`/archive-storage-rules/${id}`, data);
  return res;
}

export function deleteArchiveStorageRules(id) {
  const res = api.delete(`/archive-storage-rules/${id}`);
  return res;
}
