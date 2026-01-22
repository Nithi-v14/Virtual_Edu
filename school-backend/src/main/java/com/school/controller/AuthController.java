package com.school.controller;

import com.school.dto.*;
import com.school.entity.Question;
import com.school.repository.QuestionRepository;
import com.school.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
    private final QuestionRepository questionRepository;
    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return "Registration successful";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        System.out.println("Login request: " + request);
        return authService.login(request);
    }
    @GetMapping("/questions")
    public List<Question> getQuestions(
            @RequestParam String level,int limit) {
        return questionRepository.findByLevel(level,limit);
    }

}
