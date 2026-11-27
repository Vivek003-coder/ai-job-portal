package com.aijobportal.service;

import com.aijobportal.entity.User;
import com.aijobportal.exception.BadRequestException;
import com.aijobportal.repository.JobApplicationRepository;
import com.aijobportal.repository.JobRepository;
import com.aijobportal.repository.ResumeRepository;
import com.aijobportal.repository.UserRepository;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ApplicationServiceTest {

    @Test
    void candidateMustUploadResumeBeforeApplying() {
        User candidate = new User();
        candidate.setRole(User.Role.CANDIDATE);

        UserRepository users = mock(UserRepository.class);
        ResumeRepository resumes = mock(ResumeRepository.class);
        when(users.findById(4L)).thenReturn(Optional.of(candidate));
        when(resumes.existsByUserId(4L)).thenReturn(false);

        ApplicationService service = new ApplicationService(
                mock(JobApplicationRepository.class),
                mock(JobRepository.class),
                users,
                resumes,
                mock(NotificationService.class)
        );

        assertThrows(BadRequestException.class, () -> service.apply(4L, 3L, ""));
    }
}
