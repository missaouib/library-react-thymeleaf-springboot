package com.learning.library2.payload;

import lombok.Data;

@Data
public class MessageResponse {
    private boolean success;
    private String message;

    public MessageResponse() {}
    public MessageResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
