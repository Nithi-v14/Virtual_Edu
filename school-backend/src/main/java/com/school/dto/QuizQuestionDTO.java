package com.school.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizQuestionDTO {

    private Long id;
    private String question;
    private List<String> options;
    private String level;
    private String image;
}
