package com.osms.service;

import com.osms.pojos.User;

public interface UserService {

	User findByEmail(String email);

}
