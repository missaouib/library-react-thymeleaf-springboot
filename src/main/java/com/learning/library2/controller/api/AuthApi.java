package com.learning.library2.controller.api;

import com.learning.library2.entity.ERole;
import com.learning.library2.entity.Role;
import com.learning.library2.entity.User;
import com.learning.library2.entity.Profile;
import com.learning.library2.payload.MessageResponse;
import com.learning.library2.payload.authen.JwtResponse;
import com.learning.library2.payload.authen.LoginRequest;
import com.learning.library2.payload.authen.SignupRequest;
import com.learning.library2.repository.ProfileRepository;
import com.learning.library2.repository.RoleRepository;
import com.learning.library2.repository.UserRepository;
import com.learning.library2.security.JwtUtils;
import com.learning.library2.service.impl.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthApi {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwt(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority()).collect(Collectors.toList());
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Username not exists: " + userDetails.getUsername()));
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), user.getFirstName(), user.getLastName(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
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

        roles.add(userRole);
        user.setRoles(roles);
        Profile profile = new Profile();
        profile.setUser(user);
        user.setProfile(profile);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse(true, "User registered successfully"));
    }
    @ApiIgnore
    @PostMapping("/hi/he/ho")
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
    @GetMapping("/hello")
    public ResponseEntity<MessageResponse> hello() {
        return ResponseEntity.ok(new MessageResponse(true, "OK"));
    }

}
