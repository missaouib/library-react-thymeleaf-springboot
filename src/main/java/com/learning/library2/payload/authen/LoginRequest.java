package com.learning.library2.payload.authen;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
