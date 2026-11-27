package com.aijobportal.security;

import org.junit.jupiter.api.Test;
import org.springframework.mock.env.MockEnvironment;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class JwtServiceTest {

    @Test
    void createsUsableTemporaryKeyWhenSecretIsMissingOutsideProduction() {
        JwtService jwtService = new JwtService("", 3600000, new MockEnvironment());

        String token = jwtService.generateToken("candidate@example.com", 1L, "CANDIDATE");

        assertEquals("candidate@example.com", jwtService.extractEmail(token));
    }

    @Test
    void requiresConfiguredSecretInProduction() {
        MockEnvironment environment = new MockEnvironment();
        environment.setActiveProfiles("prod");

        assertThrows(
                IllegalStateException.class,
                () -> new JwtService("", 3600000, environment)
        );
    }
}
