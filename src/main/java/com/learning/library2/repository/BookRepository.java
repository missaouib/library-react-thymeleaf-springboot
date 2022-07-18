package com.learning.library2.repository;

import com.learning.library2.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b from Book b WHERE b.name LIKE %:inputString% OR b.isbn LIKE %:inputString% OR b.serialName LIKE %:inputString%")
    List<Book> findAllByInputString(String inputString);

    boolean existsByIsbn(String isbn);

    Book findByIsbn(String isbn);
}
