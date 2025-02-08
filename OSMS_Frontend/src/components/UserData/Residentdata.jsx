import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Form, InputGroup, Container, Button } from "react-bootstrap";

const Residentdata = () => {
  const [search, setSearch] = useState("");
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(7); // Set the number of items per page

  useEffect(() => {
    const fetchResidents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/admin/all-residents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const updatedResidents = response.data.map((resident) => ({
          ...resident,
          status: resident.status === true,
        }));

        setResidents(updatedResidents);
      } catch (error) {
        console.error("Error fetching resident data:", error);
      }
    };

    fetchResidents();
  }, []);

  const handleToggleStatus = async (residentId, currentStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const endpoint = currentStatus
        ? `http://localhost:8080/admin/deactivate/${residentId}`
        : `http://localhost:8080/admin/activate/${residentId}`;

      setResidents((prevResidents) =>
        prevResidents.map((resident) =>
          resident.id === residentId
            ? { ...resident, status: !currentStatus }
            : resident
        )
      );

      await axios.put(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error toggling resident status:", error);
    }
  };

  const filteredResidents = residents.filter((resident) =>
    resident.fullName.toLowerCase().includes(search.toLowerCase())
  );

  //pagination logic
  const indexOfLastResident = currentPage * itemsPerPage;
  const indexOfFirstResident = indexOfLastResident - itemsPerPage;
  const currentResidents = filteredResidents.slice(
    indexOfFirstResident,
    indexOfLastResident
  );

  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage);

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
        Resident Information
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
      <Table
        striped
        bordered
        hover
        responsive
        className="text-center shadow-lg"
      >
        <thead className="bg-dark text-light">
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Flat No.</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentResidents.length > 0 ? (
            currentResidents.map((resident, index) => (
              <tr key={resident.id}>
                <td>{index + 1}</td>
                <td>{resident.fullName}</td>
                <td>{resident.flatNumber}</td>
                <td>{resident.mobileNo}</td>
                <td>{resident.email}</td>
                <td>
                  <Button
                    variant={resident.status ? "danger" : "success"} // Red for Delete, Green for Restore
                    size="md"
                    onClick={() =>
                      handleToggleStatus(resident.id, resident.status)
                    }
                  >
                    {resident.status ? "Delete" : "Restore"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-danger">
                No Residents Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mx-auto">
        <Button style={{marginTop:"8px"}}
          variant="secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="mx-3 "
        >
         ⪻
        </Button>
        <span>
           {currentPage} of {totalPages}
        </span>
        <Button
        style={{marginTop:"8px"}}
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

export default Residentdata;
