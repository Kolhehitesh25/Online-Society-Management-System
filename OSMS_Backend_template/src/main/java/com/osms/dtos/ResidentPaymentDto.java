package com.osms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResidentPaymentDto {

	 private String fullName;
	 private String email;
	 private String status;
	 private double totalAmount;
	
}

