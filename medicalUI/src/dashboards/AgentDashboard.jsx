import React from "react";
import SummaryRow from "../components/SummaryRow";

function AgentDashboard({
  referrals,
  currentUser,
  doctorMap,
  patientMap,
  agentMap,
  onGoToPatients,
  onGoToCreateReferral,
}) {
  // In real app filter by current agent; for now show all
  const agentReferrals = referrals;

  // const pending = agentReferrals.filter((r) => r.status === "Pending").length;
  const pending = agentReferrals.filter(
  (r) => (r.status || "").toUpperCase() === "PENDING"
  ).length;

  const total = agentReferrals.length;
  const totalCommission = agentReferrals.reduce(
    (sum, r) => sum + (Number(r.commissionAmount) || 0),
    0
  );

  const recentReferrals = agentReferrals.slice(-5).reverse();

  return (
    <div>
      <h2>Agent Dashboard</h2>
      <SummaryRow
        cards={[
          { label: "Total Referrals", value: total },
          { label: "Pending Referrals", value: pending },
          { label: "Total Commissions", value: `₹${totalCommission}` },
        ]}
      />

      <div className="actions-row">
        <button className="btn btn-primary" onClick={onGoToPatients}>
          Add Patient
        </button>
        <button className="btn btn-primary" onClick={onGoToCreateReferral}>
          Create Referral
        </button>
      </div>

      <section className="section">
        <h3>Recent Referrals</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Referral ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Date</th>
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
              </tr>
            ))}
            {recentReferrals.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-row">
                  No referrals yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AgentDashboard;
