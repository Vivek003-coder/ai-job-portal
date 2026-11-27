package com.aijobportal.dto.user;

import com.aijobportal.entity.CandidateProfile;
import com.aijobportal.entity.User;
import java.util.Arrays;
import java.util.List;

public class ProfileResponse {
    private Long id;
    private String fullName;
    private String email;
    private String headline;
    private String phone;
    private String location;
    private String about;
    private List<String> skills;
    private String github;
    private String linkedin;
    private String portfolio;

    public ProfileResponse(User user, CandidateProfile profile) {
        id = user.getId();
        fullName = user.getFullName();
        email = user.getEmail();
        headline = value(profile.getHeadline());
        phone = value(profile.getPhone());
        location = value(profile.getLocation());
        about = value(profile.getAbout());
        skills = profile.getSkills() == null || profile.getSkills().isBlank()
                ? List.of()
                : Arrays.stream(profile.getSkills().split(","))
                        .map(String::trim).filter(skill -> !skill.isEmpty()).toList();
        github = value(profile.getGithub());
        linkedin = value(profile.getLinkedin());
        portfolio = value(profile.getPortfolio());
    }

    private String value(String text) { return text == null ? "" : text; }
    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getHeadline() { return headline; }
    public String getPhone() { return phone; }
    public String getLocation() { return location; }
    public String getAbout() { return about; }
    public List<String> getSkills() { return skills; }
    public String getGithub() { return github; }
    public String getLinkedin() { return linkedin; }
    public String getPortfolio() { return portfolio; }
}
