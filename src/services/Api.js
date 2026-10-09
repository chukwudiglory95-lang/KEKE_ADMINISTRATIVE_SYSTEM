// Thin wrapper around fetch so every page doesn't hand-roll headers,
// JSON parsing, and error handling separately. Point BASE_URL at your
// real backend once it exists.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

function getToken() {
  const raw = localStorage.getItem("kera_auth_user");
  return raw ? JSON.parse(raw).token : null;
}

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};

// Example usage once a real backend exists:
// import { api } from "../services/api";
// const members = await api.get("/members");
// await api.post("/members", newMemberForm);