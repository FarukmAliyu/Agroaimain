import React, { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import {
  FaLeaf, FaBug, FaBrain, FaCloudSun, FaBell, FaSearch,
  FaCamera, FaPlay, FaPause, FaExclamationTriangle
} from "react-icons/fa";

function Dashboard() {
  const [phiScore, setPhiScore] = useState(94);
  const [anomalies, setAnomalies] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [detections, setDetections] = useState([]);
  const [model, setModel] = useState(null);
  const [edgeOverlay, setEdgeOverlay] = useState(false);
  const [showDetections, setShowDetections] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Load COCO-SSD Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        console.log("✅ COCO-SSD Model Loaded");
      } catch (err) {
        console.error("Failed to load model", err);
      }
    };
    loadModel();
  }, []);

  const toggleCamera = async () => {
    if (isCameraActive) {
      stream?.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
      setStream(null);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    } else {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsCameraActive(true);
      } catch (err) {
        alert("Camera access failed. Please check permissions.");
      }
    }
  };

  // Real-time Processing
  const processFrame = async () => {
    if (!videoRef.current || !canvasRef.current || !isCameraActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Object Detection
    if (showDetections && model) {
      try {
        const predictions = await model.detect(video);
        setDetections(predictions);

        ctx.strokeStyle = "#22ff88";
        ctx.lineWidth = 3;
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#22ff88";

        predictions.forEach(pred => {
          const [x, y, width, height] = pred.bbox;
          ctx.strokeRect(x, y, width, height);
          ctx.fillText(
            `${pred.class} ${(pred.score * 100).toFixed(0)}%`,
            x,
            y - 8
          );
        });
      } catch (e) {}
    }

    // Edge Overlay
    if (edgeOverlay) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let y = 1; y < canvas.height - 1; y++) {
        for (let x = 1; x < canvas.width - 1; x++) {
          const idx = (y * canvas.width + x) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
          const idxRight = (y * canvas.width + (x + 1)) * 4;
          const idxBottom = ((y + 1) * canvas.width + x) * 4;
          const grayRight = (data[idxRight] + data[idxRight + 1] + data[idxRight + 2]) / 3;
          const grayBottom = (data[idxBottom] + data[idxBottom + 1] + data[idxBottom + 2]) / 3;
          const edge = Math.abs(gray - grayRight) + Math.abs(gray - grayBottom);
          if (edge > 25) {
            data[idx] = 0;
            data[idx + 1] = 255;
            data[idx + 2] = 100;
            data[idx + 3] = 255;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }

    animationFrameRef.current = requestAnimationFrame(processFrame);
  };

  useEffect(() => {
    if (isCameraActive) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isCameraActive, showDetections, edgeOverlay, model]);

  return (
    <div style={styles.dashboard}>
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1>🌱 AgroAI Dashboard</h1>
            <p>Real-time Object Detection & Crop Intelligence</p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.search}>
              <FaSearch />
              <input placeholder="Search fields or crops..." style={styles.input} />
            </div>
            <FaBell size={22} />
          </div>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          <StatCard icon={<FaLeaf />} color="#22c55e" title="Crop Health" value={`${phiScore}%`} subtitle="PHI Score" />
          <StatCard icon={<FaBug />} color="#ef4444" title="Pest Risk" value={anomalies.length > 0 ? "Elevated" : "Low"} subtitle="Live Detection" />
          <StatCard icon={<FaBrain />} color="#2563eb" title="AI Model" value="COCO-SSD" subtitle="Active" />
          <StatCard icon={<FaCloudSun />} color="#f59e0b" title="Weather" value="28°C" subtitle="Sunny • Optimal" />
        </div>

        {/* Live Camera - Full Width */}
        <div style={{ ...styles.predictionCard, marginBottom: 25 }}>
          <div style={{ padding: "20px 25px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>📹 Live Field Monitoring</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={toggleCamera} style={{ ...styles.smallButton, background: isCameraActive ? "#ef4444" : "#22c55e" }}>
                {isCameraActive ? <FaPause /> : <FaPlay />} {isCameraActive ? "Stop" : "Start"} Camera
              </button>
              <button onClick={() => setShowDetections(!showDetections)} style={styles.smallButton} disabled={!isCameraActive}>
                {showDetections ? "Hide Boxes" : "Show Boxes"}
              </button>
              <button onClick={() => setEdgeOverlay(!edgeOverlay)} style={styles.smallButton} disabled={!isCameraActive}>
                {edgeOverlay ? "Hide Edges" : "Show Edges"}
              </button>
            </div>
          </div>

          <div style={{ position: "relative", background: "#111", minHeight: "460px" }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: isCameraActive ? "block" : "none" }}
            />
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: isCameraActive ? "block" : "none" }}
            />
            {!isCameraActive && (
              <div style={{ height: "460px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#888" }}>
                <FaCamera size={80} style={{ marginBottom: 20, opacity: 0.4 }} />
                <p>Click "Start Camera" to begin real-time monitoring</p>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Section */}
        <div style={styles.content}>
          {/* Real-Time Detections */}
          <div style={styles.predictionCard}>
            <h2>🤖 Real-Time Detections</h2>
            {detections.length > 0 ? (
              <ul style={{ maxHeight: "320px", overflowY: "auto", paddingLeft: 0 }}>
                {detections.slice(0, 8).map((det, i) => (
                  <li key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", listStyle: "none" }}>
                    {det.class} — {(det.score * 100).toFixed(0)}%
                  </li>
                ))}
              </ul>
            ) : (
              <p>Start the camera to see live detections</p>
            )}
          </div>

          {/* Agricultural Insights */}
          <div style={styles.predictionCard}>
            <h2>🌾 Agricultural Insights</h2>
            <div style={{ marginBottom: 20 }}>
              <p><strong>Current PHI Score:</strong> <span style={{ color: "#22c55e", fontSize: "1.5rem", fontWeight: "bold" }}>{phiScore}%</span></p>
            </div>

            {anomalies.length > 0 ? (
              <div>
                <h3 style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: 8 }}>
                  <FaExclamationTriangle /> Anomalies Detected
                </h3>
                <ul>
                  {anomalies.map((anomaly, i) => (
                    <li key={i}>{anomaly.type} — {anomaly.severity}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p style={{ color: "#22c55e" }}>✅ No anomalies detected. Crop appears healthy.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.iconBox, background: color }}>{icon}</div>
      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

const styles = {
  dashboard: { display: "flex", height: "100vh", background: "#edf3ef", fontFamily: "system-ui, sans-serif" },
  main: { flex: 1, padding: 30, overflow: "auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 },
  headerRight: { display: "flex", gap: 20, alignItems: "center" },
  search: { display: "flex", alignItems: "center", background: "white", padding: "10px 18px", borderRadius: 30 },
  input: { border: "none", outline: "none", marginLeft: 10, width: 260 },
  stats: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 30 },
  statCard: { background: "white", borderRadius: 20, padding: 22, display: "flex", alignItems: "center", gap: 20, boxShadow: "0 8px 25px rgba(0,0,0,0.08)" },
  iconBox: { width: 68, height: 68, borderRadius: 16, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: 30 },
  content: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25 },
  predictionCard: { background: "white", borderRadius: 20, padding: 30, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
  smallButton: { padding: "8px 16px", background: "#22c55e", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }
};

export default Dashboard;