package com.aijobportal.service;

import com.aijobportal.dto.job.JobResponse;
import com.aijobportal.entity.Job;
import com.aijobportal.entity.SavedJob;
import com.aijobportal.entity.User;
import com.aijobportal.exception.BadRequestException;
import com.aijobportal.exception.ResourceNotFoundException;
import com.aijobportal.repository.JobRepository;
import com.aijobportal.repository.SavedJobRepository;
import com.aijobportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public SavedJobService(
            SavedJobRepository savedJobRepository,
            JobRepository jobRepository,
            UserRepository userRepository
    ) {
        this.savedJobRepository = savedJobRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<JobResponse> getSavedJobs(Long candidateId) {
        requireCandidate(candidateId);
        return savedJobRepository.findByCandidateIdOrderBySavedAtDesc(candidateId)
                .stream()
                .map(saved -> jobRepository.findById(saved.getJobId())
                        .orElseThrow(() -> new ResourceNotFoundException("Saved job no longer exists.")))
                .map(JobResponse::new)
                .toList();
    }

    @Transactional
    public void saveJob(Long candidateId, Long jobId) {
        requireCandidate(candidateId);
        jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found."));
        if (savedJobRepository.findByCandidateIdAndJobId(candidateId, jobId).isEmpty()) {
            SavedJob savedJob = new SavedJob();
            savedJob.setCandidateId(candidateId);
            savedJob.setJobId(jobId);
            savedJobRepository.save(savedJob);
        }
    }

    @Transactional
    public void removeSavedJob(Long candidateId, Long jobId) {
        requireCandidate(candidateId);
        SavedJob savedJob = savedJobRepository.findByCandidateIdAndJobId(candidateId, jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Saved job not found."));
        savedJobRepository.delete(savedJob);
    }

    private User requireCandidate(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        if (user.getRole() != User.Role.CANDIDATE) {
            throw new BadRequestException("Only candidates can save jobs.");
        }
        return user;
    }
}
