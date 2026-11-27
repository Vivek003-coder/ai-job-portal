package com.aijobportal.service;

import com.aijobportal.entity.CandidateProfile;
import com.aijobportal.entity.Job;
import com.aijobportal.entity.User;
import com.aijobportal.repository.CandidateProfileRepository;
import com.aijobportal.repository.JobRepository;
import com.aijobportal.repository.UserRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MatchingServiceTest {

    @Test
    void ranksJobsByCaseInsensitiveRequiredSkillOverlap() {
        User user = new User();
        user.setRole(User.Role.CANDIDATE);

        CandidateProfile profile = new CandidateProfile();
        profile.setSkills("Java, spring boot");

        Job job = new Job();
        job.setId(7L);
        job.setSkills("JAVA, MySQL");

        UserRepository users = mock(UserRepository.class);
        CandidateProfileRepository profiles = mock(CandidateProfileRepository.class);
        JobRepository jobs = mock(JobRepository.class);
        when(users.findById(2L)).thenReturn(Optional.of(user));
        when(profiles.findByUserId(2L)).thenReturn(Optional.of(profile));
        when(jobs.findByStatus("ACTIVE")).thenReturn(List.of(job));

        List<?> matches = new MatchingService(profiles, jobs, users).recommendations(2L);

        assertEquals(50, ((com.aijobportal.dto.matching.MatchResponse) matches.get(0)).getMatch());
        assertEquals(List.of("JAVA"), ((com.aijobportal.dto.matching.MatchResponse) matches.get(0)).getMatchedSkills());
    }

    @Test
    void givesNoMatchWhenJobDoesNotListSkills() {
        User user = new User();
        user.setRole(User.Role.CANDIDATE);
        Job job = new Job();
        job.setId(8L);

        UserRepository users = mock(UserRepository.class);
        CandidateProfileRepository profiles = mock(CandidateProfileRepository.class);
        JobRepository jobs = mock(JobRepository.class);
        when(users.findById(2L)).thenReturn(Optional.of(user));
        when(profiles.findByUserId(2L)).thenReturn(Optional.empty());
        when(jobs.findByStatus("ACTIVE")).thenReturn(List.of(job));

        var matches = new MatchingService(profiles, jobs, users).recommendations(2L);

        assertEquals(0, matches.get(0).getMatch());
        assertEquals(List.of(), matches.get(0).getSkills());
    }
}
