package com.aijobportal.controller;

import com.aijobportal.dto.user.ProfileResponse;
import com.aijobportal.dto.user.UpdateProfileRequest;
import com.aijobportal.entity.User;
import com.aijobportal.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(Authentication authentication) {
        return userService.getProfile(currentUser(authentication).getId());
    }

    @PutMapping("/profile")
    public ProfileResponse updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        return userService.updateProfile(currentUser(authentication).getId(), request);
    }

    private User currentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new IllegalArgumentException("Authentication is required.");
        }
        return user;
    }
}
