package com.osms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.osms.pojos.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // This method is automatically provided by JpaRepository
    Optional<User> findById(Long id);

    // Additional method to find user by email if needed
    Optional<User> findByEmail(String email);
}
