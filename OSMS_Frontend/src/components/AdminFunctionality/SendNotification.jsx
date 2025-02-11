import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const SendNotification = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get current timestamp
  const getCurrentTimestamp = () => new Date().toLocaleString();

  // Function to handle send notification
  const sendNotification = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/admin/send-notification",
        {
          message: message,
          timestamp: new Date().toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Notification sent successfully!");
      setMessage(""); // Clear message after sending
      setShow(false); // Close modal
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      
      <div className="mt-4 text-center">
        <h2 className="mb-3  "style={{color:"teal"}}>📢 Send Notification</h2>
        <span className="mb-4">  <marquee direction="right" behavior="alternate" 
        style={{color:'green' }}>
       Send notification easily to residents ..
    </marquee> </span>
        <Button style={{marginTop:'20px'}} onClick={() => setShow(true)}>
           Send Notification
        </Button>
      </div>

      {/* Notification Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Send Notification</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
          <Form>
            {/* Timestamp Field */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">📅 Timestamp</Form.Label>
              <Form.Control type="text" value={getCurrentTimestamp()} readOnly className="bg-light border-0 shadow-sm" />
            </Form.Group>

            {/* Message Input */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">✉️ Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message..."
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
          <Button variant="primary" onClick={sendNotification} disabled={loading} className="px-4">
            {loading ? <Spinner animation="border" size="sm" /> : " Send"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendNotification;
