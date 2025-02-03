import React from "react";

import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaBellSlash,
  FaUser,
  FaMoneyBill,
  FaCommentDots,
  FaCalendarCheck,
  FaTasks,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
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
          {" "}
          Admin{" "}
        </h2>
        <Nav className="flex-column">
          <Nav.Link as={Link} to='/admin' className="text-light">
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
          <hr />

          <Nav.Link  className="text-light pb-3">
            <FaUser className="me-2" /> Resident
          </Nav.Link>

          <Nav.Link  className="text-light pb-3">
            <FaUser className="me-2" /> staff
          </Nav.Link>
          <Nav.Link  className="text-light pb-3">
            <FaTasks className="me-2" /> Add Task
          </Nav.Link>

          <Nav.Link  className="text-light v">
            <FaMoneyBill className="me-2" /> Finance Record
          </Nav.Link>
          <Nav.Link  className="text-light pb-3">
            <FaCommentDots className="me-2" /> Complaints
          </Nav.Link>

          <Nav.Link  className="text-light pb-3">
            <FaCalendarCheck className="me-2" /> Facility Booking
          </Nav.Link>
          <Nav.Link  className="text-light pb-3">
            <FaBellSlash className="me-2" />
            Send Notification{" "}
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default AdminSideBar;
