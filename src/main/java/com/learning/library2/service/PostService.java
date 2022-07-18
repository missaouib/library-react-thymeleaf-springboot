package com.learning.library2.service;

import com.learning.library2.entity.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {

    Post addPost(Post post);

    Post updatePost(Long id, Post post);

    Post getPostById(Long id);

    Post getPostByUserIdAndBookId(Long userId, Long bookId);

    List<Post> getAllPostByBookId(Long bookId, Integer page, Integer size, String sort);

    void deletePost(Long id);
}
