package com.osms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.osms.pojos.Tasks;


public interface TaskDao extends JpaRepository<Tasks, Long> {
  
	 @Query("SELECT t FROM Tasks t WHERE t.staff.role = 'Cleaner'")
	    List<Tasks> findTasksForCleaners();
	 
	 @Query("SELECT t FROM Tasks t WHERE t.staff.role = 'security'")
	    List<Tasks> findTasksForSecurity();

	List<Tasks> findByStatus(String string);
}
