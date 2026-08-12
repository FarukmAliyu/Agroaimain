import React from "react";
import {
  FaLeaf,
  FaHome,
  FaChartLine,
  FaCloudSun,
  FaRobot,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  const menus = [
    { icon: <FaHome />, name: "Dashboard" },
    { icon: <FaLeaf />, name: "Disease Detection" },
    { icon: <FaChartLine />, name: "Analytics" },
    { icon: <FaCloudSun />, name: "Weather" },
    { icon: <FaRobot />, name: "AI Assistant" },
    { icon: <FaCog />, name: "Settings" }
  ];

  return (
    <div className="sidebar">

      <h2 className="logo">
        🌿 AGROAI
      </h2>

      {menus.map((m, i) => (
        <div className="menuItem" key={i}>
          {m.icon}
          <span>{m.name}</span>
        </div>
      ))}

      <div className="logout">
        <FaSignOutAlt />
        Logout
      </div>

    </div>
  );
}

export default Sidebar;