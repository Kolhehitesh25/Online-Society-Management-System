package com.osms.dtos;

import com.osms.pojos.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class StaffDTO {

	 private Long id;
	   private String fullName;
	    private String mobileNo;
	    private String email;
	    private UserRole role;
	    private boolean status;
	    
	    public StaffDTO(Long id, String fullName, String mobileNo, String email, boolean status, UserRole role) {
	        this.id = id;
	        this.fullName = fullName;
	        this.mobileNo = mobileNo;
	        this.email = email;
	        this.status = status;
	        this.role = role;
	    }
	    
	    public UserRole getRole() {
	        return role;
	    }

	    public void setRole(UserRole role) {
	        this.role = role;
	    }

	
}
