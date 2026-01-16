package com.school.service;

import com.school.dto.AnswerDTO;
import com.school.dto.QuizQuestionResponse;
import com.school.dto.QuizResultResponse;
import com.school.dto.QuizSubmitRequest;
import com.school.entity.Question;
import com.school.entity.QuizAttempt;
import com.school.repository.QuestionRepository;
import com.school.repository.QuizAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final ObjectMapper objectMapper;

    public List<QuizQuestionResponse> getQuizQuestions(
            String level,
            String language,
            int limit
    ) throws Exception {

        List<Question> questions =
                questionRepository.findByLevel(level);

        Collections.shuffle(questions);

        return questions.stream()
                .limit(limit)
                .map(q -> {
                    @SuppressWarnings("unchecked")
                    List<String> options =
                            "ta".equals(language)
                                    ?(List<String>)  q.getOptionsTa()
                                    : (List<String>) q.getOptionsEn();;

                    return new QuizQuestionResponse(
                            q.getId(),
                            "ta".equals(language) ? q.getQuestionTa() : q.getQuestionEn(),
                            options
                    );
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
