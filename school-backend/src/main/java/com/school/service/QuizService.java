package com.school.service;
import com.school.dto.*;
import com.school.entity.Question;
import com.school.entity.QuizAttempt;
import com.school.repository.QuestionRepository;
import com.school.repository.QuizAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final ObjectMapper objectMapper;
    public List<QuizQuestionDTO> startQuiz(
            String level,
            String language,
            int limit
    ) {

        List<Question> questions =
                questionRepository.findRandomByLevel(level, limit);

        return questions.stream().map(q -> {
            try {
                return QuizQuestionDTO.builder()
                        .id(q.getId())
                        .question(
                                language.equalsIgnoreCase("ta")
                                        ? q.getQuestionTa()
                                        : q.getQuestionEn()
                        )
                        .options(
                                language.equalsIgnoreCase("ta")
                                        ? objectMapper.readValue(
                                        q.getOptionsTa(),
                                        new TypeReference<List<String>>() {}
                                )
                                        : objectMapper.readValue(
                                        q.getOptionsEn(),
                                        new TypeReference<List<String>>() {}
                                )
                        )
                        .level(q.getLevel())
                        .image(q.getRelatedImage())
                        .build();

            } catch (Exception e) {
                throw new RuntimeException("Failed to parse options", e);
            }
        }).toList();
    }
    public List<QuizQuestionResponse> getQuizQuestions(
            String level,
            String language,
            int limit
    ) throws Exception {

        List<Question> questions =
                questionRepository.findByLevel(level,limit);

        Collections.shuffle(questions);

        return questions.stream()
                .limit(limit)
                .map(q -> {
                    try {
                        List<String> options =
                                "ta".equalsIgnoreCase(language)
                                        ? objectMapper.readValue(
                                        q.getOptionsTa(),
                                        new TypeReference<List<String>>() {})
                                        : objectMapper.readValue(
                                        q.getOptionsEn(),
                                        new TypeReference<List<String>>() {});

                        return new QuizQuestionResponse(
                                q.getId(),
                                "ta".equalsIgnoreCase(language)
                                        ? q.getQuestionTa()
                                        : q.getQuestionEn(),
                                options
                        );
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse options JSON", e);
                    }
                })
                .toList();
    }

    public QuizResultResponse submitQuiz(
            Long userId,
            QuizSubmitRequest request
    ) {

        int correct = 0;

        for (AnswerDTO answer : request.getAnswers()) {

            Question q = questionRepository.findById(answer.getQuestionId())
                    .orElseThrow();

            if (q.getCorrectAnswer().equals(answer.getSelectedOption())) {
                correct++;
            }
        }

        int total = request.getAnswers().size();
        int score = (correct * 100) / total;

        quizAttemptRepository.save(
                QuizAttempt.builder()
                        .userId(userId)
                        .level(request.getLevel())
                        .totalQuestions(total)
                        .correctAnswers(correct)
                        .score(score)
                        .attemptedAt(LocalDateTime.now())
                        .build()
        );

        return new QuizResultResponse(total, correct, score);
    }
}
