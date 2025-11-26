package com.medical.appointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medical.appointment.entity.Agent;

public interface AgentRepository extends JpaRepository<Agent, Long> {
}
