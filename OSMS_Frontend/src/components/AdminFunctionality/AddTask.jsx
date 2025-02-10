import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Card, Spinner, Form, InputGroup, Button, Modal } from "react-bootstrap";
import PaginationComponent from "../Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffData = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({ description: "", dueDate: "" });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No authentication token found.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:8080/admin/all-staffs", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      let assignedStaffs = JSON.parse(localStorage.getItem("assignedStaffs")) || [];
  
      const updatedStaffs = response.data.map((staff) => ({
        ...staff,
        isAssigned: assignedStaffs.includes(staff.id), // Check if stored in localStorage
      }));
  
      setStaffs(updatedStaffs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      toast.error("Failed to fetch staff data.");
      setLoading(false);
    }
  };
  

  const handleAddTask = (staff) => {
    setCurrentStaff(staff);
    setShowTaskModal(true);
  };
  const handleSaveTask = async () => {
    if (!newTask.description || !newTask.dueDate) {
      toast.error("Please fill in all fields before assigning a task.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication error. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:8080/admin/assign-task?staffId=${currentStaff.id}`,
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        toast.success("Task Assigned Successfully!");
  
        let assignedStaffs = JSON.parse(localStorage.getItem("assignedStaffs")) || [];
        assignedStaffs.push(currentStaff.id);
        localStorage.setItem("assignedStaffs", JSON.stringify(assignedStaffs));
  
       
        fetchStaffs();
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      toast.error("Failed to assign task. Please try again.");
    }
  
    setShowTaskModal(false);
    setNewTask({ description: "", dueDate: "" });
  };
  
  

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <h3 className="text-center mb-3" style={{ color: "teal" }}>Assign Tasks</h3>
        <InputGroup className="mb-3">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by Name or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <Table striped bordered hover responsive className="text-center mt-4">
              <thead className="bg-dark text-white">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
  {staffs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((staff, index) => (
    <tr key={staff.id}>
      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>{staff.fullName}</td>
      <td>{staff.mobileNo}</td>
      <td>{staff.email}</td>
      <td>{staff.role}</td>
      <td>
      <Button
  size="md"
  disabled={staff.isAssigned}
  onClick={() => handleAddTask(staff)}
  style={{
    backgroundColor: staff.isAssigned ? "gray" : "green",
    cursor: staff.isAssigned ? "not-allowed" : "pointer",
  }}
>
  {staff.isAssigned ? "Assigned" : "Add Task"}
</Button>

      </td>
    </tr>
  ))}
</tbody>

            </Table>

            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(staffs.length / itemsPerPage)}
              onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              onNext={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(staffs.length / itemsPerPage)))}
            />
          </>
        )}
      </Card>
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task for {currentStaff?.fullName}</Modal.Title>
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
            Assign Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StaffData;
