import React, { useState, useEffect } from "react";
import axios from "axios";

const PayBill = () => {
  const [amount, setAmount] = useState(1500);
  const [isPaid, setIsPaid] = useState(false);
  const [message, setMessage] = useState("");

  // Retrieve user information from local storage
  const user = JSON.parse(localStorage.getItem("user")); // Assuming the user object is stored as a JSON string
  const userId = user ? user.userId : null; // Extract userId from the user object
  console.log("User  ID: ", userId); // Log the user ID for debugging

  // Function to fetch payment status from the backend
  const fetchPaymentStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token is invalid");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/api/payment/status/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      // Check if the payment status is PAID
      if (response.data === "PAID") {
        setIsPaid(true);
        setMessage("✅ Payment Successful! Your bill has been paid.");
      } else {
        setIsPaid(false);
        setMessage(""); // Clear message if not paid
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
      setMessage("❌ Failed to fetch payment status.");
    }
  };

  // Fetch payment status when the component mounts
  useEffect(() => {
    if (userId) {
      fetchPaymentStatus();
    } else {
      setMessage("❌ User ID not found. Please log in.");
    }
  }, [userId]);

  // Function to handle payment
  const handlePayment = async () => {
    console.log("Payment Started");

    // Prevent payment if already paid
    if (isPaid) {
      setMessage("❌ Payment already completed! You cannot pay again.");
      return;
    }

    try {
      // Create an order with Razorpay
      const response = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        null,
        { params: { amount: amount } }
      );

      const order = response.data; // Use the response directly
      console.log("Order Created: ", order);

      const options = {
        key: "rzp_test_JqXu6d6rg1MSt5", // Replace with your Razorpay key
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
            const updateResponse = await axios.post(
              `http://localhost:8080/api/payment/update-status/${userId}`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headers
                },
              }
            );
            console.log("Update Response:", updateResponse.data); // Log the response from the update status

            // Optionally, fetch the updated payment status
            await fetchPaymentStatus();
          } catch (error) {
            console.error("Error updating payment status:", error);
            setMessage(
              "❌ Failed to update payment status. Please contact support."
            );
          }
        },
        prefill: {
          name: user.fullName, // Use the full name from the user object
          email: user.email, // Use the email from the user object
          contact: user.mobileNo, // Use the mobile number from the user object
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