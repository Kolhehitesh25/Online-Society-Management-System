import React from "react";

import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaWallet,
  FaCalendarAlt,
  FaFlag,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ResidentSideBar = () => {
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
       Resident
        </h2>
        <Nav className="flex-column">
          <Nav.Link as={Link} to='/resident' className="text-light">
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
          <hr />

          <Nav.Link  className="text-light pb-3">
            <FaWallet  className="me-2" /> Pay Mantainance
          </Nav.Link>

          <Nav.Link  className="text-light pb-3">
            <FaCalendarAlt className="me-2" /> Book Facility          </Nav.Link>
          <Nav.Link  className="text-light pb-3">
            <FaFlag className="me-2" /> Raise complaint
          </Nav.Link>

          <Nav.Link  className="text-light v">
            <FaBell className="me-2" /> View Notification
          </Nav.Link>
        
          
        </Nav>
      </div>
    </div>
  );
};

export default ResidentSideBar;
