package com.medical.appointment.service;

import com.medical.appointment.entity.AuditLog;
import com.medical.appointment.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {

	private final AuditLogRepository auditLogRepository;

	public void log(String username, String action, String details) {
		AuditLog log = AuditLog.builder().timestamp(LocalDateTime.now()).username(username).action(action)
				.details(details).build();
		auditLogRepository.save(log);
	}

	public List<AuditLog> getAll() {
		return auditLogRepository.findAllOrdered();
	}
}
