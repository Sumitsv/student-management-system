import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: `${API_URL}/students`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStudents = async (searchQuery = "") => {
  const response = await apiClient.get("/", {
    params: { search: searchQuery },
  });

  return response.data?.data ?? [];
};

export const getStudentById = async (id) => {
  const response = await apiClient.get(`/${id}`);
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await apiClient.post("/", studentData);
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await apiClient.put(`/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await apiClient.delete(`/${id}`);
  return response.data;
};
