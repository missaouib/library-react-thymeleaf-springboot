package com.learning.library2.payload.book;

import lombok.Data;

@Data
public class PostResponse {
    private Long postId;
    private Integer star;
    private String comment;
    private Long bookId;
    private Long userId;
    private String createdAt;

    public PostResponse(Long postId, Integer star, String comment, Long bookId, Long userId, String createdAt) {
        this.postId = postId;
        this.star = star;
        this.comment = comment;
        this.bookId = bookId;
        this.userId = userId;
        this.createdAt = createdAt;
    }
}
