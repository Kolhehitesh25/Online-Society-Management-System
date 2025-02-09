package com.osms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.osms.pojos.Flat;

public interface FlatDao extends JpaRepository<Flat, Long> {

}
