package com.aijobportal.controller;

import com.aijobportal.dto.application.ApplicationResponse;
import com.aijobportal.entity.User;
import com.aijobportal.service.ApplicationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<ApplicationResponse> getMyApplications(Authentication authentication) {
        return applicationService.getCandidateApplications(currentUser(authentication).getId());
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> apply(
            Authentication authentication,
            @Valid @RequestBody ApplyRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                applicationService.apply(
                        currentUser(authentication).getId(),
                        request.getJobId(),
                        request.getCoverLetter()
                )
        );
    }

    @GetMapping("/jobs/{jobId}")
    public List<ApplicationResponse> getApplicants(
            Authentication authentication,
            @PathVariable Long jobId
    ) {
        return applicationService.getJobApplicants(currentUser(authentication).getId(), jobId);
    }

    @PatchMapping("/{applicationId}/status")
    public ApplicationResponse updateStatus(
            Authentication authentication,
            @PathVariable Long applicationId,
            @Valid @RequestBody StatusRequest request
    ) {
        return applicationService.updateStatus(
                currentUser(authentication).getId(),
                applicationId,
                request.getStatus()
        );
    }

    private User currentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new IllegalArgumentException("Authentication is required.");
        }
        return user;
    }

    public static class ApplyRequest {
        @NotNull
        private Long jobId;
        private String coverLetter;
        public Long getJobId() { return jobId; }
        public void setJobId(Long jobId) { this.jobId = jobId; }
        public String getCoverLetter() { return coverLetter; }
        public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }
    }

    public static class StatusRequest {
        @NotNull
        private String status;
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
