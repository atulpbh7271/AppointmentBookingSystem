package com.medical.appointment.dto;

import lombok.Data;
@Data

public class UpdateUserRequest {
	private String name;
    private Integer age;
    private String gender;
    private String contactNumber;
    private String address;
    private String city;
    private String speciality;

}
