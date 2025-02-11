package com.osms.pojos;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    
    
	@Column(name="fullname",nullable=false,length=40)
    private String fullName;
	@Column(name="email",nullable=false,unique=true,length=40)
    private String email;
	@Column(name="mobileno",nullable=false,unique=true,length=10)
    private String mobileNo;
	@Column(name="password",nullable=false,length=255)
    private String password;
	@Enumerated(EnumType.STRING)
	@Column(length = 30) 
	
	private UserRole role;
	@OneToOne(mappedBy = "resident")
	
	private Flat flat;  
    private boolean status = true;

    
    private String passwordResetToken;

	
}
