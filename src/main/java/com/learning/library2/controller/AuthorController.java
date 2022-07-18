package com.learning.library2.controller;

import com.learning.library2.entity.Author;
import com.learning.library2.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping("/authors")
    public String findAllAuthors(Model model) {
        model.addAttribute("authors", authorService.findAllAuthors());
        return "authors";
    }

    @GetMapping("/authors/{id}")
    public String findAuthorById(@PathVariable Long id, Model model) {
        model.addAttribute("author", authorService.findAuthorById(id));
        return "author";
    }

    @GetMapping("/authors/new")
    public String createAuthorForm(Author author, Model model) {
        // create author object to hold author form data
        if (author.getName() == null) {
            author = new Author();
            model.addAttribute("author", author);
            model.addAttribute("success", true);
        } else {
            model.addAttribute("success", false);
        }
        return "create-author";
    }

    @PostMapping("/authors")
    public String saveAuthor(@ModelAttribute("author") Author author, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "create-author";
        }
        boolean isSuccess = authorService.createAuthor(author);
        if (isSuccess) return "redirect:/authors";
        else {
            model.addAttribute("author", author);
            model.addAttribute("success", false);
            return createAuthorForm(author, model);
        }
    }

    @GetMapping("/authors/edit/{id}")
    public String updateAuthorForm(@PathVariable Long id, Model model) {
        if (!model.containsAttribute("author")) {
            // load author object to hold author form data
            model.addAttribute("author", authorService.findAuthorById(id));
            model.addAttribute("success", true);
        } else {
            model.addAttribute("success", false);
        }
        return "update-author";
    }

    @PostMapping("/authors/{id}")
    public String updateAuthor(@PathVariable Long id, @ModelAttribute("author") Author author,
                               Model model, BindingResult result) {
        if (result.hasErrors()) {
            return "update-author";
        }
        // get author form database by id
        Author author1 = authorService.findAuthorById(id);
        author1.setName(author.getName());
        author1.setDescription(author.getDescription());
        //  save updated author to object
        boolean isSuccess = authorService.updateAuthor(author1);
        if (isSuccess) return "redirect:/authors";
        else {
            return updateAuthorForm(id, model);
        }

    }
    @GetMapping("/authors/delete/{id}")
    public String deleteAuthor(@PathVariable Long id ) {
        authorService.deleteAuthor(id);
        return "redirect:/authors";
    }
}
