package com.osms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osms.custom_exception.ResourceNotFoundException;
import com.osms.dao.StaffDao;
import com.osms.dao.TaskDao;
import com.osms.dtos.ApiResponse;
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
	
	@Override
	public ApiResponse registerStaff(StaffRegistrationReqDto staffRegistrationDTO) {
		
		User transientStaff = modelMapper.map(staffRegistrationDTO, User.class);
		 User persistenResident = staffDao.save(transientStaff);
		 return new ApiResponse("Added new category with Id"+persistenResident.getId());	
		
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
	}

