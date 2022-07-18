package com.learning.library2.repository;

import com.learning.library2.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

    boolean existsByName(String name);

    Author findByName(String name);
}
