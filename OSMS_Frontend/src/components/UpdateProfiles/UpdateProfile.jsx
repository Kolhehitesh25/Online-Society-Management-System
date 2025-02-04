import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();

  // State to store user data
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    department: '',
    apartmentNumber: ''
  });

  // Fetch user data from localStorage (or API)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(user));
    alert('Profile updated successfully!');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="p-4 shadow-lg" style={{ width: '500px', background: '#f8f9fa', borderRadius: '10px' }}>
        <h2 className="text-center mb-4">Update Profile</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                />
              </Form.Group>
            </Col> 
            <Col> 
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group controlId="role" className="mt-3">
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" name="role" value={user.role} disabled />
          </Form.Group>

          {/* Additional Fields Based on Role */}
          {user.role === 'Admin' && (
            <Form.Group controlId="department" className="mt-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={user.department}
                onChange={handleInputChange}
                placeholder="Enter department"
              />
            </Form.Group>
          )}

          {user.role === 'Resident' && (
            <Form.Group controlId="apartmentNumber" className="mt-3">
              <Form.Label>Apartment Number</Form.Label>
              <Form.Control
                type="text"
                name="apartmentNumber"
                value={user.apartmentNumber}
                onChange={handleInputChange}
                placeholder="Enter apartment number"
              />
            </Form.Group>
          )}

          {user.role === 'Staff' && (
            <Form.Group controlId="department" className="mt-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={user.department}
                onChange={handleInputChange}
                placeholder="Enter department"
              />
            </Form.Group>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default UpdateProfile;
