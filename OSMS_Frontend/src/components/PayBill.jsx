import React, { useState } from "react";
import axios from "axios";

const PayBill = () => {
  const [amount, setAmount] = useState(1500); // Default amount

  const handlePayment = async () => {
    console.log("Payment Started");

    try {
      // 1️⃣ Call the backend to create an order
      const response = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        null,
        {
          params: { amount: amount },
        }
      );

      const order = response.data;
      console.log("Order Created: ", order);

      // 2️⃣ Load Razorpay
      const options = {
        key: "rzp_test_JqXu6d6rg1MSt5", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Society Management",
        description: "Pay Society Maintenance",
        order_id: order.id, // Order ID from backend
        handler: function (response) {
          console.log("Payment Successful:", response);
          alert(
            "Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
        },
        prefill: {
          name: "Resident",
          email: "resident@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div>
      <h2>Pay Maintenance</h2>
      <p>Amount: ₹{amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PayBill;
