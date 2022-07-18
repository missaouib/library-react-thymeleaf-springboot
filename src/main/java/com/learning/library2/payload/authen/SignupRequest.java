package com.learning.library2.payload.authen;

import lombok.Data;

import java.util.Set;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Set<String> roles;
}
