package com.osms.service;

import java.util.List;

import com.osms.dtos.ApiResponse;
import com.osms.dtos.DisplayNotificationDto;
import com.osms.dtos.FacilityBookingDto;
import com.osms.dtos.PaymentUpdateRequestDto;
import com.osms.dtos.ResidentPaymentDto;
import com.osms.dtos.ResidentPaymentResponseDto;
import com.osms.dtos.ResidentRegistrationReqDto;

public interface ResidentService {

   ApiResponse registerResident(ResidentRegistrationReqDto registrationDTO);

   List<DisplayNotificationDto> displayTop4Notifications();

   List<ResidentPaymentResponseDto> getAllResidentsWithPayment();

   ResidentPaymentDto getResidentPayment(Long residentId);

    
    ApiResponse updatePaymentStatus(PaymentUpdateRequestDto requestDto);

	ApiResponse bookFacility(FacilityBookingDto bookingDto);

	
}