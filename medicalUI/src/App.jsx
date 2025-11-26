import React, { useEffect, useState, useMemo } from "react";
import "./styles.css";
import { ROLES } from "./constants";
import { useAuth } from "./context/AuthContext";

import Topbar from "./layout/Topbar";
import Sidebar from "./layout/Sidebar";

import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

import BrokerDashboard from "./dashboards/BrokerDashboard";
import AgentDashboard from "./dashboards/AgentDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

import AgentManagementScreen from "./management/AgentManagementScreen";
import DoctorManagementScreen from "./management/DoctorManagementScreen";
import PatientManagementScreen from "./management/PatientManagementScreen";

import ReferralCreationScreen from "./referrals/ReferralCreationScreen";
import ReferralTrackingScreen from "./referrals/ReferralTrackingScreen";

import agentApi from "./api/agentApi";
import doctorApi from "./api/doctorApi";
import patientApi from "./api/patientApi";
import referralApi from "./api/referralApi";

function App() {
  const { user: currentUser, logout } = useAuth();
  const [currentView, setCurrentView] = useState("login");

  const [agents, setAgents] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [referrals, setReferrals] = useState([]);

  // when user logs in, decide default screen
  useEffect(() => {
    if (!currentUser) {
      setCurrentView("login");
      return;
    }

    if (currentUser.role === ROLES.BROKER) setCurrentView("brokerDashboard");
    else if (currentUser.role === ROLES.AGENT) setCurrentView("agentDashboard");
    else if (currentUser.role === ROLES.ADMIN) setCurrentView("adminDashboard");
  }, [currentUser]);

  // load data after login
  useEffect(() => {
    if (!currentUser) return;

    const loadAll = async () => {
      try {
        const [aRes, dRes, pRes, rRes] = await Promise.all([
          agentApi.getAll(),
          doctorApi.getAll(),
          patientApi.getAll(),
          referralApi.getAll(),
        ]);

        setAgents(aRes.data);
        setDoctors(dRes.data);
        setPatients(pRes.data);
        setReferrals(rRes.data);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };
    loadAll();
  }, [currentUser]);

  // maps for dashboards
  const agentMap = useMemo(
    () =>
      agents.reduce((acc, a) => {
        acc[a.id] = a;
        return acc;
      }, {}),
    [agents]
  );

  const doctorMap = useMemo(
    () =>
      doctors.reduce((acc, d) => {
        acc[d.id] = d;
        return acc;
      }, {}),
    [doctors]
  );

  const patientMap = useMemo(
    () =>
      patients.reduce((acc, p) => {
        acc[p.id] = p;
        return acc;
      }, {}),
    [patients]
  );

  // agent CRUD
  const handleAddOrUpdateAgent = async (agent) => {
    if (agent.id) {
      const res = await agentApi.update(agent.id, agent);
      setAgents((prev) => prev.map((a) => (a.id === agent.id ? res.data : a)));
    } else {
      const res = await agentApi.create(agent);
      setAgents((prev) => [...prev, res.data]);
    }
  };

  const handleDeleteAgent = async (id) => {
    await agentApi.remove(id);
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  // doctor CRUD
  const handleAddOrUpdateDoctor = async (doctor) => {
    if (doctor.id) {
      const res = await doctorApi.update(doctor.id, doctor);
      setDoctors((prev) =>
        prev.map((d) => (d.id === doctor.id ? res.data : d))
      );
    } else {
      const res = await doctorApi.create(doctor);
      setDoctors((prev) => [...prev, res.data]);
    }
  };

  const handleDeleteDoctor = async (id) => {
    await doctorApi.remove(id);
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  // patient CRUD
  const handleAddOrUpdatePatient = async (patient) => {
    if (patient.id) {
      const res = await patientApi.update(patient.id, patient);
      setPatients((prev) =>
        prev.map((p) => (p.id === patient.id ? res.data : p))
      );
    } else {
      const res = await patientApi.create(patient);
      setPatients((prev) => [...prev, res.data]);
    }
  };

  const handleDeletePatient = async (id) => {
    await patientApi.remove(id);
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  // referrals
  const handleCreateReferral = async (referralData) => {
    const res = await referralApi.create(referralData);
    setReferrals((prev) => [...prev, res.data]);
  };

  const handleUpdateReferralStatus = async (id, status) => {
    const res = await referralApi.updateStatus(id, status);
    setReferrals((prev) => prev.map((r) => (r.id === id ? res.data : r)));
  };

  const handleLogout = () => {
    logout();
    setCurrentView("login");
  };

  const showAuthLayout = !currentUser;

  return (
    <div className="app-root">
      <Topbar currentUser={currentUser} onLogout={handleLogout} />
      <div className="app-body">
        {showAuthLayout ? (
          <div className="auth-container">
            {currentView === "login" && (
              <LoginScreen
                onGoToRegister={() => setCurrentView("register")}
              />
            )}
            {currentView === "register" && (
              <RegistrationScreen
                onGoToLogin={() => setCurrentView("login")}
              />
            )}
          </div>
        ) : (
          <div className="main-layout">
            <Sidebar
              currentView={currentView}
              setCurrentView={setCurrentView}
              currentUser={currentUser}
            />
            <main className="main-content">
              {currentView === "brokerDashboard" && (
                <BrokerDashboard
                  agents={agents}
                  referrals={referrals}
                  doctorMap={doctorMap}
                  patientMap={patientMap}
                  onGoToAgents={() => setCurrentView("agentManagement")}
                  onGoToDoctors={() => setCurrentView("doctorManagement")}
                  onGoToReferrals={() => setCurrentView("referralTracking")}
                />
              )}

              {currentView === "agentDashboard" && (
                <AgentDashboard
                  referrals={referrals}
                  currentUser={currentUser}
                  doctorMap={doctorMap}
                  patientMap={patientMap}
                  agentMap={agentMap}
                  onGoToPatients={() => setCurrentView("patientManagement")}
                  onGoToCreateReferral={() =>
                    setCurrentView("referralCreation")
                  }
                />
              )}

              
              {currentView === "adminDashboard" && (
                <AdminDashboard
                  agents={agents}
                  doctors={doctors}
                  patients={patients}
                  referrals={referrals}
                  doctorMap={doctorMap}
                  patientMap={patientMap}
                  agentMap={agentMap}
                  onGoToManageBrokers={()=>{
                    alert("Implement Broker Management screen and wire navigation here.");
                  }}
                />
              )}



              {currentView === "agentManagement" && (
                <AgentManagementScreen
                  agents={agents}
                  onSave={handleAddOrUpdateAgent}
                  onDelete={handleDeleteAgent}
                />
              )}

              {currentView === "doctorManagement" && (
                <DoctorManagementScreen
                  doctors={doctors}
                  onSave={handleAddOrUpdateDoctor}
                  onDelete={handleDeleteDoctor}
                />
              )}

              {currentView === "patientManagement" && (
                <PatientManagementScreen
                  patients={patients}
                  onSave={handleAddOrUpdatePatient}
                  onDelete={handleDeletePatient}
                />
              )}

              {currentView === "referralCreation" && (
                <ReferralCreationScreen
                  patients={patients}
                  doctors={doctors}
                  currentUser={currentUser}
                  agents={agents}
                  onCreate={handleCreateReferral}
                />
              )}

              {currentView === "referralTracking" && (
                <ReferralTrackingScreen
                  referrals={referrals}
                  agents={agents}
                  doctors={doctors}
                  patients={patients}
                  onUpdateStatus={handleUpdateReferralStatus}
                />
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
