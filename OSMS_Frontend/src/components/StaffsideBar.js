import React from "react";

import { Nav } from "react-bootstrap";
import { FaHome, FaSignInAlt, FaTasks } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";


const StaffsideBar = () => {
  const location=useLocation();
  return (

    <div className="d-flex ">
      {/* Sidebar */}
      <div
        className="sidebar  text-white p-3"
        style={{
          width: "270px",
          backgroundColor: "rgba(66, 66, 66, 0.8)",
          position: "fixed",
          top: 0,
          height: "100vh",
        }}
      >
        <h2
          className=" mb-4 mt-3 "
          style={{
            color: "#FFC107",
            paddingLeft: "20px",
            textDecoration: "underline",
          }}
        >
          Staff
        </h2>
        <Nav className="flex-column">
        <Nav.Link  as ={Link} to="/staff" className={
                       location.pathname === "/staff"
                         ? "text-warning"
                         : "text-light"
                     }>
                     <FaHome className="me-2" />Dashboard
                   </Nav.Link>
          <hr />

          <Nav.Link  as ={Link} to="/staff/view-task" className={
                       location.pathname === "/staff/view-task"
                         ? "text-warning"
                         : "text-light"
                     }>
                     <FaTasks className="me-2" /> View Tasks 
                   </Nav.Link>
         
                  
          
        </Nav>
      </div>
    </div>
  );
};

export default StaffsideBar;
