package com.aijobportal.service;

import com.aijobportal.dto.matching.MatchResponse;
import com.aijobportal.entity.CandidateProfile;
import com.aijobportal.entity.Job;
import com.aijobportal.entity.User;
import com.aijobportal.exception.BadRequestException;
import com.aijobportal.exception.ResourceNotFoundException;
import com.aijobportal.repository.CandidateProfileRepository;
import com.aijobportal.repository.JobRepository;
import com.aijobportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    private final CandidateProfileRepository profileRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public MatchingService(
            CandidateProfileRepository profileRepository,
            JobRepository jobRepository,
            UserRepository userRepository
    ) {
        this.profileRepository = profileRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<MatchResponse> recommendations(Long candidateId) {
        User user = userRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        if (user.getRole() != User.Role.CANDIDATE) {
            throw new BadRequestException("Personalized recommendations are for candidate accounts.");
        }

        Set<String> candidateSkills = profileRepository.findByUserId(candidateId)
                .map(CandidateProfile::getSkills)
                .map(MatchingService::parseSkills)
                .orElse(Set.of());

        return jobRepository.findByStatus("ACTIVE").stream()
                .map(job -> score(job, candidateSkills))
                .sorted((first, second) -> Integer.compare(second.getMatch(), first.getMatch()))
                .toList();
    }

    private MatchResponse score(Job job, Set<String> candidateSkills) {
        List<String> jobSkills = splitSkills(job.getSkills());
        List<String> matched = jobSkills.stream()
                .filter(skill -> candidateSkills.contains(skill.toLowerCase(Locale.ROOT)))
                .toList();
        List<String> missing = jobSkills.stream()
                .filter(skill -> !candidateSkills.contains(skill.toLowerCase(Locale.ROOT)))
                .toList();
        int score = jobSkills.isEmpty() ? 0 : Math.round(100f * matched.size() / jobSkills.size());
        return new MatchResponse(job, matched, missing, score);
    }

    private static Set<String> parseSkills(String text) {
        if (text == null || text.isBlank()) return Set.of();
        return Arrays.stream(text.split(","))
                .map(String::trim)
                .filter(skill -> !skill.isEmpty())
                .map(skill -> skill.toLowerCase(Locale.ROOT))
                .collect(Collectors.toSet());
    }

    private static List<String> splitSkills(String text) {
        if (text == null || text.isBlank()) return List.of();
        return Arrays.stream(text.split(","))
                .map(String::trim)
                .filter(skill -> !skill.isEmpty())
                .distinct()
                .toList();
    }
}
