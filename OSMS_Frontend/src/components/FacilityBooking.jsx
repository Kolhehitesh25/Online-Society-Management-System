import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Card, Spinner } from "react-bootstrap";

const FacilityBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all facility bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Handle Approve or Reject action
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/${id}`, { status });
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <h3 className="text-center mb-3">Facility Booking Management</h3>

        {/* Booking Table */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="text-center">
            <thead className="bg-dark text-white">
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Facility Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking.id}>
                    <td>{index + 1}</td>
                    <td>{booking.fullName}</td>
                    <td>{booking.email}</td>
                    <td>{booking.facilityName}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>
                      <Button
                        variant={
                          booking.status === "Approved"
                            ? "success"
                            : booking.status === "Rejected"
                            ? "danger"
                            : "warning"
                        }
                        size="sm"
                        disabled
                      >
                        {booking.status}
                      
                      </Button>
                    </td>
                    <td>
                      {booking.status === "Requested" && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() => updateBookingStatus(booking.id, "Approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, "Rejected")}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No facility bookings available
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

export default FacilityBookingManagement;
