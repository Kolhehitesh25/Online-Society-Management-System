import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Form, InputGroup, Container, Button } from "react-bootstrap";

const StaffData = () => {
  const [search, setSearch] = useState("");
  const [staffs, setStaffs] = useState([]); // State to store the staff data

  // Fetch staff data from backend
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
  }, []); // Runs on initial render and refresh

  // Toggle staff status (Deactivate or Activate)
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

  // Filter staff based on search input
  const filteredStaffs = staffs.filter((staff) =>
    staff.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4" style={{ maxWidth: "2000px", padding: "0", marginLeft: "10px" }}>
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
          {filteredStaffs.length > 0 ? (
            filteredStaffs.map((staff, index) => (
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
    </Container>
  );
};

export default StaffData;
