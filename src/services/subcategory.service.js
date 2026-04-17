import api from "./axios";

export function getSubcategoriesByCategoryId(categoryId, { all = true } = {}) {
  return api.get("/subcategories", {
    params: {
      category_id: categoryId,
      ...(all && { all: true }),
    },
  });
}

export function createSubcategories(data) {
  const res = api.post("/subcategories", data);
  return res;
}

export function updateSubcategories(id, data) {
  const res = api.put(`/subcategories/${id}`, data);
  return res;
}

export function deleteSubcategories(id) {
  const res = api.delete(`/subcategories/${id}`);
  return res;
}
