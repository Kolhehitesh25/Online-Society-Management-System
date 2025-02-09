import React from "react";

const PayMaintenance = () => {
  const amount = 1500;

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="card p-4 text-center shadow-lg"
        style={{ width: "400px" }}
      >
        <h2 className="mb-3 text-primary">Pay Maintenance</h2>
        <h4>Maintenance Amount: ₹{amount}</h4>
        <button className="btn btn-success mt-3">Pay Now</button>
      </div>
    </div>
  );
};

export default PayMaintenance;
