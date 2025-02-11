package com.osms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.osms.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestParam double amount) {
        String order = paymentService.createOrder(amount);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/update-status/{userId}")
    public ResponseEntity<String> updatePaymentStatus(@PathVariable Long userId) {
        // Check if the payment exists for the given userId
        if (!paymentService.paymentExists(userId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found for the given user ID.");
        }

        // Update the payment status
        int updatedRows = paymentService.updatePaymentStatus(userId);
        if (updatedRows > 0) {
            return ResponseEntity.ok("Payment status updated to PAID.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update payment status.");
        }
    }
    
 // New endpoint to fetch payment status
    @GetMapping("/status/{userId}")
    public ResponseEntity<String> getPaymentStatus(@PathVariable Long userId) {
        String status = paymentService.getPaymentStatus(userId);
        if (status != null) {
            return ResponseEntity.ok(status);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment status not found for the given user ID.");
        }
    }
}