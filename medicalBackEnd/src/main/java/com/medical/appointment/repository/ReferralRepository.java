package com.medical.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.appointment.entity.Referral;

public interface ReferralRepository extends JpaRepository<Referral, Long> {}

