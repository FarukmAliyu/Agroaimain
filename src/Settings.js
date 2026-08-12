import React, { useState } from "react";
import { FaCog, FaBell, FaUser, FaGlobe, FaCloudSun, FaSave } from "react-icons/fa";

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    language: "English",
    cropType: "Maize",
    location: "Lagos, Nigeria",
    units: "Metric",
    autoAnalysis: true,
    confidenceThreshold: 75
  });

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    alert("✅ Settings saved successfully!");
    console.log("Saved Settings:", settings);
    // You can later save to localStorage or backend
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <FaCog size={28} />
        <h1>Settings</h1>
      </div>

      <div style={styles.card}>
        <h2>🌍 General</h2>
        <div style={styles.row}>
          <label>Language</label>
          <select 
            value={settings.language} 
            onChange={(e) => handleChange("language", e.target.value)}
            style={styles.select}
          >
            <option>English</option>
            <option>French</option>
            <option>Yoruba</option>
            <option>Hausa</option>
            <option>Igbo</option>
          </select>
        </div>

        <div style={styles.row}>
          <label>Default Crop Type</label>
          <select 
            value={settings.cropType} 
            onChange={(e) => handleChange("cropType", e.target.value)}
            style={styles.select}
          >
            <option>Maize</option>
            <option>Tomato</option>
            <option>Cassava</option>
            <option>Beans</option>
            <option>Rice</option>
          </select>
        </div>

        <div style={styles.row}>
          <label>Location</label>
          <input 
            type="text" 
            value={settings.location} 
            onChange={(e) => handleChange("location", e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.card}>
        <h2>🛎️ Notifications</h2>
        <div style={styles.toggleRow}>
          <span>Disease Alerts</span>
          <input 
            type="checkbox" 
            checked={settings.notifications} 
            onChange={(e) => handleChange("notifications", e.target.checked)}
          />
        </div>
        <div style={styles.toggleRow}>
          <span>Email Reports</span>
          <input 
            type="checkbox" 
            checked={settings.emailAlerts} 
            onChange={(e) => handleChange("emailAlerts", e.target.checked)}
          />
        </div>
      </div>

      <div style={styles.card}>
        <h2>🤖 AI Settings</h2>
        <div style={styles.row}>
          <label>Auto Analysis on Upload</label>
          <input 
            type="checkbox" 
            checked={settings.autoAnalysis} 
            onChange={(e) => handleChange("autoAnalysis", e.target.checked)}
          />
        </div>
        <div style={styles.row}>
          <label>Minimum Confidence Threshold</label>
          <input 
            type="range" 
            min="60" 
            max="95" 
            value={settings.confidenceThreshold} 
            onChange={(e) => handleChange("confidenceThreshold", parseInt(e.target.value))}
            style={{ width: "60%" }}
          />
          <span>{settings.confidenceThreshold}%</span>
        </div>
      </div>

      <div style={styles.card}>
        <h2>🌤️ Weather Integration</h2>
        <div style={styles.row}>
          <label>Weather Units</label>
          <select 
            value={settings.units} 
            onChange={(e) => handleChange("units", e.target.value)}
            style={styles.select}
          >
            <option>Metric (°C)</option>
            <option>Imperial (°F)</option>
          </select>
        </div>
      </div>

      <button onClick={saveSettings} style={styles.saveButton}>
        <FaSave /> Save All Settings
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "0 auto",
    background: "#f8fafc",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "15px"
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    marginBottom: "25px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f1f5f9"
  },
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0"
  },
  select: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1"
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    width: "280px"
  },
  saveButton: {
    width: "100%",
    padding: "16px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  }
};

export default Settings;