package com.learning.library2.service;

import com.learning.library2.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<User> getAllUsers();

    User findUserById(Long id);

    boolean updateUser(User user);

    void deleteUser(Long id);




}
