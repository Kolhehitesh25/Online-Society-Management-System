package com.osms.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
    private double totalAmount=1500;
    @Column(name="status")
    private String status="pending"; 
    @Column(name="paymentdate")
    private LocalDate paymentDate=LocalDate.now(); 
    
    
    public Payment(User resident) {
        this.resident = resident;
        this.totalAmount = 1500.0;
        this.status = "PENDING";
        this.paymentDate = LocalDate.now();
    }
}

