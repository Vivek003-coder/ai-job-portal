package com.aijobportal.service;

import com.aijobportal.dto.resume.ResumeResponse;
import com.aijobportal.entity.Resume;
import com.aijobportal.entity.User;
import com.aijobportal.exception.BadRequestException;
import com.aijobportal.exception.ResourceNotFoundException;
import com.aijobportal.repository.ResumeRepository;
import com.aijobportal.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Locale;
import java.util.Map;

@Service
public class ResumeService {

    private static final long MAX_SIZE = 10L * 1024 * 1024;
    private static final Map<String, String> ALLOWED_TYPES = Map.of(
            "pdf", "application/pdf",
            "doc", "application/msword",
            "docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeService(ResumeRepository resumeRepository, UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public ResumeResponse getMetadata(Long userId) {
        requireCandidate(userId);
        Resume resume = findResume(userId);
        return new ResumeResponse(resume);
    }

    @Transactional
    public ResumeResponse upload(Long userId, MultipartFile file) throws IOException {
        requireCandidate(userId);
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Choose a resume file to upload.");
        }
        if (file.getSize() > MAX_SIZE) {
            throw new BadRequestException("Resume must be 10 MB or smaller.");
        }

        String originalName = file.getOriginalFilename();
        if (originalName == null) {
            throw new BadRequestException("Resume filename is missing.");
        }
        String fileName = originalName.replace('\\', '/');
        fileName = fileName.substring(fileName.lastIndexOf('/') + 1)
                .replaceAll("[\\r\\n]", "").trim();
        int extensionIndex = fileName.lastIndexOf('.');
        if (extensionIndex < 0 || extensionIndex == fileName.length() - 1) {
            throw new BadRequestException("Resume must be a PDF, DOC, or DOCX file.");
        }
        String extension = fileName.substring(extensionIndex + 1).toLowerCase(Locale.ROOT);
        String contentType = ALLOWED_TYPES.get(extension);
        if (contentType == null) {
            throw new BadRequestException("Resume must be a PDF, DOC, or DOCX file.");
        }

        Resume resume = resumeRepository.findByUserId(userId).orElseGet(Resume::new);
        resume.setUserId(userId);
        resume.setFileName(fileName);
        resume.setContentType(contentType);
        resume.setFileSize(file.getSize());
        resume.setContent(file.getBytes());
        return new ResumeResponse(resumeRepository.save(resume));
    }

    @Transactional(readOnly = true)
    public Resume getFile(Long userId) {
        requireCandidate(userId);
        return findResume(userId);
    }

    @Transactional
    public void delete(Long userId) {
        requireCandidate(userId);
        resumeRepository.findByUserId(userId).ifPresent(resumeRepository::delete);
    }

    private Resume findResume(Long userId) {
        return resumeRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No resume has been uploaded."));
    }

    private void requireCandidate(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        if (user.getRole() != User.Role.CANDIDATE) {
            throw new BadRequestException("Only candidates can manage resumes.");
        }
    }
}
