package com.medical.appointment.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Agent {
 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String name;
 private String contactNumber;
 private String email;
 private String status; 
}
