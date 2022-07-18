package com.learning.library2.service;

import com.learning.library2.entity.Author;
import com.learning.library2.entity.Publisher;

import java.util.List;

public interface PublisherService {

    List<Publisher> findAllPublishers();

    Publisher findPublisherById(Long id);

    boolean createPublisher(Publisher publisher);

    boolean updatePublisher(Publisher publisher);

    void deletePublisher(Long id);
}
