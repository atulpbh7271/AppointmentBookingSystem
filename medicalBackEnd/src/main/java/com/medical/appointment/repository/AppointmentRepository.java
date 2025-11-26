package com.medical.appointment.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.appointment.entity.Appointment;
import com.medical.appointment.entity.Doctor;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	List<Appointment> findByDoctorAndAppointmentDate(Doctor doctor, LocalDate date);

	List<Appointment> findByCreatedBy(Long userId);
}