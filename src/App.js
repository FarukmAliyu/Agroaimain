import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Login from "./Login";
import Predictor from "./Predictor";
import History from "./History";
import Dashboard from "./Dashboard";
import Learn from "./learn";
import translations from "./translations";
import FarmAIChat from "./FarmAIChat";
import Settings from "./Settings";

/* ========== APP ========== */
function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState("English");

  const [stats, setStats] = useState({
    total: 0,
    healthy: 0,
    moderate: 0,
    severe: 0,
  });

  const t = translations[language];

  const updateFromPrediction = (result) => {
    setStats((prev) => ({
      total: prev.total + 1,
      healthy: result.severity === "Healthy" ? prev.healthy + 1 : prev.healthy,
      moderate: result.severity === "Moderate" ? prev.moderate + 1 : prev.moderate,
      severe: result.severity === "Severe" ? prev.severe + 1 : prev.severe,
    }));
  };

  if (!user) {
    return <Login onLoginSuccess={setUser} t={t} />;
  }

  return (
    <BrowserRouter>
      <MainLayout user={user} language={language} setLanguage={setLanguage}>
        <Routes>
          <Route path="/" element={<Dashboard stats={stats} />} />
          <Route path="/predict" element={<Predictor setStats={updateFromPrediction} />} />
          <Route path="/history" element={<History />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/settings" element={< Settings/>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

/* ========== LAYOUT ========== */
function MainLayout({ children, user, language, setLanguage }) {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2>🌿 AgroAI</h2>

        <nav style={styles.nav}>
          <button onClick={() => navigate("/")} style={styles.btn}>Dashboard</button>
          <button onClick={() => navigate("/predict")} style={styles.btn}>Predict</button>
          <button onClick={() => navigate("/history")} style={styles.btn}>History</button>
          <button onClick={() => navigate("/learn")} style={styles.btn}>Learn</button>
          <button onClick={() => navigate("/settings")} style={styles.btn}>Settings</button>
        </nav>
      </aside>

      {/* MAIN */}
      <div style={styles.main}>
        {/* TOPBAR */}
        <div style={styles.topbar}>
          <strong>Welcome, {user}</strong>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hausa</option>
            <option>Yoruba</option>
            <option>Igbo</option>
          </select>
        </div>

        {/* PAGE CONTENT */}
        <div style={styles.content}>
          {children}
        </div>
      </div>

      {/* CHATBOT */}
      <FarmAIChat />
    </div>
  );
}

/* ========== STYLES ========== */
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
    background: "#f4f6f8",
  },

  sidebar: {
    width: "240px",
    background: "#1B5E20",
    color: "white",
    padding: "20px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },

  btn: {
    padding: "10px",
    border: "none",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    textAlign: "left",
    borderRadius: "8px",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  topbar: {
    padding: "15px",
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
  },

  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1,
  },
};