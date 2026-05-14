package com.novafurniture.NovaFurniture.config;

import com.novafurniture.NovaFurniture.security.OAuth2SuccessHandler;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {

    JwtFilter            jwtFilter;
    UserDetailsService   userDetailsService;
    OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeHttpRequests(auth -> auth

                        // ── Public — Auth ────────────────────────────────────────
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/api-docs/**",
                                "/v3/api-docs/**",
                                "/oauth2/**",
                                "/login/oauth2/**"
                        ).permitAll()

                        .requestMatchers(HttpMethod.POST,
                                "/api/v1/auth/register",
                                "/api/v1/auth/login",
                                "/api/v1/auth/refresh",
                                "/api/v1/auth/oauth2/token"
                        ).permitAll()

                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/auth/me"
                        ).authenticated()

                        .requestMatchers(HttpMethod.POST,
                                "/api/v1/auth/logout"
                        ).authenticated()

                        // ── Public — Read only ───────────────────────────────────
                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/products",
                                "/api/v1/products/{id}",
                                "/api/v1/products/slug/{slug}",
                                "/api/v1/categories",
                                "/api/v1/categories/{id}",
                                "/api/v1/brands",
                                "/api/v1/brands/{id}",
                                "/api/v1/reviews/product/{productId}",
                                "/api/v1/reviews/product/{productId}/rating"
                        ).permitAll()

                        // ── ADMIN only ───────────────────────────────────────────
                        .requestMatchers(HttpMethod.POST,
                                "/api/v1/products",
                                "/api/v1/categories",
                                "/api/v1/brands"
                        ).hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/v1/products/{id}",
                                "/api/v1/categories/{id}",
                                "/api/v1/brands/{id}"
                        ).hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/v1/products/{id}",
                                "/api/v1/categories/{id}",
                                "/api/v1/brands/{id}"
                        ).hasRole("ADMIN")

                        // ── ADMIN + STAFF ────────────────────────────────────────
                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/users"
                        ).hasAnyRole("ADMIN", "STAFF")

                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/orders"
                        ).hasAnyRole("ADMIN", "STAFF")

                        .requestMatchers(HttpMethod.PATCH,
                                "/api/v1/orders/{orderId}/status"
                        ).hasAnyRole("ADMIN", "STAFF")

                        // ── Authenticated (USER + STAFF + ADMIN) ─────────────────
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setContentType("application/json;charset=UTF-8");
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write(
                                    "{\"code\":1201,\"message\":\"Unauthenticated\"}"
                            );
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setContentType("application/json;charset=UTF-8");
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.getWriter().write(
                                    "{\"code\":1202,\"message\":\"Unauthorized\"}"
                            );
                        })
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2SuccessHandler)
                );

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}