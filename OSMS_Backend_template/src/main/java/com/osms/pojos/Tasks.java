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
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Tasks extends BaseEntity{

   
    @Column(name="description", nullable=false, length=1000)
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User staff;  // Assigns task to a specific staff member
    
    private String status="pending";  // "PENDING" or "DONE"

    private LocalDate assignedDate=LocalDate.now(); 
    
    private LocalDate Duedate;
}

