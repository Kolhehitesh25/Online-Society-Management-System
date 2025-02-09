import React from "react";
import { Outlet } from "react-router-dom";
import "../styles.css";
import CommonNavbar from "./CommonNavbar";
import ResidentSidebar from "./ResidentSidebar";

const ResidentDashboard = () => {
  return (
    <>
      <CommonNavbar />
      <div className="d-flex" style={{ height: "100vh" }}>
        <ResidentSidebar />
        <div
          className="dashboard container d-flex flex-column justify-content-center align-items-center"
          style={{ marginLeft: "270px", flex: 1 }}
        >
          <Outlet /> {/* 👈 This will render nested components */}
        </div>
      </div>
    </>
  );
};

export default ResidentDashboard;
