package com.aijobportal.repository;

import com.aijobportal.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByStatus(String status);

    List<Job> findByRecruiterId(Long recruiterId);

    List<Job> findByRecruiterIdAndStatus(
            Long recruiterId,
            String status
    );
}