package com.osms.dtos;

import com.osms.pojos.Flat;
import com.osms.pojos.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString

public class UserDTO {
    private String fullName;
    private String email;
    private String mobileNo;
    private String password;
	private UserRole role;
	private Flat flat;  
    private boolean status = true; 
}
