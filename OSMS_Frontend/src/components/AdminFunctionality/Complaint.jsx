import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Card, Spinner, Form, InputGroup } from "react-bootstrap";
import PaginationComponent from "../Pagination";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/admin/all-complaints",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComplaints(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // Function to format date safely
  const formatDate = (date) => {
    if (!date) return "Invalid Date";
    try {
      return new Date(date).toISOString().split("T")[0]; // 'YYYY-MM-DD'
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  // Handle complaint resolution
  const resolveComplaint = async (id) => {
    if (!id) {
      console.error("Error: Complaint ID is undefined");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const endpoint = `http://localhost:8080/admin/resolved/${id}`;

      await axios.put(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
        )
      );
    } catch (error) {
      console.error("Error resolving complaint:", error);
    }
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      complaint.fullName.toLowerCase().includes(search.toLowerCase()) ||
      complaint.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentRecords = filteredComplaints.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <h3 className="text-center mb-3" style={{ color: "teal" }}>
          Complaint Management
        </h3>

        {/* Search Bar */}
        <InputGroup className="mb-3">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by Name .."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        {/* Complaints Table */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <Table striped bordered hover responsive className="text-center mt-6">
              <thead className="bg-dark text-white">
                <tr>
                  <th>S.No</th>
                  <th>Full Name</th>
               
                  <th>Description</th>
                  <th>Complaint Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((complaint, index) => (
                    <tr key={complaint.id}>
                      <td>{indexOfFirstRecord + index + 1}</td>
                      <td>{complaint.fullName}</td>
                      
                      <td>{complaint.description}</td>
                      <td>{formatDate(complaint.sentDateTime)}</td>
                      <td>
                        <Button
                          variant={complaint.status === "Resolved" ? "success" : "warning"}
                          size="sm"
                        >
                          {complaint.status}
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => resolveComplaint(complaint.id)}
                          disabled={complaint.status === "Resolved"}
                        >
                          Resolve
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No complaints available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination Component */}
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            />
          </>
        )}
      </Card>
    </Container>
  );
};

export default Complaint;
