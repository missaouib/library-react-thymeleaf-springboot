package com.learning.library2.payload.book;
import lombok.Data;

@Data
public class BookRequest {
    private String isbn;
    private String name;
    private String serialName;
    private String language;
    private String description;
    private Long authorId;
    private Long categoryId;
    private Long publisherId;
}
