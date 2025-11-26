package com.medical.appointment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.appointment.dto.AdminReferralView;
import com.medical.appointment.dto.AdminSummaryResponse;
import com.medical.appointment.dto.ReferralsPerBrokerDto;
import com.medical.appointment.entity.Agent;
import com.medical.appointment.entity.AuditLog;
import com.medical.appointment.entity.Doctor;
import com.medical.appointment.entity.Patient;
import com.medical.appointment.entity.Referral;
import com.medical.appointment.entity.Role;
import com.medical.appointment.repository.AgentRepository;
import com.medical.appointment.repository.DoctorRepository;
import com.medical.appointment.repository.PatientRepository;
import com.medical.appointment.repository.ReferralRepository;
import com.medical.appointment.repository.UserRepository;
import com.medical.appointment.service.AuditLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	private final UserRepository userRepository;
	private final AgentRepository agentRepository;
	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;
	private final ReferralRepository referralRepository;
	private final AuditLogService auditLogService;

	@GetMapping("/summary")
	public AdminSummaryResponse getSummary() {
		long totalBrokers = userRepository.countByRole(Role.BROKER);
		long totalAgents = agentRepository.count();
		long totalDoctors = doctorRepository.count();
		long totalPatients = patientRepository.count();
		long totalReferrals = referralRepository.count();

		return new AdminSummaryResponse(totalBrokers, totalAgents, totalDoctors, totalPatients, totalReferrals);
	}

	// System-wide referrals with names
	@GetMapping("/referrals")
	public List<AdminReferralView> getSystemReferrals() {

		List<Referral> referrals = referralRepository.findAll();
		Map<Long, Agent> agentMap = agentRepository.findAll().stream().collect(Collectors.toMap(Agent::getId, a -> a));
		Map<Long, Doctor> doctorMap = doctorRepository.findAll().stream()
				.collect(Collectors.toMap(Doctor::getId, d -> d));
		Map<Long, Patient> patientMap = patientRepository.findAll().stream()
				.collect(Collectors.toMap(Patient::getId, p -> p));

		List<AdminReferralView> result = new ArrayList<>();

		for (Referral r : referrals) {
			Agent agent = r.getAgentId() != null ? agentMap.get(r.getAgentId()) : null;
			Doctor doctor = r.getDoctorId() != null ? doctorMap.get(r.getDoctorId()) : null;
			Patient patient = r.getPatientId() != null ? patientMap.get(r.getPatientId()) : null;

			String agentName = agent != null ? agent.getName() : "Unknown";
			String doctorName = doctor != null ? doctor.getName() : "Unknown";
			String patientName = patient != null ? patient.getName() : "Unknown";

			// TODO: wire real broker mapping; for now set to "N/A"
			String brokerName = "N/A";

			result.add(new AdminReferralView(
			        r.getId(),
			        r.getDate() != null ? r.getDate().toString() : null,
			        r.getStatus() != null ? r.getStatus().toString() : null,
			        r.getCommissionAmount(),
			        brokerName,
			        agentName,
			        patientName,
			        doctorName
			));

		}

		return result;
	}

	@GetMapping("/analytics/referrals-per-broker")
	public List<ReferralsPerBrokerDto> getReferralsPerBroker() {
		List<Referral> referrals = referralRepository.findAll();
		Map<Long, Agent> agentMap = agentRepository.findAll().stream().collect(Collectors.toMap(Agent::getId, a -> a));

		Map<String, Long> countByBrokerName = new HashMap<>();

		for (Referral r : referrals) {
			Agent agent = r.getAgentId() != null ? agentMap.get(r.getAgentId()) : null;
			String brokerName = agent != null ? agent.getName() : "Unknown"; // treat agent name as broker for now

			countByBrokerName.merge(brokerName, 1L, Long::sum);
		}

		return countByBrokerName.entrySet().stream().map(e -> new ReferralsPerBrokerDto(e.getKey(), e.getValue()))
				.toList();
	}

	// Audit logs
	@GetMapping("/audit-logs")
	public List<AuditLog> getAuditLogs() {
		return auditLogService.getAll();
	}
}
