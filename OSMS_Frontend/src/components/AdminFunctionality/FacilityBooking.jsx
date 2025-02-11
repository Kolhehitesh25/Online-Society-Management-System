import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Card, Spinner, Form, InputGroup } from "react-bootstrap";
import PaginationComponent from "../Pagination";

const FacilityBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/admin/all-bookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Function to format date from array to 'YYYY-MM-DD'
  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 3) return "Invalid Date";
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).toISOString().split("T")[0]; // 'YYYY-MM-DD'
  };

  // Handle Approve or Reject action
  const updateBookingStatus = async (id, status) => {
    if (!id) {
      console.error("Error: Booking ID is undefined");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const endpoint =
        status === "Approved"
          ? `http://localhost:8080/admin/approve/${id}`
          : `http://localhost:8080/admin/reject/${id}`;

      await axios.put(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.fullName.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentRecords = filteredBookings.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <h3 className="text-center mb-3" style={{ color: "teal" }}>
          Facility Booking Management
        </h3>

        {/* Search Bar */}
        <InputGroup className="mb-3">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        {/* Booking Table */}
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
                  <th>Email</th>
                  <th>Facility Name</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((booking, index) => (
                    <tr key={booking.id}>
                       <td>{indexOfFirstRecord + index + 1}</td>

                      <td>{booking.fullName}</td>
                      <td>{booking.email}</td>
                      <td>{booking.facilityName}</td>
                      <td>{formatDate(booking.fromDateTime)}</td>
                      <td>{formatDate(booking.toDateTime)}</td>
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
                        >
                          {booking.status}
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => updateBookingStatus(booking.id, "Approved")}
                          disabled={booking.status !== "Requested"}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, "Rejected")}
                          disabled={booking.status !== "Requested"}
                        >
                          Reject
                        </Button>
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

export default FacilityBooking;
