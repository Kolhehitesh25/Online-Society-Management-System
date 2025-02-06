import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginbg from "../images/loginback.avif";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/forgot-password",
        { email }
      );
      toast.success( "Reset link sent to your email!");
    } catch (error) {
      toast.error( "Something went wrong");
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
        <h2 className="text-center mb-4">Forgot Password</h2>
        <p className="text-center text-muted">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Send Reset Link
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Remember your password?
          <Link to="/login" className="text-primary" style={{ textDecoration: "underline" }}>
            Go back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
