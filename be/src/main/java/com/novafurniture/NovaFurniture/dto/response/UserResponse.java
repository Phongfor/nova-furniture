package com.novafurniture.NovaFurniture.dto.response;

import com.novafurniture.NovaFurniture.enums.Role;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String fullname;
    private String email;
    private String phone;
    private String address;
    private String avatar;
    private LocalDate birthday;
    private Role role;
    private LocalDateTime createdAt;
}