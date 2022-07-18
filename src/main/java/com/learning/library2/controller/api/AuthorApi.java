package com.learning.library2.controller.api;

import com.learning.library2.entity.Author;
import com.learning.library2.payload.MessageResponse;
import com.learning.library2.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/authors")
public class AuthorApi {

    @Autowired
    private AuthorService authorService;

    @GetMapping("/all")
    public List<Author> findAllAuthors() {
        return authorService.findAllAuthors();
    }

    @GetMapping("/{id}")
    public Author findAuthor(@PathVariable Long id) {
        return authorService.findAuthorById(id);
    }

}
