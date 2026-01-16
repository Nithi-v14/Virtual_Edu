package com.school.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuizResultResponse {

    private int totalQuestions;
    private int correctAnswers;
    private int score;
}
