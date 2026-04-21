import api from "./axios";

export function getUsers({ page = 1, all = false } = {}) {
  const params = {};

  if (all) {
    params.all = true;
  } else {
    params.page = page;
  }

  const res = api.get("/users", { params });
  return res;
}

export function getUserById(id) {
  const res = api.get(`/users/${id}`);
  return res;
}

export function createUsers(data) {
  const res = api.post("/users", data);
  return res;
}

export function updateUsers(id, data) {
  const res = api.put(`/users/${id}`, data);
  return res;
}

export function deleteUsers(id) {
  const res = api.delete(`/users/${id}`);
  return res;
}
