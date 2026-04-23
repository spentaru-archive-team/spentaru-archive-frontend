import api from "./axios";

const toMultipartFormData = (data = {}) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (key === "file") {
      if (value instanceof File) {
        formData.append(key, value);
      }
      return;
    }

    formData.append(key, value);
  });

  return formData;
};

export function getArchivesWithoutLocation() {
  const res = api.get("/archives/without-location");
  return res;
}

export function getArchives({ page = 1, all = false } = {}) {
  const params = {};

  if (all) {
    params.all = true;
  } else {
    params.page = page;
  }

  const res = api.get("/archives", { params });
  return res;
}

export function getArchiveById(id) {
  const res = api.get(`/archives/${id}`);
  return res;
}

export function createArchives(data) {
  const payload = toMultipartFormData(data);
  const res = api.post("/archives", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}

export function updateArchives(id, data) {
  const payload = toMultipartFormData(data);
  const res = api.put(`/archives/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}

export function deleteArchives(id) {
  const res = api.delete(`/archives/${id}`);
  return res;
}
