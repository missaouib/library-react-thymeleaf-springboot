package com.learning.library2.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Data
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer star = 0;
    private String comment;
    private String createdAt;


    @ManyToOne(fetch =FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.PERSIST})
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch =FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.PERSIST})
    @JoinColumn(name = "book_id")
    private Book book;

    public Post() {}

    public Post(Integer star, String comment) {
        this.star = star;
        this.comment = comment;

    }

    public Post(String comment) {
        this.star = 0;
        this.comment = comment;
    }
}
