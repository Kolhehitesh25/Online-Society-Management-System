import React from "react";

import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaSignInAlt,
  FaTasks
} from "react-icons/fa";
import { Link } from "react-router-dom";

const StaffsideBar = () => {
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
          <Nav.Link as={Link} to='/staff' className="text-light">
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
          <hr />

          <Nav.Link  className="text-light pb-3">
            <FaTasks className="me-2" /> view Task
          </Nav.Link>


          <Nav.Link  className="text-light pb-3">
            <FaSignInAlt className="me-2" /> Entry  /Exit logs
          </Nav.Link>

        </Nav>
      </div>
    </div>
  );
};

export default StaffsideBar;
