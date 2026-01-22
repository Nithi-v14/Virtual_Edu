package com.school.repository;

import com.school.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(
            value = "SELECT * FROM questions WHERE level = :level ORDER BY RANDOM() LIMIT :limit",
            nativeQuery = true
    )
    List<Question> findByLevel(String level,int limit);

    List<Question> findRandomByLevel(String level, int limit);
}
