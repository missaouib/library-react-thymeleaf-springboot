package com.learning.library2.payload.book;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class BookResponse {
    private String isbn;
    private String name;
    private String serialName;
    private String language;
    private String description;
    private String photo;
    private MultipartFile file;
}
