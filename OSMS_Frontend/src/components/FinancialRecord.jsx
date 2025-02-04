import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button, Card, Spinner } from "react-bootstrap";

const FinancialRecord = () => {
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Spring Boot backend
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/residents-list");
        setFinancialData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching financial records:", error);
        setLoading(false);
      }
    };
    fetchFinancialData();
  }, []);

  // Update payment status in backend using Axios
  // const handlePaymentUpdate = async (id) => {
  //   try {
  //     await axios.get(`http://localhost:8080/api/update-payment/${id}`, {
  //       status: "Paid",
  //     });

  //     // Update UI after successful backend update
  //     setFinancialData((prevData) =>
  //       prevData.map((record) =>
  //         record.id === id ? { ...record, status: "Paid" } : record
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating payment status:", error);
  //   }
  // };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <h3 className="text-center mb-3" style={{color:'teal'}}>Financial Records</h3>
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
                <th>Mobile Number</th>
                <th>Payment Status</th>
                <th>Amount (₹)</th>
                
              </tr>
            </thead>
            <tbody>
              {financialData.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.fullName}</td>
                  <td>{record.email}</td>
                  <td>{record.mobileNo}</td>
                  <td>{record.paymentStatus}</td>
                  <td>₹{record.totalAmount}</td>
                  <td>
                    {record.status === "Paid" ? (
                      <Button variant="success" size="sm" disabled>
                        Paid
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        size="sm"
                        // onClick={() => handlePaymentUpdate(record.id)}
                      >
                        Mark as Paid
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default FinancialRecord;
