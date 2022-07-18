package com.learning.library2.repository;

import com.learning.library2.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    //List<Post> findByBookId(Long bookId);

    List<Post> findByBookId(Long id, Pageable pageable);

    Optional<Post> findByUserIdAndBookId(Long userId, Long bookId);
}
