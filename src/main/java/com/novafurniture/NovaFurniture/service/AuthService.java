package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.request.LoginRequest;
import com.novafurniture.NovaFurniture.dto.request.RegisterRequest;
import com.novafurniture.NovaFurniture.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    AuthResponse register(RegisterRequest request);
}