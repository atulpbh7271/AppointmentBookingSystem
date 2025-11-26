import axiosClient from "./axiosClient";

const referralApi = {
  getAll: () => axiosClient.get("/referrals"),
  create: (data) => axiosClient.post("/referrals", data),
  updateStatus: (id, status) =>
    axiosClient.patch(`/referrals/${id}/status`, { status }),
};

export default referralApi;
