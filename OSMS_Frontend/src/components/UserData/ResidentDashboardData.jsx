import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ResidentDashboardData = () => {
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
    "https://img.freepik.com/free-vector/book-your-date-mobile-phone_23-2148552969.jpg?t=st=1739218081~exp=1739221681~hmac=854e19aae67ab08991243a1ca55a9a2b18f1cd9c08db5cded8163bd483e19606&w=740",
    "https://www.isotracker.com/wp-content/uploads/2021/11/complaints-management-system.jpg",
    "https://plus.unsplash.com/premium_photo-1682309567426-5517a398b4dd?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://img.freepik.com/free-photo/3d-hand-making-cashless-payment-from-smartphone_107791-16609.jpg?t=st=1739217880~exp=1739221480~hmac=1fcd6088a7c11633a0caba8680db56c911f42d14ec00b8055cab28cfa894e6df&w=740",
    
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


  {/* Image Slider Section */}
  <div className="w-75 mt-3 p-4 shadow bg-light rounded">
        <h3 className="text-center" style={{ color: "teal" ,padding: "0 10px" }}>Services</h3>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", height: "160px", borderRadius: "20px", marginTop:"20px",padding: "0 10px",justifyContent:"space-between" }}
              />
            </div>
          ))}
        </Slider>
      </div>
   

    <div
      className="w-75 mt-3 p-4 shadow bg-white rounded"
      style={{ height: "260px" }}
    >
      <h3 className="mb-4" style={{ color: "teal" }}>
        Manage tasks
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
 
  </>
  )
}

export default ResidentDashboardData
