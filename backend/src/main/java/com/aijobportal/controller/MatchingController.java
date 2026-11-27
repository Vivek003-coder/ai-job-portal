package com.aijobportal.controller;

import com.aijobportal.dto.matching.MatchResponse;
import com.aijobportal.entity.User;
import com.aijobportal.service.MatchingService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    private final MatchingService matchingService;

    public MatchingController(MatchingService matchingService) {
        this.matchingService = matchingService;
    }

    @GetMapping("/recommendations")
    public List<MatchResponse> recommendations(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new IllegalArgumentException("Authentication is required.");
        }
        return matchingService.recommendations(user.getId());
    }
}
