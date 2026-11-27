package com.aijobportal.controller;

import com.aijobportal.dto.job.JobResponse;
import com.aijobportal.entity.User;
import com.aijobportal.service.SavedJobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
public class SavedJobController {

    private final SavedJobService savedJobService;

    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    @GetMapping
    public List<JobResponse> getSavedJobs(Authentication authentication) {
        return savedJobService.getSavedJobs(currentUser(authentication).getId());
    }

    @PostMapping("/{jobId}")
    public ResponseEntity<Void> saveJob(
            Authentication authentication,
            @PathVariable Long jobId
    ) {
        savedJobService.saveJob(currentUser(authentication).getId(), jobId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> removeSavedJob(
            Authentication authentication,
            @PathVariable Long jobId
    ) {
        savedJobService.removeSavedJob(currentUser(authentication).getId(), jobId);
        return ResponseEntity.noContent().build();
    }

    private User currentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new IllegalArgumentException("Authentication is required.");
        }
        return user;
    }
}
