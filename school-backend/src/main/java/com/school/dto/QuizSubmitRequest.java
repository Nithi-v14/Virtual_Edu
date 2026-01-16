package com.school.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizSubmitRequest {

    private String level;
    private List<AnswerDTO> answers;
}
