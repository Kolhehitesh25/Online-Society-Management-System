import React from 'react'
import { Pie } from "react-chartjs-2";

import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register required Chart.js components
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Taskpiechart = () => {
    

  const taskData = {
    labels: ["Completed Tasks", "Pending Tasks"],
    datasets: [
      {
        data: [80, 20], // Replace with dynamic values (e.g., completed: 80, pending: 20)
        backgroundColor: ["#28a745", "#dc3545"], // Green for completed, Red for pending
        hoverBackgroundColor: ["#1e7e34", "#c82333"], // Darker shades on hover
      },
    ],
    
  };
  const taskOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
  return (
    <>
         <Pie data={taskData} options={taskOptions} />

    </>
  )
}

export default Taskpiechart
