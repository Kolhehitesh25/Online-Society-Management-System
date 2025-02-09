package com.osms.service;

import java.util.List;

import com.osms.dtos.ApiResponse;
import com.osms.dtos.GetTasksbyIdResponseDto;
import com.osms.dtos.StaffRegistrationReqDto;
import com.osms.dtos.TaskResponseDto;
import com.osms.pojos.Tasks;
import com.osms.pojos.User;

public interface StaffService {

	ApiResponse registerStaff(StaffRegistrationReqDto staffRegistrationDTO);

	List<TaskResponseDto> getTasksForCleaners();

	List<TaskResponseDto> getTasksForSecurity();

	ApiResponse updateTasksStatus(Long tasksId);

	List<TaskResponseDto> getAllTasks();

	
//	List<TaskResponseDto> getTaskbyId(Long staffId);

	List<GetTasksbyIdResponseDto> getTasksByAssignedUser(User user);

	
}