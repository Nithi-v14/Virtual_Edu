package com.school.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class QuestionJsonDTO {

    @JsonProperty("question")
    private String questionEn;

    @JsonProperty("questionTa")
    private String questionTa;

    @JsonProperty("options")
    private List<String> optionsEn;

    @JsonProperty("optionsTa")
    private List<String> optionsTa;

    @JsonProperty("correctAnswer")
    private Integer correctAnswer;

    private String level;

    @JsonProperty("explanation")
    private String explanationEn;

    @JsonProperty("explanationTa")
    private String explanationTa;

    private String relatedImage;
}
