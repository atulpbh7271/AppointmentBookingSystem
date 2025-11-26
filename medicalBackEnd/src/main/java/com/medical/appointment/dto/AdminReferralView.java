package com.medical.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminReferralView {

    private Long id;
    private String date;
    private String status;
    private Double commissionAmount;

    private String brokerName;
    private String agentName;
    private String patientName;
    private String doctorName;
}


