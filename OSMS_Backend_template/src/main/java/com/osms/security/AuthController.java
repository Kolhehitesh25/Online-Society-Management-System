package com.osms.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.osms.dtos.ApiResponse;
import com.osms.pojos.User;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetailsImpl userDetails = (CustomUserDetailsImpl) authentication.getPrincipal();
        User user = userDetails.getUserEntity();

        Map<String, Object> response = Map.of(
        	    "token", jwt,
        	    "user", Map.of(
        	        "id", user.getId() != null ? user.getId() : "Unknown", //we handle null safety here as nullpointerExceptionOccur
        	       "email",user.getEmail()!=null ? user.getEmail() :"unknown",
        	        "fullName", user.getFullName() != null ? user.getFullName() : "Unknown", 
        	        "mobileNo", user.getMobileNo() != null ? user.getMobileNo() : "Unknown", 
        	        "role", user.getRole() != null ? user.getRole().name() : "Unknown", 
        	        "flatNumber", user.getFlat() != null && user.getFlat().getFlatNumber() != null ? user.getFlat().getFlatNumber() : "Unknown" // Handle null safely
        	    )
        	);

        return ResponseEntity.ok(response);
    }

    
//    catch (BadCredentialsException ex) {
//        // Handle the case where credentials are incorrect
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//            .body(new ApiResponse("Invalid email or password"));
//    } catch (Exception ex) {
//        // Handle other unexpected exceptions
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//            .body(new ApiResponse("An error occurred during authentication"));
//    }
}

