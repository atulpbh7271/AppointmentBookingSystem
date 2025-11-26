import React from "react";

function SummaryRow({ cards }) {
  return (
    <div className="summary-row">
      {cards.map((c) => (
        <div className="summary-card" key={c.label}>
          <div className="summary-label">{c.label}</div>
          <div className="summary-value">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

export default SummaryRow;
