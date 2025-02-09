package com.osms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.osms.pojos.Tasks;
import com.osms.pojos.User;


public interface TaskDao extends JpaRepository<Tasks, Long> {
  
	 @Query("SELECT t FROM Tasks t WHERE t.staff.role = 'Cleaner'")
	    List<Tasks> findTasksForCleaners();
	 
	 @Query("SELECT t FROM Tasks t WHERE t.staff.role = 'security'")
	    List<Tasks> findTasksForSecurity();

	List<Tasks> findByStatus(String string);


	@Query("SELECT t FROM Tasks t WHERE t.staff = :user")
    List<Tasks> findByAssignedTo(@Param("user") User user);
}
