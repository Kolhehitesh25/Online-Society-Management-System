package com.osms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.osms.dtos.ApiResponse;
import com.osms.dtos.ComplaintDto;
import com.osms.dtos.ComplaintRespDto;
import com.osms.dtos.DisplayNotificationDto;
import com.osms.dtos.FacilityBookingDto;
import com.osms.dtos.PaymentUpdateRequestDto;
import com.osms.dtos.ResidentFacilityBookingDto;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.ResidentRegistrationReqDto;
import com.osms.service.ResidentService;


@RestController
@RequestMapping("/resident")
@CrossOrigin(origins="http://localhost:3000")
public class ResidentController {

	@Autowired
    private ResidentService residentService;

	@PostMapping("/register")
    public ResponseEntity<?> registerResident(@RequestBody ResidentRegistrationReqDto registrationDTO) {
        try {
        	return ResponseEntity.status(HttpStatus.CREATED)
                     .body(residentService.registerResident(registrationDTO));
        }
        catch(RuntimeException e) {
        	return ResponseEntity.status(HttpStatus.CONFLICT)
        			.body(new ApiResponse("email already exists"));
        }
    }
	
	@GetMapping("/display-notifications")
	public ResponseEntity<?> displayTop4Notifications(){
		List<DisplayNotificationDto> notificationList = residentService.displayTop4Notifications();
		if(notificationList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			for ( DisplayNotificationDto notificationRespDto : notificationList) {
				System.out.println(notificationRespDto);
			}
			return ResponseEntity.ok(notificationList);
		}
	}
	
	@GetMapping("/{residentId}")
	 public ResponseEntity<?> getResidentPayment(@PathVariable Long residentId){
		 try {
			 return ResponseEntity.ok(residentService.getResidentPayment(residentId));
					 
		 }
		 catch(RuntimeException e) {
			 return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		 }
	 }
	
	@PutMapping("/update-status")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody PaymentUpdateRequestDto requestDto) {
        try {
            ApiResponse response = residentService.updatePaymentStatus(requestDto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(e.getMessage()));
        }
    }
	
	@PostMapping("/facility-book")
	public ResponseEntity<ApiResponse> bookFacility(
	    @RequestParam Long residentId,  // Get residentId from the request parameter
	    @RequestBody FacilityBookingDto bookingDto) { 

	    // Instead of setting residentId into DTO, we pass it directly to the service
	    return ResponseEntity.ok(residentService.bookFacility(bookingDto, residentId));
	}

	 @PostMapping("/register-complaint")
	    public ResponseEntity<ApiResponse> registerComplaint(
	            @RequestParam Long residentId,
	            @RequestBody ComplaintDto complaintDto) {
	        //ComplaintDto complaint = residentService.registerComplaint(residentId, complaintDto);
		 return ResponseEntity.ok(residentService.registerComplaint(residentId,complaintDto));
	    }

	 @GetMapping("/all-complaints/{residentId}")
	    public ResponseEntity<List<ComplaintRespDto>> getAllComplaintsByResident(@PathVariable Long residentId) {
	        List<ComplaintRespDto> complaints = residentService.getComplaintsByResident(residentId);
	        return ResponseEntity.ok(complaints);
	    }
	 
	 @GetMapping("/all-facility-book/{residentId}")
	    public ResponseEntity<List<ResidentFacilityBookingDto>> getAllFacilityByResident(@PathVariable Long residentId) {
	        List<ResidentFacilityBookingDto> facility = residentService.getFacilityByResident(residentId);
	        return ResponseEntity.ok(facility);
	    }




	
	
	
	
}

