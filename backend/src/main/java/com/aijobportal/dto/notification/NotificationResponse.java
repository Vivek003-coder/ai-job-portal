package com.aijobportal.dto.notification;

import com.aijobportal.entity.Notification;
import java.time.LocalDateTime;

public class NotificationResponse {
    private Long id;
    private String title;
    private String message;
    private boolean read;
    private LocalDateTime createdAt;

    public NotificationResponse(Notification notification) {
        id = notification.getId();
        title = notification.getTitle();
        message = notification.getMessage();
        read = notification.isRead();
        createdAt = notification.getCreatedAt();
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getMessage() { return message; }
    public boolean isRead() { return read; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
