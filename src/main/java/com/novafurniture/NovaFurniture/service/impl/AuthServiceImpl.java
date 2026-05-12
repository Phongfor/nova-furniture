package com.novafurniture.NovaFurniture.service.impl;

import com.novafurniture.NovaFurniture.dto.request.LoginRequest;
import com.novafurniture.NovaFurniture.dto.request.OAuth2TokenRequest;
import com.novafurniture.NovaFurniture.dto.request.RefreshTokenRequest;
import com.novafurniture.NovaFurniture.dto.request.RegisterRequest;
import com.novafurniture.NovaFurniture.dto.response.AuthResponse;
import com.novafurniture.NovaFurniture.dto.response.UserResponse;
import com.novafurniture.NovaFurniture.entity.User;
import com.novafurniture.NovaFurniture.enums.Role;
import com.novafurniture.NovaFurniture.exception.AppException;
import com.novafurniture.NovaFurniture.exception.ErrorCode;
import com.novafurniture.NovaFurniture.repository.UserRepository;
import com.novafurniture.NovaFurniture.service.AuthService;
import com.novafurniture.NovaFurniture.service.RedisService;
import com.novafurniture.NovaFurniture.util.JwtUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthServiceImpl implements AuthService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    JwtUtil jwtUtil;
    RedisService redisService;

    @Override
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = User.builder()
                .fullname(request.getFullname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .address(request.getAddress())
                .birthday(request.getBirthday())
                .role(Role.USER)
                .enabled(true)
                .build();

        userRepository.save(user);
        log.info("User registered: {}", user.getEmail());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        // Kiểm tra email tồn tại không
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        // Kiểm tra password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        log.info("User logged in: {}", user.getEmail());

        // Tạo token
        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        // Validate refresh token
        if (!jwtUtil.isTokenValid(refreshToken)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        // Lấy email từ refresh token
        String email = jwtUtil.extractEmail(refreshToken);

        // Kiểm tra user tồn tại không
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Tạo access token mới
        String newAccessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());

        log.info("Token refreshed for user: {}", email);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void logout(String accessToken) {
        if (!jwtUtil.isTokenValid(accessToken)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
        // Sau này sẽ thêm blacklist token vào Redis
        log.info("User logged out");
    }

    @Override
    public UserResponse getMe(String accessToken) {
        if (!jwtUtil.isTokenValid(accessToken)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        String email = jwtUtil.extractEmail(accessToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return UserResponse.builder()
                .id(user.getId())
                .fullname(user.getFullname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .avatar(user.getAvatar())
                .birthday(user.getBirthday())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }

    @Override
    public AuthResponse exchangeOAuth2Code(OAuth2TokenRequest request) {
        String code = request.getCode();
        String key  = "oauth2:code:" + code;

        // Kiểm tra code tồn tại trong Redis
        if (!redisService.hasKey(key)) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        // Lấy token từ Redis
        String value = redisService.get(key);

        // Xóa code khỏi Redis — chỉ dùng 1 lần
        redisService.delete(key);

        String[] tokens = value.split("\\|");
        String accessToken  = tokens[0];
        String refreshToken = tokens[1];

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}