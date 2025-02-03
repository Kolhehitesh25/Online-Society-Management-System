import React from 'react'
import { Bar } from "react-chartjs-2";

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

const StatisticBar = () => {
    const statisticsData = {
        labels: ["Residents", "Staff", "Pending Complaints"],
        
        datasets: [
          {
            label: "Statistics ",
            data: [90, 30, 5], // Replace with dynamic values
            backgroundColor: ["#007bff", "#28a745", "#dc3545"], // Different colors for each bar
            borderColor: ["#0056b3", "#1e7e34", "#c82333"],
            borderWidth: 1,
            barThickness: 60,
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Statistics Overview",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ": " + context.raw;
              },
            },
          },
          scales: {
            x: {
              // Adjusts the width of the bars within each category
              ticks: {
                beginAtZero: true,
              },
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true,
              },
            },
          },
        },
      };
      
      
  return (
    <>
       <Bar data={statisticsData} options={options} />
    </>
  )
}

export default StatisticBar
