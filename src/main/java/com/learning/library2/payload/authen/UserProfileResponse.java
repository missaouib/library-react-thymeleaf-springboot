package com.learning.library2.payload.authen;

import com.learning.library2.entity.Gender;
import lombok.Data;

import java.util.Date;

@Data
public class UserProfileResponse {

    private Long userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String mobile;
    private Integer gender;
    private Date dateOfBirth;
    private String address1;
    private String address2;
    private String city;
    private String district;
    private String ward;

    public UserProfileResponse(Long userId, String username, String email, String firstName, String lastName, String mobile, Integer gender, Date dateOfBirth, String address1, String address2, String ward, String district, String city) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.district = district;
        this.ward = ward;
    }
}
