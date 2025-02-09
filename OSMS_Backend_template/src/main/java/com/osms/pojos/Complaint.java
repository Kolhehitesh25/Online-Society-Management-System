package com.osms.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Complaint extends BaseEntity {

	@Column(name="description",nullable = false,length=1000)
	private String description;

	private LocalDate sentDateTime = LocalDate.now();

	@ManyToOne
	@JoinColumn(name = "resident_id")
	private User resident;
	
	 @Column(name="status")
	    private String status="Pending";
}
