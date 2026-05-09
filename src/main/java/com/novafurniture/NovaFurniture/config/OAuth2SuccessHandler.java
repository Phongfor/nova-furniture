package com.novafurniture.NovaFurniture.security;

import com.novafurniture.NovaFurniture.entity.User;
import com.novafurniture.NovaFurniture.enums.Role;
import com.novafurniture.NovaFurniture.repository.UserRepository;
import com.novafurniture.NovaFurniture.service.RedisService;
import com.novafurniture.NovaFurniture.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    UserRepository userRepository;
    JwtUtil jwtUtil;
    RedisService redisService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name  = oAuth2User.getAttribute("name");

        // Tìm hoặc tạo user
        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
            log.info("Existing user logged in via Google: {}", email);
        } else {
            user = User.builder()
                    .fullname(name)
                    .email(email)
                    .password("")
                    .role(Role.USER)
                    .enabled(true)
                    .build();
            userRepository.save(user);
            log.info("New user registered via Google: {}", email);
        }

        // Tạo JWT token
        String accessToken  = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        // Tạo one-time code (random UUID)
        String code = UUID.randomUUID().toString();

        // Lưu vào Redis — hết hạn sau 1 phút
        redisService.set("oauth2:code:" + code,
                accessToken + "|" + refreshToken,
                60, TimeUnit.SECONDS);

        log.info("OAuth2 one-time code created for: {}", email);

        // Redirect về frontend kèm code (không phải token)
        response.sendRedirect("http://localhost:3000/oauth2/callback?code=" + code);
    }
}