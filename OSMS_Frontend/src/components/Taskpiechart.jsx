import React, { useState,useEffect } from 'react'
import axios from 'axios';

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

const Taskpiechart = () => {
    
  const[pendingTasks, setPendingTasks]=useState(0);
  const[completedTasks,setCompletedTasks] = useState(0);

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
  
     
        const { completedTasks, pendingTasks} = response.data;
       setPendingTasks(pendingTasks);
       setCompletedTasks(completedTasks);
      } catch (error) {
        console.error("Error fetching stats:", error);  
        toast.error("Failed to fetch stats.");
      }
    };
  
    fetchStats();
  }, []);
  

  const taskData = {
    labels: ["Completed Tasks", "Pending Tasks"],
    datasets: [
      {
        data: [completedTasks, pendingTasks], 
        backgroundColor: ["#28a745", "#dc3545"], 
        hoverBackgroundColor: ["#1e7e34", "#c82333"], 
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
