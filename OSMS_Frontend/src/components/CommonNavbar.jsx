import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Navbar, Container, Nav, Dropdown, Modal, Button } from 'react-bootstrap';
import AdminProfile from './ViewProfile/AdminProfile'; 
import ResidentProfile from './ViewProfile/ResidentProfile'; 
import StaffProfile from './ViewProfile/StaffProfile'; 

const CommonNavbar = () => {
  // State for modal
  const [showModal, setShowModal] = useState(false);

  // State to store user data
  const [user, setUser] = useState({
    firstName: 'Soham',
    lastName: 'Kumar',
    role: 'Staff',
    department: 'Security',
    email: 'soham@example.com',
    apartmentNumber: '101'
  });

  useEffect(() => {
    // Retrieve user data from localStorage (or replace with API call if needed)
    const storedUser = JSON.parse(localStorage.getItem('userData')); 
    if (storedUser) {
      setUser(storedUser); // Set user data from localStorage
    }
  }, []);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <div className="main-content flex-grow-1">
      {/* Navbar */}
      <Navbar expand="lg" className="shadow-sm" style={{
         backgroundColor: 'rgba(89, 97, 100, 0.8)', 
        borderRadius: '5px', 
        marginLeft: '270px', 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10 
      }}>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll">
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Brand href="/admin" style={{ color: 'white', fontWeight: '600' }}>Residify.</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              {/* Home Link */}
              <Nav.Link href="/home" className="text-white" style={{ padding: '14px', fontWeight: '500' }}>Home</Nav.Link>

              {/* Profile Circle with Dynamic First Name */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="profile-dropdown" className="d-flex align-items-center text-white">
                  <div
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      backgroundColor: '#f39c12', // More visually appealing color
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '20px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {user.firstName.charAt(0)} {/* Display first letter of the first name */}
                  </div>
                </Dropdown.Toggle>

                {/* Dropdown Menu */}
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleModalShow}>View Profile</Dropdown.Item>
                  <Dropdown.Item href="/update-profile">Update Profile</Dropdown.Item>
                  <Dropdown.Item href="/setting">Setting</Dropdown.Item>
                  <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Profile */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{user.firstName}'s Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Conditionally render profile based on role */}
          {user.role === 'Admin' && <AdminProfile user={user} />}
          {user.role === 'Resident' && <ResidentProfile user={user} />}
          {user.role === 'Staff' && <StaffProfile user={user} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CommonNavbar;
