package com.learning.library2.controller;

import com.learning.library2.entity.Book;
import com.learning.library2.service.AuthorService;
import com.learning.library2.service.BookService;
import com.learning.library2.service.CategoryService;
import com.learning.library2.service.PublisherService;
import com.learning.library2.service.impl.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PublisherService publisherService;

    @Autowired
    private AuthorService authorService;

    @GetMapping("/books")
    public String findAllBooks(Model model) {
        model.addAttribute("books", bookService.findAllBooks());
        return "books";
    }

    @GetMapping("/books/{id}")
    public String findBookById(@PathVariable Long id, Model model) {
        Book book = bookService.findBookById(id);
        model.addAttribute("book", book);
        return "book";
    }

    @GetMapping("/search-book")
    public String searchBook(@Param("inputString") String inputString, Model model) {
        model.addAttribute("books", bookService.searchBooks(inputString));
        model.addAttribute("inputString", inputString);
        return "books";
    }

    @GetMapping("/books/new")
    public String createBookForm(Book book, Model model) {
        if (book.getIsbn() == null) {
            book = new Book();
            model.addAttribute("book", book);
            model.addAttribute("categories", categoryService.findAllCategories());
            model.addAttribute("authors", authorService.findAllAuthors());
            model.addAttribute("publishers", publisherService.findAllPublishers());
            model.addAttribute("success", true);
        }
        else {
            model.addAttribute("success", false);
        }
        return "create-book";
    }

    @PostMapping("/books")
    public String saveBook(@ModelAttribute("book") Book book, @RequestParam(value = "image") MultipartFile multipartFile, Model model) throws IOException {
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        if (fileName.length() > 0) {
            book.setPhoto(fileName);
        }

        boolean isSuccess = bookService.createBook(book);
        if (isSuccess) {
            if (fileName.length() > 0) {
                String uploadDir = "book-photos";
                FileUploadUtil.saveFile(uploadDir, book.getIsbn() + "-" + fileName, multipartFile);
            }
            return "redirect:/books";
        } else {
            model.addAttribute("categories", categoryService.findAllCategories());
            model.addAttribute("authors", authorService.findAllAuthors());
            model.addAttribute("publishers", publisherService.findAllPublishers());
            model.addAttribute("book", book);
            model.addAttribute("success", false);
            return createBookForm(book, model);
        }
    }

    @GetMapping("/books/edit/{id}")
    public String updateBookForm(@PathVariable Long id, Model model) {
        if (!model.containsAttribute("book")) {
            model.addAttribute("book", bookService.findBookById(id));
            model.addAttribute("success", true);
            model.addAttribute("categories", categoryService.findAllCategories());
            model.addAttribute("authors", authorService.findAllAuthors());
            model.addAttribute("publishers", publisherService.findAllPublishers());
        } else {
            model.addAttribute("categories", categoryService.findAllCategories());
            model.addAttribute("authors", authorService.findAllAuthors());
            model.addAttribute("publishers", publisherService.findAllPublishers());
            model.addAttribute("success", false);
        }
        return "update-book";
    }
    @PostMapping("/books/{id}")
    public String updateBook(@PathVariable Long id, @RequestParam("image") MultipartFile multipartFile,
                             @ModelAttribute("book") Book book, Model model) throws IOException{
        Book book1 = bookService.findBookById(id);
        String deleteFile = book1.getPhoto();
        String deleteIsbn = book1.getIsbn();
        book1.setIsbn(book.getIsbn());
        book1.setName(book.getName());
        book1.setDescription(book.getDescription());
        book1.setSerialName(book.getSerialName());
        book1.setLanguage(book.getLanguage());
        book1.setAuthors(book.getAuthors());
        book1.setCategories(book.getCategories());
        book1.setPublishers(book.getPublishers());
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        if (fileName.length() > 0) {
            book1.setPhoto(fileName);
        }
        boolean isSuccess = bookService.updateBook(book1);
        if (isSuccess) {
            if (fileName.length() > 0) {
                if (deleteFile != null) {
                    String deleteDir = "book-photos";
                    FileUploadUtil.deleteFile(deleteDir, deleteIsbn + "-" + deleteFile);
                }

                String uploadDir = "book-photos";
                FileUploadUtil.saveFile(uploadDir, book1.getIsbn() +"-" + fileName, multipartFile);
            }
            return "redirect:/books";
        } else {
            return updateBookForm(id, model);
        }
    }

    @GetMapping("/books/delete/{id}")
    public String deleteBook(@PathVariable Long id) throws IOException{
        Book book = bookService.findBookById(id);
        String fileName = book.getPhotoImagePath();
        if (book.getPhotoImagePath() != null && fileName.length() > 0) {
            String deleteDir = "book-photos";
            FileUploadUtil.deleteFile(deleteDir, book.getIsbn() + "-" + book.getPhoto());
        }
        bookService.deleteBook(id);
        return "redirect:/books";
    }
}
