import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const BookFacility = () => {
  const [show, setShow] = useState(false);
  const [facilityName, setFacility] = useState("");
  const [fromDateTime, setFromDate] = useState("");
  const [toDateTime, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

  const facilitiesList = ["Swimming Pool", "Gym", "Clubhouse", "Tennis Court","Garden","Terrace"];

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));
      const residentId = userData?.userId;

      if (!residentId) {
        toast.error("Resident ID not found!");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/resident/all-facility-book/${residentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load facility bookings.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const bookFacility = async () => {
    if (!facilityName || !fromDateTime || !toDateTime) {
      toast.error("All fields are required!");
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
        `http://localhost:8080/resident/facility-book?residentId=${residentId}`,
        { facilityName, fromDateTime, toDateTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Facility booked successfully!");
      setFacility("");
      setFromDate("");
      setToDate("");
      setShow(false);
      fetchBookings(); 
    } catch (error) {
      console.error("Error booking facility:", error);
      toast.error("Failed to book facility.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="mb-3" style={{ color: "teal" }}>Book Facility</h2>
        <Button style={{ marginTop: "20px" }} onClick={() => setShow(true)}>
          Book Now
        </Button>
      </div>

      {/* Booking Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Book a Facility</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
          <Form>
            {/* Facility Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Select Facility</Form.Label>
              <Form.Select
                value={facilityName}
                onChange={(e) => setFacility(e.target.value)}
                className="border border-primary shadow-sm"
              >
                <option value="">Choose a Facility</option>
                {facilitiesList.map((fac, index) => (
                  <option key={index} value={fac}>{fac}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Date Pickers */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">From Date</Form.Label>
              <Form.Control
                type="date"
                value={fromDateTime}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-primary shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">To Date</Form.Label>
              <Form.Control
                type="date"
                value={toDateTime}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-primary shadow-sm"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* Modal Footer with Buttons */}
        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={() => setShow(false)} className="px-4">
            Close
          </Button>
          <Button variant="primary" onClick={bookFacility} disabled={loading} className="px-4">
            {loading ? "Booking..." : "Book"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Facility Bookings Table */}
      <Container className="mt-2">
        <div className="mt-4">
          <h4 className="text-center" style={{ color: "teal" }}>{userData.fullName} Booked Facilities</h4>
          <Table striped bordered hover responsive className="text-center mt-3">
            <thead className="bg-dark text-white">
              <tr>
                <th>S.No</th>
                <th>Facility</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td>{index + 1}</td>
                    <td>{booking.facilityName}</td>
                    <td>{new Date(booking.fromDateTime).toLocaleDateString()}</td>
                    <td>{new Date(booking.toDateTime).toLocaleDateString()}</td>
                    <td><Button
                                          variant={booking.status === "Approved" ? "success" : "warning"}
                                          size="sm"
                                        >
                                          {booking.status}
                                        </Button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No bookings found
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

export default BookFacility;
