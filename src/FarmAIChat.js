import React, { useState } from "react";

function FarmAIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "You", text: message };
    setChat((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { sender: "AgroAI", text: data.response || "No response" },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "AgroAI", text: "⚠️ Server error" },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button style={styles.floatingBtn} onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div style={styles.container}>
          <div style={styles.header}>
            <span>🤖 AgroAI</span>
            <button onClick={() => setOpen(false)} style={styles.closeBtn}>
              ✖
            </button>
          </div>

          {/* CHAT */}
          <div style={styles.chatBox}>
            {chat.map((msg, i) => (
              <div
                key={i}
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
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && <p>AgroAI is typing...</p>}
          </div>

          {/* INPUT */}
          <div style={styles.inputBox}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask AgroAI..."
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} style={styles.sendBtn}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FarmAIChat;

/* ================= STYLES ================= */
const styles = {
  floatingBtn: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#1B5E20",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },

  container: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "320px",
    height: "400px",
    background: "#e8f5e9",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },

  header: {
    background: "#1B5E20",
    color: "#fff",
    padding: "10px",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    display: "flex",
    justifyContent: "space-between",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  chatBox: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
  },

  inputBox: {
    display: "flex",
    padding: "10px",
    gap: "5px",
  },

  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  sendBtn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "10px",
    background: "#1B5E20",
    color: "#fff",
    cursor: "pointer",
  },
};