import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Form, InputGroup, Container, Button } from "react-bootstrap";

const StaffData = () => {
  const [search, setSearch] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(7); // Set the number of items per page

  useEffect(() => {
    const fetchStaffs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/admin/all-staffs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure staff status is correctly mapped
        const updatedStaffs = response.data.map((staff) => ({
          ...staff,
          status: staff.status === true, // Ensure status is always a boolean
        }));

        setStaffs(updatedStaffs);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaffs();
  }, []);

  const handleToggleStatus = async (staffId, currentStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const endpoint = currentStatus
        ? `http://localhost:8080/admin/deactivate/staff/${staffId}`
        : `http://localhost:8080/admin/activate/staff/${staffId}`;

      // Optimistically update the UI
      setStaffs((prevStaffs) =>
        prevStaffs.map((staff) =>
          staff.id === staffId ? { ...staff, status: !currentStatus } : staff
        )
      );

      // Send request to the backend
      await axios.put(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error("Error toggling staff status:", error);
    }
  };

  const filteredStaffs = staffs.filter((staff) =>
    staff.fullName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaffs = filteredStaffs.slice(indexOfFirstStaff, indexOfLastStaff);

  const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Container
      className="mt-4"
      style={{ maxWidth: "2000px", padding: "0", marginLeft: "10px" }}
    >
      <h3 className="text-center mb-4" style={{ color: "teal" }}>
        Staff Information
      </h3>

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
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentStaffs.length > 0 ? (
            currentStaffs.map((staff, index) => (
              <tr key={staff.id}>
                <td>{index + 1}</td>
                <td>{staff.fullName}</td>
                <td>{staff.mobileNo}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
                <td>
                  <Button
                    variant={staff.status ? "danger" : "success"} // Red for Deactivate, Green for Activate
                    size="md"
                    onClick={() => handleToggleStatus(staff.id, staff.status)}
                  >
                    {staff.status ? "Delete" : "Restore"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                No Staff Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mx-auto">
        <Button
          style={{ marginTop: "8px" }}
          variant="secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="mx-3"
        >
          ⪻
        </Button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <Button
          style={{ marginTop: "8px" }}
          variant="secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="mx-3"
        >
          ⪼
        </Button>
      </div>
    </Container>
  );
};

export default StaffData;
