import React, { useState } from "react";

function DoctorManagementScreen({ doctors, onSave, onDelete }) {
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    specialization: "",
    hospitalName: "",
    contactNumber: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      id: null,
      name: "",
      specialization: "",
      hospitalName: "",
      contactNumber: "",
      email: "",
    });
    setEditing(null);
  };

  const startEdit = (doc) => {
    setForm(doc);
    setEditing(doc.id);
  };

  const filtered = doctors.filter((d) =>
    filterSpecialization
      ? d.specialization
          .toLowerCase()
          .includes(filterSpecialization.toLowerCase())
      : true
  );

  return (
    <div>
      <h2>Doctor Management</h2>

      <section className="section">
        <h3>{editing ? "Edit Doctor" : "Add Doctor"}</h3>
        <form className="form grid-2" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Specialization
            <input
              type="text"
              value={form.specialization}
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
            />
          </label>
          <label>
            Hospital Name
            <input
              type="text"
              value={form.hospitalName}
              onChange={(e) =>
                setForm({ ...form, hospitalName: e.target.value })
              }
            />
          </label>
          <label>
            Contact Number
            <input
              type="tel"
              value={form.contactNumber}
              onChange={(e) =>
                setForm({ ...form, contactNumber: e.target.value })
              }
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
        </form>
        <div className="form-footer">
          {editing && (
            <button className="btn" onClick={() => setEditing(null)}>
              Cancel
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editing ? "Update Doctor" : "Add Doctor"}
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h3>Doctor List</h3>
          <input
            type="text"
            placeholder="Filter by specialization"
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Hospital</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.specialization}</td>
                <td>{d.hospitalName}</td>
                <td>{d.contactNumber}</td>
                <td>{d.email}</td>
                <td>
                  <button
                    className="btn btn-small"
                    onClick={() => startEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => onDelete(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-row">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="helper-text">
          Assign doctors to agents feature can be added here (mapping UI).
        </p>
      </section>
    </div>
  );
}

export default DoctorManagementScreen;
