import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import registerbg from "../images/loginback.avif";
import { toast, ToastContainer } from "react-toastify";
import staffService from "../services/StaffRegisterService";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const StaffRegister = () => {
  const [role, setRole] = useState("SECURITY"); // Default role
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobileno] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error("Mobile number must be exactly 10 digits.");
      return false;
    }

    if (!role) {
      toast.error("Please select a role.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const staffData = {
      fullName: name,
      email: email,
      mobileNo: mobile,
      password: password,
      role: role,
    };

    console.log("Staff Data being sent:", staffData);

    setLoading(true);

    try {
      await staffService.registerStaff(staffData);
      toast.success("Registered Successfully as Staff");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: `url(${registerbg}) no-repeat center center/cover`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          width: "550px",
          height: "600px",
          background: "rgba(184, 184, 184, 0.2)",
          backdropFilter: "blur(7px)",
          borderRadius: "15px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-center mb-4">
          <em>Staff</em> Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile No:
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              placeholder="Enter your mobile number"
              value={mobile}
              maxLength="10"
              onChange={(e) => setMobileno(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Select Role:
            </label>
            <select
              className="form-select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="SECURITY">Security</option>
              <option value="CLEANER">Cleaner</option>
            </select>
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
                  "linear-gradient(135deg, #00b4db, #0083b0)")
              }
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StaffRegister;
