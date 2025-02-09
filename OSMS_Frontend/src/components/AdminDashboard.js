import React, { useState } from "react";
import CommonNavbar from "./CommonNavbar";
import AdminSideBar from "./AdminSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";

// import Residentdata from "./Residentdata";
// import AdminDashboardData from "./AdminDashboardData";

const AdminDashboard = () => {
  
  return (
    <>
      <CommonNavbar />
      <AdminSideBar />
      <div
        className="container-fluid "
        style={{ marginTop: "70px", overflowX: "hidden"  }}
      >
        <div className="row">
          {/* Dashboard Content */}
          <div
            className="col-md-9 offset-md-3  d-flex flex-column justify-content-center align-items-center text-center"
            style={{marginLeft:'300px'}}
          >
            <Outlet/>
              
    </div>
        </div>
      </div>
    </>
                
  );
};

export default AdminDashboard;
