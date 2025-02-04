package com.osms.pojos;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification extends BaseEntity{

   

	@Column(name="message",nullable = false,length=1000)
    private String message;
    
    private LocalDate sentDateTime=LocalDate.now(); // Timestamp of notification

    private boolean sentToAllResidents = true; // Always true
}

