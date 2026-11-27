package com.aijobportal.service;

import com.aijobportal.dto.application.ApplicationResponse;
import com.aijobportal.entity.Job;
import com.aijobportal.entity.JobApplication;
import com.aijobportal.entity.User;
import com.aijobportal.exception.BadRequestException;
import com.aijobportal.exception.ResourceNotFoundException;
import com.aijobportal.repository.JobApplicationRepository;
import com.aijobportal.repository.JobRepository;
import com.aijobportal.repository.ResumeRepository;
import com.aijobportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final NotificationService notificationService;

    public ApplicationService(
            JobApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository,
            ResumeRepository resumeRepository,
            NotificationService notificationService
    ) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public ApplicationResponse apply(Long candidateId, Long jobId, String coverLetter) {
        User candidate = requireCandidate(candidateId);
        if (!resumeRepository.existsByUserId(candidateId)) {
            throw new BadRequestException("Upload your resume before applying for a job.");
        }
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found."));
        if (!"ACTIVE".equalsIgnoreCase(job.getStatus())) {
            throw new BadRequestException("This job is no longer accepting applications.");
        }
        if (applicationRepository.existsByCandidateIdAndJobId(candidateId, jobId)) {
            throw new BadRequestException("You have already applied for this job.");
        }

        JobApplication application = new JobApplication();
        application.setCandidateId(candidateId);
        application.setJobId(jobId);
        application.setCoverLetter(coverLetter);
        JobApplication savedApplication = applicationRepository.save(application);
        notificationService.create(
                job.getRecruiterId(),
                "New job application",
                candidate.getFullName() + " applied for " + job.getTitle() + "."
        );
        return toResponse(savedApplication, job, candidate);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getCandidateApplications(Long candidateId) {
        User candidate = requireCandidate(candidateId);
        return applicationRepository.findByCandidateIdOrderByAppliedAtDesc(candidateId)
                .stream()
                .map(application -> toResponse(
                        application,
                        jobRepository.findById(application.getJobId())
                                .orElseThrow(() -> new ResourceNotFoundException("Job not found.")),
                        candidate
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> getJobApplicants(Long recruiterId, Long jobId) {
        Job job = requireOwnedJob(recruiterId, jobId);
        return applicationRepository.findByJobIdOrderByAppliedAtDesc(jobId)
                .stream()
                .map(application -> toResponse(
                        application,
                        job,
                        userRepository.findById(application.getCandidateId())
                                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found."))
                ))
                .toList();
    }

    @Transactional
    public ApplicationResponse updateStatus(Long recruiterId, Long applicationId, String status) {
        if (status == null || !List.of("Under Review", "Shortlisted", "Interview", "Selected", "Rejected")
                .contains(status)) {
            throw new BadRequestException("Unsupported application status.");
        }
        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found."));
        Job job = requireOwnedJob(recruiterId, application.getJobId());
        User candidate = userRepository.findById(application.getCandidateId())
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found."));
        application.setStatus(status);
        JobApplication updatedApplication = applicationRepository.save(application);
        notificationService.create(
                candidate.getId(),
                "Application status updated",
                "Your application for " + job.getTitle() + " is now " + status + "."
        );
        return toResponse(updatedApplication, job, candidate);
    }

    private Job requireOwnedJob(Long recruiterId, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found."));
        if (!job.getRecruiterId().equals(recruiterId)) {
            throw new BadRequestException("You are not authorized to view or change these applicants.");
        }
        return job;
    }

    private User requireCandidate(Long candidateId) {
        User candidate = userRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found."));
        if (candidate.getRole() != User.Role.CANDIDATE) {
            throw new BadRequestException("Only candidates can manage applications.");
        }
        return candidate;
    }

    private ApplicationResponse toResponse(JobApplication application, Job job, User candidate) {
        return new ApplicationResponse(application, job, candidate);
    }
}
