import React ,{useState,useEffect} from 'react'
import { Bar } from "react-chartjs-2";
import axios from "axios";

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
import { toast } from 'react-toastify';

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
  const [residentCount, setResidentCount] = useState(0);
  const [cleanerCount, setCleanerCount] = useState(0);
  const [securityCount, setSecurityCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8080/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
     
        const { residentCount, cleanerCount, securityCount ,totalCount} = response.data;
       
        setResidentCount(residentCount);
        setCleanerCount(cleanerCount);
        setSecurityCount(securityCount);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("Error fetching stats:", error);  
        toast.error("Failed to fetch stats.");
      }
    };
  
    fetchStats();
  }, []);
  
  
    const statisticsData = {
        
      labels: ["Residents", "Cleaner", "Security","Total"],
        
        datasets: [
          {
            label: "Statistics ",
            data: [residentCount, cleanerCount, securityCount,totalCount],
            backgroundColor: ["#007bff", "#28a745", "#c82333","#ffc107"],
            borderColor: ["#0056b3", "#1e7e34", "#c82333","#e0a800"],
            borderWidth: 1,
            barThickness: 40,
            
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
              
              ticks: {
                beginAtZero: true,
              },
              grid: {
                display: false,
              },
            },
            y: {
              ticks:{
              beginAtZero: true,
              },
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
