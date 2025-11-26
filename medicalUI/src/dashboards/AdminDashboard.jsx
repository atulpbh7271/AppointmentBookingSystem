import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

function AdminDashboard({
  agents = [],
  doctors = [],
  patients = [],
  referrals = [],
  agentMap = {},
  doctorMap = {},
  patientMap = {},
  onGoToManageBrokers,
}) {
  const [summary, setSummary] = useState({
    totalBrokers: 0,
    totalAgents: agents.length,
    totalDoctors: doctors.length,
    totalPatients: patients.length,
    totalReferrals: referrals.length,
  });

  const [systemReferrals, setSystemReferrals] = useState([]);
  const [referralsPerBroker, setReferralsPerBroker] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [summaryRes, sysRefRes, perBrokerRes, logsRes] =
          await Promise.all([
            adminApi.getSummary(),
            adminApi.getSystemReferrals(),
            adminApi.getReferralsPerBroker(),
            adminApi.getAuditLogs(),
          ]);

        setSummary(summaryRes.data);
        setSystemReferrals(sysRefRes.data);
        setReferralsPerBroker(perBrokerRes.data);
        setAuditLogs(logsRes.data);
      } catch (err) {
        console.error("Error loading admin data", err);
      }
    };

    loadAdminData();
  }, []);

  const handleManageBrokersClick = () => {
    if (onGoToManageBrokers) {
      onGoToManageBrokers();
    } else {
      alert("Manage Brokers screen not wired yet.");
    }
  };

  const handleGenerateReports = () => {
    // For now, just basic CSV download of system referrals
    if (!systemReferrals.length) {
      alert("No referrals to export.");
      return;
    }

    const header = [
      "Referral ID",
      "Date",
      "Status",
      "Commission",
      "Broker",
      "Agent",
      "Patient",
      "Doctor",
    ];
    const rows = systemReferrals.map((r) => [
      r.id,
      r.date,
      r.status,
      r.commissionAmount ?? "",
      r.brokerName,
      r.agentName,
      r.patientName,
      r.doctorName,
    ]);

    const csvContent =
      [header, ...rows]
        .map((row) => row.map((v) => `"${v ?? ""}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "referrals_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card summary-card">
          <div className="summary-label">Total Brokers</div>
          <div className="summary-value">{summary.totalBrokers}</div>
        </div>
        <div className="card summary-card">
          <div className="summary-label">Total Agents</div>
          <div className="summary-value">{summary.totalAgents}</div>
        </div>
        <div className="card summary-card">
          <div className="summary-label">Total Doctors</div>
          <div className="summary-value">{summary.totalDoctors}</div>
        </div>
        <div className="card summary-card">
          <div className="summary-label">Total Patients</div>
          <div className="summary-value">{summary.totalPatients}</div>
        </div>
        <div className="card summary-card">
          <div className="summary-label">Total Referrals</div>
          <div className="summary-value">{summary.totalReferrals}</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="admin-actions">
        <button className="btn" onClick={handleManageBrokersClick}>
          Manage Brokers
        </button>
        <button className="btn btn-secondary" onClick={handleGenerateReports}>
          Generate Reports (CSV)
        </button>
      </div>

      {/* Analytics: referrals per broker */}
      <div className="card admin-section">
        <h3>Referrals per Broker</h3>
        {!referralsPerBroker.length ? (
          <p>No analytics data yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Broker</th>
                <th>Referrals</th>
              </tr>
            </thead>
            <tbody>
              {referralsPerBroker.map((row) => (
                <tr key={row.brokerName}>
                  <td>{row.brokerName}</td>
                  <td>{row.referralCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* System-wide referrals */}
      <div className="card admin-section">
        <h3>System-wide Referrals</h3>
        {!systemReferrals.length ? (
          <p>No referrals found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Commission</th>
                <th>Broker</th>
                <th>Agent</th>
                <th>Patient</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {systemReferrals.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.date}</td>
                  <td>{r.status}</td>
                  <td>{r.commissionAmount ?? "-"}</td>
                  <td>{r.brokerName}</td>
                  <td>{r.agentName}</td>
                  <td>{r.patientName}</td>
                  <td>{r.doctorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Audit logs */}
      <div className="card admin-section">
        <h3>Audit Logs</h3>
        {!auditLogs.length ? (
          <p>No audit logs yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.timestamp?.replace("T", " ").substring(0, 19)}</td>
                  <td>{log.username}</td>
                  <td>{log.action}</td>
                  <td>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;