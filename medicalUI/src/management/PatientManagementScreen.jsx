import React, { useState } from "react";

function PatientManagementScreen({ patients, onSave, onDelete }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: "",
    age: "",
    gender: "",
    contactNumber: "",
    medicalCondition: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      id: null,
      name: "",
      age: "",
      gender: "",
      contactNumber: "",
      medicalCondition: "",
    });
    setEditing(null);
  };

  const startEdit = (p) => {
    setForm(p);
    setEditing(p.id);
  };

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.medicalCondition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Patient Management</h2>

      <section className="section">
        <h3>{editing ? "Edit Patient" : "Add Patient"}</h3>
        <form className="form grid-2" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Age
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </label>
          <label>
            Gender
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Select...</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
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
            Medical Condition
            <input
              type="text"
              value={form.medicalCondition}
              onChange={(e) =>
                setForm({ ...form, medicalCondition: e.target.value })
              }
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
            {editing ? "Update Patient" : "Add Patient"}
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h3>Patient List</h3>
          <input
            type="text"
            placeholder="Search by name or condition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Medical Condition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.medicalCondition}</td>
                <td>
                  <button
                    className="btn btn-small"
                    onClick={() => startEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => onDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-row">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PatientManagementScreen;
