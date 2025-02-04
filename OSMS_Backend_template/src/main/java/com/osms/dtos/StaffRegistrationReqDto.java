package com.osms.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StaffRegistrationReqDto {

	private String fullName;
    private String email;
    private String password;
    private String mobileNo;
    private String role;
}
