package com.aijobportal.controller;

import com.aijobportal.dto.resume.ResumeResponse;
import com.aijobportal.entity.Resume;
import com.aijobportal.entity.User;
import com.aijobportal.service.ResumeService;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/me")
    public ResumeResponse getMyResume(Authentication authentication) {
        return resumeService.getMetadata(currentUser(authentication).getId());
    }

    @PostMapping(value = "/me", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResumeResponse upload(
            Authentication authentication,
            @RequestPart("file") MultipartFile file
    ) throws java.io.IOException {
        return resumeService.upload(currentUser(authentication).getId(), file);
    }

    @GetMapping("/me/download")
    public ResponseEntity<byte[]> download(Authentication authentication) {
        Resume resume = resumeService.getFile(currentUser(authentication).getId());
        ContentDisposition disposition = ContentDisposition.attachment()
                .filename(resume.getFileName(), StandardCharsets.UTF_8)
                .build();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(resume.getContentType()))
                .contentLength(resume.getFileSize())
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
                .body(resume.getContent());
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> delete(Authentication authentication) {
        resumeService.delete(currentUser(authentication).getId());
        return ResponseEntity.noContent().build();
    }

    private User currentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new IllegalArgumentException("Authentication is required.");
        }
        return user;
    }
}
