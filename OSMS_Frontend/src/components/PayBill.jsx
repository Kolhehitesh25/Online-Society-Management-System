import React, { useState, useEffect } from "react";
import axios from "axios";

const PayBill = ({ userId }) => {
  const [amount, setAmount] = useState(1500);
  const [isPaid, setIsPaid] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch payment status from the backend when the component mounts
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("token is invaid");
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/payment/status/${userId}`
        );

        if (response.data.status === "paid") {
          setIsPaid(true);
          setMessage("✅ Payment Successful! Your bill has been paid.");
        } else {
          setIsPaid(false);
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    fetchPaymentStatus();
  }, [userId]); // Run when userId changes

  const handlePayment = async () => {
    console.log("Payment Started");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        null,
        { params: { amount: amount } }
      );

      const order = response.data;
      console.log("Order Created: ", order);

      const options = {
        key: "rzp_test_JqXu6d6rg1MSt5",
        amount: order.amount,
        currency: order.currency,
        name: "Society Management",
        description: "Pay Society Maintenance",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment Successful:", response);
          setMessage(
            "✅ Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
          setIsPaid(true);

          // Update the payment status in the backend
          try {
            await axios.post(
              `http://localhost:8080/api/payment/update-status/${userId}`
            );
          } catch (error) {
            console.error("Error updating payment status:", error);
          }
        },
        prefill: {
          name: "Resident",
          email: "resident@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#2563EB",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment:", error);
      setMessage("❌ Payment Failed! Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-black mb-4">
          Pay Maintenance
        </h2>
        <p className="text-lg text-black">
          Amount: <span className="font-bold">₹{amount}</span>
        </p>

        <button
          onClick={handlePayment}
          disabled={isPaid}
          className={`w-full mt-4 py-2 text-black font-semibold rounded-lg transition duration-300 ${
            isPaid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isPaid ? "Payment Completed" : "Pay Now"}
        </button>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-black text-sm font-medium ${
              isPaid ? "bg-green-300" : "bg-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PayBill;
