package com.medical.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.appointment.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
