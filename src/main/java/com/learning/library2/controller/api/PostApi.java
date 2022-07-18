package com.learning.library2.controller.api;

import com.learning.library2.entity.Post;
import com.learning.library2.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostApi {

    @Autowired
    private PostService postService;

    @GetMapping("/{bookId}")
    public List<Post> getAllPostByBookId(@PathVariable Long bookId,
                                          @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
                                          @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
                                          @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort) {
        return postService.getAllPostByBookId(bookId, page, size, sort);
    }
}
