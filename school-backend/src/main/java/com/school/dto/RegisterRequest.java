package com.school.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String role; // STUDENT or TEACHER

    private String fullName;

    // STUDENT FIELDS
    private String grade;
    private String language;

    // TEACHER FIELDS
    private String subject;
    private String schoolName;
}
