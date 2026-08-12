import React, { useState } from "react";

function FarmAIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "You", text: message };
    setChat((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      // 🔗 CONNECT TO YOUR BACKEND
      const res = await fetch("http://YOUR_IP:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      const data = await res.json();

      const botMessage = {
        sender: "AgroAI",
        text: data.response || "No response from server",
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "AgroAI", text: "⚠️ Error connecting to server" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🤖 AgroAI Chat</h3>

      {/* CHAT BOX */}
      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "You" ? "right" : "left",
              margin: "6px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                background:
                  msg.sender === "You" ? "#1B5E20" : "#ffffff",
                color: msg.sender === "You" ? "#fff" : "#333",
                maxWidth: "80%",
              }}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </span>
          </div>
        ))}

        {loading && <p style={{ color: "#555" }}>AgroAI is typing...</p>}
      </div>

      {/* INPUT */}
      <div style={styles.inputBox}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about crops, disease, livestock..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

export default FarmAIChat;

/* ================= STYLES ================= */
const styles = {
  container: {
    width: "300px",
    padding: "15px",
    background: "#e8f5e9",
    borderRadius: "15px",
    fontFamily: "Segoe UI",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    color: "#1B5E20",
    marginBottom: "10px",
  },

  chatBox: {
    minHeight: "200px",
    maxHeight: "300px",
    overflowY: "auto",
    marginBottom: "10px",
    padding: "5px",
  },

  inputBox: {
    display: "flex",
    gap: "8px",
  },

  input: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "12px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "8px 12px",
    borderRadius: "12px",
    border: "none",
    background: "#1B5E20",
    color: "#fff",
    cursor: "pointer",
  },
};