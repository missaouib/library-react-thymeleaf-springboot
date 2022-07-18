package com.learning.library2.service;

import com.learning.library2.entity.Profile;

import java.util.List;

public interface ProfileService {

    List<Profile> getProfiles();

    Profile getProfileById(Long id);

    Profile addProfile(Profile profile);

    Profile updateProfile(Profile profile);

    void deleteProfile(Long id);

    Profile getProfileByUserId(Long userId);
}
