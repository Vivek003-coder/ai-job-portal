package com.aijobportal.service;

import com.aijobportal.dto.job.JobRequest;
import com.aijobportal.dto.job.JobResponse;
import com.aijobportal.entity.Job;
import com.aijobportal.exception.BadRequestException;
import com.aijobportal.exception.ResourceNotFoundException;
import com.aijobportal.repository.JobRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<JobResponse> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(JobResponse::new)
                .toList();
    }

    public List<JobResponse> getActiveJobs() {
        return jobRepository.findByStatus("ACTIVE")
                .stream()
                .map(JobResponse::new)
                .toList();
    }

    public List<JobResponse> getRecruiterJobs(Long recruiterId) {
        return jobRepository.findByRecruiterId(recruiterId)
                .stream()
                .map(JobResponse::new)
                .toList();
    }

    public JobResponse getJobById(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job not found with id: " + id
                        )
                );

        return new JobResponse(job);
    }

    public JobResponse createJob(
            JobRequest request,
            Long recruiterId
    ) {

        Job job = new Job();

        mapRequestToJob(request, job);

        job.setRecruiterId(recruiterId);

        String status = request.getStatus() == null || request.getStatus().isBlank()
                ? "ACTIVE"
                : normalizeStatus(request.getStatus());
        job.setStatus(status);

        return new JobResponse(
                jobRepository.save(job)
        );
    }

    public JobResponse updateJob(
            Long id,
            JobRequest request,
            Long recruiterId
    ) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job not found with id: " + id
                        )
                );

        if (!job.getRecruiterId().equals(recruiterId)) {
            throw new BadRequestException(
                    "You are not authorized to update this job"
            );
        }

        mapRequestToJob(request, job);

        if (request.getStatus() != null &&
                !request.getStatus().isBlank()) {
            job.setStatus(normalizeStatus(request.getStatus()));
        }

        return new JobResponse(
                jobRepository.save(job)
        );
    }

    public void deleteJob(
            Long id,
            Long recruiterId
    ) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job not found with id: " + id
                        )
                );

        if (!job.getRecruiterId().equals(recruiterId)) {
            throw new BadRequestException(
                    "You are not authorized to delete this job"
            );
        }

        jobRepository.delete(job);
    }

    public JobResponse updateStatus(
            Long id,
            String status,
            Long recruiterId
    ) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job not found with id: " + id
                        )
                );

        if (!job.getRecruiterId().equals(recruiterId)) {
            throw new BadRequestException(
                    "You are not authorized to update this job"
            );
        }

        job.setStatus(normalizeStatus(status));

        return new JobResponse(
                jobRepository.save(job)
        );
    }

    private void mapRequestToJob(
            JobRequest request,
            Job job
    ) {

        job.setTitle(request.getTitle());
        job.setCompanyName(request.getCompanyName());
        job.setDepartment(request.getDepartment());
        job.setLocation(request.getLocation());
        job.setWorkplace(request.getWorkplace());
        job.setEmploymentType(request.getEmploymentType());
        job.setExperience(request.getExperience());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setDescription(request.getDescription());
        job.setResponsibilities(request.getResponsibilities());
        job.setRequirements(request.getRequirements());
        job.setSkills(request.getSkills());
        job.setDeadline(request.getDeadline());
    }

    private String normalizeStatus(String status) {
        if (status == null || status.isBlank()) {
            throw new BadRequestException("Status cannot be empty.");
        }

        String normalizedStatus = status.trim().toUpperCase();
        if (!List.of("ACTIVE", "CLOSED", "DRAFT").contains(normalizedStatus)) {
            throw new BadRequestException("Status must be ACTIVE, CLOSED, or DRAFT.");
        }
        return normalizedStatus;
    }
}