import React from "react";
import { Outlet } from "react-router-dom";
import "../styles.css";
import CommonNavbar from "./CommonNavbar";
import ResidentSidebar from "./ResidentSidebar";
const ResidentDashboard = () => {
  return (
    <>
       <CommonNavbar />
      <ResidentSidebar />
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

export default ResidentDashboard;
