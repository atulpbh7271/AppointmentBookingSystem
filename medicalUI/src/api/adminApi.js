import axiosClient from "./axiosClient";

const adminApi = {
  getSummary: () => axiosClient.get("/admin/summary"),
  getSystemReferrals: () => axiosClient.get("/admin/referrals"),
  getReferralsPerBroker: () =>
    axiosClient.get("/admin/analytics/referrals-per-broker"),
  getAuditLogs: () => axiosClient.get("/admin/audit-logs"),
};

export default adminApi;
