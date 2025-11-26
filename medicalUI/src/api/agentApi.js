import axiosClient from "./axiosClient";

const agentApi = {
  getAll: () => axiosClient.get("/agents"),
  create: (data) => axiosClient.post("/agents", data),
  update: (id, data) => axiosClient.put(`/agents/${id}`, data),
  remove: (id) => axiosClient.delete(`/agents/${id}`),
};

export default agentApi;
