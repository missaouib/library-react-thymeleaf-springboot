package com.learning.library2.controller.api;

import com.learning.library2.entity.*;
import com.learning.library2.payload.MessageResponse;
import com.learning.library2.payload.authen.JwtResponse;
import com.learning.library2.payload.authen.SignupRequest;
import com.learning.library2.payload.authen.UserProfileRequest;
import com.learning.library2.payload.book.BookRequest;
import com.learning.library2.repository.RoleRepository;
import com.learning.library2.repository.UserRepository;
import com.learning.library2.service.*;
import com.learning.library2.service.impl.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminApi {

    @Autowired
    private PublisherService publisherService;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<JwtResponse> getUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return ResponseEntity.ok(new JwtResponse(user.getId(), user.getUsername(),
                user.getEmail(), user.getFirstName(), user.getLastName()));
    }

    @PutMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserProfileRequest userProfileRequest) {
        User user1 = userService.findUserById(id);
        Profile profile = user1.getProfile();
        user1.setEmail(userProfileRequest.getEmail());
        user1.setFirstName(userProfileRequest.getFirstName());
        user1.setLastName(userProfileRequest.getLastName());
        profile.setUser(user1);
        profile.setMobile(userProfileRequest.getMobile());
        profile.setAddress1(userProfileRequest.getAddress1());
        profile.setAddress2(userProfileRequest.getAddress2());
        profile.setDateOfBirth(userProfileRequest.getDateOfBirth());
        profile.setCity(userProfileRequest.getCity());
        profile.setDistrict(userProfileRequest.getDistrict());
        profile.setWard(userProfileRequest.getWard());
        profile.setGender(userProfileRequest.getGender());
        user1.setProfile(profile);
        boolean success = userService.updateUser(user1);
        if (!success) {
            return ResponseEntity.ok(new MessageResponse(false, "Email already exists!"));
        }
        return ResponseEntity.ok().body(new MessageResponse(true, "User updated successfully!"));
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body(new MessageResponse(true, "User deleted successfully"));
    }

    @GetMapping("/hello")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> hello() {
        return ResponseEntity.ok(new MessageResponse(true, "OK"));
    }

    @ApiIgnore
    @PostMapping("/hoho")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> add(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse(false, "Error: Username is already took"));
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse(false, "Error: Email is already took"));

        }
        // create new user's account
        User user = new User(signupRequest.getUsername(), signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()));
        Set<Role> roles = new HashSet<>();
        // only user create here
        Role userRole = roleRepository.findByRole(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role USER is not found"));

        if (signupRequest.getFirstName() != null) user.setFirstName(signupRequest.getFirstName());
        if (signupRequest.getLastName() != null) user.setLastName(signupRequest.getLastName());
        Role adminRole = roleRepository.findByRole(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role ADMIN is not found"));

        roles.add(userRole);
        roles.add(adminRole);
        user.setRoles(roles);
        Profile profile = new Profile();
        profile.setUser(user);
        user.setProfile(profile);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse(true, "User registered successfully"));
    }

    /* for book controller */
    @PostMapping("/book")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addBook(@RequestPart(name = "image", required = false) MultipartFile multipartFile, @RequestPart("book") BookRequest book) throws IOException {
        Book book1 = new Book();
        book1.setIsbn(book.getIsbn());
        book1.setName(book.getName());
        book1.setSerialName(book.getSerialName());
        book1.setLanguage(book.getLanguage());
        book1.setDescription(book.getDescription());
        book1.getAuthors().add(authorService.findAuthorById(book.getAuthorId()));
        book1.getCategories().add(categoryService.findCategoryById(book.getCategoryId()));
        book1.getPublishers().add(publisherService.findPublisherById(book.getPublisherId()));
        String fileName = "";
        if (multipartFile != null)
            fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        if (fileName.length() > 0) {
            book1.setPhoto(fileName);
        }

        boolean isSuccess = bookService.createBook(book1);
        if (isSuccess) {
            if (fileName.length() > 0) {
                String uploadDir = "book-photos";
                FileUploadUtil.saveFile(uploadDir, book.getIsbn() + "-" + fileName, multipartFile);
            }
            return ResponseEntity.ok().body(new MessageResponse(true, "Book added successfully!"));
        }
        else {
            return ResponseEntity.ok().body(new MessageResponse(false, "Book isbn already exists!"));
        }
    }

    @PutMapping("/book/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestPart(name = "image", required = false) MultipartFile multipartFile, @RequestPart("book") BookRequest book) throws IOException {
        Book book1 = bookService.findBookById(id);
        String deleteFile = book1.getPhoto();
        String deleteIsbn = book1.getIsbn();
        book1.setIsbn(book.getIsbn());
        book1.setName(book.getName());
        book1.setSerialName(book.getSerialName());
        book1.setLanguage(book.getLanguage());
        book1.setDescription(book.getDescription());

        book1.getAuthors().clear();
        book1.getCategories().clear();
        book1.getPublishers().clear();

        book1.getAuthors().add(authorService.findAuthorById(book.getAuthorId()));
        book1.getCategories().add(categoryService.findCategoryById(book.getCategoryId()));
        book1.getPublishers().add(publisherService.findPublisherById(book.getPublisherId()));
        String fileName = "";
        if (multipartFile != null)
            fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
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
            return ResponseEntity.ok().body(new MessageResponse(true, "Book updated successfully!"));
        }
        else {
            return ResponseEntity.ok().body(new MessageResponse(false, "Book isbn already exists!"));
        }
    }

    @DeleteMapping("/book/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) throws IOException{
        Book book = bookService.findBookById(id);
        String fileName = book.getPhotoImagePath();
        if (book.getPhotoImagePath() != null && fileName.length() > 0) {
            String deleteDir = "book-photos";
            FileUploadUtil.deleteFile(deleteDir, book.getIsbn() + "-" + book.getPhoto());
        }
        bookService.deleteBook(id);
        return ResponseEntity.ok().body(new MessageResponse(true, "Book deleted successfully"));
    }

    /* for category controller */
    @PostMapping("/category")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addCategory(@RequestBody Category category) {
        boolean isSuccess = categoryService.createCategory(category);
        if (isSuccess) {
            return ResponseEntity.ok().body(new MessageResponse(true, "Category added successfully!"));
        }
        else {
            return ResponseEntity.ok().body(new MessageResponse(false, "Category name already exists!"));
        }
    }

    @PutMapping("/category/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category category1 = categoryService.findCategoryById(id);
        category1.setName(category.getName());
        boolean isSuccess = categoryService.updateCategory(category1);
        if (isSuccess) {
            return ResponseEntity.ok().body(new MessageResponse(true, "Category updated successfully"));
        } else {
            return ResponseEntity.ok().body(new MessageResponse(false, "Category name already exists"));
        }
    }


    @DeleteMapping("/category/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().body(new MessageResponse(true, "Category deleted successfully"));
    }

    /* for publisher controller */
    @PostMapping("/publisher")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addPublisher(@RequestBody Publisher publisher) {
        boolean isSuccess = publisherService.createPublisher(publisher);
        if (isSuccess) {
            return ResponseEntity.ok().body(new MessageResponse(true, "Publisher added successfully!"));
        }
        else {
            return ResponseEntity.ok().body(new MessageResponse(false, "Publisher name already exists!"));
        }
    }

    @PutMapping("/publisher/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePublisher(@PathVariable Long id, @RequestBody Publisher publisher) {
        Publisher publisher1 = publisherService.findPublisherById(id);
        publisher1.setName(publisher.getName());
        boolean isSuccess = publisherService.updatePublisher(publisher1);
        if (isSuccess) {
            return ResponseEntity.ok().body(new MessageResponse(true, "Publisher updated successfully"));
        } else {
            return ResponseEntity.ok().body(new MessageResponse(false, "Publisher name already exists"));
        }
    }

    @DeleteMapping("/publisher/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePublisher(@PathVariable Long id) {
        publisherService.deletePublisher(id);
        return ResponseEntity.ok().body(new MessageResponse(true, "Publisher deleted successfully"));
    }

    /* for author controller */
    @PostMapping("/author")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addAuthor(@RequestBody Author author) {
        boolean isSuccess = authorService.createAuthor(author);
        if (isSuccess) {
            return ResponseEntity.ok().body(new MessageResponse(true, "Author added successfully!"));
        }
        else {
            return ResponseEntity.ok().body(new MessageResponse(false, "Author name already exists!"));
        }
    }

    @PutMapping("/author/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateAuthor(@PathVariable Long id, @RequestBody Author author) {
        Author author1 = authorService.findAuthorById(id);
        author1.setName(author.getName());
        author1.setDescription(author.getDescription());
        boolean isSuccess = authorService.updateAuthor(author1);
        if (isSuccess) {
            return ResponseEntity.ok().body(new MessageResponse(true, "Author updated successfully"));
        } else {
            return ResponseEntity.ok().body(new MessageResponse(false, "Author name already exists"));
        }
    }

    @DeleteMapping("/author/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteAuthor(@PathVariable Long id) {
        authorService.deleteAuthor(id);
        return ResponseEntity.ok().body(new MessageResponse(true, "Author deleted successfully"));
    }

}
