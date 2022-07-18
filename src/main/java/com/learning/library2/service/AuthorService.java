package com.learning.library2.service;

import com.learning.library2.entity.Author;

import java.util.List;

public interface AuthorService {

    List<Author> findAllAuthors();

    Author findAuthorById(Long id);

    boolean createAuthor(Author author);

    boolean updateAuthor(Author author);

    void deleteAuthor(Long id);

}
