import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Table, Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const RaiseComplaint = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]); 

  const getCurrentTimestamp = () => new Date().toLocaleString();

  const userData = JSON.parse(localStorage.getItem("user"));
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      const residentId = userData?.userId;

      if (!residentId) {
        toast.error("Resident ID not found!");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/resident/all-complaints/${residentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      toast.error("Failed to load complaints.");
    }
  };

  useEffect(() => {
    fetchComplaints(); 
  }, []);

  // ** Send Complaint **
  const sendComplaint = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      const residentId = userData?.userId;

      if (!residentId) {
        toast.error("Resident ID not found!");
        return;
      }

      await axios.post(
        `http://localhost:8080/resident/register-complaint?residentId=${residentId}`,
        { message: message, timestamp: new Date().toISOString() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Complaint sent successfully!");
      setMessage("");
      setShow(false);
      fetchComplaints(); // Refresh complaints after sending
    } catch (error) {
      console.error("Error sending complaint:", error);
      toast.error("Failed to send complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="mb-3" style={{ color: "teal" }}>Raise Complaints</h2>
        <span className="mb-4">
          <marquee direction="right" behavior="alternate" style={{ color: "orange" }}>
            Make complaints easily..
          </marquee>
        </span>
        <Button style={{ marginTop: "20px" }} onClick={() => setShow(true)}>
          Send
        </Button>

        <hr style={{width:"600px"}}></hr>
      </div>

      {/* Notification Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Raise Your Complaints</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
          <Form>
            {/* Timestamp Field */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Timestamp</Form.Label>
              <Form.Control type="text" value={getCurrentTimestamp()} readOnly className="bg-light border-0 shadow-sm" />
            </Form.Group>

            {/* Message Input */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Complaint details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your complaints details.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-primary shadow-sm"
                style={{ resize: "none" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* Modal Footer with Buttons */}
        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={() => setShow(false)} className="px-4">
            Close
          </Button>
          <Button variant="primary" onClick={sendComplaint} disabled={loading} className="px-4">
            {loading ? <Spinner animation="border" size="sm" /> : "Send"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Complaints Table */}
      <Container className="mt-2">
      <div className="mt-4 ">
        <h4 className="text-center" style={{ color: "teal" }}>{userData.fullName} Complaints</h4>
        <Table striped bordered hover responsive className="text-center mt-3  " >
          <thead className="bg-dark text-white">
            <tr>
              <th>S.No</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((complaint, index) => (
                <tr key={complaint.id}>
                  <td>{index + 1}</td>
                  <td>{complaint.message}</td>
                  <td>{new Date(complaint.sentDateTime).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant={complaint.status === "Resolved" ? "success" : "warning"}
                      size="sm"
                    >
                      {complaint.status}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      </Container>
    </>
  );
};

export default RaiseComplaint;
