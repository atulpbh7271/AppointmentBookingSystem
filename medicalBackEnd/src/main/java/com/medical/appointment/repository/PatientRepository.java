package com.medical.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.appointment.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {}

