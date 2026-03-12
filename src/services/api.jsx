// api.jsx
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ FIX: named exports added
export const loginUser = (data) => {
  return API.post("/login", data);
};

export const signupUser = (data) => {
  return API.post("/signup", data);
};

export const getAllIssues = () => {
  return API.get("/issues");
};

export const addIssue = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return API.post("/issues", data, {
    headers: {
      Authorization: `Bearer ${user?.token}`, // ✅ FIX: token header added
    },
  });
};

export const resolveIssue = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return API.patch(`/issues/${id}/resolve`, {}, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};

export const deleteIssue = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return API.delete(`/issues/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};
