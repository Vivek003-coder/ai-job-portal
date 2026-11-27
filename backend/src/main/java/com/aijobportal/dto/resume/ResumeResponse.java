package com.aijobportal.dto.resume;

import com.aijobportal.entity.Resume;

import java.time.LocalDateTime;

public class ResumeResponse {
    private Long id;
    private String fileName;
    private String contentType;
    private long size;
    private LocalDateTime uploadedAt;

    public ResumeResponse(Resume resume) {
        id = resume.getId();
        fileName = resume.getFileName();
        contentType = resume.getContentType();
        size = resume.getFileSize();
        uploadedAt = resume.getUploadedAt();
    }

    public Long getId() { return id; }
    public String getFileName() { return fileName; }
    public String getContentType() { return contentType; }
    public long getSize() { return size; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
}
