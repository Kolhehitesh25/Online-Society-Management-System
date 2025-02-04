package com.osms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.osms.dtos.AdminLoginRequestDto;
import com.osms.dtos.AdminLoginResponseDto;
import com.osms.dtos.ApiResponse;
import com.osms.dtos.AssignTaskDto;
import com.osms.dtos.FacilityBookingRespDto;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.ResidentRegistrationReqDto;
import com.osms.dtos.SendNotificationDto;
import com.osms.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@PostMapping("/send-notification")
    public ResponseEntity<?> sendNotification(@RequestBody SendNotificationDto sendNotificationDto) {
        try {
        	return ResponseEntity.status(HttpStatus.CREATED)
                     .body(adminService.sendNotification(sendNotificationDto));
        }
        catch(RuntimeException e) {
        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        			.body(new ApiResponse(e.getMessage()));
        }
    }
	
	@PostMapping("/assign-task")
    public ResponseEntity<ApiResponse> assignTask(
            @RequestParam Long staffId, 
            @RequestBody AssignTaskDto assignTaskDTO) {  
        ApiResponse response = adminService.assignTask(assignTaskDTO, staffId);
        return ResponseEntity.ok(response);
    }
	
	@GetMapping("/residents-list")
    public ResponseEntity<List<ResidentPaymentResponseDto>> getResidentsWithPayments() {
        List<ResidentPaymentResponseDto> residents = adminService.getAllResidentsWithPayments();
        return ResponseEntity.ok(residents);
    }
	
	@GetMapping("/all-bookings")
	public ResponseEntity<List<FacilityBookingRespDto>> getAllFacilityBookings() {
	    List<FacilityBookingRespDto> bookings = adminService.getAllBookedFacilities();
	    return ResponseEntity.ok(bookings);
	}
	
	@PutMapping("/approve/{bookingId}")
    public ResponseEntity<?> approveBooking(@PathVariable Long bookingId) {
        try {
            adminService.approveFacilityBooking(bookingId);
            return ResponseEntity.ok(new ApiResponse("Facility booking approved successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
        }
    }
	@PutMapping("/reject/{bookingId}")
    public ResponseEntity<?> rejectBooking(@PathVariable Long bookingId) {
        try {
            adminService.rejectFacilityBooking(bookingId);
            return ResponseEntity.ok(new ApiResponse("Facility booking Rejected."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
        }
    }
	
	 @PutMapping("/deactivate/{residentId}")
	    public ResponseEntity<ApiResponse> deactivateResident(@PathVariable Long residentId) {
	        try {
	            ApiResponse response = adminService.deactivateResident(residentId);
	            return ResponseEntity.ok(response);
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body(new ApiResponse(e.getMessage()));
	        }
	    }
	 @PutMapping("/deactivate/staff/{staffId}")
	    public ResponseEntity<ApiResponse> deactivateStaff(@PathVariable Long staffId) {
	        try {
	            ApiResponse response = adminService.deactivateStaff(staffId);
	            return ResponseEntity.ok(response);
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body(new ApiResponse(e.getMessage()));
	        }
	    }
	 @PostMapping("/login")
	    public ResponseEntity<AdminLoginResponseDto> login(@RequestBody AdminLoginRequestDto loginDto) {
	        AdminLoginResponseDto response = adminService.loginAdmin(loginDto);
	        return ResponseEntity.ok(response);
	    }
}

