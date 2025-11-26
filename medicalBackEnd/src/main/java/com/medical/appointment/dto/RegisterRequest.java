package com.medical.appointment.dto;

import com.medical.appointment.entity.Role;

import lombok.Data;
@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
    private Integer age;
    private String gender;
    private String contactNumber;
    private String speciality;
    private String address;
    private String city;
}
