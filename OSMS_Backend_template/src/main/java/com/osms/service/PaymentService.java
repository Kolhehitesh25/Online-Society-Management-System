package com.osms.service;

import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.osms.dao.PaymentDao;
import com.osms.pojos.Payment;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Autowired
    private PaymentDao paymentDao; // Inject the PaymentDao

    public String createOrder(double amount) {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100); // Amount in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "txn_123456");

            Order order = razorpayClient.orders.create(orderRequest);
            return order.toString();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    public int updatePaymentStatus(Long residentId) {
        return paymentDao.updatePaymentStatus(residentId);
    }

    public boolean paymentExists(Long residentId) {
        return paymentDao.findByResidentId(residentId) != null;
    }

 // New method to get payment status
    public String getPaymentStatus(Long residentId) {
        // Fetch the payment using Optional
        Optional<Payment> optionalPayment = paymentDao.findByResidentId(residentId);
        
        // Check if the payment exists
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get(); // Retrieve the Payment object
            return payment.getStatus(); // Return the status
        }
        return null; // Return null if payment not found
    }
}