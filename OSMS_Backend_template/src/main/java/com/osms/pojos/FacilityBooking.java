package com.osms.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "facility_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FacilityBooking extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String facilityName;  
    
    @ManyToOne
    @JoinColumn(name = "resident_id")
    private User resident;
    @Column(name="from_date_time")
    private LocalDate fromDateTime;
    @Column(name="to_date_time")
    private LocalDate toDateTime;
    @Column(name="status")
    private String status="Requested";  
}
