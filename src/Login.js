import React, { useState } from "react";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);

      if (email === "user@example.com" && password === "password123") {
        onLoginSuccess(email);
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      fontFamily: "Segoe UI, sans-serif"
    }}>

      <div style={{
        display: "flex",
        width: "900px",
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}>

        {/* Left Side */}
        <div style={{
          flex: 1,
          background: "#1B5E20",
          color: "white",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h1 style={{ fontSize: "32px", marginBottom: "15px" }}>
            AgroAI 🌾
          </h1>

          <p style={{ opacity: 0.9 }}>
            Detect crop disease instantly using Artificial Intelligence.
            Upload images, analyze plant health, and receive smart farming recommendations.
          </p>
        </div>

        {/* Right Side Login */}
        <div style={{
          flex: 1,
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>

          <h2 style={{ marginBottom: "20px", color: "#1B5E20" }}>
            Login to your account
          </h2>

          <form onSubmit={handleLogin} style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px"
              }}
            />

            <div style={{ position: "relative" }}>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "100%"
                }}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#1B5E20",
                  fontWeight: "bold"
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>

            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#1B5E20",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>

          {error && (
            <p style={{
              color: "red",
              marginTop: "12px",
              fontSize: "14px"
            }}>
              {error}
            </p>
          )}

          <p style={{
            marginTop: "25px",
            fontSize: "13px",
            color: "#777"
          }}>
            Demo login: user@example.com / password123
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;
