package com.learning.library2.service;

import com.learning.library2.entity.Book;

import java.io.IOException;
import java.util.List;

public interface BookService {

    List<Book> findAllBooks();

    List<Book> searchBooks(String inputString);

    Book findBookById(Long id);

    boolean createBook(Book book);

    boolean updateBook(Book book);

    Book createBook1(Book book);

    Book updateBook1(Book book);

    void deleteBook(Long id);
}
