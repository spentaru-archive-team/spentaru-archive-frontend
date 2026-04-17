import api from "./axios";

export function getEvents(page = 1) {
  const res = api.get("/events", { params: { page } });
  return res;
}

export function getEventById(id) {
  const res = api.get(`/events/${id}`);
  return res;
}

export function createEvents(data) {
  const res = api.post("/events", data);
  return res;
}

export function updateEvents(id, data) {
  const res = api.put(`/events/${id}`, data);
  return res;
}

export function deleteEvents(id) {
  const res = api.delete(`/events/${id}`);
  return res;
}
