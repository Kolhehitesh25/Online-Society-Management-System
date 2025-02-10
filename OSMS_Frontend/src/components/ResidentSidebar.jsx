import React from "react";
import { Nav } from "react-bootstrap";
import {
  FaHome,
  FaWallet,
  FaCalendarAlt,
  FaCommentDots,

  FaBellSlash,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

const ResidentSideBar = () => {
  const location = useLocation();
  const handlePaymentClick = () => {
    console.log("Payment Started");
  };

  return (
    <div className="d-flex">
      <div
        className="sidebar text-white p-3"
        style={{
          width: "270px",
          backgroundColor: "rgba(66, 66, 66, 0.8)",
          position: "fixed",
          top: 0,
          height: "100vh",
        }}
      >
        <h2
          className="mb-4 mt-3"
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
            key="dashboard"
            className={
              location.pathname === "/resident" ? "text-warning" : "text-light"
            }
          >
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
          <hr />

          <Nav.Link
            as={Link}
            to="/resident/book-facility"
            key="book-facility"
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
            key="complaints"
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
            key="notifications"
            className={
              location.pathname === "/resident/notification"
                ? "text-warning"
                : "text-light"
            }
          >
            <FaBellSlash className="me-2" /> View Notification

            </Nav.Link>

{/* <Bell color="red" size={24} repeatCount={4} /> */}
       

          <Nav.Link
            as={Link}
            to="/resident/pay-bill"
            key="pay-bill"
            className="text-light pb-3"

            onClick={handlePaymentClick} 

          >
            <FaWallet className="me-2" /> Pay Maintenance
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default ResidentSideBar;
