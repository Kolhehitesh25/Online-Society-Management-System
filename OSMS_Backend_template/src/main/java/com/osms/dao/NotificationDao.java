package com.osms.dao;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.osms.dtos.DisplayNotificationDto;
import com.osms.pojos.Notification;

public interface NotificationDao extends JpaRepository<Notification, Long> {

	@Query("SELECT new com.osms.dtos.DisplayNotificationDto(n.message, n.sentDateTime) " +
		       "FROM Notification n " +
		       "ORDER BY n.id DESC LIMIT 4")
		List<DisplayNotificationDto> findTop4Notifications();


	
	
}
