package com.aijobportal.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public class UpdateProfileRequest {
    @NotBlank
    @Size(max = 100)
    private String fullName;
    @Size(max = 150)
    private String headline;
    @Size(max = 40)
    private String phone;
    @Size(max = 150)
    private String location;
    @Size(max = 5000)
    private String about;
    private List<@Size(max = 60) String> skills = List.of();
    @Size(max = 255)
    private String github;
    @Size(max = 255)
    private String linkedin;
    @Size(max = 255)
    private String portfolio;

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
    public String getPortfolio() { return portfolio; }
    public void setPortfolio(String portfolio) { this.portfolio = portfolio; }
}
