import React from "react";

const EntryPopup = ({entry}) => {
  return (
    <div className="popup">
      <h3 style={{ marginBottom: "10px" }}>{entry.title}</h3>
      <hr
        style={{
          marginBottom: "10px",
        }}
      />
      {entry.image ? <img src={entry.image} alt={entry.title} /> : null}
      <p>{entry.description}</p>
      <p style={{ fontFamily: "DINPro-Light" }}>
        <strong>Comments:</strong> {entry.comments}
      </p>
      <small>Visited on {new Date(entry.visitDate).toLocaleDateString()}</small>
    </div>
  );
};

export default EntryPopup;
