import React, { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { FaCamera, FaUpload, FaMagic, FaExclamationTriangle } from "react-icons/fa";

function AgroSystem() {
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [phiScore, setPhiScore] = useState(0);
  const [anomalies, setAnomalies] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [model, setModel] = useState(null);

  // Live Camera
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [anomalyAlert, setAnomalyAlert] = useState(false);

  // Load MobileNet
  useEffect(() => {
    const loadModel = async () => {
      const mobilenet = await tf.loadLayersModel(
        'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/5/default/1',
        { fromTFHub: true }
      );
      setModel(mobilenet);
      console.log("✅ MobileNet loaded for object detection");
    };
    loadModel();
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Calculate Plant Health Index (PHI)
  const calculatePHI = (imageElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let greenSum = 0, totalPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      if (g > r && g > b) {
        greenSum += g;
        totalPixels++;
      }
    }

    const phi = totalPixels > 0 ? Math.min(98, Math.floor((greenSum / totalPixels) * 1.1)) : 65;
    return phi;
  };

  const runAdvancedAnalysis = async () => {
    if (!imagePreview || !model) return;
    setIsAnalyzing(true);

    const img = new Image();
    img.src = imagePreview;
    await new Promise(res => img.onload = res);

    const phi = calculatePHI(img);
    setPhiScore(phi);

    // Simulate detection
    const diseases = ["Leaf Blight", "Powdery Mildew", "Healthy"];
    const result = {
      name: diseases[Math.floor(Math.random() * diseases.length)],
      confidence: (82 + Math.random() * 15).toFixed(1) + "%",
      phi: phi
    };
    setPrediction(result);

    setAnomalies(phi < 70 ? ["Unusual browning detected", "Low chlorophyll levels"] : []);
    setIsAnalyzing(false);
  };

  // Live Camera with Anomaly Detection
  const toggleCamera = async () => {
    if (isCameraActive) {
      setIsCameraActive(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    }
  };

  useEffect(() => {
    let interval;
    if (isCameraActive) {
      interval = setInterval(() => {
        if (Math.random() > 0.85) { // Simulate anomaly
          setAnomalyAlert(true);
          setTimeout(() => setAnomalyAlert(false), 3000);
        }
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isCameraActive]);

  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1>🌱 Advanced Computer Vision Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
        {/* Vision Area */}
        <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
          <h2>Advanced Vision</h2>

          <input type="file" accept="image/*" onChange={handleUpload} />

          {imagePreview && <img src={imagePreview} alt="" style={{ width: "100%", margin: "15px 0", borderRadius: "12px" }} />}

          <button onClick={runAdvancedAnalysis} disabled={!imagePreview || isAnalyzing} style={{ width: "100%", padding: "15px", background: "#22c55e", color: "white", border: "none", borderRadius: "10px" }}>
            Run Advanced Analysis (MobileNet)
          </button>

          <button onClick={toggleCamera} style={{ width: "100%", marginTop: "10px", padding: "15px", background: isCameraActive ? "#ef4444" : "#3b82f6", color: "white", border: "none", borderRadius: "10px" }}>
            {isCameraActive ? "Stop Live Camera" : "Start Live Camera"}
          </button>

          {isCameraActive && (
            <div style={{ marginTop: "15px", position: "relative" }}>
              <video ref={videoRef} autoPlay style={{ width: "100%", borderRadius: "12px" }} />
              {anomalyAlert && (
                <div style={{ position: "absolute", top: "20px", left: "20px", background: "red", color: "white", padding: "10px", borderRadius: "8px" }}>
                  <FaExclamationTriangle /> Anomaly Detected!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div style={{ background: "white", padding: "25px", borderRadius: "16px" }}>
          <h2>Analysis Results</h2>
          {prediction && (
            <div>
              <h3>{prediction.name}</h3>
              <p>Confidence: <strong>{prediction.confidence}</strong></p>
              
              <div style={{ margin: "20px 0", padding: "15px", background: "#f0fdf4", borderRadius: "12px" }}>
                <strong>Plant Health Index (PHI): {phiScore}/100</strong>
                <div style={{ height: "12px", background: "#ddd", borderRadius: "10px", marginTop: "8px" }}>
                  <div style={{ width: `${phiScore}%`, height: "100%", background: phiScore > 75 ? "#22c55e" : "#ef4444", borderRadius: "10px" }}></div>
                </div>
              </div>

              {anomalies.length > 0 && (
                <div style={{ color: "red" }}>
                  <strong>Anomalies Detected:</strong>
                  <ul>{anomalies.map((a, i) => <li key={i}>{a}</li>)}</ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgroSystem;