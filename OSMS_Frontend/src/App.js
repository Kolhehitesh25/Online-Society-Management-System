

import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Login from "./screen/Login";

import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";
import ResidentDashboard from "./components/ResidentDashboard";
import "./styles.css";
import ManagerDashboard from "./components/AdminDashboard";

import HomePage from "./screen/HomePage";
import StaffRegister from "./screen/StaffRegister";
import ResidentRegister from "./screen/ResidentRegister";
import Logout from "./screen/Logout";
import AboutPage from "./screen/AboutPage";

function App() {
  return (
    <div className="App">
    

    
      <Routes>
      
        <Route path="/" element={<HomePage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<AboutPage/>} />
       
        <Route path="/register/staff" element={<StaffRegister />} />
        <Route path="/register/resident" element={<ResidentRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/resident" element={<ResidentDashboard />} />
      <Route path="/logout" element={<Logout/>} />
      </Routes>
    </div>
  );
}

export default App;
