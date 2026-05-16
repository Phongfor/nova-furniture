package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.response.UserResponse;
import com.novafurniture.NovaFurniture.entity.User;

import java.util.List;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
}