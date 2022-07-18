package com.learning.library2.service.impl;


import com.learning.library2.entity.Profile;
import com.learning.library2.exception.ResourceNotFoundException;
import com.learning.library2.repository.ProfileRepository;
import com.learning.library2.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public List<Profile> getProfiles() {
        return profileRepository.findAll();
    }

    @Override
    public Profile getProfileById(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found with id=" + id));
    }

    @Override
    public Profile addProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public Profile updateProfile( Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public void deleteProfile(Long id) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found with id=" + id));
        profileRepository.deleteById(id);
    }

    @Override
    public Profile getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }
}

