import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const StaffDashboardData = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();


  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, 
    arrows: false, 
    centerMode: true,
    centerPadding: "10px", 
  };

  const images = [
    "https://thumbs.dreamstime.com/z/task-completed-text-stamp-concept-background-337990732.jpg?ct=jpeg",
    "https://icons.veryicon.com/png/o/miscellaneous/user-interface-flat-multicolor/5751-update-male-profile.png",
    "https://plus.unsplash.com/premium_vector-1731551080025-b62dd12cfab7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
  ];

  return (
    <>
      <div className="w-75 mt-3 p-4 bg-white rounded">
        <h3 style={{ color: "rgba(230, 193, 70, 0.82)" }}>
          <TypeAnimation
            sequence={[
              " Hello",
              1000,
              storedUser.fullName,
              1000,
              " Welcome to  Residify ",
              3000,
            ]}
            speed={30}
            repeat={Infinity}
            style={{ fontSize: "1.5em" }}
          />
        </h3>
      </div>

      <div
        className="w-75 mt-3 p-4 shadow bg-white rounded"
        style={{ height: "260px" }}
      >
        <h3 className="mb-4" style={{ color: "teal" }}>
          Manage Tasks
        </h3>
      
  <span style={{ color: "green", fontSize: "1.2rem" }}>
    Click below to view tasks
  </span>

        

        <div className="d-flex justify-content-center mt-5">
          <button
            className="btn"
            style={{
              backgroundColor: "#C0C0C0",
              width: "180px",
              marginRight: "20px",
            }}
            onClick={() => navigate("/staff/view-task")}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#808080")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#C0C0C0")}
          >
            View
          </button>
        </div>
      </div>

      {/* Image Slider Section */}
      <div className="w-75 mt-3 p-4 shadow bg-light rounded">
        <h3 className="text-center" style={{ color: "teal" ,padding: "0 10px" }}>Services</h3>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", height: "200px", borderRadius: "20px", marginTop:"20px",padding: "0 10px",justifyContent:"space-between" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default StaffDashboardData;
