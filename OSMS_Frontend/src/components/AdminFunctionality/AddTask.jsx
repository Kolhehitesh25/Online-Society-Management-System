import React, { useState } from "react";
import { Table, Form, InputGroup, Container, Button, Modal } from "react-bootstrap";

const AddTask = () => {
  const [search, setSearch] = useState("");
  const [staffs, setStaffs] = useState([
    { id: 1, name: "John Doe", phone: "9876543210", email: "john@example.com" },
    { id: 2, name: "Jane Smith", phone: "8765432109", email: "jane@example.com" },
    { id: 3, name: "Mark Taylor", phone: "7654321098", email: "mark@example.com" },
    { id: 4, name: "Lisa Brown", phone: "6543210987", email: "lisa@example.com" },
  ]);
  const [tasks, setTasks] = useState([]); // Store tasks here

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [newTask, setNewTask] = useState({ description: "", dueDate: "" });

  // Function to handle task modal open
  const handleAddTask = (staff) => {
    setCurrentStaff(staff);
    setShowTaskModal(true);
  };

  // Function to handle task form submission
  const handleSaveTask = () => {
    const newTaskData = { ...newTask, staffId: currentStaff.id };
    setTasks([...tasks, newTaskData]); // Add the new task to the tasks list
    setShowTaskModal(false); // Close the modal
    setNewTask({ description: "", dueDate: "" }); // Reset the task form
  };



  // Filter staff based on search input
  const filteredStaffs = staffs.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4" style={{ maxWidth: "2000px", padding: "0", marginLeft: "10px" }}>
      <h3 className="text-center mb-4" style={{ color: "teal" }}>Staff Details</h3>

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
          {filteredStaffs.length > 0 ? (
            filteredStaffs.map((staff, index) => (
              <tr key={staff.id}>
                <td>{index + 1}</td>
                <td>{staff.name}</td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>
                  <Button
                    
                    size="md"
                    onClick={() => handleAddTask(staff)} // Open the Add Task modal
                    style={{ marginRight: "10px",backgroundColor:'green' }}
                  >
                    Add Task
                  </Button>
                 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                No staff found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add Task Modal */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task for {currentStaff?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="description">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter task description"
              />
            </Form.Group>
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
            Close
          </Button>
          <Button variant="info" onClick={handleSaveTask}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddTask;
