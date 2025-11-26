import React, { useState } from "react";

function ReferralCreationScreen({ patients, doctors, currentUser, agents, onCreate }) {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [referralDate, setReferralDate] = useState("");
  const [notes, setNotes] = useState("");
  const [commissionAmount, setCommissionAmount] = useState("");

  const agentId = agents[0]?.id || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctor) {
      alert("Please select both patient and doctor.");
      return;
    }
    onCreate({
      patientId: Number(selectedPatient),
      doctorId: Number(selectedDoctor),
      agentId,
      date: referralDate,
      notes,
      commissionAmount,
    });
    setSelectedPatient("");
    setSelectedDoctor("");
    setReferralDate("");
    setNotes("");
    setCommissionAmount("");
    alert("Referral created (mock).");
  };

  return (
    <div>
      <h2>Create Referral</h2>
      <section className="section">
        <form className="form grid-2" onSubmit={handleSubmit}>
          <label>
            Patient
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value="">Select Patient...</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Doctor
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Select Doctor...</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialization})
                </option>
              ))}
            </select>
          </label>
          <label>
            Referral Date
            <input
              type="date"
              value={referralDate}
              onChange={(e) => setReferralDate(e.target.value)}
            />
          </label>
          <label>
            Commission Amount
            <input
              type="number"
              value={commissionAmount}
              onChange={(e) => setCommissionAmount(e.target.value)}
            />
          </label>
          <label className="grid-span-2">
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
        </form>
        <div className="form-footer">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Referral
          </button>
        </div>
        <p className="helper-text">
          Auto-suggest can be added by replacing dropdowns with searchable inputs.
        </p>
      </section>
    </div>
  );
}

export default ReferralCreationScreen;
