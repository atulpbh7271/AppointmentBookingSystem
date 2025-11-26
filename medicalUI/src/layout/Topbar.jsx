import React from "react";

function Topbar({ currentUser, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-left">Referral Management System</div>
      <div className="topbar-right">
        {currentUser && (
          <>
            <span className="topbar-user">
              {currentUser.email} ({currentUser.role})
            </span>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Topbar;
