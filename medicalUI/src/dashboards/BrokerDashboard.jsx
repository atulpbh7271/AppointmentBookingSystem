import React, { useMemo, useState } from "react";
import SummaryRow from "../components/SummaryRow";

function BrokerDashboard({
  agents,
  referrals,
  doctorMap,
  patientMap,
  onGoToAgents,
  onGoToDoctors,
  onGoToReferrals,
}) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const totalAgents = agents.length;
  const totalReferrals = referrals.length;
  const totalCommissions = referrals.reduce(
    (sum, r) => sum + (Number(r.commissionAmount) || 0),
    0
  );

  // 🔍 filter referrals by status + date
  const filteredReferrals = useMemo(() => {
    return referrals.filter((r) => {
      // status filter
      if (statusFilter !== "ALL") {
        const st = (r.status || "").toUpperCase();
        if (st !== statusFilter.toUpperCase()) return false;
      }

      // date filter (assuming r.date is 'YYYY-MM-DD' or similar string)
      if (fromDate) {
        if (!r.date || r.date < fromDate) return false;
      }
      if (toDate) {
        if (!r.date || r.date > toDate) return false;
      }

      return true;
    });
  }, [referrals, statusFilter, fromDate, toDate]);

  // show latest 10 (already filtered)
  const recentReferrals = useMemo(
    () => [...filteredReferrals].slice(-10).reverse(),
    [filteredReferrals]
  );

  // 🔽 CSV export of *filtered* referrals
  const handleExportCsv = () => {
    if (!filteredReferrals.length) {
      alert("No referrals to export for current filters.");
      return;
    }

    const header = [
      "Referral ID",
      "Patient",
      "Doctor",
      "Status",
      "Date",
      "Commission",
    ];

    const rows = filteredReferrals.map((r) => [
      r.id,
      patientMap[r.patientId]?.name || "",
      doctorMap[r.doctorId]?.name || "",
      r.status || "",
      r.date || "",
      r.commissionAmount ?? "",
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((v) => `"${(v ?? "").toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "broker_referrals.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-page">
      <h2>Broker Dashboard</h2>

      {/* Summary Cards */}
      <SummaryRow
        cards={[
          { label: "Total Agents", value: totalAgents },
          { label: "Total Referrals", value: totalReferrals },
          {
            label: "Total Commissions",
            value: `₹${totalCommissions.toFixed(2)}`,
          },
        ]}
      />

      {/* Actions */}
      <div className="actions-row">
        <button className="btn btn-primary" onClick={onGoToAgents}>
          Add / Manage Agents
        </button>
        <button className="btn btn-primary" onClick={onGoToReferrals}>
          View All Referrals
        </button>
        <button className="btn" onClick={onGoToDoctors}>
          Add / Manage Doctors
        </button>
        <button className="btn btn-secondary" onClick={handleExportCsv}>
          Export Referrals (CSV)
        </button>
      </div>

      {/* Filters */}
      <div className="filter-row card">
        <div className="filter-item">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="filter-item">
          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button
          className="btn btn-link"
          onClick={() => {
            setStatusFilter("ALL");
            setFromDate("");
            setToDate("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Agents table */}
      <section className="section card">
        <h3>Agents</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Total Referrals</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.contactNumber}</td>
                <td>{a.status}</td>
                <td>{referrals.filter((r) => r.agentId === a.id).length}</td>
              </tr>
            ))}
            {agents.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-row">
                  No agents yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Recent filtered referrals */}
      <section className="section card">
        <h3>Recent Referrals</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Referral ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Date</th>
              <th>Commission</th>
            </tr>
          </thead>
          <tbody>
            {recentReferrals.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{patientMap[r.patientId]?.name || "-"}</td>
                <td>{doctorMap[r.doctorId]?.name || "-"}</td>
                <td>{r.status}</td>
                <td>{r.date}</td>
                <td>{r.commissionAmount}</td>
              </tr>
            ))}
            {recentReferrals.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-row">
                  No referrals for current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default BrokerDashboard;
