import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Card, Spinner, Form, InputGroup } from "react-bootstrap";
import PaginationComponent from "../Pagination";

const FinancialRecord = () => {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Add search state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchFinancialData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/admin/residents-list", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFinancialData(response.data);
        localStorage.setItem("financialData", JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching financial records:", error);
        setLoading(false);
      }
    };

    const storedData = localStorage.getItem("financialData");
    if (storedData) {
      setFinancialData(JSON.parse(storedData));
      setLoading(false);
    } else {
      fetchFinancialData();
    }
  }, []);

  
  const filteredRecords = financialData.filter((record) =>
    record.fullName.toLowerCase().includes(search.toLowerCase()) || 
   record.paymentStatus.toLowerCase().includes(search.toLowerCase()) 
  );

  // Pagination logic
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <h3 className="text-center mb-3" style={{ color: "teal" }}>
          Financial Records
        </h3>

        {/* Search Bar */}
        <InputGroup className="mb-3">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by Name or status"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on search
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
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Payment Status</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((record, index) => (
                    <tr key={record.id}>
                   <td>{financialData.indexOf(record) + 1}</td>

                      <td>{record.fullName}</td>
                      <td>{record.email}</td>
                      <td>{record.mobileNo}</td>
                      <td>{record.paymentStatus}</td>
                      <td>Rs.{record.totalAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-danger">
                      No records found
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

export default FinancialRecord;
