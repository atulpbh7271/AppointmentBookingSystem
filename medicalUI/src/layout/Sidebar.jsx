import React from "react";
import { ROLES } from "../constants";

function Sidebar({ currentView, setCurrentView, currentUser }) {
  if (!currentUser) return null;

  const navItems = [];

  if (currentUser.role === ROLES.BROKER) {
    navItems.push(
      { id: "brokerDashboard", label: "Dashboard" },
      { id: "agentManagement", label: "Agents" },
      { id: "doctorManagement", label: "Doctors" },
      { id: "referralTracking", label: "Referrals" }
    );
  }

  if (currentUser.role === ROLES.AGENT) {
    navItems.push(
      { id: "agentDashboard", label: "Dashboard" },
      { id: "patientManagement", label: "Patients" },
      { id: "referralCreation", label: "Create Referral" },
      { id: "referralTracking", label: "Track Referrals" }
    );
  }

  if (currentUser.role === ROLES.ADMIN) {
    navItems.push({ id: "adminDashboard", label: "Admin Dashboard" });
  }

  return (
    <nav className="sidebar">
      <h3>Navigation</h3>
      <ul>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={
                currentView === item.id
                  ? "sidebar-link sidebar-link-active"
                  : "sidebar-link"
              }
              onClick={() => setCurrentView(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
