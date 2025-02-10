//package com.osms.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//
//import com.osms.dtos.AuthRequest;
//import com.osms.dtos.AuthResp;
//import com.osms.dtos.JwtResponse;
//import com.osms.pojos.User;
//
//
//import io.swagger.v3.oas.annotations.Operation;
//import jakarta.validation.Valid;
//
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthenticationController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private CustomUserDetailsServiceImpl userService;
//    @Autowired
//    private JwtUtils jwtUtil;
//
//    
//   	@PostMapping("/signin")
//   	@Operation(description = "User sign in")
//   	public ResponseEntity<?> userSignIn(@RequestBody @Valid
//   			AuthRequest dto) {
//   		System.out.println("in sign in "+dto);
//   		//1. Create auth token using suser supplied em n pwd
//   		UsernamePasswordAuthenticationToken 
//   		authenticationToken = new UsernamePasswordAuthenticationToken
//   		(dto.getEmail(),dto.getPassword());
//   		System.out.println(authenticationToken.isAuthenticated());//f
//   		//2. invoke Spring sec supplied auth mgr's authenticate method
//   		Authentication authToken = 
//   				authenticationManager.authenticate(authenticationToken);
//   		//=> auth success
//   		System.out.println(authToken.isAuthenticated());//t
//   		//3 . Send auth respone to the client containing JWTS
//   		return ResponseEntity.status(HttpStatus.CREATED)
//   				.body(new AuthResp("Successful Auth !",
//   						jwtUtil.generateJwtToken(authToken)));		
//   		
//   	}
//}
