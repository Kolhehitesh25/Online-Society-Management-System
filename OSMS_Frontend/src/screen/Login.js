
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import loginbg from "../images/loginback.avif";
import AuthService from "../services/AuthService";
import axios from "axios";
import { toast } from "react-toastify";

import { Eye, EyeSlash } from "react-bootstrap-icons"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const { token, user } = await AuthService.login(email, password);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          localStorage.setItem("token", token);
          localStorage.setItem("role", user.role); 
        }
      
        if (user.role === "ADMIN") {
          navigate("/admin");
          toast.success(`Successfully logged in as ${user.fullName}`);
        } else if (user.role === "CLEANER" || user.role === "SECURITY") {
          navigate("/staff");
          toast.success(`Successfully logged in as ${user.fullName}`);
        } else if (user.role === "RESIDENT") {
          navigate("/resident");
          toast.success(`Successfully logged in as ${user.fullName}`);
        } else {
          toast.error("Unknown role, contact support!");
        }
        
      } catch (error) {
        toast.error("Invalid email or password");
      }
    } else {
      toast.error("Please fill in both email and password");
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
          width: "550px",
          height: "500px",
          background: "rgba(184, 184, 184, 0.2)",
          backdropFilter: "blur(7px)",
          borderRadius: "25px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin}>
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

          <div className="mb-3 position-relative">
      <label htmlFor="password" className="form-label">Password:</label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="input-group-text"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeSlash /> : <Eye />}
        </span>
      </div>
    </div>

          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn"
              style={{
                background: "linear-gradient(135deg, #00b4db, #0083b0)",
                color: "white",
                padding: "9px 20px",
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
                  "linear-gradient(135deg,rgb(93, 156, 171), #0083b0)")
              }
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
  Don't have an account?
  <div className="dropdown d-inline">
    <button
      className="btn btn-link dropdown-toggle mb-1"
      type="button"
      id="registerDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ textDecoration: "underline", color: "blue", border: "none" }}
    >
      Register here
    </button>
    <ul className="dropdown-menu custom-dropdown" aria-labelledby="registerDropdown">
      <li>
        <Link className="dropdown-item custom-dropdown-item" to="/register/resident">
          Register as Resident
        </Link>
      </li>
      <li>
        <Link className="dropdown-item custom-dropdown-item" to="/register/staff">
          Register as Staff
        </Link>
      </li>
    </ul>
  </div>
</p>

        <p className="text-center mt-3">
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      </div>
    </div>
  );
};



export default Login;