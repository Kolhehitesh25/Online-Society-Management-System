package com.osms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.osms.custom_exception.ResourceNotFoundException;
import com.osms.dao.StaffDao;
import com.osms.dao.TaskDao;
import com.osms.dtos.ApiResponse;
import com.osms.dtos.GetTasksbyIdResponseDto;
import com.osms.dtos.StaffRegistrationReqDto;
import com.osms.dtos.TaskResponseDto;
import com.osms.pojos.Tasks;
import com.osms.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StaffServiceImple implements StaffService{

	@Autowired
	private StaffDao staffDao;
	
	@Autowired
	private TaskDao taskDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	 @Autowired
	    private PasswordEncoder passwordEncoder;  // Inject PasswordEncoder

	    @Override
	    public ApiResponse registerStaff(StaffRegistrationReqDto staffRegistrationDTO) {
	        
	        User transientStaff = modelMapper.map(staffRegistrationDTO, User.class);

	        // Encode the password before saving it
	        String encodedPassword = passwordEncoder.encode(staffRegistrationDTO.getPassword());
	        transientStaff.setPassword(encodedPassword);  // Set the encoded password

	        User persistedStaff = staffDao.save(transientStaff);

	        return new ApiResponse("Added new staff with ID: " + persistedStaff.getId());
	    }

	@Override
	public List<TaskResponseDto> getTasksForCleaners() {
		List<Tasks> tasks = taskDao.findTasksForCleaners();
        return tasks.stream().map(task -> {
            TaskResponseDto dto = modelMapper.map(task, TaskResponseDto.class);
            dto.setStaff(task.getStaff().getFullName());
            return dto;
        }).collect(Collectors.toList());
		
	}
	

	@Override
	public List<TaskResponseDto> getTasksForSecurity() {
		List<Tasks> tasks = taskDao.findTasksForSecurity();
        return tasks.stream().map(task -> {
            TaskResponseDto dto = modelMapper.map(task, TaskResponseDto.class);
            dto.setStaff(task.getStaff().getFullName());
            return dto;
        }).collect(Collectors.toList());	
	}

	
	@Override
	public ApiResponse updateTasksStatus(Long tasksId) {
		Tasks rs = taskDao.findById(tasksId).orElseThrow(()-> new ResourceNotFoundException("Invalid Id.."));
		rs.setStatus("completed");
		taskDao.save(rs);
		return new ApiResponse("Task Completed!");
    }

	@Override
	public List<TaskResponseDto> getAllTasks() {
		List<Tasks> tasks = taskDao.findAll();
		return tasks.stream().map(task -> {
            TaskResponseDto dto = modelMapper.map(task, TaskResponseDto.class);
            dto.setStaff(task.getStaff().getFullName());
            return dto;
        }).collect(Collectors.toList());	
	}

	@Override
	public List<GetTasksbyIdResponseDto> getTasksByAssignedUser(User user) {
	    List<Tasks> tasks = taskDao.findByAssignedTo(user);
	    return tasks.stream()
	            .map(task -> new GetTasksbyIdResponseDto(task.getDescription(), task.getStatus()))
	            .collect(Collectors.toList());
	}



	
//	@Override
//	public List<TaskResponseDto> getTaskbyId(Long staffId) {
//		List<Tasks> tasks = taskDao.findByAssignedTo_Id(staffId);
//        return tasks.stream()
//                    .map(task -> modelMapper.map(task, TaskResponseDto.class))
//                    .collect(Collectors.toList());
//	}

	
	}

