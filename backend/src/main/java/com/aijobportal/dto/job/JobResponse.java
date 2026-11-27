package com.aijobportal.dto.job;

import com.aijobportal.entity.Job;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class JobResponse {

    private Long id;
    private String title;
    private String companyName;
    private String department;
    private String location;
    private String workplace;
    private String employmentType;
    private String experience;
    private Integer salaryMin;
    private Integer salaryMax;
    private String description;
    private String responsibilities;
    private String requirements;
    private String skills;
    private LocalDate deadline;
    private String status;
    private Long recruiterId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public JobResponse() {
    }

    public JobResponse(Job job) {
        this.id = job.getId();
        this.title = job.getTitle();
        this.companyName = job.getCompanyName();
        this.department = job.getDepartment();
        this.location = job.getLocation();
        this.workplace = job.getWorkplace();
        this.employmentType = job.getEmploymentType();
        this.experience = job.getExperience();
        this.salaryMin = job.getSalaryMin();
        this.salaryMax = job.getSalaryMax();
        this.description = job.getDescription();
        this.responsibilities = job.getResponsibilities();
        this.requirements = job.getRequirements();
        this.skills = job.getSkills();
        this.deadline = job.getDeadline();
        this.status = job.getStatus();
        this.recruiterId = job.getRecruiterId();
        this.createdAt = job.getCreatedAt();
        this.updatedAt = job.getUpdatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getDepartment() {
        return department;
    }

    public String getLocation() {
        return location;
    }

    public String getWorkplace() {
        return workplace;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public String getExperience() {
        return experience;
    }

    public Integer getSalaryMin() {
        return salaryMin;
    }

    public Integer getSalaryMax() {
        return salaryMax;
    }

    public String getDescription() {
        return description;
    }

    public String getResponsibilities() {
        return responsibilities;
    }

    public String getRequirements() {
        return requirements;
    }

    public String getSkills() {
        return skills;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public String getStatus() {
        return status;
    }

    public Long getRecruiterId() {
        return recruiterId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}