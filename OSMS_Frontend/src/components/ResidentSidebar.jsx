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
  const handlePaymentClick = () => {
    console.log("Payment Started"); // ✅ Log when clicking "Pay Maintenance"
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
          <Nav.Link as={Link} to="/resident" className="text-light">
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
          <hr />
          <Nav.Link
            as={Link}
            to="/resident/pay-bill"
            className="text-light pb-3"
            onClick={handlePaymentClick} // ✅ Added onClick
          >
            <FaWallet className="me-2" /> Pay Maintenance
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/resident/book-facility"
            className="text-light pb-3"
          >
            <FaCalendarAlt className="me-2" /> Book Facility
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/resident/complaints"
            className="text-light pb-3"
          >
            <FaFlag className="me-2" /> Raise Complaint
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/resident/notifications"
            className="text-light"
          >
            <FaBell className="me-2" /> View Notification
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default ResidentSideBar;
