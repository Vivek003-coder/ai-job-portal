package com.aijobportal.dto.matching;

import com.aijobportal.entity.Job;

import java.util.Arrays;
import java.util.List;
import java.time.LocalDateTime;

public class MatchResponse {
    private Long id;
    private String title;
    private String company;
    private String location;
    private String type;
    private String experience;
    private Integer salaryMin;
    private Integer salaryMax;
    private List<String> skills;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private int match;
    private String reason;
    private LocalDateTime createdAt;

    public MatchResponse(Job job, List<String> matchedSkills, List<String> missingSkills, int match) {
        id = job.getId();
        title = job.getTitle();
        company = job.getCompanyName();
        location = job.getLocation();
        type = job.getEmploymentType();
        experience = job.getExperience();
        salaryMin = job.getSalaryMin();
        salaryMax = job.getSalaryMax();
        skills = parseSkills(job.getSkills());
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.match = match;
        reason = matchedSkills.isEmpty()
                ? "Add skills to your profile to get personalized matches."
                : "Matches " + matchedSkills.size() + " of " + skills.size() + " listed job skills.";
        createdAt = job.getCreatedAt();
    }

    private List<String> parseSkills(String skillsText) {
        if (skillsText == null || skillsText.isBlank()) return List.of();
        return Arrays.stream(skillsText.split(",")).map(String::trim)
                .filter(skill -> !skill.isEmpty()).toList();
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getType() { return type; }
    public String getExperience() { return experience; }
    public Integer getSalaryMin() { return salaryMin; }
    public Integer getSalaryMax() { return salaryMax; }
    public List<String> getSkills() { return skills; }
    public List<String> getMatchedSkills() { return matchedSkills; }
    public List<String> getMissingSkills() { return missingSkills; }
    public int getMatch() { return match; }
    public String getReason() { return reason; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
