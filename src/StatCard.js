import { motion } from "framer-motion";
function StatCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          background: color || "#4CAF50",
          color: "#fff",
        }}
      >
        {icon}
      </div>

      <div>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <h2 style={{ margin: 0 }}>{value}</h2>
      </div>
    </div>
  );
}
<StatCard
    title="Healthy Crops"
    value="94%"
    icon="🌾"
    color="#4CAF50"
/>
function StatCard({
  icon,
  title,
  value,
  subtitle,
  color
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 20,
        boxShadow: "0 8px 30px rgba(0,0,0,.08)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <p style={{ color: "#777" }}>{title}</p>
          <h2>{value}</h2>
          <small>{subtitle}</small>
        </div>

        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: 28
          }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;