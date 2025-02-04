import React, { useState } from "react";
import { Table, Form, InputGroup, Container, Button, Modal } from "react-bootstrap";

const Residentdata = () => {
  const [search, setSearch] = useState("");
  const [residents, setResidents] = useState([
    { id: 1, name: "John Doe", flat: "A-101", phone: "9876543210", email: "john@example.com" },
    { id: 2, name: "Jane Smith", flat: "B-202", phone: "8765432109", email: "jane@example.com" },
    { id: 3, name: "Mark Taylor", flat: "C-303", phone: "7654321098", email: "mark@example.com" },
    { id: 4, name: "Lisa Brown", flat: "D-404", phone: "6543210987", email: "lisa@example.com" },
    { id: 3, name: "Mark Taylor", flat: "C-303", phone: "7654321098", email: "mark@example.com" },
    { id: 4, name: "Lisa Brown", flat: "D-404", phone: "6543210987", email: "lisa@example.com" },
    { id: 1, name: "John Doe", flat: "A-101", phone: "9876543210", email: "john@example.com" },
    { id: 2, name: "Jane Smith", flat: "B-202", phone: "8765432109", email: "jane@example.com" },
    { id: 3, name: "Mark Taylor", flat: "C-303", phone: "7654321098", email: "mark@example.com" },
    { id: 4, name: "Lisa Brown", flat: "D-404", phone: "6543210987", email: "lisa@example.com" },
    { id: 3, name: "Mark Taylor", flat: "C-303", phone: "7654321098", email: "mark@example.com" },
    { id: 4, name: "Lisa Brown", flat: "D-404", phone: "6543210987", email: "lisa@example.com" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentResident, setCurrentResident] = useState(null);

  // Function to handle delete action
  const handleDelete = (id) => {
    const updatedResidents = residents.filter((resident) => resident.id !== id);
    setResidents(updatedResidents);
  };

  // Function to open the update modal and set the current resident's data
  const handleUpdate = (resident) => {
    setCurrentResident(resident);
    setShowModal(true);
  };

  // Function to handle update form submission
  const handleSaveUpdate = () => {
    setResidents((prevResidents) =>
      prevResidents.map((resident) =>   
        resident.id === currentResident.id ? currentResident : resident
      )
    );
    setShowModal(false);
  };

  // Filter residents based on search input
  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4 " style={{ maxWidth: "2000px", padding: "0",marginLeft:'10px'}}>
      <h3 className="text-center mb-4 " style={{ color: 'teal' }}>Resident Information</h3>

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
            <th>Flat No.</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredResidents.length > 0 ? (
            filteredResidents.map((resident, index) => (
              <tr key={resident.id}>
                <td>{index + 1}</td>
                <td>{resident.name}</td>
                <td>{resident.flat}</td>
                <td>{resident.phone}</td>
                <td>{resident.email}</td>
                <td>
                  <Button
                    
                    size="md"
                    onClick={() => handleUpdate(resident)}
                    style={{ marginRight: "10px",backgroundColor:'' }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => handleDelete(resident.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                No Residents Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Resident</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentResident?.name || ""}
                onChange={(e) => setCurrentResident({ ...currentResident, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="flat">
              <Form.Label>Flat No.</Form.Label>
              <Form.Control
                type="text"
                value={currentResident?.flat || ""}
                onChange={(e) => setCurrentResident({ ...currentResident, flat: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={currentResident?.phone || ""}
                onChange={(e) => setCurrentResident({ ...currentResident, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentResident?.email || ""}
                onChange={(e) => setCurrentResident({ ...currentResident, email: e.target.value })}
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

export default Residentdata;
