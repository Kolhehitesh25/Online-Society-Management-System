import React, { useState } from "react";
import { Table, Form, InputGroup, Container, Button, Modal } from "react-bootstrap";

const StaffData = () => {
  const [search, setSearch] = useState("");
  const [staffs, setstaffs] = useState([
    { id: 1, name: "John Doe", phone: "9876543210", email: "john@example.com" },
    { id: 2, name: "Jane Smith", phone: "8765432109", email: "jane@example.com" },
    { id: 3, name: "Mark Taylor", phone: "7654321098", email: "mark@example.com" },
    { id: 4, name: "Lisa Brown", phone: "6543210987", email: "lisa@example.com" },
    { id: 3, name: "Mark Taylor", phone: "7654321098", email: "mark@example.com" },
    { id: 4, name: "Lisa Brown", phone: "6543210987", email: "lisa@example.com" },
  
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentstaff, setCurrentstaff] = useState(null);

  // Function to handle delete action
  const handleDelete = (id) => {
    const updatedstaffs = staffs.filter((staff) => staff.id !== id);
    setstaffs(updatedstaffs);
  };

  // Function to open the update modal and set the current staff's data
  const handleUpdate = (staff) => {
    setCurrentstaff(staff);
    setShowModal(true);
  };

  // Function to handle update form submission
  const handleSaveUpdate = () => {
    setstaffs((prevstaffs) =>
      prevstaffs.map((staff) =>   
        staff.id === currentstaff.id ? currentstaff : staff
      )
    );
    setShowModal(false);
  };

  // Filter staffs based on search input
  const filteredstaffs = staffs.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4 " style={{ maxWidth: "2000px", padding: "0",marginLeft:'10px'}}>
      <h3 className="text-center mb-4 " style={{ color: 'teal' }}>Staff Information</h3>

      {/* Search Bar */}
      <InputGroup className="mb-3">
        <InputGroup.Text>🔍</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {/* Table */}
      <Table striped bordered hover responsive className="text-center shadow-lg">
        <thead className="bg-dark text-light">
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredstaffs.length > 0 ? (
            filteredstaffs.map((staff, index) => (
              <tr key={staff.id}>
                <td>{index + 1}</td>
                <td>{staff.name}</td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>
                  <Button
                    
                    size="md"
                    onClick={() => handleUpdate(staff)}
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => handleDelete(staff.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                No staffs Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentstaff?.name || ""}
                onChange={(e) => setCurrentstaff({ ...currentstaff, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="flat">
              <Form.Label>Flat No.</Form.Label>
              <Form.Control
                type="text"
                value={currentstaff?.flat || ""}
                onChange={(e) => setCurrentstaff({ ...currentstaff, flat: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={currentstaff?.phone || ""}
                onChange={(e) => setCurrentstaff({ ...currentstaff, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentstaff?.email || ""}
                onChange={(e) => setCurrentstaff({ ...currentstaff, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StaffData;
