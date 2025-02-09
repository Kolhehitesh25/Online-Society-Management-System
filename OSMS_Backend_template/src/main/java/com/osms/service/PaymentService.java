package com.osms.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;


@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

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
}