import axiosClient from "./axiosClient";

const doctorApi = {
  getAll: () => axiosClient.get("/doctors"),
  create: (data) => axiosClient.post("/doctors", data),
  update: (id, data) => axiosClient.put(`/doctors/${id}`, data),
  remove: (id) => axiosClient.delete(`/doctors/${id}`),
};

export default doctorApi;
