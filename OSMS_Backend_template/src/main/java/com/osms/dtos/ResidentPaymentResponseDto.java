package com.osms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResidentPaymentResponseDto {

	
	private Long residentId;
    private String fullName;
    private String email;
    private String mobileNo;
    private String paymentStatus;
    private double totalAmount;
}
