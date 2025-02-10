import React from 'react';
import '../styles.css';

import { Outlet } from 'react-router-dom';
import CommonNavbar from './CommonNavbar';
import StaffsideBar from './StaffsideBar';


const StaffDashboard = () => {
  return (
    <>
    <CommonNavbar />
    <StaffsideBar />
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

export default StaffDashboard;