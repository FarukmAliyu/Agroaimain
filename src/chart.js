import React, { useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import FarmAIChat from "./FarmAIChat";

// ✅ Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);
