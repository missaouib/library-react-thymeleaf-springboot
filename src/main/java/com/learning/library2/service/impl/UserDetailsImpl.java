package com.learning.library2.service.impl;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.learning.library2.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.JoinColumn;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

// custom to serve our expectation
public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUUID = 1L;

    private Long id;
    private String username;
    private String email;

    @JsonIgnore // do not return password
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long id, String username, String email, String password,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    // to create a custom userdetails object
    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(r -> {
            authorities.add(new SimpleGrantedAuthority(r.getRole().name()));
        });
        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }
    //getter and setter

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    // to return a collection of authorities
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    // to return password
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    // check if account is non expired
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // check if account is non locked
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
