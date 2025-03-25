import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Navbar, Container, Nav, Dropdown, Modal, Button, Form } from "react-bootstrap";
import AdminProfile from "./ViewProfile/AdminProfile";
import ResidentProfile from "./ViewProfile/ResidentProfile";
import StaffProfile from "./ViewProfile/StaffProfile";
import { getUserById, updateUser } from "../services/getAndUpdateService"; 
import { toast } from "react-toastify";

const CommonNavbar = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
  });

  const fetchUserData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user")); 
      const token = localStorage.getItem("token");
  
      if (!storedUser || !storedUser.userId) {
        console.error("No valid user data found in localStorage");
        return;
      }
  
      const userData = await getUserById(storedUser.userId, token);
  
      const userWithRole = { 
        ...userData, 
        id: storedUser.userId,  // Make sure ID is not missing
        role: storedUser.role ,
       // flatNumber:storedUser.flatNumber
      };
  
      setUser(userWithRole);
      setUpdatedUser(userWithRole);
  
      // console.log(" Fetched User Data:", userWithRole); // Debug log
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  
  useEffect(() => {
    console.log(localStorage.getItem(user))
    fetchUserData(); 
  }, []);

  const handleViewModalShow = () => setShowViewModal(true);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleUpdateModalShow = () => {
    fetchUserData();
    setShowUpdateModal(true);
  };
  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      
      console.log(" Attempting to update profile with:", { 
        id: user?.id, 
        updatedUser, 
        token 
      });
  
      if (!user?.id) {
        toast.error("User ID is missing.");
        return;
      }
  
      await updateUser(user.id, updatedUser, token);
      toast.success("Profile updated successfully!");
  
      fetchUserData(); 
      handleUpdateModalClose();
    } catch (error) {
      console.error(" Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  
  

  return (
    <div className="main-content flex-grow-1">
      {/* Navbar */}
      <Navbar
        expand="lg"
        className="shadow-sm"
        style={{
          backgroundColor: "rgba(89, 97, 100, 0.8)",
          borderRadius: "5px",
          marginLeft: "270px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll">
            <FaBars />
          </Navbar.Toggle>
          <Navbar.Brand href="/admin" style={{ color: "white", fontWeight: "600" }}>
            Residify.
          </Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Nav.Link href="/home" className="text-white" style={{ padding: "14px", fontWeight: "500" }}>
                Home
              </Nav.Link>

              {/* Profile Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="profile-dropdown" className="d-flex align-items-center text-white">
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      backgroundColor: "#f39c12",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "20px",
                      textTransform: "uppercase",
                    }}
                  >
                    {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "?"}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleViewModalShow}>View Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleUpdateModalShow}>Update Profile</Dropdown.Item> 
                  {/* <Dropdown.Item href="/setting">Setting</Dropdown.Item> */}
                  <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for Viewing Profile */}
      <Modal show={showViewModal} onHide={handleViewModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{user ? `${user.fullName}'s Profile` : "Profile"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user ? (
            user.role === "ADMIN" ? (
              <AdminProfile user={user} />
            ) : user.role === "RESIDENT" ? (
              <ResidentProfile user={user} />
            ) : user.role === "SECURITY" || user.role === "CLEANER" ? (
              <StaffProfile user={user} />
            ) : (
              <p>Role not recognized</p>
            )
          ) : (
            <p style={{ textAlign: "center", fontWeight: "bold", color: "red" }}>No user data found</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Updating Profile */}
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullName" value={updatedUser.fullName} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={updatedUser.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile No</Form.Label>
              <Form.Control type="text" name="mobileNo" value={updatedUser.mobileNo} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleUpdateProfile}>Update</Button>
          <Button variant="secondary" onClick={handleUpdateModalClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommonNavbar;
