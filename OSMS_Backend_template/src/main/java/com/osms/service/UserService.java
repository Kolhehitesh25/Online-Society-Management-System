package com.osms.service;

import com.osms.pojos.User;

import jakarta.transaction.Transactional;

import com.osms.dao.UserDao;
import com.osms.dtos.UserDTO;
import com.osms.dtos.UserUpdateReqDTO;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Find user by email
    public User findUserByEmail(String email) {
        
        Optional<User> userOptional = userDao.findByEmail(email);
        return userOptional.orElse(null);
    }
   
    	
    // Save the password reset token in the database
    public void savePasswordResetToken(User user, String token) {
        user.setPasswordResetToken(token); 
        userDao.save(user);
    }

    // Find user by the reset token
    public User findUserByResetToken(String token) {
    	 Optional<User>userOptional=userDao.findByPasswordResetToken(token);
         return userOptional.orElse(null);// This method should be in UserDao
    }

    // Update the user's password and clear the reset token
    public void updatePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword)); // Encrypt password
        user.setPasswordResetToken(null); // Remove the reset token after password is updated
      
        userDao.save(user);
    }


	public UserUpdateReqDTO getUserById(Long id) {
		 User user = userDao.findById(id)
	                .orElseThrow(() -> new RuntimeException("User not found"));
	        
	        UserUpdateReqDTO userupdate = new UserUpdateReqDTO();
	        userupdate.setFullName(user.getFullName());
	        userupdate.setEmail(user.getEmail());
	        userupdate.setMobileNo(user.getMobileNo());
	        
	        return userupdate;
	}


	public void updateUser(Long id, UserUpdateReqDTO updateUserDTO) {
		// TODO Auto-generated method stub
		 User user = userDao.findById(id)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        if (updateUserDTO.getFullName() != null) {
	            user.setFullName(updateUserDTO.getFullName());
	        }
	        if (updateUserDTO.getEmail() != null) {
	            user.setEmail(updateUserDTO.getEmail());
	        }
	        if (updateUserDTO.getMobileNo() != null) {
	            user.setMobileNo(updateUserDTO.getMobileNo());
	        }

	        userDao.save(user);
	}


	
}
    
  




