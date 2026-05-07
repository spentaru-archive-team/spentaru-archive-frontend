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

export function getArchives({
  page = 1,
  all = false,
  query,
  sort,
  filters,
} = {}) {
  const params = {};

  if (all) {
    params.all = true;
  } else {
    params.page = page;
  }

  if (query) {
    params.q = query;
  }

  if (sort) {
    params.sort = sort;
  }

  if (filters?.category_id) {
    params["filters[category_id][$eq]"] = filters.category_id;
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

export function decideArchiveRetention(id, data) {
  const res = api.patch(`/archives/${id}/retention/decide`, data);
  return res;
}

export function getArchivePreview(id) {
  const res = api.get(`/archives/${id}/preview`, {
    responseType: "blob",
  });
  return res;
}

export function getArchiveDownload(id) {
  const res = api.get(`/archives/${id}/download`);
  return res;
}

export async function validateArchivePreview(id) {
  const response = await api.get(`/archives/${id}/preview`, {
    responseType: "blob",
    validateStatus: () => true,
    headers: {
      Accept: "application/json",
    },
  });

  const contentType = response.headers?.["content-type"] || "";
  if (contentType.includes("application/json")) {
    let message = "Preview gagal dimuat.";
    try {
      const payload = JSON.parse(await response.data.text());
      message = payload?.message || message;
    } catch {
      console.error("Gagal mem-parsing pesan error dari response preview arsip.", {
        contentType,
        status: response.status,
      });
    }
    return { ok: false, message };
  }

  if (response.status >= 400) {
    return { ok: false, message: "Preview gagal dimuat." };
  }

  return { ok: true, message: "" };
}
