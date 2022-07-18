package com.learning.library2.controller.api;

import com.learning.library2.entity.Book;
import com.learning.library2.entity.Post;
import com.learning.library2.entity.Profile;
import com.learning.library2.entity.User;
import com.learning.library2.payload.MessageResponse;
import com.learning.library2.payload.authen.JwtResponse;
import com.learning.library2.payload.authen.UserProfileRequest;
import com.learning.library2.payload.authen.UserProfileResponse;
import com.learning.library2.payload.book.PostResponse;
import com.learning.library2.service.BookService;
import com.learning.library2.service.PostService;
import com.learning.library2.service.ProfileService;
import com.learning.library2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserApi {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private PostService postService;

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}")
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

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<JwtResponse> getUserById(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return ResponseEntity.ok(new JwtResponse(user.getId(), user.getUsername(),
                user.getEmail(), user.getFirstName(), user.getLastName()));
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<User> getUserById1(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/profile/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Profile> getProfileByUserId(@PathVariable Long id) {
        //Profile profile = profileService.getProfileById(id);
        Profile profile = profileService.getProfileByUserId(id);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/full/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getFullUserById(@PathVariable Long id) {
        //Profile profile = profileService.getProfileById(id);
        User user = userService.findUserById(id);
        Profile profile = user.getProfile();
        return ResponseEntity.ok(new UserProfileResponse(user.getId(), user.getUsername(), user.getEmail(),
                user.getFirstName(), user.getLastName(), profile.getMobile(), profile.getGender(),
                profile.getDateOfBirth(), profile.getAddress1(), profile.getAddress2(),
                profile.getWard(), profile.getDistrict(), profile.getCity()));
    }

    @GetMapping("/{userId}/post/{bookId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getPostByUserIdAndBookId(@PathVariable("userId") Long userId, @PathVariable("bookId") Long bookId) {
        User user = userService.findUserById(userId);
        Book book = bookService.findBookById(bookId);
        Post post = postService.getPostByUserIdAndBookId(userId, bookId);
        if (post == null) {
            return ResponseEntity.ok(new MessageResponse(false, "You have no post."));
        }
        return ResponseEntity.ok(new PostResponse(post.getId(), post.getStar(), post.getComment(), bookId, userId, post.getCreatedAt()));
    }
    @PostMapping("/{userId}/post/{bookId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addPost(@PathVariable("userId") Long userId, @PathVariable("bookId") Long bookId, @RequestBody Post post) {
        User user = userService.findUserById(userId);
        Book book = bookService.findBookById(bookId);
        book.addPosts(post);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        post.setCreatedAt(dtf.format(LocalDate.now()));
        post.setUser(user);
        post.setBook(book);
        return ResponseEntity.ok(new PostResponse(postService.addPost(post).getId(),
                        post.getStar(), post.getComment(), bookId, userId, post.getCreatedAt()));
    }

    @PutMapping("/post/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post post) {
        postService.updatePost(id, post);
        return ResponseEntity.ok(new MessageResponse(true, "Post is updated successfully!"));
    }

    @DeleteMapping("/post/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok(new MessageResponse(true, "Post is deleted successfully!"));
    }
}
