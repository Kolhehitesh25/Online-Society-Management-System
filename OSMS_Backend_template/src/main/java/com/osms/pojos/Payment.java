package com.osms.pojos;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "resident_id")
    private User resident;
    
    @Column(name="totalamount")
    private double totalAmount = 1500;

    @Column(name="status")
    private String status = "PENDING";

    @Column(name="paymentdate")
    private LocalDate paymentDate = LocalDate.now();

    // Custom Constructor for Payment(User resident)
    public Payment(User resident) {
        this.resident = resident;
        this.totalAmount = 1500;  // Default amount
        this.status = "PENDING";  // Default status
        this.paymentDate = LocalDate.now();
    }
}