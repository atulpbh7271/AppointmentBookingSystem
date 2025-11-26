package com.medical.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminSummaryResponse {
	private long totalBrokers;
	private long totalAgents;
	private long totalDoctors;
	private long totalPatients;
	private long totalReferrals;
}