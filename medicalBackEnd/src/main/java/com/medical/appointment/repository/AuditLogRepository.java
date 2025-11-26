package com.medical.appointment.repository;


import com.medical.appointment.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    default List<AuditLog> findAllOrdered() {
        return findAll(Sort.by(Sort.Direction.DESC, "timestamp"));
    }
}

