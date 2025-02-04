package com.osms.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "flats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Flat extends BaseEntity {

    
    @Column(name="flat_number", unique = true, nullable = false, length = 10)
    private String flatNumber;

    @OneToOne
    @JoinColumn(name = "resident_id")
    private User resident;  
}
