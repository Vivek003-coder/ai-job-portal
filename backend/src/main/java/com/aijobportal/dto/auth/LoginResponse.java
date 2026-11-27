package com.aijobportal.dto.auth;

import com.aijobportal.entity.User;

public class LoginResponse {

    private String token;
    private UserSummary user;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = new UserSummary(user);
    }

    public String getToken() { return token; }
    public UserSummary getUser() { return user; }

    public static class UserSummary {
        private Long id;
        private String fullName;
        private String email;
        private String role;

        public UserSummary(User user) {
            this.id = user.getId();
            this.fullName = user.getFullName();
            this.email = user.getEmail();
            this.role = user.getRole().name();
        }

        public Long getId() { return id; }
        public String getFullName() { return fullName; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
    }
}
