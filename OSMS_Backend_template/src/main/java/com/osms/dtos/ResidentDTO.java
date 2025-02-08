package com.osms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ResidentDTO {
      private Long id;
	   private String fullName;
	    private String flatNumber;
	    private String mobileNo;
	    private String email;
	    private boolean status;

}
