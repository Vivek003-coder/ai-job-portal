package com.aijobportal.repository;

import com.aijobportal.entity.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    List<SavedJob> findByCandidateIdOrderBySavedAtDesc(Long candidateId);
    Optional<SavedJob> findByCandidateIdAndJobId(Long candidateId, Long jobId);
}
