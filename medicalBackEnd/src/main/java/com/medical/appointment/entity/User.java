package com.medical.appointment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    private String password; // encoded

    @Enumerated(EnumType.STRING)
    private Role role;

    private String contactNumber;
    private String city;
    private Integer age;
    private String gender;
    private String speciality;
    private String address;
}
