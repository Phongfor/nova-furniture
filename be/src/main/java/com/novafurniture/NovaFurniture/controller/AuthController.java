package com.novafurniture.NovaFurniture.controller;

import com.novafurniture.NovaFurniture.common.response.ApiResponse;
import com.novafurniture.NovaFurniture.dto.request.LoginRequest;
import com.novafurniture.NovaFurniture.dto.request.OAuth2TokenRequest;
import com.novafurniture.NovaFurniture.dto.request.RefreshTokenRequest;
import com.novafurniture.NovaFurniture.dto.request.RegisterRequest;
import com.novafurniture.NovaFurniture.dto.response.AuthResponse;
import com.novafurniture.NovaFurniture.dto.response.UserResponse;
import com.novafurniture.NovaFurniture.service.AuthService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {

    AuthService authService;

    @PostMapping("/register")
    public ApiResponse<Void> register(@RequestBody @Valid RegisterRequest request) {
        authService.register(request);
        return ApiResponse.<Void>builder()
                .message("Register successfully. Please login.")
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        return ApiResponse.<AuthResponse>builder()
                .result(authService.login(request))
                .message("Login successfully")
                .build();
    }

    @PostMapping("/oauth2/token")
    public ApiResponse<AuthResponse> exchangeOAuth2Code(
            @RequestBody @Valid OAuth2TokenRequest request) {
        return ApiResponse.<AuthResponse>builder()
                .result(authService.exchangeOAuth2Code(request))
                .message("Token exchanged successfully")
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse> refreshToken(@RequestBody @Valid RefreshTokenRequest request) {
        return ApiResponse.<AuthResponse>builder()
                .result(authService.refreshToken(request))
                .message("Token refreshed successfully")
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        authService.logout(token);
        return ApiResponse.<Void>builder()
                .message("Logout successfully")
                .build();
    }

    @GetMapping("/me")
    public ApiResponse<UserResponse> getMe(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        return ApiResponse.<UserResponse>builder()
                .result(authService.getMe(token))
                .message("Success")
                .build();
    }
}