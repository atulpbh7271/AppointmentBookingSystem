package com.medical.appointment.dto;

import com.medical.appointment.entity.Role;

import lombok.Data;

@Data

public class UserResponse {
	 private Long id;
	    private String name;
	    private Integer age;
	    private String gender;
	    private String contactNumber;
	    private String email;
	    private String address;
	    private Role role;
	    private String city;
	    private String speciality;

}
