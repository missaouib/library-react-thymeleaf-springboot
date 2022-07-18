package com.learning.library2.service.impl;

import com.learning.library2.entity.Post;
import com.learning.library2.entity.User;
import com.learning.library2.exception.ResourceNotFoundException;
import com.learning.library2.repository.PostRepository;
import com.learning.library2.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post addPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Long id, Post post) {
        Post post1 = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post does not exists with id = " + id));

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        post.setCreatedAt(dtf.format(LocalDate.now()));
        post1.setStar(post.getStar());
        post1.setComment(post.getComment());
        return postRepository.save(post1);
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post does not exists with id = " + id));
    }

    @Override
    public Post getPostByUserIdAndBookId(Long userId, Long bookId) {
        Optional<Post> post = postRepository.findByUserIdAndBookId(userId, bookId);
        if (post.isPresent()) {
            return postRepository.findByUserIdAndBookId(userId, bookId).get();
        } else {
            return null;
        }

    }


    @Override
    public List<Post> getAllPostByBookId(Long id, Integer page, Integer size, String sort) {
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by("createdAt").ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by("createdAt").descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        return postRepository.findByBookId(id, pageable);

    }
    /*
    @Override
    public List<Post> getAllPostByBookId(Long bookId) {
        return postRepository.findByBookId(bookId);
    }
    */

    @Override
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post does not exists with id = " + id));
        postRepository.deleteById(id);
    }
}
