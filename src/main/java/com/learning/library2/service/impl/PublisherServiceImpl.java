package com.learning.library2.service.impl;

import com.learning.library2.entity.Publisher;
import com.learning.library2.exception.ResourceNotFoundException;
import com.learning.library2.repository.PublisherRepository;
import com.learning.library2.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PublisherServiceImpl implements PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;

    @Override
    public List<Publisher> findAllPublishers() {
        return publisherRepository.findAll();
    }

    @Override
    public Publisher findPublisherById(Long id) {
        return publisherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publisher not found with Id = " + id));
    }

    @Override
    public boolean createPublisher(Publisher publisher) {
        boolean existsByName = publisherRepository.existsByName(publisher.getName());
        if (existsByName) return false;
        publisherRepository.save(publisher);
        return true;
    }

    @Override
    public boolean updatePublisher(Publisher publisher) {
        Publisher publisherByName = publisherRepository.findByName(publisher.getName());
        if (Objects.isNull(publisherByName) || publisherByName.getId() == publisher.getId()) {
            publisherRepository.save(publisher);
            return true;
        }
        return false;
    }

    @Override
    public void deletePublisher(Long id) {
        Publisher publisher = publisherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Publisher not found with Id = " + id));
        publisherRepository.deleteById(id);
    }
}
