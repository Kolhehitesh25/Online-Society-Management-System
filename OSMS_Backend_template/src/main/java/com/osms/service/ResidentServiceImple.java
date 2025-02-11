package com.osms.service;


import com.osms.dtos.ApiResponse;
import com.osms.dtos.ComplaintDto;
import com.osms.dtos.ComplaintRespDto;
import com.osms.dtos.DisplayNotificationDto;
import com.osms.dtos.FacilityBookingDto;
import com.osms.dtos.PaymentUpdateRequestDto;
import com.osms.dtos.ResidentFacilityBookingDto;
import com.osms.dtos.ResidentPaymentDto;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.ResidentRegistrationReqDto;
import com.osms.pojos.Complaint;
import com.osms.pojos.FacilityBooking;
import com.osms.pojos.Flat;
import com.osms.pojos.Payment;
import com.osms.pojos.User;
import com.osms.custom_exception.ResourceNotFoundException;
import com.osms.dao.ComplaintDao;
import com.osms.dao.FacilityBookingDao;
import com.osms.dao.FlatDao;
import com.osms.dao.NotificationDao;
import com.osms.dao.PaymentDao;
import com.osms.dao.UserDao;
import com.osms.service.ResidentService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ResidentServiceImple implements ResidentService {

    @Autowired
    private UserDao userDao;
    
    @Autowired
    private FlatDao flatDao;
    
    @Autowired
    private NotificationDao notificationDao;
    
    @Autowired
    private PaymentDao paymentDao;
    
    @Autowired
    private FacilityBookingDao facilityBookingDao;
    
    @Autowired
    private ComplaintDao complaintDao;
    @Autowired
	private ModelMapper modelMapper;
	
    @Autowired 
    private PasswordEncoder passwordEncoder;

    @Override
    public ApiResponse registerResident(ResidentRegistrationReqDto registrationDTO) {
       
        User transientResident = modelMapper.map(registrationDTO, User.class);

        // Encode the password before saving it
        String encodedPassword = passwordEncoder.encode(registrationDTO.getPassword());
        transientResident.setPassword(encodedPassword);  // Set the encoded password

        // Create and persist flat
        Flat flat = new Flat();
        flat.setFlatNumber(registrationDTO.getFlatNumber());
        flat.setResident(transientResident);
        Flat persistedFlat = flatDao.save(flat);  // Save Flat first

        // Set the flat in the resident entity
        transientResident.setFlat(persistedFlat);

        // Create and save payment record
        Payment newPayment = new Payment();
        newPayment.setResident(transientResident);
        newPayment.setStatus("PENDING");
        newPayment.setTotalAmount(1500.0);
        newPayment.setPaymentDate(LocalDate.now());

        paymentDao.save(newPayment);

       
        User persistedResident = userDao.save(transientResident);

        return new ApiResponse("Registered new resident with ID: " + persistedResident.getId());
    }



	@Override
	public List<DisplayNotificationDto> displayTop4Notifications() {
		
		   return notificationDao.findTop4Notifications().stream().map(notification->modelMapper.map(notification, DisplayNotificationDto.class))
				.collect(Collectors.toList());
	}



	@Override
	public List<ResidentPaymentResponseDto> getAllResidentsWithPayment() {
		// TODO Auto-generated method stub
		return null;
	}



	@Override
	public ResidentPaymentDto getResidentPayment(Long residentId) {
		
		return userDao.getResidentPaymentDetails(residentId);
	}



	@Override
	public ApiResponse updatePaymentStatus(PaymentUpdateRequestDto requestDto) {
	    Long residentId = requestDto.getResidentId();
	    
	    // Fetch the payment using Optional
	    Optional<Payment> optionalPayment = paymentDao.findByResidentId(residentId);

	    // Check if the payment exists
	    if (optionalPayment.isPresent()) {
	        Payment payment = optionalPayment.get(); // Retrieve the Payment object
	        payment.setStatus("PAID"); 
	        paymentDao.save(payment); 

	        return new ApiResponse("Payment status updated successfully for Resident ID: " + residentId);
	    } else {
	        return new ApiResponse("Payment record not found for resident ID: " + residentId);
	    }
	}



	@Override
	public ApiResponse bookFacility(FacilityBookingDto bookingDto, Long residentId) {
		 User resident = userDao.findById(residentId)
		            .orElseThrow(() -> new RuntimeException("Resident not found"));

		    // Create a new facility booking
		    FacilityBooking facility = new FacilityBooking();
		    facility.setFacilityName(bookingDto.getFacilityName());
		    facility.setFromDateTime(bookingDto.getFromDateTime());
		    facility.setToDateTime(bookingDto.getToDateTime());
		    facility.setStatus("Requested");
		    facility.setResident(resident); // Associate the facility with the resident

		    // Save the facility booking
		    facilityBookingDao.save(facility);

		    return new ApiResponse("Facility booked successfully!");
	
	}



	@Override
	public ApiResponse registerComplaint(Long residentId, ComplaintDto complaintDto) {
		 User resident = userDao.findById(residentId)
	                .orElseThrow(() -> new RuntimeException("Resident not found!"));

	        Complaint complaint = new Complaint();
	        complaint.setDescription(complaintDto.getMessage());
	        complaint.setResident(resident);
	        
	        Complaint savedComplaint = complaintDao.save(complaint);

	        return new ApiResponse("Complaint added successfully");
	        
	}



	@Override
	public List<ComplaintRespDto> getComplaintsByResident(Long residentId) {
		 List<ComplaintRespDto> complaints = complaintDao.findByResidentId(residentId);

	        return complaints.stream().map(complaint -> new ComplaintRespDto(
	                complaint.getId(),
	                complaint.getMessage(),
	                complaint.getStatus(),
	                complaint.getFullName(),
	                complaint.getSentDateTime()
	                
	        )).collect(Collectors.toList());
	}



	@Override
	public List<ResidentFacilityBookingDto> getFacilityByResident(Long residentId) {
		 List<ResidentFacilityBookingDto> facilities = facilityBookingDao.findByResidentId(residentId);

	        return facilities.stream().map(facility -> new ResidentFacilityBookingDto(
	                facility.getId(),
	                facility.getFacilityName(),
	                facility.getFromDateTime(),
	                facility.getToDateTime(),
	                facility.getStatus()
	                
	        )).collect(Collectors.toList());
	}



	

	}



	


