package com.osms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.osms.dao.FacilityBookingDao;
import com.osms.dao.NotificationDao;
import com.osms.dao.PaymentDao;
import com.osms.dao.TaskDao;
import com.osms.dao.UserDao;
import com.osms.dtos.ApiResponse;
import com.osms.dtos.AssignTaskDto;
import com.osms.dtos.FacilityBookingRespDto;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.SendNotificationDto;
import com.osms.pojos.FacilityBooking;
import com.osms.pojos.Notification;
import com.osms.pojos.Payment;
import com.osms.pojos.Tasks;
import com.osms.pojos.User;

@Service
@Transactional
public class AdminServiceImple implements AdminService {

	@Autowired
	private NotificationDao notificationDao;
	
	@Autowired
	private TaskDao taskDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PaymentDao paymentDao;
	
	@Autowired
	private FacilityBookingDao facilityBookingDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@Override
	public ApiResponse sendNotification(SendNotificationDto sendNotificationDto) {
		
		Notification transientNotification = modelMapper.map(sendNotificationDto, Notification.class);
		 Notification persistenNotification = notificationDao.save(transientNotification);
		 return new ApiResponse("Added new category with Id"+persistenNotification.getId());	
	}

	@Override
	public ApiResponse assignTask(AssignTaskDto assignTaskDTO, Long staffId) {
		
        Optional<User> staffOpt=userDao.findById(staffId);; 
        
        if (staffOpt.isEmpty()) {
            return new ApiResponse("Staff member not found!");
        }

        User staff = staffOpt.get();

        if (!staff.getRole().equalsIgnoreCase("cleaner") && !staff.getRole().equalsIgnoreCase("security")) {
            return new ApiResponse("Invalid staff role! Only Cleaner or Security can be assigned tasks.");
        }
        Tasks task = new Tasks();
        task.setDescription(assignTaskDTO.getDescription());
        task.setStaff(staff);
        taskDao.save(task);
        return new ApiResponse("Task successfully assigned to staff.");

       
	}

	@Override
	public List<ResidentPaymentResponseDto> getAllResidentsWithPayments() {
		List<User> residents = userDao.findByRole("resident"); // Fetch all residents

        return residents.stream().map(resident -> {
            Optional<Payment> paymentOpt = paymentDao.findByResident(resident);
            Payment payment = paymentOpt.orElse(new Payment(resident));  

            return new ResidentPaymentResponseDto(
                resident.getId(),
                resident.getFullName(),
                resident.getEmail(),
                resident.getMobileNo(),
                payment.getStatus(),    
                payment.getTotalAmount() 
            );
        }).collect(Collectors.toList());
    }

	@Override
	public List<FacilityBookingRespDto> getAllBookedFacilities() {
		return facilityBookingDao.findAllBookedFacilities();
	}

	@Override
	public ApiResponse approveFacilityBooking(Long bookingId) {
		
		Optional<FacilityBooking> optionalBooking = facilityBookingDao.findById(bookingId);

		if (optionalBooking.isPresent()) {
		    FacilityBooking booking = optionalBooking.get();
		    
		    if ("Requested".equals(booking.getStatus())) {
		        booking.setStatus("Approved");
		        facilityBookingDao.save(booking);
		        return new ApiResponse("Facility booking approved successfully.");
		    } else {
		        return new ApiResponse("Booking is already processed or cancelled.");
		    }
		} else {
		    return new ApiResponse("Booking not found.");
		}
	}

	@Override
	public ApiResponse rejectFacilityBooking(Long bookingId) {
		Optional<FacilityBooking> optionalBooking = facilityBookingDao.findById(bookingId);

		if (optionalBooking.isPresent()) {
		    FacilityBooking booking = optionalBooking.get();
		    
		    if ("Requested".equals(booking.getStatus())) {
		        booking.setStatus("Rejected");
		        facilityBookingDao.save(booking);
		        return new ApiResponse("Facility booking Rejected.");
		    } else {
		        return new ApiResponse("Booking is already processed or cancelled.");
		    }
		} else {
		    return new ApiResponse("Booking not found.");
		}
	}

	@Override
	public ApiResponse deactivateResident(Long residentId) {
     Optional<User> residentOpt = userDao.findById(residentId);
        
        if (residentOpt.isPresent()) {
            User resident = residentOpt.get();
            
            if ("Resident".equalsIgnoreCase(resident.getRole())) {
                resident.setStatus(false);
                userDao.save(resident);
                return new ApiResponse("Resident with ID " + residentId + " has been deactivated successfully.");
            } else {
                return new ApiResponse("User is not a resident.");
            }
        } else {
            return new ApiResponse("Resident not found.");
        }
	}

	@Override
	public ApiResponse deactivateStaff(Long staffId) {
Optional<User> staffOpt = userDao.findById(staffId);
        
        if (staffOpt.isPresent()) {
            User staff = staffOpt.get();
            
            if ("Cleaner".equalsIgnoreCase(staff.getRole()) || "Security".equalsIgnoreCase(staff.getRole())) {
                staff.setStatus(false);
                userDao.save(staff);
                return new ApiResponse("Staff with ID " + staffId + " has been deactivated successfully.");
            } else {
                return new ApiResponse("User is not a Staff.");
            }
        } else {
            return new ApiResponse("Staff not found.");
        }
	}

	
		
	}

