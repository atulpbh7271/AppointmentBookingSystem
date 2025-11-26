import React, { useState } from "react";
import { REFERRAL_STATUSES } from "../constants";

function ReferralTrackingScreen({
  referrals,
  agents,
  doctors,
  patients,
  onUpdateStatus,
}) {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAgent, setFilterAgent] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");

  const filtered = referrals.filter((r) => {
    if (filterStatus && r.status !== filterStatus) return false;
    if (filterAgent && String(r.agentId) !== filterAgent) return false;
    if (filterDoctor && String(r.doctorId) !== filterDoctor) return false;
    return true;
  });

  const patientMap = patients.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});
  const doctorMap = doctors.reduce((acc, d) => {
    acc[d.id] = d;
    return acc;
  }, {});
  const agentMap = agents.reduce((acc, a) => {
    acc[a.id] = a;
    return acc;
  }, {});

  return (
    <div>
      <h2>Referral Tracking</h2>

      <section className="section">
        <div className="filters-row">
          <label>
            Status
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              {REFERRAL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Agent
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
            >
              <option value="">All</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Doctor
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
            >
              <option value="">All</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Referral ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Agent</th>
              <th>Status</th>
              <th>Date</th>
              <th>Commission</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{patientMap[r.patientId]?.name || "-"}</td>
                <td>{doctorMap[r.doctorId]?.name || "-"}</td>
                <td>{agentMap[r.agentId]?.name || "-"}</td>
                <td>{r.status}</td>
                <td>{r.date}</td>
                <td>{r.commissionAmount}</td>
                <td>
                  <select
                    value={r.status}
                    onChange={(e) => onUpdateStatus(r.id, e.target.value)}
                  >
                    {REFERRAL_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-row">
                  No referrals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ReferralTrackingScreen;
