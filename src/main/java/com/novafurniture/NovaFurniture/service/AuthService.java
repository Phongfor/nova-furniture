package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.request.LoginRequest;
import com.novafurniture.NovaFurniture.dto.request.OAuth2TokenRequest;
import com.novafurniture.NovaFurniture.dto.request.RefreshTokenRequest;
import com.novafurniture.NovaFurniture.dto.request.RegisterRequest;
import com.novafurniture.NovaFurniture.dto.response.AuthResponse;
import com.novafurniture.NovaFurniture.dto.response.UserResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    void register(RegisterRequest request);
    AuthResponse refreshToken(RefreshTokenRequest request);
    void logout(String accessToken);
    UserResponse getMe(String accessToken);
    AuthResponse exchangeOAuth2Code(OAuth2TokenRequest request);
}