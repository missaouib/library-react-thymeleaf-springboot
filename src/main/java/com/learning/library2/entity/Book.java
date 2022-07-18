package com.learning.library2.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "isbn", length = 50, nullable = false, unique = true)
    private String isbn;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "serial_name", length = 50, nullable = false)
    private String serialName;

    @Column(name = "description", length = 2000)
    private String description;

    @Column(name = "language", length = 50)
    private String language;

    @Column(name = "photo", nullable = true, length = 255)
    private String photo;


    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "books_authors", joinColumns = {@JoinColumn(name = "book_id")},
            inverseJoinColumns = {@JoinColumn(name = "author_id")})
    private Set<Author> authors = new HashSet<Author>();


    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "books_categories", joinColumns = {@JoinColumn(name = "book_id")},
        inverseJoinColumns = {@JoinColumn(name = "category_id")})
    private Set<Category> categories = new HashSet<Category>();


    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "books_publishers", joinColumns = {@JoinColumn(name = "book_id")},
        inverseJoinColumns = {@JoinColumn(name = "publisher_id")})
    private Set<Publisher> publishers = new HashSet<Publisher>();

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Post> posts;

    public Book(String isbn, String name, String serialName, String description, String language) {
        this.isbn = isbn;
        this.name = name;
        this.serialName = serialName;
        this.description = description;
        this.language = language;
    }

    public void addPosts(Post post) {
        this.posts.add(post);
    }
    public void removePosts(Post post) {
        this.posts.remove(post);
    }
    public void addAuthors(Author author) {
        this.authors.add(author);
        author.getBooks().add(this);
    }

    public void addCategories(Category category) {
        this.categories.add(category);
        category.getBooks().add(this);
    }
    public void addPublisher(Publisher publisher) {
        this.publishers.add(publisher);
        publisher.getBooks().add(this);
    }

    public void removeAuthors(Author author) {
        this.authors.remove(author);
        author.getBooks().remove(this);
    }

    public void removeCategories(Category category) {
        this.categories.remove(category);
        category.getBooks().remove(this);
    }

    public void removePublisher(Publisher publisher) {
        this.publishers.remove(publisher);
        publisher.getBooks().remove(this);
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    @Transient
    public String getPhotoImagePath() {
        if (photo == null || id == null) return null;
        return "/book-photos/" + isbn + "-" + photo;
    }
}
