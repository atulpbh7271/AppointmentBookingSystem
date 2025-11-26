import axiosClient from "./axiosClient";

const patientApi = {
  getAll: () => axiosClient.get("/patients"),
  create: (data) => axiosClient.post("/patients", data),
  update: (id, data) => axiosClient.put(`/patients/${id}`, data),
  remove: (id) => axiosClient.delete(`/patients/${id}`),
};

export default patientApi;
