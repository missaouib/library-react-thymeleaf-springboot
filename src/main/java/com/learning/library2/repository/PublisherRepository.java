package com.learning.library2.repository;

import com.learning.library2.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    boolean existsByName(String name);

    Publisher findByName(String name);
}
