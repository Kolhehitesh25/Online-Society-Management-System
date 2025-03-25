package com.osms.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.osms.dao.ComplaintDao;
import com.osms.dao.FacilityBookingDao;
import com.osms.dao.NotificationDao;
import com.osms.dao.PaymentDao;
import com.osms.dao.TaskDao;
import com.osms.dao.UserDao;
import com.osms.dtos.AdminLoginRequestDto;
import com.osms.dtos.AdminLoginResponseDto;
import com.osms.dtos.ApiResponse;
import com.osms.dtos.AssignTaskDto;
import com.osms.dtos.ComplaintRespDto;
import com.osms.dtos.FacilityBookingRespDto;
import com.osms.dtos.ResidentDTO;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.SendNotificationDto;
import com.osms.dtos.StaffDTO;
import com.osms.pojos.Complaint;
import com.osms.pojos.FacilityBooking;
import com.osms.pojos.Notification;
import com.osms.pojos.Payment;
import com.osms.pojos.Tasks;
import com.osms.pojos.User;
import com.osms.pojos.UserRole;

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
	private ComplaintDao complaintDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ApiResponse sendNotification(SendNotificationDto sendNotificationDto) {

		Notification transientNotification = modelMapper.map(sendNotificationDto, Notification.class);
		Notification persistenNotification = notificationDao.save(transientNotification);
		return new ApiResponse("Added new notification with Id" + persistenNotification.getId());
	}

	

	@Override
	public List<ResidentPaymentResponseDto> getAllResidentsWithPayments() {
		List<User> residents = userDao.findByRole(UserRole.RESIDENT); // Fetch all residents

		
		return residents.stream().map(resident -> {
			Optional<Payment> paymentOpt = paymentDao.findByResident(resident);
			Payment payment = paymentOpt.orElse(new Payment(resident));

			return new ResidentPaymentResponseDto(resident.getId(), resident.getFullName(), resident.getEmail(),
					resident.getMobileNo(), payment.getStatus(), payment.getTotalAmount());
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

			// Fix: Remove null parameter from getRole()
			if (resident.getRole() == UserRole.RESIDENT) {
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

			// Fix: Compare with Enum values instead of using equalsIgnoreCase()
			if (staff.getRole() == UserRole.CLEANER || staff.getRole() == UserRole.SECURITY) {
				staff.setStatus(false);
				userDao.save(staff);
				return new ApiResponse("Staff with ID " + staffId + " has been deactivated successfully.");
			} else {
				return new ApiResponse("User is not a staff.");
			}
		} else {
			return new ApiResponse("Staff not found.");
		}
	}

	@Override
	public AdminLoginResponseDto loginAdmin(AdminLoginRequestDto loginDto) {
		Optional<User> admin = userDao.findByEmailAndPasswordAndRole(loginDto.getEmail(), loginDto.getPassword(),
				UserRole.ADMIN); // Fix here

		if (admin.isPresent()) {
			return new AdminLoginResponseDto("Login Successful!", "token-123"); // JWT can be added later
		} else {
			throw new RuntimeException("Invalid credentials or not an admin!");
		}
	}

	@Override
	public List<ResidentDTO> getResidents() {

		return userDao.getAllResidents();

	}

	@Override
	public ApiResponse activateResident(Long residentId) {
		Optional<User> residentOpt = userDao.findById(residentId);

		if (residentOpt.isPresent()) {
			User resident = residentOpt.get();

			if (resident.getRole() == UserRole.RESIDENT) {
				resident.setStatus(true); // Set status to active
				userDao.save(resident);
				return new ApiResponse("Resident with ID " + residentId + " has been activated successfully.");
			} else {
				return new ApiResponse("User is not a resident.");
			}
		} else {
			return new ApiResponse("Resident not found.");
		}
	}

	@Override
	public List<StaffDTO> getStaff() {

		return userDao.getAllStaff();
	}

	@Override
	public ApiResponse activateStaff(Long staffId) {
		Optional<User> staffOpt = userDao.findById(staffId);

		if (staffOpt.isPresent()) {
			User staff = staffOpt.get();

			if (staff.getRole() == UserRole.CLEANER || staff.getRole() == UserRole.SECURITY) {
				staff.setStatus(true); // Set status to active
				userDao.save(staff);
				return new ApiResponse("Staff with ID " + staffId + " has been activated successfully.");
			} else {
				return new ApiResponse("User is not Staff.");
			}
		} else {
			return new ApiResponse("Staff not found.");
		}
	}

	@Override
	public Map<String, Long> getUserStats() {
	    long residentCount = userDao.countByRole(UserRole.RESIDENT);
	    long cleanerCount = userDao.countByRole(UserRole.CLEANER);
	    long securityCount = userDao.countByRole(UserRole.SECURITY);
	    long totalCount = residentCount + securityCount + cleanerCount;

	    
	    // Count tasks based on status
	    long pendingTasks = taskDao.countByStatus("pending");
	    long completedTasks = taskDao.countByStatus("completed");

	    // Debug log after querying tasks
	    System.out.println("Pending Tasks: " + pendingTasks);
	    System.out.println("Completed Tasks: " + completedTasks);

	    // Return the count data as a map
	    Map<String, Long> stats = new HashMap<>();
	    stats.put("residentCount", residentCount);
	    stats.put("cleanerCount", cleanerCount);
	    stats.put("securityCount", securityCount);
	    stats.put("totalCount", totalCount);
	    stats.put("pendingTasks", pendingTasks);
	    stats.put("completedTasks", completedTasks);

	    return stats;
	}

	@Override
	public List<ComplaintRespDto> getAllComplaints() {
		return complaintDao.findAllComplaints();
	}

	@Override
	public ApiResponse resolvedComplaint(Long complaintId) {
		Optional<Complaint> optionalComplaint = complaintDao.findById(complaintId);

		if (optionalComplaint.isPresent()) {
			Complaint complaint = optionalComplaint.get();

			if ("Pending".equals(complaint.getStatus())) {
				complaint.setStatus("Resolved");
				complaintDao.save(complaint);
				return new ApiResponse("Complaint Resolved successfully.");
			} else {
				return new ApiResponse("Complaint is already Resolved or cancelled.");
			}
		} else {
			return new ApiResponse("Complaint not found.");
		}
	}

	@Override
	public ApiResponse assignTask(Long staffId, AssignTaskDto assignTaskDTO) {
		Optional<User> staffOpt = userDao.findById(staffId);

		if (staffOpt.isEmpty()) {
			return new ApiResponse("Staff member not found!");
		}

		User staff = staffOpt.get();

		if (staff.getRole() != UserRole.CLEANER && staff.getRole() != UserRole.SECURITY) {
			return new ApiResponse("Invalid staff role! Only Cleaner or Security can be assigned tasks.");
		}

		Tasks task = new Tasks();
		task.setDescription(assignTaskDTO.getDescription());
		task.setDuedate(assignTaskDTO.getDueDate());;
		task.setStaff(staff);
		taskDao.save(task);

		return new ApiResponse("Task successfully assigned to staff.");
	}

	
	

}
