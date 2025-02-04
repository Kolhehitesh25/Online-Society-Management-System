package com.osms.service;

import java.util.List;

import com.osms.dtos.ApiResponse;
import com.osms.dtos.AssignTaskDto;
import com.osms.dtos.FacilityBookingRespDto;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.SendNotificationDto;

public interface AdminService {

	ApiResponse sendNotification(SendNotificationDto sendNotificationDto);

	ApiResponse assignTask(AssignTaskDto assignTaskDTO, Long staffId);

	List<ResidentPaymentResponseDto> getAllResidentsWithPayments();

	List<FacilityBookingRespDto> getAllBookedFacilities();

	ApiResponse approveFacilityBooking(Long bookingId);

	ApiResponse rejectFacilityBooking(Long bookingId);

	ApiResponse deactivateResident(Long residentId);

	ApiResponse deactivateStaff(Long staffId);

	
	
}
