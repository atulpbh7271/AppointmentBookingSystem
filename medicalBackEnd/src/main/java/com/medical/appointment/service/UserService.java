package com.medical.appointment.service;

import java.util.List;
import java.util.Optional;

import com.medical.appointment.dto.UpdateUserRequest;
import com.medical.appointment.dto.UserResponse;
import com.medical.appointment.entity.User;

public interface UserService {

    Optional<User> getUserById(Long id);

    List<User> getAllUsers();

    UserResponse updateUser(Long id, UpdateUserRequest req);

    void deleteUser(Long id);
}
