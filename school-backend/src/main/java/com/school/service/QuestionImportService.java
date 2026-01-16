package com.school.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.dto.QuestionJsonDTO;
import com.school.entity.Question;
import com.school.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionImportService {

    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper; // ✅ IDENTIFIER PRESENT

    public void importQuestions() {

        try {
            InputStream is = getClass()
                    .getClassLoader()
                    .getResourceAsStream("questions.json");

            if (is == null) {
                throw new RuntimeException("questions.json not found in resources");
            }

            List<QuestionJsonDTO> questions =
                    objectMapper.readValue(is, new TypeReference<List<QuestionJsonDTO>>() {});

            for (QuestionJsonDTO dto : questions) {
                if (dto.getQuestionEn() == null && dto.getQuestionTa() == null) {
                    throw new RuntimeException("Question must have at least one language");
                }

                Question q = Question.builder()
                        .questionEn(dto.getQuestionEn())
                        .questionTa(dto.getQuestionTa())
                        .optionsEn(objectMapper.writeValueAsString(dto.getOptionsEn()))
                        .optionsTa(objectMapper.writeValueAsString(dto.getOptionsTa()))
                        .correctAnswer(dto.getCorrectAnswer())
                        .level(dto.getLevel())
                        .explanationEn(dto.getExplanationEn())
                        .explanationTa(dto.getExplanationTa())
                        .relatedImage(dto.getRelatedImage())
                        .build();

                questionRepository.save(q);
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to import questions", e);
        }
    }
}
