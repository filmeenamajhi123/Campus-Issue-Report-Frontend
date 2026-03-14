// api.jsx
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ FIX: named exports added
export const loginUser = (data) => {
  return API.post("/api/login", data);
};

export const signupUser = (data) => {
  return API.post("/api/signup", data);
};

export const getAllIssues = () => {
  return API.get("/api/issues");
};

export const addIssue = (data) => {
const user = JSON.parse(localStorage.getItem("user") || "{}");
  return API.post("/api/issues", data, {
    headers: {
      Authorization: `Bearer ${user?.token}`, // ✅ FIX: token header added
    },
  });
};

export const resolveIssue = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return API.patch(`/api/issues/${id}/resolve`, {}, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};

export const deleteIssue = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return API.delete(`/api/issues/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};
