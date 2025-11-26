import React, { useState } from "react";
import { ROLES } from "../constants";
import authApi from "../api/authApi";

function RegistrationScreen({ onGoToLogin }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    speciality: "",
    contactNumber: "",
    email: "",
    address: "",
    role: ROLES.BROKER,
    city: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        age: Number(form.age) || null,
        gender: form.gender,
        contactNumber: form.contactNumber,
        speciality: form.speciality,
        address: form.address,
        city: form.city,
      };

      await authApi.register(payload);

      setSuccessMsg("Registration successful! Please login.");
      setTimeout(() => onGoToLogin(), 1200);

    } catch (err) {
      console.error(err);
      setErrorMsg("Registration failed — email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card auth-card">
      <h2>Registration</h2>

      {successMsg && (
        <div style={{ color: "green", fontSize: "0.9rem", marginBottom: "8px" }}>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ color: "red", fontSize: "0.9rem", marginBottom: "8px" }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form grid-2">
        <label>
          Name
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
          />
        </label>

        <label>
          Age
          <input
            type="number"
            value={form.age}
            onChange={(e) => updateForm("age", e.target.value)}
          />
        </label>

        <label>
          Gender
          <select
            value={form.gender}
            onChange={(e) => updateForm("gender", e.target.value)}
          >
            <option value="">Select...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Speciality
          <input
            type="text"
            value={form.speciality}
            onChange={(e) => updateForm("speciality", e.target.value)}
          />
        </label>

        <label>
          Contact Number
          <input
            type="tel"
            value={form.contactNumber}
            onChange={(e) => updateForm("contactNumber", e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
          />
        </label>

        <label>
          Address
          <input
            type="text"
            value={form.address}
            onChange={(e) => updateForm("address", e.target.value)}
          />
        </label>

        <label>
          Role
          <select
            value={form.role}
            onChange={(e) => updateForm("role", e.target.value)}
          >
            <option value={ROLES.BROKER}>Broker</option>
            <option value={ROLES.AGENT}>Agent</option>
            <option value={ROLES.PATIENT}>Patient</option>
            <option value={ROLES.DOCTOR}>Doctor</option>
            <option value={ROLES.ADMIN}>Admin</option>
          </select>
        </label>

        <label>
          City/Town/Village
          <input
            type="text"
            value={form.city}
            onChange={(e) => updateForm("city", e.target.value)}
          />
        </label>

        <label className="grid-span-2">
          Password
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => updateForm("password", e.target.value)}
          />
        </label>
      </form>

      <div className="form-footer">
        <button className="btn" onClick={onGoToLogin} disabled={loading}>
          Back to Login
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
}

export default RegistrationScreen;
