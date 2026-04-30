import api from "./axios";

export function getEvents({
  page = 1,
  all = false,
  perPage,
  query,
  status,
  sort,
} = {}) {
  const params = {
    page,
    all,
    per_page: perPage,
    q: query || undefined,
    sort: sort || undefined,
  };

  if (status) {
    params.filters = {
      status: {
        $eq: status,
      },
    };
  }

  const res = api.get("/events", { params });
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
