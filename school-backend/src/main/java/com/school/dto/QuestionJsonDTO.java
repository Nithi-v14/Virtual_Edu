package com.school.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class QuestionJsonDTO {

    private String questionEn;
    private String questionTa;

    private List<String> optionsEn;
    private List<String> optionsTa;

    private Integer correctAnswer;
    private String level;

    private String explanationEn;
    private String explanationTa;

    private String relatedImage;
}
