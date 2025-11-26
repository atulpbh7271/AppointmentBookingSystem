package com.medical.appointment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.medical.appointment.dto.UpdateUserRequest;
import com.medical.appointment.dto.UserResponse;
import com.medical.appointment.entity.User;
import com.medical.appointment.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserResponse updateUser(Long id, UpdateUserRequest req) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        // map fields from request to entity (only update allowed fields)
        if (req.getName() != null) {
            user.setName(req.getName());
        }
        if (req.getCity() != null) {
            user.setCity(req.getCity());
        }
        if (req.getContactNumber() != null) {
            user.setContactNumber(req.getContactNumber());
        }
        if (req.getAddress() != null) {
            user.setAddress(req.getAddress());
        }
        if (req.getAge() != null) {
            user.setAge(req.getAge());
        }
        if (req.getGender() != null) {
            user.setGender(req.getGender());
        }
        if (req.getSpeciality() != null) {
            user.setSpeciality(req.getSpeciality());
        }

        User saved = userRepository.save(user);
        return toUserResponse(saved);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }

    // helper to map entity -> DTO
    private UserResponse toUserResponse(User u) {
        UserResponse resp = new UserResponse();
        resp.setId(u.getId());
        resp.setName(u.getName());
        resp.setEmail(u.getEmail());
        resp.setRole(u.getRole());
        resp.setCity(u.getCity());
        resp.setContactNumber(u.getContactNumber());
        resp.setAge(u.getAge());
        resp.setGender(u.getGender());
        resp.setSpeciality(u.getSpeciality());
        resp.setAddress(u.getAddress());
        return resp;
    }
}
