import React, { useState } from "react";
import { ROLES } from "../constants";
import authApi from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function LoginScreen({ onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES.BROKER); 
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await authApi.login({ email, password });
      const { token, email: resEmail, role: resRole } = res.data;
      login({ token, email: resEmail, role: resRole });
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="card auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Role (for info)
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value={ROLES.BROKER}>Broker</option>
            <option value={ROLES.AGENT}>Agent</option>
            <option value={ROLES.ADMIN}>Admin</option>
          </select>
        </label>

        {error && <div style={{ color: "red", fontSize: "0.8rem" }}>{error}</div>}

        <button type="submit" className="btn btn-primary full-width">
          Login
        </button>
      </form>

      <div className="auth-footer">
        <button className="link-button">Forgot Password?</button>
        <button className="link-button" onClick={onGoToRegister}>
          New user? Register
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
