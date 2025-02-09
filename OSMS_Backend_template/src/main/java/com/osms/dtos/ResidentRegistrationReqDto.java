package com.osms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResidentRegistrationReqDto {

	 private String fullName;
	    private String email;
	    private String mobileNo;
	    private String password;
	    private String flatNumber; 
	    private String role; 
}