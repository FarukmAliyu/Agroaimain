import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(saved);
  }, []);

  // Delete single item
  const handleDelete = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  // Clear all history
  const handleClearAll = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(135deg, #e8f5e9, #e3f2fd)",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          📊 Scan History
        </h2>

        {history.length === 0 ? (
          <p style={{ textAlign: "center" }}>No scans available yet.</p>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <button
                onClick={handleClearAll}
                style={{
                  padding: "8px 20px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#c62828",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Clear All
              </button>
            </div>

            {history.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#f4f6f8",
                  padding: "15px",
                  borderRadius: "15px",
                  marginBottom: "15px",
                  display: "flex",
                  gap: "15px",
                  alignItems: "center"
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt="scan"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "12px"
                    }}
                  />
                )}

                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 5px 0" }}>
                    {item.name}
                  </h4>
                  <p style={{ margin: 0 }}>
                    <strong>Type:</strong> {item.type}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Severity:</strong> {item.severity}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Date:</strong> {item.date}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#424242",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default History;
