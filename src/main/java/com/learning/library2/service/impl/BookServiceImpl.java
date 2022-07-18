package com.learning.library2.service.impl;

import com.learning.library2.entity.Book;
import com.learning.library2.exception.ResourceNotFoundException;
import com.learning.library2.repository.BookRepository;
import com.learning.library2.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> searchBooks(String inputString) {
        if (inputString != null) {
            return bookRepository.findAllByInputString(inputString);
        }
        return bookRepository.findAll();
    }

    @Override
    public Book findBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Book not found with ID %d", id)));
    }

    @Override
    public boolean createBook(Book book) {
        boolean existByIsbn = bookRepository.existsByIsbn(book.getIsbn());
        if (existByIsbn) {
            return false;
        }
        bookRepository.save(book);
        return true;
    }

    @Override
    public boolean updateBook(Book book) {
        Book bookByIsbn = bookRepository.findByIsbn(book.getIsbn());
        if (Objects.isNull(bookByIsbn) || book.getId() == bookByIsbn.getId()) {
            bookRepository.save(book);
            return true;
        }
        return false;
    }

    @Override
    public Book createBook1(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook1(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Book not found with ID %d", id)));
        bookRepository.deleteById(id);
    }
}
