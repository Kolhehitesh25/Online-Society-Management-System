import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Login from "./screen/Login";
import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";
import ResidentDashboard from "./components/ResidentDashboard";

import HomePage from "./screen/HomePage";
import StaffRegister from "./screen/StaffRegister";
import ResidentRegister from "./screen/ResidentRegister";
import Logout from "./screen/Logout";
import AboutPage from "./screen/AboutPage";
import Residentdata from "./components/UserData/Residentdata";
import AdminDashboardData from "./components/UserData/AdminDashboardData";
import StaffData from "./components/UserData/StaffData";
import AddTask from "./components/AdminFunctionality/AddTask";

import FinancialRecord from "./components/AdminFunctionality/FinancialRecord";
import FacilityBooking from "./components/AdminFunctionality/FacilityBooking";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SendNotification from "./components/AdminFunctionality/SendNotification";
import Complaint from "./components/AdminFunctionality/Complaint";
import RaiseComplaint from "./components/RaiseComplaint";
import ResidentDashboardData from "./components/UserData/ResidentDashboardData";
import BookFacility from "./components/BookFacility";
import ViewNotification from "./components/ViewNotification";
import PayBill from "./components/PayBill"; // ✅ Import PayBill
import StaffDashboardData from "./components/UserData/StaffDashboardData";
import ViewTask from "./components/ViewTask";
import EntryExit from "./components/EntryExit";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={1500} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register/staff" element={<StaffRegister />} />
        <Route path="/register/resident" element={<ResidentRegister />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes for ADMIN */}
        <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminDashboardData />} />
            <Route path="residents" element={<Residentdata />} />
            <Route path="staffs" element={<StaffData />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="financial-record" element={<FinancialRecord />} />
            <Route path="facility-booking" element={<FacilityBooking />} />
            <Route path="send-notification" element={<SendNotification />} />
            <Route path="complaints" element={<Complaint />} />
          </Route>
        </Route>
        {/* Protected Routes for STAFF (SECURITY & CLEANER) */}
        <Route
          element={<PrivateRoute allowedRoles={["SECURITY", "CLEANER"]} />}
        >
          <Route path="/staff" element={<StaffDashboard />}>
            <Route index element={<StaffDashboardData />} />
            <Route path="view-task" element={<ViewTask />} />
          </Route>
        </Route>
        {/* Protected Routes for RESIDENT */}
        <Route element={<PrivateRoute allowedRoles={["RESIDENT"]} />}>
          <Route path="/resident" element={<ResidentDashboard />}>
            <Route index element={<ResidentDashboardData />} />
            <Route path="complaints" element={<RaiseComplaint />} />
            <Route path="book-facility" element={<BookFacility />} />
            <Route path="notification" element={<ViewNotification />} />
            <Route path="pay-bill" element={<PayBill />} />{" "}
           
          </Route>
        </Route>
        {/* Other Routes */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />{" "}
      
      </Routes>
    </div>
  );
}

export default App;
