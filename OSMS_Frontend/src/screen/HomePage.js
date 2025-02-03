import React from "react";
import Navbar from "../components/Navbar";
import image from "../images/homebg.avif";

import { TypeAnimation } from "react-type-animation";

import "bootstrap/dist/css/bootstrap.min.css"; 
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate=useNavigate();


  return (
    <>
      {/* HomePage Section */}
      <div
        className="background-container"
        
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", 
        }}
      >
      

        <Navbar />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            textAlign: "center",
            padding: "20px",
            minHeight: "100vh", 
          }}
        >
          <div
            className="container"
            style={{ paddingTop: "200px", width: "100vh" }}
          >
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "lightcyan",
                
              }}
            >
              <TypeAnimation
                sequence={[
                  " Welcome to Residify !",
                  1000,
                  "Manage Your Society ! ",
                  1000,
                  "Residential Communities ...",
                  1000,
                ]}
                speed={30}
                repeat={Infinity}
                style={{ fontSize: "2em" }}
              />
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.7",
                paddingTop: "15px",
              }}
            >
              Manage your society efficiently. From registration to managing
              residents, staff.
            </p>
            <button
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                backgroundColor: "#ffc107",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "orange")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#e0a800')}
              onClick={() => navigate("/about")}
              
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      

     
    </>
  );
};

export default HomePage;