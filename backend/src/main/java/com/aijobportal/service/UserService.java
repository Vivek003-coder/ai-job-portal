package com.aijobportal.service;

import com.aijobportal.dto.user.ProfileResponse;
import com.aijobportal.dto.user.UpdateProfileRequest;
import com.aijobportal.entity.CandidateProfile;
import com.aijobportal.entity.User;
import com.aijobportal.exception.BadRequestException;
import com.aijobportal.exception.ResourceNotFoundException;
import com.aijobportal.repository.CandidateProfileRepository;
import com.aijobportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CandidateProfileRepository profileRepository;

    public UserService(UserRepository userRepository, CandidateProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional(readOnly = true)
    public ProfileResponse getProfile(Long userId) {
        User user = requireCandidate(userId);
        CandidateProfile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    CandidateProfile empty = new CandidateProfile();
                    empty.setUserId(userId);
                    return empty;
                });
        return new ProfileResponse(user, profile);
    }

    @Transactional
    public ProfileResponse updateProfile(Long userId, UpdateProfileRequest request) {
        User user = requireCandidate(userId);
        user.setFullName(request.getFullName().trim());
        userRepository.save(user);

        CandidateProfile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    CandidateProfile created = new CandidateProfile();
                    created.setUserId(userId);
                    return created;
                });
        profile.setHeadline(trim(request.getHeadline()));
        profile.setPhone(trim(request.getPhone()));
        profile.setLocation(trim(request.getLocation()));
        profile.setAbout(trim(request.getAbout()));
        profile.setSkills(request.getSkills() == null ? "" : request.getSkills().stream()
                .filter(Objects::nonNull).map(String::trim).filter(skill -> !skill.isEmpty())
                .distinct().reduce((a, b) -> a + ", " + b).orElse(""));
        profile.setGithub(trim(request.getGithub()));
        profile.setLinkedin(trim(request.getLinkedin()));
        profile.setPortfolio(trim(request.getPortfolio()));
        profile = profileRepository.save(profile);
        return new ProfileResponse(user, profile);
    }

    private User requireCandidate(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        if (user.getRole() != User.Role.CANDIDATE) {
            throw new BadRequestException("This profile is available to candidate accounts.");
        }
        return user;
    }

    private String trim(String value) {
        return value == null ? "" : value.trim();
    }
}
