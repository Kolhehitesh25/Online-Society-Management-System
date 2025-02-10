import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Button,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        setLoading(true); 
        setError(""); 
  
        const token = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  
        if (!storedUser.userId) {
          console.error("User ID is missing in localStorage");
          setError("User ID is missing. Please log in again.");
          setLoading(false);
          return;
        }
  
  
        const response = await axios.get(`http://localhost:8080/staff/assigned/${storedUser.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
     
  
        if (!Array.isArray(response.data)) {
          console.error(" Unexpected API response format:", response.data);
          setError("Invalid data received from the server.");
          setLoading(false);
          return;
        }
  
        setTasks(response.data);
        setLoading(false);
      
      } catch (err) {
        console.error("Error fetching tasks:", err.response ? err.response.data : err.message);
        setError("Failed to load tasks. Please try again.");
        setLoading(false);
      }
    };
  
    fetchTasks();
  }, []);
  


  const completeTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/staff/update-tasks/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task status.");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <h3 className="text-center mb-3" style={{ color: "teal" }}>
          View  {storedUser.fullName}  Tasks
        </h3>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="text-center mt-3">
            <thead className="bg-dark text-white">
              <tr>
                <th>S.No</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.description}</td>
                    <td>
                      <Button
                        variant={
                          task.status === "Completed" ? "success" : "warning"
                        }
                        size="sm"
                        disabled
                      >
                        {task.status}
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => completeTask(task.id)}
                        disabled={task.status === "Completed"}
                      >
                        Complete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No tasks assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default ViewTask;
