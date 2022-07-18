package com.learning.library2.controller;

import com.learning.library2.entity.Publisher;
import com.learning.library2.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class PublisherController {

    @Autowired
    private PublisherService publisherService;

    @GetMapping("/publishers")
    public String findAllPublisher(Model model) {
        model.addAttribute("publishers", publisherService.findAllPublishers());
        return "publishers";
    }

    @GetMapping("/publishers/{id}")
    public String findPublisherById(@PathVariable Long id, Model model) {
        model.addAttribute("publisher", publisherService.findPublisherById(id));
        return "publisher";
    }
    @GetMapping("/publishers/new")
    public String createPublisherForm(Publisher publisher, Model model) {
        if (publisher.getName() == null) {
            publisher = new Publisher();
            model.addAttribute("publisher", publisher);
            model.addAttribute("success", true);
        } else {
            model.addAttribute("success", false);
        }
        return "create-publisher";
    }
    @PostMapping("/publishers")
    public String savePublisher(@ModelAttribute("publisher") Publisher publisher, Model model) {
        boolean existsByName = publisherService.createPublisher(publisher);
        if (!existsByName) {
            model.addAttribute("publisher", publisher);
            model.addAttribute("success", false);
            return createPublisherForm(publisher, model);
        } else {
            return "redirect:/publishers";
        }
    }

    @GetMapping("/publishers/edit/{id}")
    public String updatePublisherForm(@PathVariable Long id, Model model) {
        if (!model.containsAttribute("publisher")) {
            model.addAttribute("publisher", publisherService.findPublisherById(id));
            model.addAttribute("success", true);
        } else {
            model.addAttribute("success", false);
        }
        return "update-publisher";

    }

    @PostMapping("/publishers/{id}")
    public String updatePublisher(@PathVariable Long id, @ModelAttribute("publisher") Publisher publisher, Model model) {
        Publisher publisher1 = publisherService.findPublisherById(id);
        publisher1.setName(publisher.getName());

        boolean isSuccess = publisherService.updatePublisher(publisher1);
        if (isSuccess) {
            return "redirect:/publishers";
        } else {
            return updatePublisherForm(id, model);
        }
    }

    @GetMapping("/publishers/delete/{id}")
    public String deletePublisher(@PathVariable Long id) {
        publisherService.deletePublisher(id);
        return "redirect:/publishers";
    }
}
