package com.osms.service;

import java.util.List;
import java.util.Map;

import com.osms.dtos.AdminLoginRequestDto;
import com.osms.dtos.AdminLoginResponseDto;
import com.osms.dtos.ApiResponse;
import com.osms.dtos.AssignTaskDto;
import com.osms.dtos.FacilityBookingRespDto;
import com.osms.dtos.ResidentDTO;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.SendNotificationDto;
import com.osms.dtos.StaffDTO;

public interface AdminService {

	ApiResponse sendNotification(SendNotificationDto sendNotificationDto);

	ApiResponse assignTask(AssignTaskDto assignTaskDTO, Long staffId);

	List<ResidentPaymentResponseDto> getAllResidentsWithPayments();

	List<FacilityBookingRespDto> getAllBookedFacilities();

	ApiResponse approveFacilityBooking(Long bookingId);

	ApiResponse rejectFacilityBooking(Long bookingId);

	ApiResponse deactivateResident(Long residentId);

	ApiResponse deactivateStaff(Long staffId);

	AdminLoginResponseDto loginAdmin(AdminLoginRequestDto loginDto);

	List<ResidentDTO> getResidents();

	ApiResponse activateResident(Long residentId);

	List<StaffDTO> getStaff();

	ApiResponse activateStaff(Long staffId);

	Map<String, Long> getUserStats();



	

	
	
}
