import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import loginbg from "../images/loginback.avif";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/auth/reset-password/${token}`, {
        token,
        password,
      });
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (error) {
     
      console.error("Error occurred:", error.response || error.message);
      
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: `url(${loginbg}) no-repeat center center/cover`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          width: "450px",
          background: "rgba(184, 184, 184, 0.2)",
          backdropFilter: "blur(7px)",
          borderRadius: "25px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-center mb-4">Reset Password</h2>
        <p className="text-center text-muted">
          Enter a new password to reset your account.
        </p>

        <form onSubmit={handleResetPassword}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn"
              style={{
                background: "linear-gradient(135deg, #00b4db, #0083b0)",
                color: "white",
                padding: "10px 20px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background =
                  "linear-gradient(135deg, #0083b0, #005f73)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  "linear-gradient(135deg, rgb(93, 156, 171), #0083b0)")
              }
            >
              Update Password
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          <span className="text-muted">Back to </span>
          <a href="/login" className="text-primary" style={{ textDecoration: "underline" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
