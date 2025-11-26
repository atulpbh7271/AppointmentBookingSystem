package com.medical.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReferralsPerBrokerDto {
	private String brokerName;
	private long referralCount;
}
