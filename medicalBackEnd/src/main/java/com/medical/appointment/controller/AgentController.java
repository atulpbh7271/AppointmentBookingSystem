package com.medical.appointment.controller;

import java.util.List;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.appointment.entity.Agent;
import com.medical.appointment.repository.AgentRepository;
import com.medical.appointment.service.AuditLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AgentController {

	private final AgentRepository agentRepo;
	private final AuditLogService auditLogService;

	@GetMapping
	public List<Agent> getAll() {
		return agentRepo.findAll();
	}

	@GetMapping("/{id}")
	public Agent getOne(@PathVariable Long id) {
		return agentRepo.findById(id).orElseThrow(() -> new RuntimeException("Agent not found with id " + id));
	}

	@PostMapping
	public Agent create(@RequestBody Agent agent, Authentication auth) {
		agent.setId(null);
		if (agent.getStatus() == null) {
			agent.setStatus("Active");
		}
		Agent saved = agentRepo.save(agent);
		String username = auth != null ? auth.name() : "SYSTEM";
		auditLogService.log(username, "CREATE_AGENT", "Created agent: " + saved.getName());
		return saved;
	}

	@PutMapping("/{id}")
	public Agent update(@PathVariable Long id, @RequestBody Agent agent) {
		if (!agentRepo.existsById(id)) {
			throw new RuntimeException("Agent not found with id " + id);
		}
		agent.setId(id);
		return agentRepo.save(agent);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id, Authentication auth) {
		agentRepo.deleteById(id);
		String username = auth != null ? auth.name() : "SYSTEM";
		auditLogService.log(username, "DELETE_AGENT", "Deleted agent with id " + id);
	}


}