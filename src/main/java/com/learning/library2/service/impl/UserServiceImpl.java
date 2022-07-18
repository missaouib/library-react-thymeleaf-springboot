package com.learning.library2.service.impl;

import com.learning.library2.entity.User;
import com.learning.library2.exception.ResourceNotFoundException;
import com.learning.library2.repository.UserRepository;
import com.learning.library2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id = " + id));
    }

    @Override
    public boolean updateUser(User user) {
        User existsByEmail= userRepository.findByEmail(user.getEmail());
        if (Objects.isNull(existsByEmail) || existsByEmail.getId() == user.getId()) {
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with Id = " + id));
        userRepository.deleteById(id);
    }
}
