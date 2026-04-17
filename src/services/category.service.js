import api from "./axios";

export function getCategories(page = 1) {
  const res = api.get("/categories", { params: { page } });
  return res;
}

export function getCategoryById(id) {
  const res = api.get(`/categories/${id}`);
  return res;
}

export function createCategories(data) {
  const res = api.post("/categories", data);
  return res;
}

export function updateCategories(id, data) {
  const res = api.put(`/categories/${id}`, data);
  return res;
}

export function deleteCategories(id) {
  const res = api.delete(`/categories/${id}`);
  return res;
}
