//package com.osms.security;
//
//import java.util.Collection;
//import java.util.List;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//
//import com.osms.pojos.User;
//
//public class CustomUserDetailsImpl implements UserDetails {
//	private User userEntity;
//	
//
//	public CustomUserDetailsImpl(User userEntity) {
//		super();
//		this.userEntity = userEntity;
//	}
//
//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//	    // Assuming userEntity.getRole() returns a String representing the role
//	    return List.of(new SimpleGrantedAuthority("ROLE_"+userEntity.getRole()));
//	}
//
//	@Override
//	public String getPassword() {
//		// TODO Auto-generated method stub
//		return userEntity.getPassword();
//	}
//
//	@Override
//	public String getUsername() {
//		// TODO Auto-generated method stub
//		return userEntity.getEmail();
//	}
//
//	public User getUserEntity() {
//		return userEntity;
//	}
//	
//
//}
