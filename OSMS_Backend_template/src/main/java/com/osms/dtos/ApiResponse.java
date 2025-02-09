package com.osms.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApiResponse {

	private LocalDateTime timeStamp;
	private String message;
    public ApiResponse(String message) {
    	super();
    	this.timeStamp=timeStamp;
    	this.message=message;
    }
}

