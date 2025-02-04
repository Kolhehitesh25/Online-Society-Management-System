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
import { Link, useLocation } from "react-router-dom";

const AdminSideBar = () => {
  const location = useLocation();

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
          Admin
        </h2>
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/admin"
            replace={false}
            className={
              location.pathname === "/admin" ? "text-warning" : "text-light"
            }
          >
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
          <hr />

          <Nav.Link
            as={Link}
            to="/admin/residents"
            replace={false}
            className={
              location.pathname === "/admin/residents"
                ? "text-warning"
                : "text-light"
            }
          >
            <FaUser className="me-2" /> Resident
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/admin/staffs"
            replace={false}
            className={
              location.pathname === "/admin/staffs"
                ? "text-warning"
                : "text-light"
            }
          >
            <FaUser className="me-2" /> Staff
          </Nav.Link>


          <Nav.Link  as ={Link} to="/admin/add-task" className={
              location.pathname === "/admin/add-task"
                ? "text-warning"
                : "text-light"
            }>
            <FaTasks className="me-2" /> Add Task
          </Nav.Link>

          <Nav.Link  as ={Link} to="/admin/financial-record" className={
              location.pathname === "/admin/financial-record"
                ? "text-warning"
                : "text-light"
            }>
            <FaTasks className="me-2" /> Financial Record
          </Nav.Link>

          <Nav.Link className="text-light pb-3">
            <FaCommentDots className="me-2" /> Complaints
          </Nav.Link>

          <Nav.Link  as ={Link} to="/admin/facility-booking" className={
              location.pathname === "/admin/facility-booking"
                ? "text-warning"
                : "text-light"
            }>
            <FaTasks className="me-2" /> Facility Booking
          </Nav.Link>

          <Nav.Link className="text-light pb-3">
            <FaBellSlash className="me-2" />
            Send Notification
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default AdminSideBar;
