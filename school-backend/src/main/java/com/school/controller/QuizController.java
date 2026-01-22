package com.school.controller;
import com.school.dto.QuizQuestionResponse;
import com.school.dto.QuizResultResponse;
import com.school.dto.QuizSubmitRequest;

import com.school.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@RequiredArgsConstructor
@CrossOrigin
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/start")
    public List<QuizQuestionResponse> startQuiz(
            @RequestParam String level,
            @RequestParam(defaultValue = "en") String language,
            @RequestParam(defaultValue = "10") int limit
    ) throws Exception {

        return quizService.getQuizQuestions(level, language, limit);
    }

    @PostMapping("/submit")
    public QuizResultResponse submitQuiz(
            @RequestHeader("X-USER-ID") Long userId,
            @RequestBody QuizSubmitRequest request

    ) {
//        System.out.println("USER ID = " + userId);
//        System.out.println("REQUEST = " + request);
        return quizService.submitQuiz(userId, request);
    }
    @GetMapping("/questions")
    public List<QuizQuestionResponse> getQuizQuestions(
            @RequestParam String level,
            @RequestParam String language,
            @RequestParam int limit
    ) throws Exception {
//        System.out.println("Quiz API HIT");

        return quizService.getQuizQuestions(level, language, limit);
    }
}
