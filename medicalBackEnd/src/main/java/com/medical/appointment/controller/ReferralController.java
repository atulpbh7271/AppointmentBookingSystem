package com.medical.appointment.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medical.appointment.entity.Referral;
import com.medical.appointment.entity.Status;
import com.medical.appointment.repository.ReferralRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/referrals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReferralController {

	private final ReferralRepository referralRepo;

	@GetMapping
	public List<Referral> getAll() {
		return referralRepo.findAll();
	}

	@GetMapping("/{id}")
	public Referral getOne(@PathVariable Long id) {
		return referralRepo.findById(id).orElseThrow(() -> new RuntimeException("Referral not found with id " + id));
	}

	@PostMapping
	public Referral create(@RequestBody Referral referral) {
		referral.setId(null);
		if (referral.getStatus() == null) {
			referral.setStatus(Status.PENDING);
		}
		return referralRepo.save(referral);
	}

	@PutMapping("/{id}")
	public Referral update(@PathVariable Long id, @RequestBody Referral referral) {
		if (!referralRepo.existsById(id)) {
			throw new RuntimeException("Referral not found with id " + id);
		}
		referral.setId(id);
		return referralRepo.save(referral);
	}

	@PatchMapping("/{id}/status")
	public Referral updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest req) {
		Referral referral = referralRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Referral not found with id " + id));

		referral.setStatus(req.getStatus());
		return referralRepo.save(referral);
	}

	@Data
	public static class UpdateStatusRequest {
		private Status status;
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		referralRepo.deleteById(id);
	}

}