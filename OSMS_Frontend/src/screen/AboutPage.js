// import React,{useState} from 'react'
import aboutbg from "../images/aboutbg.jpg";
import Navbar from "../components/Navbar";
import { Carousel, Card} from "react-bootstrap"; 
import admin from "../images/admin.avif"
import staff from "../images/staff1.jpg"
import resident from "../images/resident.jpg"
const AboutPage = () => {
    // const [showAbout, setShowAbout] = useState(false); 

  // Data for the carousel cards
  const cardData = [
    {
      image: resident,
      title: "Resident Management",
      description:
        "Efficiently manage residents in your society. Keep track of member details, payments, and communication.",
    },
    {
      image: staff, 
      title: "Staff Management",
      description:
        "Manage staff roles, schedules, and responsibilities seamlessly. Ensure smooth operations in your society including Cleaning ,Security.",
    },
    {
      image: admin,
      title: "Admin Management",
      description:
        "Handle admin tasks, permissions, and society operations with ease. Simplify decision-making and governance.",
    },
  ];
  return (
    <>
        

          {/* About Section */}
  
        <div
          style={{
            padding: "50px 20px",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
          backgroundImage: `url(${aboutbg})`,
          
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", 
          minWidth:"100vw",
          position:'fixed'
          }}
        >
             <Navbar/>

          <h1  style={{ marginBottom: "55px", color: "white" }}><span style={{color:"#6082B6"}}>About </span>- <i>Residify</i></h1>
          <Carousel indicators={false} interval={3000}>
            {cardData.map((card, index) => (
              <Carousel.Item key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                        height:"480px",
                      width: "800px",
                      borderRadius: "25px",
                      overflow: "hidden",
                      boxShadow: "0 4px 8px rgba(38, 36, 36, 0.2)",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={card.image}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "teal",
                          paddingTop:'10px'
                        }}
                      >
                        {card.title}
                      </Card.Title>
                      <Card.Text
                        style={{ fontSize: "1rem", color: "#555", marginTop: "20px" }}
                      >
                        {card.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      
    </>
  )
}

export default AboutPage
