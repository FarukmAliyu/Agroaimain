import React, { useState } from "react";
const diseaseData = [
  {
    name: "Leaf Blight",
    symptoms: [
      "Brown or yellow spots on leaves",
      "Leaf drying from edges",
      "Reduced plant growth",
    ],
    causes: ["Fungal infection", "High humidity", "Poor air circulation"],
    treatment: [
      "Apply fungicide (e.g., Mancozeb)",
      "Remove infected leaves",
      "Improve air circulation",
    ],
    prevention: [
      "Avoid overwatering",
      "Use resistant crop varieties",
      "Maintain proper spacing",
    ],
  },

  {
    name: "Powdery Mildew",
    symptoms: [
      "White powdery substance on leaves",
      "Leaf curling",
      "Stunted growth",
    ],
    causes: ["Fungal spores", "Dry climate with high humidity"],
    treatment: [
      "Use sulfur-based fungicide",
      "Spray neem oil",
      "Remove infected parts",
    ],
    prevention: [
      "Ensure sunlight exposure",
      "Avoid overcrowding plants",
    ],
  },

  {
    name: "Root Rot",
    symptoms: ["Yellowing leaves", "Wilting plant", "Soft, brown roots"],
    causes: ["Overwatering", "Poor drainage"],
    treatment: [
      "Reduce watering",
      "Improve soil drainage",
      "Use fungicide if severe",
    ],
    prevention: ["Use well-drained soil", "Avoid waterlogging"],
  },

  {
    name: "Bacterial Leaf Spot",
    symptoms: [
      "Small dark spots with yellow halo",
      "Leaves turning yellow",
      "Spots enlarge over time",
    ],
    causes: ["Bacteria", "Wet leaves", "Poor sanitation"],
    treatment: [
      "Use copper-based bactericide",
      "Remove infected leaves",
    ],
    prevention: [
      "Avoid overhead watering",
      "Use clean tools",
    ],
  },

  {
    name: "Rust Disease",
    symptoms: [
      "Orange or brown powder on leaves",
      "Leaf drop",
      "Weak plants",
    ],
    causes: ["Fungal infection", "Moist conditions"],
    treatment: [
      "Apply fungicide",
      "Remove affected leaves",
    ],
    prevention: [
      "Ensure good airflow",
      "Plant resistant varieties",
    ],
  },

  {
    name: "Early Blight",
    symptoms: [
      "Dark concentric rings on leaves",
      "Yellowing leaves",
      "Leaf drop",
    ],
    causes: ["Fungus (Alternaria)", "Warm wet weather"],
    treatment: [
      "Apply fungicide",
      "Remove infected plants",
    ],
    prevention: [
      "Rotate crops",
      "Avoid wet leaves",
    ],
  },

  {
    name: "Late Blight",
    symptoms: [
      "Large dark patches on leaves",
      "Rapid plant decay",
      "White mold under leaves",
    ],
    causes: ["Fungus", "Cool, wet conditions"],
    treatment: [
      "Use strong fungicide",
      "Destroy infected plants",
    ],
    prevention: [
      "Use resistant varieties",
      "Avoid excess moisture",
    ],
  },

  {
    name: "Aphid Infestation",
    symptoms: [
      "Sticky leaves",
      "Curled leaves",
      "Presence of small insects",
    ],
    causes: ["Aphids (insects)"],
    treatment: [
      "Spray neem oil",
      "Use insecticidal soap",
    ],
    prevention: [
      "Introduce natural predators (ladybugs)",
      "Inspect plants regularly",
    ],
  },

  {
    name: "Maize Streak Virus",
    symptoms: [
      "Yellow streaks on maize leaves",
      "Stunted growth",
    ],
    causes: ["Virus spread by leafhoppers"],
    treatment: [
      "No cure available",
      "Remove infected plants",
    ],
    prevention: [
      "Use resistant maize varieties",
      "Control insect vectors",
    ],
  },

  {
    name: "Wilt Disease",
    symptoms: [
      "Sudden wilting",
      "Yellowing leaves",
      "Plant collapse",
    ],
    causes: ["Fungal or bacterial infection"],
    treatment: [
      "Remove infected plants",
      "Apply soil treatment",
    ],
    prevention: [
      "Crop rotation",
      "Use disease-free seeds",
    ],
  },

  {
    name: "Healthy Crop",
    symptoms: ["Green leaves", "Strong growth"],
    causes: ["Proper care"],
    treatment: ["No treatment needed"],
    prevention: ["Continue good practices"],
  },
];

export default function Learn() {
  const [selected, setSelected] = useState(diseaseData[0]);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🌿Crop Disease Knowledge Hub</h1>
      <p style={styles.subtitle}>
        Click any card to explore symptoms, causes, and treatment
      </p>

      <div style={styles.container}>
        
        {/* LEFT: CARDS GRID */}
        <div style={styles.grid}>
          {diseaseData.map((d, i) => (
            <div
              key={i}
              onClick={() => setSelected(d)}
              style={{
                ...styles.card,
                border:
                  selected.name === d.name
                    ? "2px solid #2e7d32"
                    : "1px solid #ddd",
                transform:
                  selected.name === d.name ? "scale(1.03)" : "scale(1)",
              }}
            >
              <h3>{d.name}</h3>
              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                Tap to view details
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT: DETAILS PANEL */}
        <div style={styles.panel}>
          <h2>📘 {selected.name}</h2>

          <Section title="Symptoms" items={selected.symptoms} />
          <Section title="Causes" items={selected.causes} />
          <Section title="Treatment" items={selected.treatment} />
          <Section title="Prevention" items={selected.prevention} />
        </div>
      </div>
    </div>
  );
}

/* ========== REUSABLE SECTION ========== */
function Section({ title, items }) {
  return (
    <div style={{ marginTop: "15px" }}>
      <h4 style={{ color: "#2e7d32" }}>{title}</h4>
      <ul style={{ paddingLeft: "18px" }}>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: "6px" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ========== STYLES ========== */
const styles = {
  page: {
    padding: "25px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    marginBottom: "20px",
    opacity: 0.7,
  },

  container: {
    display: "flex",
    gap: "20px",
  },

  grid: {
    width: "40%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.2s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },

  panel: {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
};
