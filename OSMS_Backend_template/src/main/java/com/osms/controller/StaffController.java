package com.osms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.osms.dtos.ApiResponse;
import com.osms.dtos.GetTasksbyIdResponseDto;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.ResidentRegistrationReqDto;
import com.osms.dtos.StaffRegistrationReqDto;
import com.osms.dtos.TaskResponseDto;
import com.osms.pojos.Tasks;
import com.osms.pojos.User;
import com.osms.service.StaffService;



@RestController
@RequestMapping("/staff")
public class StaffController {

	@Autowired
    private StaffService staffService;
	
	@PostMapping("/register")
    public ResponseEntity<?> registerStaff(@RequestBody StaffRegistrationReqDto staffRegistrationDTO) {
        try {
        	return ResponseEntity.status(HttpStatus.CREATED)
                     .body(staffService.registerStaff(staffRegistrationDTO));
        }
        catch(RuntimeException e) {
        	return ResponseEntity.status(HttpStatus.CONFLICT)
        			.body(new ApiResponse(e.getMessage()));
        }
    }
	
	@GetMapping("/cleaners-tasks")
    public ResponseEntity<List<TaskResponseDto>> getTasksForCleaners() {
        List<TaskResponseDto> tasks = staffService.getTasksForCleaners();
        return ResponseEntity.ok(tasks);
    }
	@GetMapping("/security-tasks")
    public ResponseEntity<List<TaskResponseDto>> getTasksForSecurity() {
        List<TaskResponseDto> tasks = staffService.getTasksForSecurity();
        return ResponseEntity.ok(tasks);
    }
	
	@PutMapping("/update-tasks/{tasksId}")
	 public ResponseEntity<?> updatePaymentStatus(@PathVariable Long tasksId){
		 try {
				return ResponseEntity.status(HttpStatus.OK)
						.body(staffService.updateTasksStatus(tasksId));
			}
			catch (RuntimeException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(new ApiResponse(e.getMessage()));
			}	 }
	
	
	@GetMapping("/staff-alltasks")
	public ResponseEntity<List<TaskResponseDto>> getAllTasks() {
        List<TaskResponseDto> tasks = staffService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }	
	
	 @GetMapping("/assigned/{userId}")
	    public List<GetTasksbyIdResponseDto> getTasksByUser(@PathVariable Long userId) {
	        User user = new User();  // Assuming User has a constructor with just an ID.
	        user.setId(userId);  
	        return staffService.getTasksByAssignedUser(user);
	}
}
