package com.medical.appointment.dto;


import com.medical.appointment.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {

	private String token;
    private String tokenType = "Bearer";
    private Long userId;
    private Role role;
}
