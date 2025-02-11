import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Card, Spinner, Form, InputGroup } from "react-bootstrap";
import PaginationComponent from "../Pagination";

const StaffData = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

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

        // Ensure status is a boolean
        const updatedStaffs = response.data.map((staff) => ({
          ...staff,
          status: staff.status === true,
        }));

        setStaffs(updatedStaffs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff data:", error);
        setLoading(false);
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

      // Optimistic UI update
      setStaffs((prevStaffs) =>
        prevStaffs.map((staff) =>
          staff.id === staffId ? { ...staff, status: !currentStatus } : staff
        )
      );

      // Send request to backend
      await axios.put(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error("Error toggling staff status:", error);
    }
  };

  // Filter staff based on search query
  const filteredStaffs = staffs.filter((staff) =>
    staff.fullName.toLowerCase().includes(search.toLowerCase()) || staff.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStaff = currentPage * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaffs = filteredStaffs.slice(indexOfFirstStaff, indexOfLastStaff);

  const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <h3 className="text-center mb-3" style={{ color: "teal" }}>
          Staff Information
        </h3>

        {/* Search Bar */}
        <InputGroup className="mb-3">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by Name or email."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              
            }}
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
                {currentStaffs.length > 0 ? (
                  currentStaffs.map((staff, index) => (
                    <tr key={staff.id}>
                       <td>{staffs.indexOf(staff) + 1}</td>
                      <td>{staff.fullName}</td>
                      <td>{staff.mobileNo}</td>
                      <td>{staff.email}</td>
                      <td>{staff.role}</td>
                      <td>
                        <button
                          className={`btn ${staff.status ? "btn-danger" : "btn-success"}`}
                          onClick={() => handleToggleStatus(staff.id, staff.status)}
                        >
                          {staff.status ? "Delete" : "Restore"}
                        </button>
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

            {/* Use Pagination Component */}
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

export default StaffData;
