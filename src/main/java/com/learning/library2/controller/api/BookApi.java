package com.learning.library2.controller.api;

import com.learning.library2.entity.Book;
import com.learning.library2.payload.book.BookRequest;
import com.learning.library2.payload.MessageResponse;
import com.learning.library2.service.AuthorService;
import com.learning.library2.service.BookService;
import com.learning.library2.service.CategoryService;
import com.learning.library2.service.PublisherService;
import com.learning.library2.service.impl.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
public class BookApi {

    @Autowired
    private PublisherService publisherService;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BookService bookService;

    @GetMapping("/all")
    public List<Book> findAllBooks() {
        return bookService.findAllBooks();
    }

    @GetMapping("/{id}")
    public Book findBook(@PathVariable Long id) {
        return bookService.findBookById(id);
    }

    @RequestMapping(value = "/image/{id}", method = RequestMethod.GET,
    produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<InputStreamResource> getImage(@PathVariable Long id) throws IOException {
        Book book = bookService.findBookById(id);
        var imageFile = new ClassPathResource(book.getPhotoImagePath());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(imageFile.getInputStream()));
    }

    @GetMapping("/search")
    public List<Book> searchBook(@Param(value = "inputString") String inputString) {
        return bookService.searchBooks(inputString);
    }


}

