package com.learning.library2.controller.api;

import com.learning.library2.entity.Publisher;
import com.learning.library2.payload.MessageResponse;
import com.learning.library2.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/publishers")
public class PublisherApi {

    @Autowired
    private PublisherService publisherService;

    @GetMapping("/all")
    public List<Publisher> findAllCategories() {
        return publisherService.findAllPublishers();
    }

    @GetMapping("/{id}")
    public Publisher findCategory(@PathVariable Long id) {
        return publisherService.findPublisherById(id);
    }


}

