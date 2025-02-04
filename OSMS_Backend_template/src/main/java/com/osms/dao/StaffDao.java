package com.osms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.osms.pojos.User;

public interface StaffDao extends JpaRepository<User, Long> {

}