package com.school.service;

import com.school.dto.*;
import com.school.entity.*;
import com.school.repository.*;
import com.school.utils.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void register(RegisterRequest req) {

        if (!req.getRole().equalsIgnoreCase("STUDENT") &&
                !req.getRole().equalsIgnoreCase("TEACHER")) {
            throw new RuntimeException("Invalid role");
        }

        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(req.getRole().toUpperCase())
                .status("ACTIVE")
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        if ("STUDENT".equalsIgnoreCase(req.getRole())) {
            Student student = Student.builder()
                    .user(user)
                    .email(req.getEmail())
                    .fullName(req.getFullName())
                    .grade(req.getGrade())
                    .schoolName(req.getSchoolName())
                    .language(req.getLanguage())
                    .build();
            studentRepository.save(student);
        }

        if ("TEACHER".equalsIgnoreCase(req.getRole())) {
            Teacher teacher = Teacher.builder()
                    .user(user)
                    .email(req.getEmail())
                    .fullName(req.getFullName())
                    .subject(req.getSubject())
                    .schoolName(req.getSchoolName())
                    .build();
            teacherRepository.save(teacher);
        }
    }

    public AuthResponse login(LoginRequest req) {

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse(token, user.getRole());
    }
}
