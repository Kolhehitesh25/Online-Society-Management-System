import React from "react";

import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaWallet,
  FaCalendarAlt,
  FaCommentDots,
  FaBell,
  FaBellSlash,
} from "react-icons/fa";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
const ResidentSideBar = () => {
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
          Resident
        </h2>
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/resident"
            className={
              location.pathname === "/resident" ? "text-warning" : "text-light"
            }
          >
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
          <hr />

          <Nav.Link className="text-light pb-3">
            <FaWallet className="me-2" /> Pay Mantainance
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/resident/book-facility"
            className={
              location.pathname === "/resident/book-facility"
                ? "text-warning"
                : "text-light"
            }
          >
            <FaCalendarAlt className="me-2" /> Book Facility
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/resident/complaints"
            className={
              location.pathname === "/resident/complaints"
                ? "text-warning"
                : "text-light"
            }
          >
            <FaCommentDots className="me-2" /> Complaints
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/resident/notification"
            className={
              location.pathname === "/resident/notifications"
                ? "text-warning"
                : "text-light"
            }
          >
            <FaBellSlash className="me-2" /> View Notification

<Bell color="red" size={24} repeatCount={4} />

          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default ResidentSideBar;
