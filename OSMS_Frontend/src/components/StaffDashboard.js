import React from 'react';
import '../styles.css';


import CommonNavbar from './CommonNavbar';
import StaffsideBar from './StaffsideBar';


const StaffDashboard = () => {
  return (
    <>
    <CommonNavbar/>
    <div className="d-flex" style={{ height: '100vh' }}>
      <StaffsideBar/>
    <div className="dashboard  container d-flex flex-column  justify-content-center align-items-center">
    
      <h2>Staff Dashboard</h2>
      <br></br>
      <p>Welcome, Staff! You can manage cleaning and security here.</p>
    </div>
    </div>
    </>
  );
};

export default StaffDashboard;