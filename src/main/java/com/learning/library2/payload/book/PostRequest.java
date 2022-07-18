package com.learning.library2.payload.book;

import lombok.Data;

@Data
public class PostRequest {
    private Integer star;
    private String comment;
    private Long bookId;
    private Long userId;

    public PostRequest(Integer star, String comment, Long bookId, Long userId) {
        this.star = star;
        this.comment = comment;
        this.bookId = bookId;
        this.userId = userId;
    }
}
