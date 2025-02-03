import React from 'react'
import { FaBars } from 'react-icons/fa';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';

const CommonNavbar = () => {

  const userFirstName = "Soham";

  return (
    <div className="main-content flex-grow-1 " >
      {/* Navbar */}
      <Navbar expand="lg" className="shadow-sm" style={{ backgroundColor: 'rgba(89, 97, 100, 0.8)', borderRadius: '2px',marginLeft:'270px', position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10 }}>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll">
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Brand href="/admin" style={{color:'white',fontWeight:'400px'}}>Residify.</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              {/* Home Link */}
              <Nav.Link href="/home" className="text-white" style={{padding:'14px'}}>Home</Nav.Link>

              {/* Profile Circle with First Name Letter */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="profile-dropdown" className="d-flex align-items-center text-white">
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'orange',
                      color: 'indigo',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}
                  >
                    {userFirstName.charAt(0)}
                  </div>
                </Dropdown.Toggle>

                {/* Dropdown Menu */}
                <Dropdown.Menu>
                <Dropdown.Item href="/view-profile">View Profile</Dropdown.Item>
                <Dropdown.Item href="/update-profile">Update Profile</Dropdown.Item>
                
                  <Dropdown.Item href="/setting">setting</Dropdown.Item>
                  <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  
    
  )
}
export default CommonNavbar
