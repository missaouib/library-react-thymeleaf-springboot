package com.learning.library2.service.impl;

import com.learning.library2.entity.Author;
import com.learning.library2.exception.ResourceNotFoundException;
import com.learning.library2.repository.AuthorRepository;
import com.learning.library2.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Propagation;
//import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class AuthorServiceImpl implements AuthorService {

    /*
    private final AuthorRepository authorRepository;

    public AuthorServiceImpl(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }
    */
    @Autowired
    private AuthorRepository authorRepository;

    @Override
    //@Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Author> findAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Author findAuthorById(Long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Author not found with Id = " + id));
    }

    @Override
    public boolean createAuthor(Author author) {
        boolean existsByName = authorRepository.existsByName(author.getName());
        if (existsByName) return false;
        else {
            authorRepository.save(author);
            return true;
        }
    }

    @Override
    public boolean updateAuthor(Author author) {
        Author authorByName = authorRepository.findByName(author.getName());
        if (Objects.isNull(authorByName) || author.getId() == authorByName.getId()) {
            authorRepository.save(author);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void deleteAuthor(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Author not found with Id = " + id));
        authorRepository.deleteById(id);
    }
}
