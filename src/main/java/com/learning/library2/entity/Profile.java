package com.learning.library2.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@Table(name = "profile")
public class Profile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mobile")
    @Size(max = 15)
    private String mobile;

    // 0: unknown, 1: male, female
    private Integer gender = 0;

    @Temporal(TemporalType.DATE)
    @Column(name = "dob")
    private Date dateOfBirth;

    private String address1;

    private String address2;

    private String ward;

    private String district;

    private String city;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public Profile() {

    }

    public Profile(String mobile, Integer gender, Date dateOfBirth, String address1, String address2, String ward, String district, String city) {
        this.mobile = mobile;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address1 = address1;
        this.address2 = address2;
        this.ward = ward;
        this.district = district;
        this.city = city;
    }
    public Profile(String mobile, Date dateOfBirth, String address1, String address2, String ward, String district, String city) {
        this.mobile = mobile;
        this.dateOfBirth = dateOfBirth;
        this.address1 = address1;
        this.address2 = address2;
        this.ward = ward;
        this.district = district;
        this.city = city;
    }

}
