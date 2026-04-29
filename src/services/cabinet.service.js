import api from "./axios";

export function getCabinets() {
  const res = api.get("/cabinets");
  return res;
}

export function getCabinetById(id) {
  const res = api.get(`/cabinets/${id}`);
  return res;
}

export function createCabinets(data) {
  const res = api.post("/cabinets", data);
  return res;
}

export function updateCabinets(id, data) {
  const res = api.put(`/cabinets/${id}`, data);
  return res;
}

export function deleteCabinets(id) {
  const res = api.delete(`/cabinets/${id}`);
  return res;
}
