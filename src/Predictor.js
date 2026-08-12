import React, { useState, useRef } from "react";
import { FaUpload, FaRobot, FaLeaf } from "react-icons/fa";

const diseaseData = [
  {
    name: "Leaf Blight",
    severity: "moderate",
    info: "Brown patches on leaves.",
    treatment: ["Apply fungicide", "Remove infected leaves"],
    color: "#f59e0b"
  },
  {
    name: "Powdery Mildew",
    severity: "moderate",
    info: "White powder on leaves.",
    treatment: ["Use neem oil", "Improve airflow"],
    color: "#eab308"
  },
  {
    name: "Root Rot",
    severity: "severe",
    info: "Roots decay from excess water.",
    treatment: ["Reduce watering", "Improve drainage"],
    color: "#ef4444"
  },
  {
    name: "Healthy Crop",
    severity: "healthy",
    info: "Your crop is healthy 🌱",
    treatment: ["Continue regular monitoring"],
    color: "#22c55e"
  }
];

function Predictor() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello 👋 I'm AgroAI. Upload a photo and I'll help diagnose your crop!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);

  // Handle Image Upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setPrediction(null);
  };

  // Trigger file input
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  // Analyze Image
  const analyzeUploadedImage = () => {
    if (!image) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = diseaseData[Math.floor(Math.random() * diseaseData.length)];
      setPrediction(result);
      setIsAnalyzing(false);
    }, 1300);
  };

  // Chatbot
  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    let botReply = "I'm here to help with crop diseases and treatments 🌱";

    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("blight")) botReply = "Leaf Blight: Use fungicide and remove affected leaves immediately.";
    else if (lowerInput.includes("mildew")) botReply = "Powdery Mildew: Apply neem oil and ensure good ventilation.";
    else if (lowerInput.includes("rot")) botReply = "Root Rot: Reduce watering and improve soil drainage.";
    else if (lowerInput.includes("healthy")) botReply = "Great! Keep up the good work maintaining your crops.";

    setMessages(prev => [...prev, userMessage, { text: botReply, sender: "bot" }]);
    setInput("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>🌱Predictor</h1>
        <p>AI-Powered Crop Disease Detection</p>
      </div>

      <div style={styles.mainGrid}>
        {/* Vision Section */}
        <div style={styles.card}>
          <h2>📸 AgroAI Vision</h2>
          
          <div style={styles.uploadArea} onClick={triggerFileUpload}>
            <FaUpload size={50} color="#22c55e" />
            <p>Click to upload a clear photo of your crop leaf</p>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleUpload} 
              style={styles.hiddenInput} 
            />
          </div>

          {image && (
            <div style={styles.imageContainer}>
              <img src={image} alt="crop" style={styles.image} />
            </div>
          )}

          <button
            onClick={analyzeUploadedImage}
            disabled={!image || isAnalyzing}
            style={styles.primaryButton}
          >
            {isAnalyzing ? "Analyzing..." : "🔍 Analyze Image"}
          </button>
        </div>

        {/* Results Section */}
        <div style={styles.card}>
          <h2>📊 Diagnosis Result</h2>
          {prediction ? (
            <div style={{ color: prediction.color }}>
              <h3 style={{ fontSize: "1.8rem" }}>{prediction.name}</h3>
              <p><strong>{prediction.info}</strong></p>
              <p><strong>Severity:</strong> {prediction.severity.toUpperCase()}</p>
              <h4>Treatment Recommendations:</h4>
              <ul style={styles.treatmentList}>
                {prediction.treatment.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <FaLeaf size={60} color="#94a3b8" />
              <p>No prediction yet.<br />Upload an image to begin.</p>
            </div>
          )}
        </div>

        {/* Chatbot */}
        <div style={styles.chatCard}>
          <h2>🤖 AgroAI Assistant</h2>
          <div style={styles.chatBox}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? "#22c55e" : "#1e2937"
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.chatInputContainer}>
            <input
              style={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about diseases or treatments..."
            />
            <button onClick={handleSend} style={styles.sendButton}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "linear-gradient(135deg, #0f172a, #1e2937)",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "system-ui, sans-serif"
  },
  header: { textAlign: "center", marginBottom: "40px" },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "25px",
    maxWidth: "1400px",
    margin: "0 auto"
  },
  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },
  chatCard: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    height: "620px"
  },
  uploadArea: {
    textAlign: "center",
    padding: "50px 20px",
    border: "3px dashed #22c55e",
    borderRadius: "16px",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  hiddenInput: { display: "none" },
  imageContainer: { margin: "15px 0" },
  image: {
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)"
  },
  primaryButton: {
    width: "100%",
    padding: "14px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px"
  },
  treatmentList: { marginTop: "15px", paddingLeft: "20px" },
  emptyState: { textAlign: "center", padding: "60px 20px", color: "#94a3b8" },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingRight: "10px"
  },
  message: {
    padding: "12px 16px",
    borderRadius: "12px",
    maxWidth: "85%",
    color: "white"
  },
  chatInputContainer: { display: "flex", gap: "10px" },
  chatInput: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#334155",
    color: "white"
  },
  sendButton: {
    padding: "14px 24px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer"
  }
};

export default Predictor;