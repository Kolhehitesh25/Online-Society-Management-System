import React from 'react';
import '../styles.css';
import CommonNavbar from './CommonNavbar';
import ResidentSidebar from './ResidentSidebar';

const ResidentDashboard = () => {
  
  return (
    <>
    <CommonNavbar/>
    <div className="d-flex" style={{ height: '100vh' }}>
      <ResidentSidebar/>
    <div className="dashboard container d-flex flex-column  justify-content-center align-items-center">
      <h2>Resident Dashboard</h2>
      <br></br>
      <p>Welcome, Resident! You can view society updates here.</p>
    </div>
    </div>
    </>
  );
};

export default ResidentDashboard;