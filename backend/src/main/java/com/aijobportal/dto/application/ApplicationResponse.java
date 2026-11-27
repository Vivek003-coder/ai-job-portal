package com.aijobportal.dto.application;

import com.aijobportal.entity.Job;
import com.aijobportal.entity.JobApplication;
import com.aijobportal.entity.User;

import java.time.LocalDateTime;

public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private String company;
    private String location;
    private String type;
    private Integer salaryMin;
    private Integer salaryMax;
    private String status;
    private LocalDateTime appliedAt;
    private Long candidateId;
    private String candidateName;
    private String candidateEmail;

    public ApplicationResponse(JobApplication application, Job job, User candidate) {
        id = application.getId();
        jobId = job.getId();
        jobTitle = job.getTitle();
        company = job.getCompanyName();
        location = job.getLocation();
        type = job.getEmploymentType();
        salaryMin = job.getSalaryMin();
        salaryMax = job.getSalaryMax();
        status = application.getStatus();
        appliedAt = application.getAppliedAt();
        candidateId = candidate.getId();
        candidateName = candidate.getFullName();
        candidateEmail = candidate.getEmail();
    }

    public Long getId() { return id; }
    public Long getJobId() { return jobId; }
    public String getJobTitle() { return jobTitle; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getType() { return type; }
    public Integer getSalaryMin() { return salaryMin; }
    public Integer getSalaryMax() { return salaryMax; }
    public String getStatus() { return status; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public Long getCandidateId() { return candidateId; }
    public String getCandidateName() { return candidateName; }
    public String getCandidateEmail() { return candidateEmail; }
}
