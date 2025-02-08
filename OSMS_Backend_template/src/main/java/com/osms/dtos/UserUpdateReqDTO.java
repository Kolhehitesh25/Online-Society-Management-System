package com.osms.dtos;

import com.osms.pojos.Flat;
import com.osms.pojos.UserRole;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserUpdateReqDTO {
//	private Long id;
	private String fullName;
	private String email;
	private String mobileNo;

}
