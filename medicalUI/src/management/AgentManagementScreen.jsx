import React, { useState } from "react";

function AgentManagementScreen({ agents, onSave, onDelete }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    contactNumber: "",
    email: "",
    status: "Active",
  });

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      contactNumber: "",
      email: "",
      status: "Active",
    });
    setEditing(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    resetForm();
  };

  const startEdit = (agent) => {
    setForm(agent);
    setEditing(agent.id);
  };

  return (
    <div>
      <h2>Agent Management</h2>

      <div className="section">
        <h3>{editing ? "Edit Agent" : "Add Agent"}</h3>
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
          <label>
            Status
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
        </form>
        <div className="form-footer">
          {editing && (
            <button className="btn" onClick={resetForm}>
              Cancel
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSubmit}>
            {editing ? "Update Agent" : "Add Agent"}
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h3>Agent List</h3>
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Agent ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.contactNumber}</td>
                <td>{a.email}</td>
                <td>{a.status}</td>
                <td>
                  <button
                    className="btn btn-small"
                    onClick={() => startEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => onDelete(a.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredAgents.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-row">
                  No agents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="helper-text">
          Bulk upload via CSV can be added here (upload button + parsing).
        </p>
      </div>
    </div>
  );
}

export default AgentManagementScreen;
