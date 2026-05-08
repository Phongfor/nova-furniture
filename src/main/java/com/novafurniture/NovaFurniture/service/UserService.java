package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.entity.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUserById(Long id);
}