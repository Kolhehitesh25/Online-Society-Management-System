import React from "react";
import { TypeAnimation } from "react-type-animation";
import StatisticBar from "../StatisticBar"
import Taskpiechart from "../Taskpiechart"
import { useNavigate } from "react-router-dom";
const AdminDashboardData = () => {
  const navigate=useNavigate();
  return (
    <>
    
      <div className="w-75 mt-3 p-4 bg-white rounded">
        <h3
          style={{
            color: " rgba(73, 25, 7, 0.5)",
          }}
        >  
          <TypeAnimation
            sequence={[
              "Hello , Admin",
              1000,

              " Welcome to Your Dashboard ",
              3000,
            ]}
            speed={30}
            repeat={Infinity}
            style={{ fontSize: "2em" }}
          />
        </h3>
      </div>

      {/* Manage Users Section */}

      <div
        className="w-75 mt-3 p-4 shadow bg-white rounded "
        style={{ height: "260px" }}
      >
        <h3 className="mb-4" style={{ color: "teal" }}>
          Manage Users
        </h3>
        <p style={{ fontSize: "1.4rem" }}>
          Click below to manage residents or staff :
        </p>

        <div className="d-flex justify-content-center mt-5 ">
          <button
            className="btn  "
            style={{
              backgroundColor: "#C0C0C0",
              width: "180px",
              marginRight: "20px",
              
              
            }}
            onClick={()=>navigate("/admin/residents")}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "	#808080")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#C0C0C0")}
          >
            Manage Residents
          </button>
          <button
            className="btn "
            style={{ backgroundColor: "#C0C0C0", width: "180px" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "	#808080")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#C0C0C0")}
            onClick={()=>navigate("/admin/staffs")}
          >
            Manage Staff
          </button>
        </div>
      </div>
      {/* Statistics Overview with Bar Chart */}
      <div
        className="w-75 mt-3 p-4  shadow bg-light rounded"
        style={{ height: "350px" }}
      >
        <h3 className="mb-4" style={{ color: "teal" }}>
          Statistics Overview
        </h3>
        <div className="row">
          <div className="col-md-6">
            <StatisticBar />
          </div>
          {/* pie chart */}
          <div
            style={{
              width: "240px",
              height: "200px",
              marginLeft: "30px",
            }}
            className="col-md-6"
          >
            <Taskpiechart />
          </div>
        </div>
      </div>

      {/* Reports & Logs Section */}
      <div
        className="w-75 mt-3 p-4 shadow bg-light rounded"
        style={{ height: "300px" }}
      >
        <h3 className="mb-4" style={{ color: "teal" }}>
          Reports & Logs
        </h3>

        {/* Logs Section */}
        <div className="mt-3">
          <h4 className="mb-3">Recent Activity Logs</h4>
          <p className="mb-3 p-2 " style={{ fontSize: "1rem" }}>
            <i>Review recent actions and system activities.</i>
          </p>
          <button className="btn btn-info " style={{ marginRight: "20px" }}>
            View Logs
          </button>
          <button className="btn btn-secondary">Export Logs</button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardData;
