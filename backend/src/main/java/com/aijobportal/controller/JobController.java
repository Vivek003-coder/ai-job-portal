package com.aijobportal.controller;

import com.aijobportal.dto.job.JobRequest;
import com.aijobportal.dto.job.JobResponse;
import com.aijobportal.service.JobService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    /*
     * GET /api/jobs
     * Returns active jobs.
     */
    @GetMapping
    public ResponseEntity<List<JobResponse>> getJobs() {

        return ResponseEntity.ok(
                jobService.getActiveJobs()
        );
    }

    /*
     * GET /api/jobs/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                jobService.getJobById(id)
        );
    }

    /*
     * POST /api/jobs
     *
     * Temporary recruiter ID = 1.
     * We will replace this with the authenticated
     * JWT recruiter ID when JWT security is connected.
     */
    @PostMapping
    public ResponseEntity<JobResponse> createJob(
            @Valid @RequestBody JobRequest request
    ) {

        Long recruiterId = 1L;

        JobResponse response =
                jobService.createJob(
                        request,
                        recruiterId
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /*
     * PUT /api/jobs/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequest request
    ) {

        Long recruiterId = 1L;

        return ResponseEntity.ok(
                jobService.updateJob(
                        id,
                        request,
                        recruiterId
                )
        );
    }

    /*
     * DELETE /api/jobs/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable Long id
    ) {

        Long recruiterId = 1L;

        jobService.deleteJob(
                id,
                recruiterId
        );

        return ResponseEntity.noContent().build();
    }

    /*
     * PATCH /api/jobs/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<JobResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusRequest request
    ) {

        Long recruiterId = 1L;

        return ResponseEntity.ok(
                jobService.updateStatus(
                        id,
                        request.getStatus(),
                        recruiterId
                )
        );
    }

    public static class StatusRequest {

        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}