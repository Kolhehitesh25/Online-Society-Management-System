import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Logging out...');

  
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    

   

    // Redirect to login after 2 seconds
    setTimeout(() => {
      console.log("Navigating to login...");
      navigate("/home");
    }, 2000);
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <div className="alert alert-warning">
        <h2>Logging Out...</h2>
        <p>You are being logged out. Redirecting to the login page...</p>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Logout;
